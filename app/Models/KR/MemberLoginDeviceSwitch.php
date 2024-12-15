<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberLoginDeviceSwitch extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.member_login_device_switch';
    protected $primaryKey = 'member_srl';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'member_srl',
        'switch',
        'regdate',
    ];

    public function member()
    {
        return $this->morphOne(Member::class, 'member_srl', 'member_srl');
    }
}
