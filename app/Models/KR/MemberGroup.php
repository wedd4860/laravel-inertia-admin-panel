<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberGroup extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_member_group';
    protected $primaryKey = 'group_srl';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'site_srl',
        'group_srl',
        'title',
        'regdate',
        'is_default',
        'is_admin',
        'image_mark',
        'description',
    ];

    protected $hidden = [
        'list_order'
    ];

    public function memberGroupMember()
    {
        return $this->hasMany(MemberGroupMember::class, 'group_srl', 'group_srl');
    }
}
