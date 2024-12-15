<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class MoveAccountLogResource extends JsonResource
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
            'prh_idx' => $this->prh_idx,
            'prh_th_user_idx' => $this->prh_th_user_idx,
            'prh_th_user_lag_idx' => $this->prh_th_user_lag_idx,
            'prh_th_user_idname' => $this->prh_th_user_idname,
            'prh_tar_user_idx' => $this->prh_tar_user_idx,
            'prh_tar_user_lag_idx' => $this->prh_tar_user_lag_idx,
            'prh_tar_user_idname' => $this->prh_tar_user_idname,
            'prh_modify_before_desc' => $this->prh_modify_before_desc,
            'prh_modify_after_desc' => $this->prh_modify_after_desc,
            'prh_site_code' => $this->prh_site_code,
            'prh_server' => $this->prh_server,
            'prh_modify_date' => (new Carbon($this->prh_modify_date))->format('Y-m-d H:i:s'),
            'prh_give_place' => $this->prh_give_place,
            'prh_event_name' => $this->prh_event_name,
        ];
    }
}
