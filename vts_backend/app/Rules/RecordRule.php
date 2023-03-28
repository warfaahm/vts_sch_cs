<?php

namespace App\Rules;

use App\Models\Record;
use Illuminate\Contracts\Validation\Rule;

class RecordRule implements Rule
{
    protected $patient_id;
    protected $dependent_id;
    protected $vaccine_id;
    protected $dose_no;
    protected $date;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($patient_id, $dependent_id, $vaccine_id, $dose_no, $date)
    {
        $this->patient_id = $patient_id;
        $this->dependent_id = $dependent_id;
        $this->vaccine_id = $vaccine_id;
        $this->dose_no = $dose_no;
        $this->date = $date;
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
        $lastRecord = Record::where(function ($query) {
            $query->where('patient_id', $this->patient_id)
                ->orWhere('dependent_id', $this->dependent_id);
        })
            ->where('vaccine_id', $this->vaccine_id)
            ->where('dose_no', $this->dose_no - 1)
            ->latest('date')
            ->first();

        if (!$lastRecord) {
            // If there is no previous record, then this is the first dose, so it can be recorded.
            return true;
        }

        if ($lastRecord->next_date > $this->date) {
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
        return 'The previous dose of this vaccine is not yet due.';
    }
}
