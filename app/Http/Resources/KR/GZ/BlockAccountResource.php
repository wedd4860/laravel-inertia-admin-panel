<?php

namespace App\Http\Resources\KR\GZ;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class BlockAccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'member_srl' => $this->member_srl,
            'game_id' => $this->game_id,
            'date' => $this->getDateFormat($this->date),
            'text' => $this->text,
            'member' => $this->member
        ];
    }

    private function getDateFormat($strDate): string | null
    {
        if (!$strDate) {
            return null;
        }

        try {
            return (new Carbon($strDate))->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }
}
