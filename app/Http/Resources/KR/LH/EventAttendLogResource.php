<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class EventAttendLogResource extends JsonResource
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
            'idx' => $this->idx,
            'masangId' => $this->masangId,
            'memberSrl' => $this->memberSrl,
            'LagWebUserNo' => $this->LagWebUserNo,
            'ItemNumber' => $this->ItemNumber,
            'ItemCode' => $this->ItemCode,
            'ItemCount' => $this->ItemCount,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'), // date
            'status' => $this->status,
            'moddate' => (new Carbon($this->moddate))->format('Y-m-d H:i:s'), // date
        ];
    }
}
