<?php

namespace App\Http\Resources\KR\CS;

use App\Models\KR\Member;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberRestoreResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $memberInfoResource = new MemberInfoResource($this->member);
        return [
            'member_srl' => $memberInfoResource->member_srl,
            'user_id' => $memberInfoResource->user_id,
            'user_name' => $memberInfoResource->user_name,
            'nick_name' => $memberInfoResource->nick_name,
            'email_address' => $memberInfoResource->email_address,
            'email_id' => $memberInfoResource->email_id,
            'email_host' => $memberInfoResource->email_host,
            'find_account_question' => $memberInfoResource->find_account_question,
            'find_account_answer' => $memberInfoResource->find_account_answer,
            'homepage' => $memberInfoResource->homepage,
            'blog' => $memberInfoResource->blog,
            'birthday' => $memberInfoResource->birthday ? (new Carbon($memberInfoResource->birthday))->format('Y-m-d') : null,
            'allow_mailing' => $memberInfoResource->allow_mailing,
            'allow_message' => $memberInfoResource->allow_message,
            'denied' => $memberInfoResource->denied,
            'limit_date' => $memberInfoResource->limit_date ? (new Carbon($memberInfoResource->limit_date))->format('Y-m-d') : null,
            'regdate' => (new Carbon($memberInfoResource->regdate))->format('Y-m-d H:i:s'),
            'last_login' => (new Carbon($memberInfoResource->last_login))->format('Y-m-d H:i:s'),
            'phone' => $memberInfoResource->extra_vars->phone ?? null,
            'extra_vars' => $memberInfoResource->extra_vars,
        ];
    }
}
