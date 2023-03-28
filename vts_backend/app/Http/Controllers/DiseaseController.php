<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDiseaseRequest;
use App\Http\Resources\DiseaseResource;
use App\Models\Disease;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class DiseaseController extends Controller
{
    use HttpResponses;

    public function store(StoreDiseaseRequest $request)
    {
        $request->validated($request->all());

        $disease = Disease::create([
            'disease_name' => $request->disease_name,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Disease added successfully',
            'data' => $disease,
        ]);
    }

    public function index()
    {
        $disease = Disease::all();

        return response()->json([
            'success' => true,
            'data' => $disease,
        ]);
    }

    public function show(Disease $disease)
    {
        $data = new DiseaseResource($disease);
        return $this->success($data);
    }

    public function update(Request $request, Disease $disease)
    {
        $disease->update($request->all());

        $data =  new DiseaseResource($disease);
        return $this->success($data);
    }
}
