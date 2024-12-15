<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Laravel\Scout\Searchable;

class Documents extends Model
{
    use HasFactory;
    use Searchable;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.masangsoft_documents';
    protected $primaryKey = 'document_srl';
    public $incrementing = false; // document_srl 은 자동 증가옵션이 아닙니다.
    public $timestamps = false;

    protected $fillable = [
        'is_notice',
        'title',
        'title_bold',
        'title_color',
        'content',
        'readed_count',
        'voted_count',
        'blamed_count',
        'comment_count',
        'trackback_count',
        'uploaded_count',
        'member_srl',
        'email_address',
        'homepage',
        'tags',
        'extra_vars',
        'regdate',
        'last_update',
        'last_updater',
        'ipaddress',
        'list_order',
        'update_order',
        'allow_trackback',
        'notify_message',
        'status',
        'comment_status',
    ];

    protected $hidden = ['password'];

    public function documentCategories()
    {
        return $this->belongsTo(DocumentCategories::class, 'category_srl', 'category_srl');
    }

    public function documentExtraVars()
    {
        return $this->hasMany(DocumentExtraVars::class, 'document_srl', 'document_srl');
    }

    public function searchableAs(): string
    {
        return 'masangsoft_documents_index';
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        return array_merge(
            // $this->toArray(),
            [
                'id' => (string) $this->document_srl,
                'document_srl' => (int) $this->document_srl,
                'content' => $this->content,
            ]
        );
    }
}
