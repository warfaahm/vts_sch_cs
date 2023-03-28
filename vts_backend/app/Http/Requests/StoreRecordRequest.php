<?php

namespace App\Http\Requests;

use App\Rules\DoseNoRule;
use App\Rules\RecordRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRecordRequest extends FormRequest
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
            'date' => ['required', 'date', new RecordRule($this->patient_id, $this->dependent_id, $this->vaccine_id, $this->dose_no, $this->date)],
            'dose_no' => ['required', new DoseNoRule($this->patient_id, $this->dependent_id, $this->vaccine_id, $this->dose_no)],
            'next_date' => ['date', 'after:date'],
            'patient_id' => ['exists:patients,id'],
            'dependent_id' => ['exists:dependents,id'],
            'vaccine_id' => ['required', 'exists:vaccines,id'],
        ];
    }
}
