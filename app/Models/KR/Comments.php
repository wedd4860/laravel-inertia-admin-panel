<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_comments';
    protected $primaryKey = 'comment_srl';
    public $incrementing = false; // comment_srl 은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'parent_srl',
        'is_secret',
        'content',
        'voted_count',
        'blamed_count',
        'notify_message',
        'homepage',
        'uploaded_count',
        'regdate',
        'last_update',
        'ipaddress',
        'list_order',
        'status',
    ];

    protected $hidden = ['password'];
}
