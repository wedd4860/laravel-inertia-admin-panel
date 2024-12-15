<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class BgUser extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.bg_user';
    protected $primaryKey = null;
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'user_code',
        'user_id',
        'name',
        'nickname',
        'passwd',
        'birth',
        'email',
    ];

}
