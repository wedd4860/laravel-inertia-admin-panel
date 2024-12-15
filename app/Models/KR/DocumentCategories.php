<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentCategories extends Model
{
    use HasFactory;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_document_categories';
    protected $primaryKey = null;
    public $incrementing = false; // category_srl 은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    public function documents()
    {
        return $this->hasMany(Documents::class, 'category_srl', 'category_srl');
    }
}
