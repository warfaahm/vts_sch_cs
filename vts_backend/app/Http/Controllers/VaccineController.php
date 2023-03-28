<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVaccineRequest;
use App\Http\Resources\VaccineResource;
use App\Models\Vaccine;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class VaccineController extends Controller
{
    use HttpResponses;

    public function store(StoreVaccineRequest $request)
    {
        $request->validated($request->all());

        $vaccine = Vaccine::create([
            'vaccine_name' => $request->vaccine_name,
            'manufacturer' => $request->manufacturer,
            'contains' => $request->contains,
            'dosage' => $request->dosage,
            'age_range' => $request->age_range,
            'duration1' => $request->duration1,
            'duration2' => $request->duration2,
            'duration3' => $request->duration3,
            'validity_duration' => $request->validity_duration,
            'price' => $request->price,
        ]);
        $vaccine->diseases()->attach($request->disease_id);

        $data = new VaccineResource($vaccine);
        return $this->success($data);
    }

    public function update(Request $request, Vaccine $vaccine)
    {
        $vaccine->update($request->all());

        $data =  new VaccineResource($vaccine);
        return $this->success($data);
    }

    public function show(Vaccine $vaccine)
    {
        $data = new VaccineResource($vaccine);
        return $this->success($data);
    }

    public function index()
    {
        $data = VaccineResource::collection(Vaccine::all());

        return $this->success($data);
    }
}
