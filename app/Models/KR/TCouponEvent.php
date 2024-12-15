<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TCouponEvent extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'coupon.dbo.T_EVENT';
    protected $primaryKey = 'event_index';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'event_name',
        'contants',
        'make_coupon',
        'use_coupon',
        'start_event',
        'end_event',
        'item_code',
        'item_name',
        'cash_value',
        'promotion_code',
        'event_status',
        'world',
        'reg_date',
    ];

    public function numberCoupon()
    {
        return $this->hasMany(TCoupon::class, 'event_index', 'event_index');
    }

}
