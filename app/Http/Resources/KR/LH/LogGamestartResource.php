<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class LogGamestartResource extends JsonResource
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
            'memberSrl' => $this->memberSrl,
            'gubun' => $this->gubun,
            'ipaddress' => $this->ipaddress,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s')
        ];
    }
}
