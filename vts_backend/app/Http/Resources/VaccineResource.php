<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VaccineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->vaccine_name,
            'manufacturer' => $this->manufacturer,
            'contains' => $this->contains,
            'dosage' => $this->dosage,
            'age_range' => $this->age_range,
            'duration1' => $this->duration1,
            'duration2' => $this->duration2,
            'duration3' => $this->duration3,
            'validity_duration' => $this->validity_duration,
            'price' => $this->price,
            'disease' => $this->diseases,
        ];
    }
}
