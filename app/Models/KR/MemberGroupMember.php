<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberGroupMember extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_member_group_member';
    protected $primaryKey = null;
    protected $keyType = null;
    public $incrementing = false;  // 자동 증가하지 않음
    public $timestamps = false;    // 타임스탬프 비활성화

    protected $fillable = [
        'site_srl',
        'group_srl',
        'member_srl',
        'regdate',
    ];

    protected $hidden = [];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_srl', 'member_srl');
    }

    public function memberGroup()
    {
        return $this->belongsTo(MemberGroup::class, 'group_srl', 'group_srl');
    }
}
