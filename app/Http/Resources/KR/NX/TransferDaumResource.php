<?php

namespace App\Http\Resources\KR\NX;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class TransferDaumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'DaumID' => $this->DaumID,
            'DaumMemberSrl' => $this->DaumMemberSrl,
            'MasangID' => $this->MasangID,
            'MasangMemberSrl' => $this->MasangMemberSrl,
            'reg_date' => $this->reg_date ? (new Carbon($this->reg_date))->format('Y-m-d h:i:s') : null,
            'member' => $this->member
        ];
    }
}
