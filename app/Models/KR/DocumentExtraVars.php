<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentExtraVars extends Model
{
    use HasFactory;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_document_extra_vars';
    protected $primaryKey = 'document_srl';
    public $incrementing = false; // document_srl 은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    public function documents()
    {
        return $this->belongsTo(Documents::class, 'document_srl', 'document_srl');
    }
}
