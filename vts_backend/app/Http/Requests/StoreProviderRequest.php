<?php

namespace App\Http\Requests;

use App\Rules\StoreStaffRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProviderRequest extends FormRequest
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
            'first_name' =>['required', 'string', 'max:50'],
            'last_name' =>['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'min:6', 'string'],
            'role' => ['required', 'in:staff,staff_admin', new StoreStaffRule($this->role, $this->hospital_id)],
            'hospital_id' =>['exists:hospitals,id'],
        ];
    }
}
