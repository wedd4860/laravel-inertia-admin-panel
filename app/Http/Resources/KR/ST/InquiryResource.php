<?php

namespace App\Http\Resources\KR\ST;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class InquiryResource extends JsonResource
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
            'id' => Arr::get($this, 'id'),
            'reg_date' => Arr::get($this, 'reg_date'),
            'update_date' => Arr::get($this, 'update_date'),
            'inquiry_status' => Arr::get($this, 'inquiry_status'),
            'inquiry_type' => Arr::get($this, 'inquiry_type'),
            'satisfy_rate' => Arr::get($this, 'satisfy_rate'),
            'assigned_manager' => Arr::get($this, 'assigned_manager'),
            'product' => Arr::get($this, 'product'),
        ];
    }
}
