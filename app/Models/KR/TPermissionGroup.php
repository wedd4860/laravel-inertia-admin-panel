<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TPermissionGroup extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.T_PERMISSION_GROUP';
    protected $primaryKey = null;
    public $incrementing = false;  // 자동 증가하지 않음
    public $timestamps = false;    // 타임스탬프 비활성화

    protected $fillable = [
        'member_srl',
        'user_id',
        'permission_group',
        'text',
        'regdate',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_srl', 'member_srl');
    }
}
