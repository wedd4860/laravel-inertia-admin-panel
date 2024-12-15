<?php

namespace App\Models\KR;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class ODBCTblLaghaimpointuser extends Authenticatable
{
    use Notifiable;

    protected $connection = 'kr_game_lh_29';
    protected $table = 'tbl_laghaimpointuser';
    protected $primaryKey = 'lpu_idx';
    public $incrementing = true; // 자동 증가옵션
    public $timestamps = false;

    protected $fillable = [
        'lpu_user_idx',
        'lpu_user_lag_idx',
        'lpu_user_idname',
        'lpu_user_lag_point',
        'lpu_update_date',
    ];
}
