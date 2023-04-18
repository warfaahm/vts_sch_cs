<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetDependentRecord;
use App\Http\Requests\GetPatientRecord;
use App\Http\Requests\StoreRecordRequest;
use App\Http\Resources\RecordResource;
use App\Models\Dependent;
use App\Models\Patient;
use App\Models\Record;
use App\Models\Vaccine;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecordController extends Controller
{
    public function index()
    {
        return RecordResource::collection();
    }

    public function indexForPatient()
    {
        return RecordResource::collection(
            Record::where('patient_id', Auth::user()->patient->id)->get()
        );
    }

    public function indexForDependent()
    {
//        return RecordResource::collection(
//            Record::where('dependent_id', Auth::user()->patient->dependents->id)->get()
//        );
        $dependents = Auth::user()->patient->dependents()->pluck('id');
        $records = Record::whereIn('dependent_id', $dependents)->get();
        return RecordResource::collection($records);

    }


    public function store(StoreRecordRequest $request)
    {
        $currentDate = Carbon::now();
        $formattedDate = $currentDate->format('Y-m-d');
        $request->validated($request->all());

        $vaccine = Vaccine::findOrFail($request->vaccine_id);
        $dosage = $vaccine->dosage;
        $duration1 = $vaccine->duration1;
        $duration2 = $vaccine->duration2;
        $duration3 = $vaccine->duration3;

        if ($dosage == $request->dose_no) {
            $next_date = null;
        }
        elseif ($dosage > $request->dose_no && $request->dose_no == 1 ){
            $next_date = Carbon::parse($request->date)->addDays($duration1 * 7);
        }
        elseif ($dosage > $request->dose_no && $request->dose_no == 2 ){
            $next_date = Carbon::parse($request->date)->addDays($duration2 * 7);
        }
        elseif ($dosage > $request->dose_no && $request->dose_no == 3 ){
            $next_date = Carbon::parse($request->date)->addDays($duration3 * 7);
        }

        $record = Record::create([
            'hospital_id' => Auth::user()->hospital_id,
            'date' => $request->date,
            'next_date' => $next_date,
            'dose_no' => $request->dose_no,
            'patient_id' => $request->patient_id,
            'dependent_id' => $request->dependent_id,
            'vaccine_id' => $request->vaccine_id,
        ]);

        return response()->json([
            'message' => 'Record added successfully',
            'data' => $record,
        ]);
    }

    public function show(Record $record)
    {
        return new RecordResource($record);
    }

    public function showForPatient(Record $record)
    {
        if (Auth::user()->patient->id !== $record->patient_id){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        return new RecordResource($record);
    }

    public function showForDependent(Dependent $dependent, Record $record)
    {
        if (Auth::user()->patient->id !== $dependent->patient_id){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $record = $dependent->records()->findOrFail($record->id);

        return new RecordResource($record);
    }

    public function update(Request $request, Record $record)
    {
        $currentDate = today();
        if (Auth::user()->hospital_id !== $record->hospital_id  && $record->date !== $currentDate){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $record->update($request->all());

        return new RecordResource($record);
    }

    public function searchRecordPatient(GetPatientRecord $request)
    {
        $request->validated($request->all());

        $patient = Patient::where('nat_id_no', $request->nat_id_no)->whereHas('user', function ($query) use ($request) {
            $query->where('last_name', $request->last_name);
        })->first();
        $record = Record::where('patient_id', $patient->id)->orderBy('date', 'desc')->get();
        $data = RecordResource::collection($record);
        return response()->json([
            'message' => 'Request was successfull',
            'patient' => $patient,
            'patients' => $patient->user,
            'records' => $data,
        ]);
    }

    public function searchRecordDependent(GetDependentRecord $request)
    {
        $request->validated($request->all());

        $patient = Dependent::where('birth_cert_no', $request->birth_cert_no)->where('last_name', $request->last_name)->first();
        $record = Record::where('dependent_id', $patient->id)->orderBy('date', 'desc')->get();
        $data = RecordResource::collection($record);
        return response()->json([
            'message' => 'Request was successfull',
            'patient' => $patient,
            'parent' => $patient->patient,
            'parents' => $patient->patient->user,
            'records' => $data,
        ]);
    }

    public function recordCount()
    {
        $count = Record::where('hospital_id', Auth::user()->hospital_id)->count();

        return response()->json(['count' => $count]);
    }

    public function recordUserCount()
    {
        $count = Record::where('patient_id', Auth::user()->patient->id)->count();
        $dependentIds = Auth::user()->patient->dependents->pluck('id')->toArray();
        $count2 = Record::whereIn('dependent_id', $dependentIds)->count();

        return response()->json(['count' => $count+$count2]);
    }
}
