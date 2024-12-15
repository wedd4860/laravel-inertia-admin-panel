<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TLHLevelAchievementReward extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'Web_LH.dbo.T_LH_LEVEL_ACHIEVEMENT_REWARD';
    protected $primaryKey = 'reward_index';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'event_index',
        'reward_item_code',
        'reward_level',
        'reward_count',
        'reward_name',
        'reward_description',
        'regdate'
    ];

    public function rewardEvent()
    {
        return $this->belongsTo(TLHLevelAchievement::class, 'event_index', 'event_index');
    }
}
