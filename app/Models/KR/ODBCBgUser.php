<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class ODBCBgUser extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_game_lh_user_29';
    protected $table = 'bg_user';
    protected $primaryKey = 'user_code';
    public $incrementing = true; // 자동 증가옵션
    public $timestamps = false;

    protected $fillable = [
        'user_id',
    ];
}
