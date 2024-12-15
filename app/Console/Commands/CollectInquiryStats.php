<?php

namespace App\Console\Commands;

use App\Models\KR\Documents;
use App\Models\KR\Modules;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class CollectInquiryStats extends Command
{
    protected $signature = 'stats:collectInquiry';
    protected $description = '현재시간의 00분 00초 이상을 확인하여 문의하기 통계 파일을 생성합니다.';

    public function handle()
    {
        $currentDate = Carbon::now();
        $aInquiry = $this->getInquiry($currentDate);
        $iCountInquiry = count($aInquiry);
        if (count($aInquiry) > 0) {
            foreach ($aInquiry as $inquiry) {
                $objRegDate = Carbon::createFromFormat('Y-m-d H:i:s', Arr::get($inquiry, 'reg_date'));
                $iYear = $objRegDate->format('Y');
                $iMonth = $objRegDate->format('m');
                $iDay = $objRegDate->format('d');
                $strYearDir = "inquiry_stats/{$iYear}";
                $strMonthDir = "inquiry_stats/{$iYear}/{$iMonth}";
                $strFilePath = "inquiry_stats/{$iYear}/{$iMonth}/{$iDay}.data";
                if (!Storage::exists($strYearDir)) {
                    Storage::makeDirectory($strYearDir);
                    chmod(storage_path("app/$strYearDir"), 0775);
                }
                if (!Storage::exists($strMonthDir)) {
                    Storage::makeDirectory($strMonthDir);
                    chmod(storage_path("app/$strMonthDir"), 0775);
                }
                Storage::append($strFilePath, serialize($inquiry));
            }
        }

        $this->info("문의하기 스냅샷 완료. 카운트 : {$iCountInquiry}");
    }

    private function getInquiry($date)
    {
        $modules = Modules::select(['module_srl', 'mid'])->where('mid', 'NCS_OneNOne')->first();
        $documentInquiryStats = Documents::with(['documentCategories', 'documentExtraVars'])
            ->select(['document_srl', 'module_srl', 'category_srl', 'user_id', 'regdate', 'last_update', 'user_name', 'nick_name', 'status'])
            ->where('last_update', '>=', $date->subHour()->format('YmdH') . '0000')
            ->where('module_srl', $modules->module_srl)
            ->get();

        $aResult = [];
        foreach ($documentInquiryStats as $documents) {
            $iKey = $documents->document_srl;
            $regDate = $documents->regdate;
            $updateDate = $documents->last_update;
            $strProduct = '';
            $strProductDesc = $documents->documentCategories->title ?? null;
            if ($strProductDesc) {
                if (in_array($strProductDesc, ['프리스톤테일'])) {
                    $strProduct = 'PT';
                } elseif (in_array($strProductDesc, ['건즈'])) {
                    $strProduct = 'GZ';
                } elseif (in_array($strProductDesc, ['콜오브카오스'])) {
                    $strProduct = 'CC';
                } elseif (in_array($strProductDesc, ['라그하임'])) {
                    $strProduct = 'LH';
                } elseif (in_array($strProductDesc, ['능력자X'])) {
                    $strProduct = 'NX';
                } elseif (in_array($strProductDesc, ['DK온라인'])) {
                    $strProduct = 'DK';
                } elseif (in_array($strProductDesc, ['모바일게임'])) {
                    $strProduct = 'MO';
                } elseif (in_array($strProductDesc, ['기타'])) {
                    $strProduct = 'ETC';
                } elseif (in_array($strProductDesc, ['출조낚시왕'])) {
                    $strProduct = 'FH';
                } elseif (in_array($strProductDesc, ['에이스온라인'])) {
                    $strProduct = 'AO';
                } elseif (in_array($strProductDesc, ['스키드러쉬'])) {
                    $strProduct = 'SR';
                }
            } else {
                $strProduct = '-';
            }
            $strInquiryType = '미분류';
            $strAssignedManager = '미배정';
            $strInquiryStatus = '신규';
            $iSatisfyRate = null;

            foreach ($documents->documentExtraVars as $extra) {
                if ($extra->eid == 'extra_vars_1') {
                    if (in_array($extra->value, ['일반', '게임 관련 문의'])) {
                        $strInquiryType = '일반';
                    } elseif (in_array($extra->value, ['건즈'])) {
                        $strInquiryType = '건의';
                    } elseif (in_array($extra->value, ['설치/접속', '실행 오류 문의'])) {
                        $strInquiryType = '설치/접속';
                    } elseif (in_array($extra->value, ['버그 및 오류', '건의/버그'])) {
                        $strInquiryType = '버그 및 오류';
                    } elseif (in_array($extra->value, ['복구 신청'])) {
                        $strInquiryType = '복구 신청';
                    } elseif (in_array($extra->value, ['결제/충전/홈페이지', '유료 결제 관련 문의', '홈페이지 관련 문의'])) {
                        $strInquiryType = '결제/충전/홈페이지';
                    } elseif (in_array($extra->value, ['청약철회/구매취소'])) {
                        $strInquiryType = '청약철회/구매취소';
                    } elseif (in_array($extra->value, ['잔액환불'])) {
                        $strInquiryType = '잔액환불';
                    } elseif (in_array($extra->value, ['계정분실/탈퇴복구'])) {
                        $strInquiryType = '계정분실/탈퇴복구';
                    } elseif (in_array($extra->value, ['불량이용자신고', '불량 이용자 신고'])) {
                        $strInquiryType = '불량이용자신고';
                    } elseif (in_array($extra->value, ['계정도용및해킹', '계정 도용 신고'])) {
                        $strInquiryType = '계정도용및해킹';
                    } elseif (in_array($extra->value, ['이관신청'])) {
                        $strInquiryType = '이관신청';
                    } else {
                        $strInquiryType = '미분류';
                    }
                }
                if ($extra->eid == 'extra_vars_3' && $extra->value != '') {
                    $strAssignedManager = $extra->value;
                }
                if ($extra->eid == 'inquiry_status') {
                    $strInquiryStatus = $extra->value;
                }
                if ($extra->eid == 'evaluation_score') {
                    $iSatisfyRate = $extra->value;
                }
            }
            $aResult[$iKey] = [
                'id' => $iKey,
                'reg_date' => Carbon::createFromFormat('YmdHis', $regDate)->format('Y-m-d H:i:s'),
                'update_date' => Carbon::createFromFormat('YmdHis', $updateDate)->format('Y-m-d H:i:s'),
                'inquiry_status' => $strInquiryStatus,
                'inquiry_type' => $strInquiryType,
                'satisfy_rate' => $iSatisfyRate,
                'assigned_manager' => $strAssignedManager,
                'product' => $strProduct,
            ];
        }
        return $aResult;
    }
}
