<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblGameServerCode extends Model
{
    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.tbl_gameservercode';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'gsc_idx',
        'gsc_code',
        'gsc_sub_code',
        'gsc_name_kor',
        'gsc_name_eng',
    ];
}
