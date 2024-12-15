<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblEventTossGameLog extends Model
{
    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.tbl_eventtossgamelog';
    protected $primaryKey = 'tgl_idx';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'tgl_tgi_idx',
        'tgl_monster_code',
        'tgl_game_result1',
        'tgl_game_result2',
        'tgl_purchase_item',
        'tgl_purchase_item2',
        'tgl_game_date',
        'tgl_security_code',
        'tgl_user_code',
        'tgl_game_cnt',
    ];

    public function logTossInfo()
    {
        return $this->belongsTo(TblEventTossGameInfo::class, 'tgl_tgi_idx', 'tgi_idx');
    }
}
