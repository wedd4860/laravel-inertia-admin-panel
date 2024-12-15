<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SecondPasswordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_code' => $this->user_code,
            'user_id' => $this->user_id,
            'nickname' => $this->nickname,
            'create_date' => $this->create_date,
            'logout_date' => $this->logout_date,
        ];
    }
}
