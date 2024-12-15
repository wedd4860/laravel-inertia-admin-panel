<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TFHPopup extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'FHWeb.dbo.T_FH_POPUP';
    protected $primaryKey = 'idx';
    protected $keyType = null;
    public $incrementing = false;  // 자동 증가하지 않음
    public $timestamps = false;    // 타임스탬프 비활성화

    protected $fillable = [
        'imageUrl',
        'linkUrl',
        'status',
        'startDate',
        'endDate',
    ];

    protected $hidden = [
        'regdate',
    ];
}
