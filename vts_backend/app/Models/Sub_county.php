<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sub_county extends Model
{
    use HasFactory;

    protected $fillable = [
        'subCounty_name',
        'county_id',
    ];

    public function wards(): HasMany
    {
        return $this->hasMany(Ward::class, 'subCounty_id');
    }

    public function county(): BelongsTo
    {
        return $this->belongsTo(County::class, 'county_id');
    }
}
