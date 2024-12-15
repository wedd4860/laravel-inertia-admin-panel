<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class EventAttendDurationResource extends JsonResource
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
            'proc' => $this->proc,
            'eventType' => $this->eventType,
            'startDate' => (new Carbon($this->startDate))->format('Y-m-d H:i:s'), // date,
            'endDate' => (new Carbon($this->endDate))->format('Y-m-d H:i:s'), // date,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'), // date,
        ];
    }
}
