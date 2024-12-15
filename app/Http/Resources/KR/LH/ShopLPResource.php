<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ShopLPResource extends JsonResource
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
            'lsi_idx' => $this->lsi_idx,
            'lsi_goods_code' => $this->lsi_goods_code,
            'lsi_goods_name' => $this->lsi_goods_name,
            'lsi_goods_type' => $this->lsi_goods_type,
            'lsi_item_idx' => $this->lsi_item_idx,
            'lsi_item_cnt' => $this->lsi_item_cnt,
            'lsi_sale_point' => $this->lsi_sale_point,
            'lsi_sale_limit_cnt' => $this->lsi_sale_limit_cnt,
            'lsi_sale_cnt' => $this->lsi_sale_cnt,
            'lsi_buy_limit_cnt' => $this->lsi_buy_limit_cnt,
            'lsi_sale_start_date' => $this->lsi_sale_start_date ? (new Carbon($this->lsi_sale_start_date))->format('Y-m-d') : null, // date
            'lsi_sale_end_date' => $this->lsi_sale_end_date ? (new Carbon($this->lsi_sale_end_date))->format('Y-m-d') : null, // date
            'lsi_description' => $this->lsi_description,
            'lsi_goods_img' => $this->lsi_goods_img,
            'lsi_enabled' => $this->lsi_enabled,
            'lsi_regdate' => (new Carbon($this->lsi_regdate))->format('Y-m-d H:i:s'), // date
        ];
    }
}
