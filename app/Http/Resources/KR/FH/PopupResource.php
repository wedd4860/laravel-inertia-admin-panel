<?php

namespace App\Http\Resources\KR\FH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class PopupResource extends JsonResource
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
            'idx' => $this->idx,
            'imageUrl' => $this->imageUrl,
            'linkUrl' => $this->linkUrl,
            'status' => $this->status,
            'startDate' => $this->startDate ? (new Carbon($this->startDate))->format('Y-m-d H:i') : null, // date
            'endDate' => $this->endDate ? (new Carbon($this->endDate))->format('Y-m-d H:i') : null, // date
        ];
    }
}
