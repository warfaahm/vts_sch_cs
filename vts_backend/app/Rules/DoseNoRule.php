<?php

namespace App\Rules;

use App\Models\Record;
use Illuminate\Contracts\Validation\Rule;

class DoseNoRule implements Rule
{
    private $patient_id;
    private $dependent_id;
    private $dose_no;
    private $vaccine_id;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($patient_id, $dependent_id, $vaccine_id, $dose_no)
    {
        $this->patient_id = $patient_id;
        $this->dependent_id = $dependent_id;
        $this->vaccine_id = $vaccine_id;
        $this->dose_no = $dose_no;
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
        if ($this->dose_no > 1){
            $previous_dose_no = $this->dose_no - 1;

            $previous_record = Record::where(function ($query) {
                $query->where('patient_id', $this->patient_id)
                    ->orWhere('dependent_id', $this->dependent_id);
            })
                ->where('vaccine_id', $this->vaccine_id)
                ->where('dose_no', $previous_dose_no)
                ->latest('date')
                ->first();

            if (!$previous_record) {
                return false;
            }
            if ($previous_record->dose_no === $this->dose_no)
            {
                return false;
            }
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
        return 'The patient has not received all the previous doses.';
    }
}
