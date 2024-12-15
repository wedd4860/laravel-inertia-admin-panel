<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TLHLevelAchievement extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'Web_LH.dbo.T_LH_LEVEL_ACHIEVEMENT';
    protected $primaryKey = 'event_index';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'event_title',
        'event_type',
        'event_start',
        'event_end',
        'event_description',
        'regdate'
    ];

    public function eventReward()
    {
        return $this->hasMany(TLHLevelAchievementReward::class, 'event_index', 'event_index');
    }

}
