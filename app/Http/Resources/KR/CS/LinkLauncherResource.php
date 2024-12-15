<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class LinkLauncherResource extends JsonResource
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
            'type' => $this->type,
            'launcher' => $this->launcher,
            'text' => $this->text,
            'version' => $this->version,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
        ];
    }
}
