<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ReturnItemLogResource extends JsonResource
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
            'MemberSrl' => $this->MemberSrl,
            'itemno' => $this->itemno,
            'regDate' => (new Carbon($this->regDate))->format('Y-m-d H:i:s'), // date
        ];
    }
}
