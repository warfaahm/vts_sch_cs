<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ward extends Model
{
    use HasFactory;

    protected $fillable = [
        'ward_name',
        'subCounty_id',
    ];

    public function hospitals(): HasMany
    {
        return $this->hasMany(Hospital::class, 'ward_id');
    }

    public function subCounty(): BelongsTo
    {
        return $this->belongsTo(Sub_county::class, 'subCounty_id');
    }
}
