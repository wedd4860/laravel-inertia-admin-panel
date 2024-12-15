<?php

namespace App\Models\KR;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TSiteBanner extends Model
{
    use HasFactory;

    protected $connection = 'kr_masangsoftweb';
    protected $table = 'masangsoftweb.dbo.T_SITEBANNER';
    protected $primaryKey = 'idx';
    protected $keyType = null;
    public $incrementing = false;  // 자동 증가하지 않음
    public $timestamps = false;    // 타임스탬프 비활성화

    protected $fillable = [
        'siteNo',
        'contentNo',
        'imageSpot',
        'imageUrl',
        'imageTargetlink',
        'imageOrder',
        'imageTitle',
        'sdate',
        'edate',
        'regDate',
        'sites',
    ];

    public function getSiteNameBySiteNoAttribute()
    {
        if ($this->siteNo == '' || $this->siteNo == null) {
            return '-';
        }
        foreach (config('globalvar.site_number') as $item) {
            $result = '-';
            if ($item['id'] == $this->siteNo) {
                $result = $item['name'];
                break;
            }
        }
        return $result;
    }
}
