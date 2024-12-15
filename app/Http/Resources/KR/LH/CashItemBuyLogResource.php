<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class CashItemBuyLogResource extends JsonResource
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
            'noUser' => $this->noUser,
            'userID' => $this->userID,
            'chID' => $this->chID,
            'noContents' => $this->noContents,
            'noSite' => $this->noSite,
            'noGood' => $this->noGood,
            'cntGood' => $this->cntGood,
            'amtPay' => $this->amtPay,
            'ipUser' => $this->ipUser,
            'ipServer' => $this->ipServer,
            'charName' => $this->charName,
            'gameServer' => $this->gameServer,
            'txtBxaid' => $this->txtBxaid,
            'ret_code' => $this->ret_code,
            'gameResult' => $this->gameResult,
            'itemRtn' => $this->itemRtn,
            'LPRtn' => $this->LPRtn,
            'tabjoyRtn' => $this->tabjoyRtn,
            'regDate' => (new Carbon($this->regDate))->format('Y-m-d H:i:s'), // date
        ];
    }
}
