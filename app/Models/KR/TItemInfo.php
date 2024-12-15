<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TItemInfo extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.T_ItemInfo';
    protected $primaryKey = 'itemIndex';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'itemCate',
        'itemSeq',
        'itemName',
        'itemImg',
        'itemCost',
        'itemGeneralQuantify',
        'itemPremiumQuantify',
        'itemFixed',
        'itemLagRush',
        'itemLPPoint',
        'itemLPPointMax',
        'itemAmount',
        'itemAddCode',
        'itemSummary',
        'itemWarning',
        'itemOrder',
        'itemView',
        'itemRecommend',
        'itemReturnUser',
        'regDate',
    ];

}
