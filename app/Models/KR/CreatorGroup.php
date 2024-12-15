<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class CreatorGroup extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.Creator_Group';
    protected $primaryKey = 'seq';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'gameid',
        'enddate',
    ];

    protected $hidden = ['password'];

    public function getFormatEndDateAttribute()
    {
        return Carbon::parse($this->enddate)->format('Y-m-d H:i') ?? '-';
    }

    public function getFormatRegDateAttribute()
    {
        return Carbon::parse($this->regdate)->format('Y-m-d H:i') ?? '-';
    }

    public function getGameNameByGameidAttribute()
    {
        if (!$this->gameid) {
            return '-';
        }
        foreach (config('globalvar.creator.group') as $item) {
            $result = '-';
            if ($item['id'] == $this->gameid) {
                $result = $item['name'] . '(' . $this->gameid . ')';
                break;
            }
        }
        return $result;
    }

    public function creatorGroupCreators()
    {
        return $this->hasMany(Creators::class, 'group_seq', 'seq');
    }
}
