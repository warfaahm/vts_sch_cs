<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class County extends Model
{
    use HasFactory;

    protected $fillable = [
        'county_name',
    ];

    public function subCounties(): HasMany
    {
        return $this->hasMany(Sub_county::class, 'county_id');
    }
}
