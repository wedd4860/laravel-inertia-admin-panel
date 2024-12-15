<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblGameWorldCode extends Model
{
    protected $connection = 'kr_web_lh';
    protected $table = 'Web_LH.dbo.tbl_gameworldcode';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'gwc_idx',
        'gwc_code',
        'gwc_name',
        'gwc_full_name',
    ];
}
