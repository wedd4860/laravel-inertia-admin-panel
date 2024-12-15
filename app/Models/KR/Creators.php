<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Creators extends Model
{
    use HasFactory;
    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.Creators';
    protected $primaryKey = 'seq';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'nickname',
        'member_srl',
        'member_userid',
        'sponsorcode',
        'email',
        'group_seq',
        'phone',
        'fullname',
        'birthdate',
        'description',
        'image',
        'status',
    ];

    protected $hidden = [];

    public function getGameNameByGameidAttribute()
    {
        if (!$this->creatorGroup->gameid) {
            return '-';
        }
        foreach (config('globalvar.creator.group') as $item) {
            $result = '-';
            if ($item['id'] == $this->creatorGroup->gameid) {
                $result = $item['name'] . '(' . $this->creatorGroup->gameid . ')';
                break;
            }
        }
        return $result;
    }

    public function getStatusNameByStatusAttribute()
    {
        return $this->status == '0' ? '승인대기' : '승인';
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_srl', 'member_srl');
    }

    public function creatorGroup()
    {
        return $this->belongsTo(CreatorGroup::class, 'group_seq', 'seq');
    }

    public function creatorsCreatorSponsorship()
    {
        return $this->hasMany(CreatorSponsorship::class, 'creators_seq', 'seq');
    }
}
