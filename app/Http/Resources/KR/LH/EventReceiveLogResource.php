<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class EventReceiveLogResource extends JsonResource
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
            "receive_index" => $this->receive_index,
            "event_index" => $this->event_index,
            "select_index" => $this->select_index,
            "reward_index" => $this->reward_index,
            "receive_level" => $this->receive_level,
            "receive_completed" => $this->receive_completed,
            "receive_date" => $this->receive_date ? (new Carbon($this->receive_date))->format('Y-m-d H:i:s') : null,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
            "receiveReward" => $this->receiveReward,
            "receiveSelect" => $this->receiveSelect,
        ];
    }
}
