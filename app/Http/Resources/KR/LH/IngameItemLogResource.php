<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class IngameItemLogResource extends JsonResource
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
            'egoods_user_code' => $this->egoods_user_code,
            'egoods_item_no' => $this->egoods_item_no,
            'egoods_cnt' => $this->egoods_cnt,
            'egoods_org_cnt' => $this->egoods_org_cnt,
            'egoods_enable' => $this->egoods_enable,
            'egoods_create_date' => (new Carbon($this->egoods_create_date))->format('Y-m-d H:i:s'), // date
            'egoods_use_date' => $this->egoods_use_date != '0000-00-00 00:00:00' ? (new Carbon($this->egoods_use_date))->format('Y-m-d H:i:s') : null, // date
        ];
    }
}
