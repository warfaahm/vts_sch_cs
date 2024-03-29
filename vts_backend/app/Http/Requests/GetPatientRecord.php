<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetPatientRecord extends FormRequest
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
            'last_name' => ['required', 'string', 'max:255'],
            'nat_id_no' => ['required', 'string', 'max:255', 'exists:patients'],
        ];
    }
}
