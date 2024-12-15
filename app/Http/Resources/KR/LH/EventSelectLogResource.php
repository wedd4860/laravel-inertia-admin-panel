<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class EventSelectLogResource extends JsonResource
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
            'select_index' => $this->select_index,
            'event_index' => $this->event_index,
            'select_member_srl' => $this->select_member_srl,
            'select_lh_user_srl' => $this->select_lh_user_srl,
            'select_character_srl' => $this->select_character_srl,
            'select_server' => $this->select_server,
            'select_server_name' => $this->serverNameByServer,
            'select_character_name' => $this->select_character_name,
            'select_level' => $this->select_level,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'), // date
        ];
    }
}
