<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Member extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_member';
    protected $primaryKey = 'member_srl';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'user_name',
        'nick_name',
        'email_address',
        'email_id',
        'email_host',
        'birthday',
        'limit_date',
        'password',
        'denied',
        'change_password_date',
        'extra_vars',
        'last_login',
    ];

    protected $hidden = [
        'password', 'find_account_question', 'find_account_answer', 'homepage', 'blog', 'list_order', 'ci', 'di'
    ];

    public function getRememberTokenName()
    {
        return ''; // remember_token 컬럼 사용중이지 않음으로 비활성화
    }

    // get{AttributeName}Attribute 형식의 메소드를 사용하여 모델의 속성을  변환
    public function getExtraVarsAttribute($value)
    {
        return unserialize($value);
    }

    public function memberLoginDeviceSwitch()
    {
        //(맴버로그인디바이스, [맴버로그인디바이스컬럼], [맴버컬럼])
        return $this->hasOne(MemberLoginDeviceSwitch::class, 'member_srl', 'member_srl');
    }

    public function memberGroupMember()
    {
        return $this->hasMany(MemberGroupMember::class, 'member_srl', 'member_srl');
    }

    public function memberTLoginBlock()
    {
        return $this->hasOne(TLoginBlock::class, 'member_srl', 'member_srl');
    }

    public function memberTSecurityInfo()
    {
        return $this->hasMany(TSecurityInfo::class, 'member_srl', 'memberSrl');
    }

    public function memberTAppointPcInfo()
    {
        return $this->hasMany(TAppointPcInfo::class, 'member_srl', 'memberSrl');
    }

    public function memberMemberLoginlog()
    {
        return $this->hasMany(MemberLoginlog::class, 'member_srl', 'member_srl');
    }

    public function memberTPermissionGroup()
    {
        return $this->hasOne(TPermissionGroup::class, 'member_srl', 'member_srl');
    }

    public function memberCreators()
    {
        return $this->hasMany(Creators::class, 'member_srl', 'member_srl');
    }

    public function memberBlockList()
    {
        return $this->hasMany(BlockList::class, 'member_srl', 'member_srl');
    }
}
