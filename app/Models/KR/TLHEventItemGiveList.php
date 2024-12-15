<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TLHEventItemGiveList extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.T_LH_EVENT_ITEM_GIVE_LIST';
    protected $primaryKey = 'idx';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'day',
        'itemSequence',
        'itemCode',
        'itemCount',
        'regdate',
    ];

}
