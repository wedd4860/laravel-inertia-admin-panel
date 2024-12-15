<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TLHLevelAchievementReceive extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'Web_LH.dbo.T_LH_LEVEL_ACHIEVEMENT_RECEIVE';
    protected $primaryKey = 'receive_index';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'event_index',
        'select_index',
        'reward_index',
        'receive_level',
        'receive_completed',
        'receive_date',
        'regdate',
    ];

    public function receiveEvent()
    {
        return $this->belongsTo(TLHLevelAchievement::class, 'event_index', 'event_index');
    }

    public function receiveReward()
    {
        return $this->belongsTo(TLHLevelAchievementReward::class, 'reward_index', 'reward_index');
    }

    public function receiveSelect()
    {
        return $this->belongsTo(TLHLevelAchievementSelectedCharacter::class, 'select_index', 'select_index');
    }

}
