<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberExpired extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_member_expired';
    protected $primaryKey = 'member_srl';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'user_name',
        'nick_name',
        'email_address',
        'email_id',
        'email_host',
        'birthday',
        'limit_date',
        'password',
        'chang_password_date',
        'extra_vars',
    ];

    protected $hidden = [
        'password', 'find_account_question', 'find_account_answer', 'homepage', 'blog', 'list_order', 'ci', 'di'
    ];

    // get{AttributeName}Attribute 형식의 메소드를 사용하여 모델의 속성을  변환
    public function getExtraVarsAttribute($value)
    {
        return unserialize($value);
    }
}
