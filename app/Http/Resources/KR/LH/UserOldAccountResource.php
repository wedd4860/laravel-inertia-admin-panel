<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class UserOldAccountResource extends JsonResource
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
            'user_code' => $this->user_code,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'nickname' => $this->nickname,
            'passwd' => $this->passwd,
            'birth' => $this->birth,
            'email' => $this->email,
        ];
    }
}
