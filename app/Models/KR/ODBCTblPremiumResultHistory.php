<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class ODBCTblPremiumResultHistory extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_game_lh_29';
    protected $table = 'tbl_premiumresulthistory';
    protected $primaryKey = 'prh_idx';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'prh_th_user_idx',
        'prh_th_user_lag_idx',
        'prh_th_user_idname',
        'prh_tar_user_idx',
        'prh_tar_user_lag_idx',
        'prh_tar_user_idname',
        'prh_modify_before_desc',
        'prh_modify_after_desc',
        'prh_site_code',
        'prh_server',
        'prh_modify_date',
        'prh_give_place',
        'prh_event_name',
    ];

}
