<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class EventManagementResource extends JsonResource
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
            'event_index' => $this->event_index,
            'event_title' => $this->event_title ? $this->event_title : null,
            'event_type' => $this->event_type ? $this->event_type : null,
            'event_start' => $this->event_start ? (new Carbon($this->event_start))->format('Y-m-d H:i') : null,
            'event_end' => $this->event_end ? (new Carbon($this->event_end))->format('Y-m-d H:i') : null,
            'event_description' => $this->event_description ? $this->event_description : null,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'), // date
            'eventReward' => $this->eventReward,
        ];
    }
}
