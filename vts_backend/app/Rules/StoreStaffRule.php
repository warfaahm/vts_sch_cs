<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class StoreStaffRule implements Rule
{

    protected $role;
    protected $hospital_id;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($role, $hospital_id)
    {
        $this->role = $role;
        $this->hospital_id = $hospital_id;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {

        if ($this->role === 'staff' || $this->role === 'staff_admin' && !$this->hospital_id) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The hospital ID field is required when the user role is staff.';
    }
}
