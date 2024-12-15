<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class UserPointResource extends JsonResource
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
            'lpu_idx' => $this->lpu_idx,
            'lpu_user_idx' => $this->lpu_user_idx,
            'lpu_user_idname' => $this->lpu_user_idname,
            'lpu_user_lag_point' => $this->lpu_user_lag_point,
            'lpu_update_date' => (new Carbon($this->lpu_update_date))->format('Y-m-d H:i:s')
        ];
    }
}
