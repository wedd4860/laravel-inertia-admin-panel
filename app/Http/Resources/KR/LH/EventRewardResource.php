<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class EventRewardResource extends JsonResource
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
            'reward_index' => $this->reward_index,
            'event_index' => $this->event_index,
            'reward_item_code' => $this->reward_item_code,
            'reward_level' => $this->reward_level,
            'reward_count' => $this->reward_count,
            'reward_name' => $this->reward_name ? $this->reward_name : null,
            'reward_description' => $this->reward_description ? $this->reward_description : null,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'), // date
            'rewardEvent' => $this->rewardEvent,
        ];
    }
}
