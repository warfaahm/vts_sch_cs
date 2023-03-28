<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
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
            'date' => ['required', 'date'],
            'time' => ['required'],
            'dose_no' => ['required'],
            'status' => ['required'],
            'hospital_id' => ['required', 'exists:hospitals,id'],
            'dependent_id' => ['exists:dependents,id'],
            'vaccine_id' => ['required', 'exists:vaccines,id'],
        ];
    }
}
