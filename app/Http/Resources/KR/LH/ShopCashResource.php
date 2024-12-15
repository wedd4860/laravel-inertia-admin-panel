<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ShopCashResource extends JsonResource
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
            'itemIndex' => $this->itemIndex,
            'itemCate' => $this->itemCate,
            'itemSeq' => $this->itemSeq,
            'itemName' => $this->itemName,
            'itemImg' => $this->itemImg,
            'itemCost' => $this->itemCost,
            'itemGeneralQuantify' => $this->itemGeneralQuantify,
            'itemPremiumQuantify' => $this->itemPremiumQuantify,
            'itemFixed' => $this->itemFixed,
            'itemLagRush' => $this->itemLagRush,
            'itemLPPoint' => $this->itemLPPoint,
            'itemLPPointMax' => $this->itemLPPointMax,
            'itemAmount' => $this->itemAmount,
            'itemAddCode' => $this->itemAddCode,
            'itemSummary' => $this->itemSummary,
            'itemWarning' => $this->itemWarning,
            'itemOrder' => $this->itemOrder,
            'itemView' => $this->itemView,
            'itemRecommend' => $this->itemRecommend,
            'itemReturnUser' => $this->itemReturnUser,
            'regDate' => (new Carbon($this->regDate))->format('Y-m-d H:i:s'), // date
        ];
    }
}
