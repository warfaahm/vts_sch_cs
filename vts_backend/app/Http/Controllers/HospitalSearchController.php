<?php

namespace App\Http\Controllers;

use App\Models\County;
use App\Models\Disease;
use App\Models\Hospital;
use App\Models\Sub_county;
use App\Models\Vaccine;
use App\Models\Ward;
use Illuminate\Http\Request;

class HospitalSearchController extends Controller
{
    public function county()
    {
        $county = County::orderBy('county_name', 'asc')->get();
        return response()->json([
            'success' => true,
            'data' => $county,
        ]);
    }

    public function subCounty($id)
    {
        $subCounty = Sub_county::where('county_id', $id)->orderBy('subCounty_name')->get();
        return response()->json([
            'success' => true,
            'data' => $subCounty,
        ]);
    }

    public function ward($id)
    {
        $ward = Ward::where('subCounty_id', $id)->orderBy('ward_name')->get();
        return response()->json([
            'success' => true,
            'data' => $ward,
        ]);
    }

    public function hospital($id)
    {
        $hospital = Hospital::where('ward_id', $id)->orderBy('hospital_name')->get();
        return response()->json([
            'success' => true,
            'data' => $hospital,
        ]);
    }

    public function disease()
    {
        $disease = Disease::orderBy('disease_name', 'asc')->get();
        return response()->json([
            'success' => true,
            'data' => $disease,
        ]);
    }

    public function vaccine($id)
    {
        $vaccine = Vaccine::whereHas('diseases', function ($query) use ($id) {
            $query->where('disease_id', $id);
        })
            ->orderBy('vaccine_name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $vaccine,
        ]);
    }
}
