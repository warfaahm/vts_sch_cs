<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vaccine extends Model
{
    use HasFactory;

    protected $fillable = [
        'vaccine_name',
        'manufacturer',
        'contains',
        'dosage',
        'age_range',
        'duration1',
        'duration2',
        'duration3',
        'validity_duration',
        'price',
    ];

    public function diseases(): BelongsToMany
    {
        return $this->belongsToMany(Disease::class);
    }

    public function records(): HasMany
    {
        return $this->hasMany(Record::class, 'vaccine_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'vaccine_id');
    }
}
