<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TLHLevelAchievementSelectedCharacter extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'Web_LH.dbo.T_LH_LEVEL_ACHIEVEMENT_SELECTED_CHARACTER';
    protected $primaryKey = 'select_index';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'event_index',
        'select_member_srl',
        'select_lh_user_srl',
        'select_character_srl',
        'select_server',
        'select_character_name',
        'select_level',
        'regdate',
    ];

    public function getServerNameByServerAttribute()
    {
        if (!$this->select_server) {
            return '-';
        }
        foreach (config('globalvar.lh_server_kr') as $item) {
            $result = 'etc';
            if ($item['id'] == $this->select_server) {
                $result = $item['name'];
                break;
            }
        }
        return $result;
    }
}
