<?php

namespace App\Http\Resources\KR\CS;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogLoginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'member_srl' => $this->member_srl,
            'ipaddress' => $this->ipaddress,
            'is_succeed' => $this->is_succeed,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
            'date' => (new Carbon($this->date))->format('Y-m-d H:i:s'),
            'member' => $this->member
        ];
    }
}
