<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class UserTransferResource extends JsonResource
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
            'lg_web_no' => $this->lg_web_no,
            'lg_web_id' => $this->lg_web_id,
            'ms_srl' => $this->ms_srl,
            'ms_id' => $this->ms_id,
            'ms_name' => $this->ms_name,
            'ms_nickname' => $this->ms_nickname,
            'birthday' => $this->birthday,
            'error' => $this->error,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
            'ip' => $this->ip,
            'isWebUser' => $this->webUser != null ? 1 : 0,
        ];
    }
}
