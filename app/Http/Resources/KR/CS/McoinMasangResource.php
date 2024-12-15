<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class McoinMasangResource extends JsonResource
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
            'user_id' => $this->user_id,
            'user_name' => $this->user_name,
            'nick_name' => $this->nick_name,
            'email_address' => $this->email_address,
            'last_login' => (new Carbon($this->last_login))->format('Y-m-d H:i:s'),
            'is_admin' => $this->is_admin,
            'phone' => $this->extra_vars->phone ?? null,
        ];
    }
}
