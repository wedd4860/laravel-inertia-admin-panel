<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SecurityPCResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'memberSrl' => $this->memberSrl,
            'pcname' => $this->pcname,
            'macaddress' => $this->macaddress,
            'regDate' => $this->regDate,
            'member' => $this->member,
        ];
    }
}
