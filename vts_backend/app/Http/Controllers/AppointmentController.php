<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\Hospital;
use App\Traits\HttpResponses;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    use HttpResponses;

    public function index()
    {
        return AppointmentResource::collection(
            Appointment::where('hospital_id', Auth::user()->hospital_id)->orderBy('date', 'desc')->get()
        );
    }

    public function indexForUser()
    {
        return AppointmentResource::collection(
            Appointment::where('patient_id', Auth::user()->patient->id)->orderBy('date', 'desc')->get()
        );
    }


    public function store(StoreAppointmentRequest $request)
    {
        $request->validated($request->all());

        $appointment = Appointment::create([
            'patient_id' => Auth::user()->patient->id,
            'date' => $request->date,
            'time' => $request->time,
            'dose_no' => $request->dose_no,
            'status' => $request->status,
            'hospital_id' => $request->hospital_id,
            'dependent_id' => $request->dependent_id,
            'vaccine_id' => $request->vaccine_id,

        ]);

        return $this->success($appointment, 'Appointment Successful');
    }

    public function show(Appointment $appointment)
    {
        if (Auth::user()->hospital_id !== $appointment->hospital_id){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        return new AppointmentResource($appointment);
    }

    public function showUser(Appointment $appointment)
    {
        if (Auth::user()->patient->id !== $appointment->patient_id){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        return new AppointmentResource($appointment);
    }

    public function update(Request $request, Appointment $appointment)
    {
        if (Auth::user()->hospital_id !== $appointment->hospital_id){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $appointment->update($request->all());
        return response()->json(['status' => 'Status Update Successful']);
    }

    public function updateUser(Request $request, Appointment $appointment)
    {
        $currentDate = today();
        if (Auth::user()->patient->id !== $appointment->patient_id && $appointment->date <= $currentDate){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $appointment->update($request->all());

        return new AppointmentResource($appointment);
    }

    public function destroy(Appointment $appointment)
    {
        if ($appointment->status === 'Completed'){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $appointment->delete();
        return $this->success('', 'Delete Successful');
    }

    public function getAppointmentSlots(Request $request)
    {
        $timeSlots = ['9.1', '9.2', '10.1', '10.2', '11.1', '11.2', '12.1', '12.2', '14.1', '14.2', '15.1', '15.2', '16.1', '16.2'];
        $date = $request->input('date');
        $hospital_id = $request->input('hospital_id');

        $hospital = Hospital::where('id', $hospital_id)->first();
        $slot = $hospital->slots;

        $id = 1;
        foreach ($timeSlots as $timeSlot) {
            $appointmentsCount = Appointment::where('date', $date)
                ->where('hospital_id', $hospital_id)
                ->where('time', $timeSlot)
                ->count();

            $slotsRemaining[] = [
                'id' => $id,
                'time_slot' =>  $timeSlot,
                'slots' => $slot - $appointmentsCount,
            ];
            $id++;
        }
        return response()->json(['data' => $slotsRemaining]);
    }

    public function indexSearch(Request $request)
    {
        $date = $request->input('date');
        return AppointmentResource::collection(
            Appointment::where('date', $date)->orderBy('date', 'desc')->get()
        );
    }

    public function updateStatuses(Request $request)
    {
        $date = $request->input('date');
        $status = $request->input('status');
        Appointment::where('date', $date)->update(['status' => $status]);

        return response()->json(['status' => 'Status Update Successful']);
    }

    public function appointmentCount()
    {
        $currentDate = Carbon::now()->format('Y-m-d');
        $count = Appointment::where('hospital_id', Auth::user()->hospital_id)->where('date', $currentDate)->count();

        return response()->json(['count' => $count]);
    }

    public function appointmentUserCount()
    {
        $count = Appointment::where('patient_id', Auth::user()->patient->id)->count();

        return response()->json(['count' => $count]);
    }
}
