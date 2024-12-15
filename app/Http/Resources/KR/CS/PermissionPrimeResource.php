<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class PermissionPrimeResource extends JsonResource
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
            'member' => $this->member,
            'member_srl' => $this->member_srl,
            'user_id' => $this->user_id,
            'text' => $this->text,
            'permission_group' => explode(',', $this->permission_group),
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
        ];
    }
}
