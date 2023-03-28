<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVaccineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'vaccine_name' => ['required'],
            'manufacturer' => ['required'],
            'contains' => ['required'],
            'dosage' => ['required'],
            'age_range' => ['required'],
            'disease_id' => ['required', 'array'],
            'dose_1_duration' => ['integer'],
            'dose_2_duration' => ['integer'],
            'dose_3_duration' => ['integer'],
            'validity_duration' => ['integer'],
            'price' => ['required', 'decimal:2'],
        ];
    }
}
