<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TLHEventItemGiveStartEnd extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.T_LH_EVENT_ITEM_GIVE_START_END';
    protected $primaryKey = null;
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'proc',
        'eventType',
        'startDate',
        'endDate',
        'regdate',
    ];

}
