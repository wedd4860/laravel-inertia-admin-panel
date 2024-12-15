<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class EventAttendRewardResource extends JsonResource
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
            'day' => $this->day,
            'itemSequence' => $this->itemSequence,
            'itemCode' => $this->itemCode,
            'itemCount' => $this->itemCount,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'), // date,
        ];
    }
}
