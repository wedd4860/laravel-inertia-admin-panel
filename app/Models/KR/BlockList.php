<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockList extends Model
{
    use HasFactory;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.Block_List';
    protected $primaryKey = ['member_srl', 'game_id'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'member_srl',
        'game_id',
        'date',
        'text',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_srl', 'member_srl');
    }
}
