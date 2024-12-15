<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogAuthenticationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'birthday' => $this->birthday,
            'sex' => $this->sex,
            'transSex' => $this->transSex($this->sex),
            'fgnGbn' => $this->fgnGbn,
            'di' => $this->di,
            'ci1' => $this->ci1,
            'ci2' => $this->ci2,
            'civersion' => $this->civersion,
            'reqNum' => $this->reqNum,
            'result' => $this->result,
            'certGb' => $this->certGb,
            'cellNo' => $this->cellNo,
            'cellCorp' => $this->cellCorp,
            'certDate' => $this->certDate,
            'addVar' => $this->addVar,
            'vDiscrNo' => $this->vDiscrNo,
            'age' => $this->age,
            'ip' => $this->ip,
            'authInfo' => $this->authInfo,
            'regdate' => $this->regdate,
        ];
    }

    private function transSex($sex)
    {
        switch ($sex) {
            case 'F':
                return '여자';
            case 'M':
                return '남자';
            default:
                return null;
        }
    }
}
