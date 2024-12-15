<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class CouponEventResource extends JsonResource
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
            'event_name' => $this->event_name,
            'contants' => $this->contants,
            'make_coupon' => $this->make_coupon,
            'use_coupon' => $this->use_coupon,
            'start_event' => $this->start_event ? (new Carbon($this->start_event))->format('Y-m-d H:i') : null,
            'end_event' => $this->end_event ? (new Carbon($this->end_event))->format('Y-m-d H:i') : null,
            'item_code' => $this->item_code,
            'item_name' => $this->item_name,
            'cash_value' => $this->cash_value,
            'promotion_code' => $this->promotion_code,
            'event_status' => $this->event_status,
            'world' => $this->world,
            'reg_date' => (new Carbon($this->reg_date))->format('Y-m-d H:i:s'), // date
            'number_coupon_count' => $this->number_coupon_count,
        ];
    }
}
