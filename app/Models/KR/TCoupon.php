<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TCoupon extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'coupon.dbo.T_COUPON';
    protected $primaryKey = 'coupon_index';
    public $incrementing = false; // member_srl은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'event_index',
        'number_coupon',
        'string_coupon',
        'reg_date',
    ];

    public function logCoupon()
    {
        return $this->hasMany(LCoupon::class, 'number_coupon', 'number_coupon');
    }

    public function event()
    {
        return $this->belongsTo(TCouponEvent::class, 'event_index', 'event_index');
    }

}
