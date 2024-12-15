<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class BoardDocumentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'document_srl' => $this->document_srl,
            'title' => $this->title,
            'content' => Str::limit(strip_tags($this->content), 40, '...'),
            'user_id' => $this->user_id,
            'user_name' => $this->user_name,
            'nick_name' => $this->nick_name,
            'ipaddress' => $this->ipaddress,
            'is_notice' => $this->is_notice,
            'title_bold' => $this->title_bold,
            'title_color' => $this->title_color,
            'readed_count' => $this->readed_count,
            'voted_count' => $this->voted_count,
            'blamed_count' => $this->blamed_count,
            'comment_count' => $this->comment_count,
            'trackback_count' => $this->trackback_count,
            'uploaded_count' => $this->uploaded_count,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
            'last_update' => (new Carbon($this->last_update))->format('Y-m-d H:i:s'),
            'last_updater' => $this->last_updater,
            'ipaddress' => $this->ipaddress,
            'readed_count' => $this->readed_count,
            'status' => $this->status,
            'comment_status' => $this->comment_status,
            'document_link' => $this->getDocumentLink($this->document_srl)
        ];
    }

    public function getDocumentLink($document_srl)
    {
        if (!$document_srl) {
            return '#';
        }

        $strKrUrl = config('globalvar.url.qa.kr');
        if (env('APP_ENV') == 'qa') {
            $strKrUrl = config('globalvar.url.qa.kr');
        } elseif (env('APP_ENV') == 'live') {
            $strKrUrl = config('globalvar.url.live.kr');
        }
        return $strKrUrl . '/' . $document_srl;
    }
}
