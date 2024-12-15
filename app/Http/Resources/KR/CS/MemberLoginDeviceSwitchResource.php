<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberLoginDeviceSwitchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "member_srl"=>$this->member_srl,
            "switch"=>$this->switch,
            "regdate"=>$this->regdate,
        ];
    }
}
