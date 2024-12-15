<?php

namespace App\Http\Resources\KR\CS;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class BoardCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'comment_srl' => $this->comment_srl,
            'content' => Str::limit(strip_tags($this->content), 40, '...'),
            'user_id' => $this->user_id,
            'user_name' => $this->user_name,
            'nick_name' => $this->nick_name,
            'is_secret' => $this->is_secret,
            'voted_count' => $this->voted_count,
            'blamed_count' => $this->blamed_count,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
            'last_update' => (new Carbon($this->last_update))->format('Y-m-d H:i:s'),
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
