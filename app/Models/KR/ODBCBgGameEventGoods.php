<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class ODBCBgGameEventGoods extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_game_lh_29';
    protected $table = 'bg_game_event_goods';
    protected $primaryKey = 'egoods_index';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'egoods_user_code',
        'egoods_site_code',
        'egoods_item_no',
        'egoods_cnt',
        'egoods_org_cnt',
        'egoods_enable',
        'egoods_create_date',
        'egoods_use_date',
        'egoods_give_place',
        'egoods_site_code',
        'egoods_event_name',
    ];

}
