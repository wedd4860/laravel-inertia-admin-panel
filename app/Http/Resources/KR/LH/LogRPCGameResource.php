<?php

namespace App\Http\Resources\KR\LH;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class LogRPCGameResource extends JsonResource
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
            'tgl_idx' => $this->tgl_idx,
            'tgl_tgi_idx' => $this->tgl_tgi_idx,
            'tgl_monster_code' => $this->tgl_monster_code,
            'tgl_game_result1' => $this->getRPCIGameInfo($this->tgl_game_result1),
            'tgl_game_result2' => $this->getRPCIGameResult($this->tgl_game_result2),
            'tgl_purchase_item' => $this->getRPCIGameReward($this->tgl_purchase_item),
            'tgl_purchase_item2' => $this->tgl_purchase_item2,
            'tgl_game_date' => (new Carbon($this->tgl_game_date))->format('Y-m-d H:i:s'),
            'tgl_security_code' => $this->tgl_security_code,
            'tgl_user_code' => $this->tgl_user_code,
            'tgl_game_cnt' => $this->tgl_game_cnt,
            'tgi_idx' => $this->logTossInfo != null ? $this->logTossInfo->tgi_idx : null,
            'tgi_user_code' => $this->logTossInfo != null ? $this->logTossInfo->tgi_user_code : null,
            'tgi_user_idname' => $this->logTossInfo != null ? $this->logTossInfo->tgi_user_idname : null,
            'tgi_svr_code' => $this->logTossInfo != null ? $this->logTossInfo->tgi_svr_code : null,
            'tgi_char_code' => $this->logTossInfo != null ? $this->logTossInfo->tgi_char_code : null,
            'tgi_char_name' => $this->logTossInfo != null ? $this->logTossInfo->tgi_char_name : null,
            'tgi_char_race' => $this->logTossInfo != null ? $this->logTossInfo->tgi_char_race : null,
            'tgi_win_cnt' => $this->logTossInfo != null ? $this->logTossInfo->tgi_win_cnt : null,
            'tgi_draw_cnt' => $this->logTossInfo != null ? $this->logTossInfo->tgi_draw_cnt : null,
            'tgi_lose_cnt' => $this->logTossInfo != null ? $this->logTossInfo->tgi_lose_cnt : null,
            'tgi_win_point' => $this->logTossInfo != null ? $this->logTossInfo->tgi_win_point : null,
            'tgi_consecutive_win_cnt' => $this->logTossInfo != null ? $this->logTossInfo->tgi_consecutive_win_cnt : null,
            'tgi_max_consecutive_win_cnt' => $this->logTossInfo != null ? $this->logTossInfo->tgi_max_consecutive_win_cnt : null,
            'tgi_last_game_date' => $this->logTossInfo != null ? (new Carbon($this->logTossInfo->tgi_last_game_date))->format('Y-m-d H:i:s') : null,
            'tgi_last_consecutive_win_date' => $this->logTossInfo != null ? (new Carbon($this->logTossInfo->tgi_last_consecutive_win_date))->format('Y-m-d H:i:s') : null,
        ];
    }

    private function getRPCIGameInfo($strGameInfo): string | null
    {
        if (!$strGameInfo) {
            return null;
        }
        try {
            switch($strGameInfo){
                case "SCWC":return "사용자: 가위, 컴퓨터: 보"; break;
                case "SCST":return "사용자: 가위, 컴퓨터: 바위"; break;
                case "STSC":return "사용자: 바위, 컴퓨터: 가위"; break;
                case "STWC":return "사용자: 바위, 컴퓨터: 보"; break;
                case "WCST":return "사용자: 보, 컴퓨터: 바위"; break;
                case "WCSC":return "사용자: 보, 컴퓨터: 가위"; break;
                case "SCSC":return "사용자: 가위, 컴퓨터: 가위"; break;
                case "STST":return "사용자: 바위, 컴퓨터: 바위"; break;
                case "WCWC":return "사용자: 보, 컴퓨터: 보"; break;
                default : return ""; break;
            }
        } catch (\Exception $e) {
            return null;
        }
    }

    private function getRPCIGameResult($strGameResult): string | null
    {
        if (!$strGameResult) {
            return null;
        }
        try {
            switch($strGameResult){
                case "WI":return "승"; break;
                case "LO":return "패"; break;
                case "DR":return "무"; break;
                default : return ""; break;
            }
        } catch (\Exception $e) {
            return null;
        }
    }

    private function getRPCIGameReward($strGameReward): string | null
    {
        if (!$strGameReward) {
            return null;
        }
        try {
            switch($strGameReward){
                case "ST":return "행복 가득 충전 (25Pack)"; break;
                case "DS":return "행복 가득 충전 (25Pack) + 가위바위보 교환권"; break;
                case "WC":return "행복 충전 (25Pack)"; break;
                case "WS":return "행복 충전 (25Pack) + 가위바위보 교환권"; break;
                case "LI":return ""; break;
                default : return ""; break;
            }
        } catch (\Exception $e) {
            return null;
        }
    }
}
