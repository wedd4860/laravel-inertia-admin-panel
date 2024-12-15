<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TSecurityInfo extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.T_SECURITY_INFO';
    protected $primaryKey = null;
    protected $keyType = null;
    public $incrementing = false;  // 자동 증가하지 않음
    public $timestamps = false;    // 타임스탬프 비활성화

    protected $fillable = [
        'type',
        'memberSrl',
        'extra_vars',
        'state',
        'regDate',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'memberSrl', 'member_srl');
    }
}
