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

    public function indexForPatientUpcoming()
    {
        $patientId = Auth::user()->patient->id;
        $dependents = Auth::user()->patient->dependents()->pluck('id');

        $records = Record::whereIn('patient_id', $dependents->push($patientId))
            ->orWhereIn('dependent_id', $dependents->push($patientId))
            ->whereIn('id', function ($query) use ($patientId, $dependents) {
                $query->selectRaw('MAX(id)')
                    ->from('records')
                    ->whereIn('patient_id', $dependents->push($patientId))
                    ->orWhereIn('dependent_id', $dependents->push($patientId))
                    ->groupBy('vaccine_id')
                    ->havingRaw('MAX(dose_no) < (SELECT dosage FROM vaccines WHERE vaccines.id = records.vaccine_id)');
            })->get();

        return RecordResource::collection($records);
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
            'batch_id' => $request->batch_id,
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

    public function providerReport(Request $request)
    {
        $year = $request->input('year');

        $record = Record::selectRaw('MONTH(date) as month, COUNT(*) as count')

            ->whereYear('date', $year)
            ->where('hospital_id', Auth::user()->hospital_id)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($record);
    }

    public function providerReport2(Request $request)
    {
        $year = $request->input('year');
        $vaccine = $request->input('vaccine_id');

        $record = Record::selectRaw('MONTH(date) as month, COUNT(*) as count')

            ->whereYear('date', $year)
            ->where('hospital_id', Auth::user()->hospital_id)
            ->where('vaccine_id', $vaccine)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($record);
    }

    public function genderCount()
    {
        // Retrieve the gender value from the related Patient model and count the records for each gender
        $record = Record::selectRaw('patients.gender as gender, COUNT(*) as count')
            ->join('patients', 'records.patient_id', '=', 'patients.id')
            ->where('hospital_id', Auth::user()->hospital_id)
            ->groupBy('gender')
            ->orderBy('gender')
            ->get();

        return response()->json($record);
    }

    public function genderCount2()
    {
        // Retrieve the gender value from the related Patient model and count the records for each gender
        $record = Record::selectRaw('dependents.gender as gender, COUNT(*) as count')
            ->join('dependents', 'records.dependent_id', '=', 'dependents.id')
            ->where('hospital_id', Auth::user()->hospital_id)
            ->groupBy('gender')
            ->orderBy('gender')
            ->get();

        return response()->json($record);
    }
    public function genderCountAdmin()
    {
        // Retrieve the gender value from the related Patient model and count the records for each gender
        $record = Record::selectRaw('patients.gender as gender, COUNT(*) as count')
            ->join('patients', 'records.patient_id', '=', 'patients.id')
            ->groupBy('gender')
            ->orderBy('gender')
            ->get();

        return response()->json($record);
    }
    public function genderCountAdmin2()
    {
        // Retrieve the gender value from the related Patient model and count the records for each gender
        $record = Record::selectRaw('dependents.gender as gender, COUNT(*) as count')
            ->join('dependents', 'records.dependent_id', '=', 'dependents.id')
            ->groupBy('gender')
            ->orderBy('gender')
            ->get();

        return response()->json($record);
    }
    public function adminVaxReport(Request $request)
    {
        $year = $request->input('year');

        $record = Record::selectRaw('MONTH(date) as month, COUNT(*) as count')

            ->whereYear('date', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($record);
    }
    public function adminVaxReport2(Request $request)
    {
        $year = $request->input('year');
        $vaccine = $request->input('vaccine_id');

        $record = Record::selectRaw('MONTH(date) as month, COUNT(*) as count')

            ->whereYear('date', $year)
            ->where('vaccine_id', $vaccine)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($record);
    }
    public function adminVaxReport3(Request $request)
    {
        $year = $request->input('year');
        $vaccine = $request->input('vaccine_id');
        $countyId = $request->input('county_id'); // Inputted county ID

        $record = Record::selectRaw('MONTH(records.date) as month, COUNT(*) as count')
            ->join('hospitals', 'hospitals.id', '=', 'records.hospital_id')
            ->join('wards', 'wards.id', '=', 'hospitals.ward_id')
            ->join('sub_counties', 'sub_counties.id', '=', 'wards.subCounty_id')
            ->join('counties', 'counties.id', '=', 'sub_counties.county_id')
            ->whereYear('records.date', $year)
            ->where('records.vaccine_id', $vaccine)
            ->where('counties.id', $countyId) // Filter by county ID
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json($record);
    }
}
