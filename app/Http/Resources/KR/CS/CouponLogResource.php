<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class CouponLogResource extends JsonResource
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
            'user_id' => $this->user_id,
            'event_index' => $this->event_index,
            'event_name' => $this->event_name,
            'number_coupon' => $this->number_coupon,
            'reg_date' => (new Carbon($this->reg_date))->format('Y-m-d H:i:s'), // date
        ];
    }
}
