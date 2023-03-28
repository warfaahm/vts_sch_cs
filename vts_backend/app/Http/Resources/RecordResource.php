<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecordResource extends JsonResource
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
            'date' => $this->date,
            'next_date' => $this->next_date,
            'dose_no' => $this->dose_no,
            'info' => $this->dependent->patient->user ?? null,
            'info' => $this->patient->user ?? null,
            'patient' => $this->patient,
            'dependent' => $this->dependent,
            'vaccine' => $this->vaccine,
            'hospital' => $this->hospital,
        ];
    }
}
