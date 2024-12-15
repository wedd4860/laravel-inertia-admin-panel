<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class TestInfoResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ID' => $this->ID,
            'nickname' => $this->nickname,
            'pwd' => $this->pwd,
            'birthdate' => (new Carbon($this->birthdate))->format('Y-m-d'),
            'txt' => $this->txt,
            'creator_id' => $this->creator_id,
            'ip' => $this->ip,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
        ];
    }
}
