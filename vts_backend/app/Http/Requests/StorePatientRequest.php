<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'nat_id_no' => ['required', 'string', 'max:255', 'unique:patients'],
            'gender' => ['required', 'in:M,F'],
            'dob' => ['required', 'date'],
            'phone_no' => ['required', 'string', 'max:255', 'unique:patients'],
            'allergy' => ['string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:6'],
        ];
    }
}
