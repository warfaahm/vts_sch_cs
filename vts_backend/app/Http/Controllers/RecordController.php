<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecordRequest;
use App\Http\Resources\RecordResource;
use App\Models\Dependent;
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

        return new RecordResource($record);
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
}
