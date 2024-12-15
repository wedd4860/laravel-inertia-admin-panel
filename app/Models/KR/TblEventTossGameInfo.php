<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblEventTossGameInfo extends Model
{
    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.tbl_eventtossgameinfo';
    protected $primaryKey = 'tgi_idx';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'tgi_user_code',
        'tgi_user_idname',
        'tgi_svr_code',
        'tgi_char_code',
        'tgi_char_name',
        'tgi_char_race',
        'tgi_win_cnt',
        'tgi_draw_cnt',
        'tgi_lose_cnt',
        'tgi_win_point',
        'tgi_consecutive_win_cnt',
        'tgi_max_consecutive_win_cnt',
        'tgi_last_game_date',
        'tgi_last_consecutive_win_date',
    ];

}
