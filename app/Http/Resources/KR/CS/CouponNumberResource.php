<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class CouponNumberResource extends JsonResource
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
            'coupon_index' => $this->coupon_index,
            'event_index' => $this->event_index,
            'number_coupon' => $this->number_coupon,
            'string_coupon' => $this->string_coupon,
            'reg_date' => (new Carbon($this->reg_date))->format('Y-m-d H:i:s'), // date
            'log_coupon_count' => $this->log_coupon_count,
        ];
    }
}
