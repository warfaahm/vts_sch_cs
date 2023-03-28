<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Disease extends Model
{
    use HasFactory;

    protected $fillable = [
        'disease_name',
        'description',
    ];

    public function vaccines(): BelongsToMany
    {
        return $this->belongsToMany(Vaccine::class);
    }
}
