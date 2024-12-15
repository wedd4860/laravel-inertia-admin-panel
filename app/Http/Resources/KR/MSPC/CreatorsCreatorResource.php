<?php

namespace App\Http\Resources\KR\MSPC;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreatorsCreatorResource extends JsonResource
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
            'seq' => $this->seq,
            'nickname' => $this->nickname,
            'member_srl' => $this->member_srl,
            'member_userid' => $this->member_userid,
            'sponsorcode' => $this->sponsorcode,
            'email' => $this->email,
            'group_seq' => $this->group_seq,
            'group_game_title' => $this->gameNameByGameid,
            'phone' => $this->phone,
            'fullname' => $this->fullname,
            'birthdate' => $this->birthdate,
            'description' => $this->description,
            'image' => $this->image,
            'status' => $this->status,
            'status_title' => $this->statusNameByStatus,
            'creators_creator_sponsorship_count' => $this->creators_creator_sponsorship_count,
            'member' => $this->member,
            'creatorGroup' => $this->creatorGroup,
        ];
    }
}
