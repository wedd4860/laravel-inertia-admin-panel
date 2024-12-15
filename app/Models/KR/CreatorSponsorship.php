<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class CreatorSponsorship extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.Creator_Sponsorship';
    protected $primaryKey = 'seq';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'creators_seq', 'member_srl', 'startdate', 'enddate', 'status'
    ];

    protected $hidden = [];

    public function getFormatStartDateAttribute()
    {
        return Carbon::parse($this->startdate)->format('Y-m-d H:i') ?? '-';
    }

    public function getCheckEndDateAttribute()
    {
        $startDate = Carbon::parse($this->startdate);
        $endDate = Carbon::parse($this->enddate);
        return $endDate->lt($startDate) ? '-' : (new Carbon($this->endDate))->format('Y-m-d H:i');
    }

    public function creators()
    {
        return $this->belongsTo(Creators::class, 'creators_seq', 'seq');
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_srl', 'member_srl');
    }
}
