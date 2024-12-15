<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TblWebLPShopGoodsInfo extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.tbl_weblpshopgoodsinfo';
    protected $primaryKey = 'lsi_idx';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'lsi_goods_code',
        'lsi_goods_name',
        'lsi_goods_type',
        'lsi_item_idx',
        'lsi_item_cnt',
        'lsi_status',
        'lsi_sale_point',
        'lsi_sale_limit_cnt',
        'lsi_sale_cnt',
        'lsi_buy_limit_cnt',
        'lsi_sale_start_date',
        'lsi_sale_end_date',
        'lsi_description',
        'lsi_goods_img',
        'lsi_enabled',
        'lsi_regdate',
    ];

}
