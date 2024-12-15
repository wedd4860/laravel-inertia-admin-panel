<?php

namespace App\Http\Resources\KR\MSPC;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class CreatorsGroupResource extends JsonResource
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
            'seq' => $this->seq,
            'name' => $this->name,
            'gameid' => $this->gameid,
            'game_title' => $this->gameNameByGameid,
            'enddate' => $this->formatEndDate,
            'regdate' => $this->formatRegDate,
        ];
    }
}
