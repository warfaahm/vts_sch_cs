<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
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
            'time' => $this->time,
            'dose_no' => $this->dose_no,
            'status' => $this->status,
            'info' => $this->patient->user,
            'patient' => $this->patient,
            'dependent' => $this->dependent,
            'vaccine' => $this->vaccine,
            'hospital' => $this->hospital,
        ];
    }
}
