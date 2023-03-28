<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DependentResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'birth_cert_no' => $this->birth_cert_no,
            'gender' => $this->gender,
            'allergy' => $this->allergy,
            'dob' => $this->dob,
            'relationship' => $this->relationship,
            'parent' => $this->patient,
            'info' => $this->patient->user,
        ];
    }
}
