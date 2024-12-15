<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class SiteBannerResource extends JsonResource
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
            'siteNo' => $this->siteNo,
            'siteName' => $this->siteNameBySiteNo,
            'contentNo' => $this->contentNo,
            'imageSpot' => $this->imageSpot,
            'imageUrl' => $this->imageUrl,
            'imageTargetlink' => $this->imageTargetlink,
            'imageOrder' => $this->imageOrder,
            'imageTitle' => $this->imageTitle,
            'sdate' => $this->sdate ? (new Carbon($this->sdate))->format('Y-m-d H:i') : null, // date
            'edate' => $this->edate ? (new Carbon($this->edate))->format('Y-m-d H:i') : null, // date
            'regDate' => (new Carbon($this->regDate))->format('Y-m-d H:i:s'), // date
            'sites' => $this->sites,
        ];
    }
}
