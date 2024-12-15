<?php

namespace App\Http\Resources\KR\CS;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberExpiredResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        return [
            'member_srl' => $this->member_srl,
            'user_id' => $this->user_id,
            'user_name' => $this->user_name,
            'nick_name' => $this->nick_name,
            'email_address' => $this->email_address,
            'email_id' => $this->email_id,
            'email_host' => $this->email_host,
            'find_account_question' => $this->find_account_question,
            'find_account_answer' => $this->find_account_answer,
            'homepage' => $this->homepage,
            'blog' => $this->blog,
            'birthday' => $this->birthday ? (new Carbon($this->birthday))->format('Y-m-d') : null,
            'allow_mailing' => $this->allow_mailing,
            'allow_message' => $this->allow_message,
            'denied' => $this->denied,
            'limit_date' => $this->limit_date ? (new Carbon($this->limit_date))->format('Y-m-d') : null,
            'regdate' => (new Carbon($this->regdate))->format('Y-m-d H:i:s'),
            'last_login' => (new Carbon($this->last_login))->format('Y-m-d H:i:s'),
            'change_password_date' => $this->change_password_date,
            'is_admin' => $this->is_admin,
            'phone' => $this->extra_vars->phone ?? null,
            'auth' => isset($this->extra_vars->ci) && $this->extra_vars->ci == 88 ? 'Y' : 'N',
            'extra_vars' => $this->extra_vars,
            'list_order' => $this->list_order,
        ];
    }
}
