<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlockHackedResource extends JsonResource
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
            'member_srl' => $this->member_srl,
            'text' => $this->text,
            'regdate' => $this->regdate,
            'member' => $this->member,
        ];
    }
}
