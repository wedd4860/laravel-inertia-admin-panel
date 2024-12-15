<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class SecurityServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => $this->type,
            'transType' => $this->transType($this->type),
            'memberSrl' => $this->memberSrl,
            'extra_vars' => $this->extra_vars,
            'state' => $this->state,
            'regDate' => $this->regDate,
            'member' => $this->member,
        ];
    }

    private function transType($type)
    {
        switch ($type) {
            case 1:
                return 'otp';
            case 3:
                return 'phone';
            case 10:
                return 'ip';
            default:
                return null;
        }
    }
}
