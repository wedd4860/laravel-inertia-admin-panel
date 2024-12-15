<?php

namespace App\Console\Commands;

use App\Models\KR\Documents;
use App\Models\KR\Modules;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class InitCollectInquiryStats extends Command
{
    protected $signature = 'stats:initCollectInquiry {start} {end}';
    protected $description = '특정 범위를 지정하여 문의하기 통계 파일을 생성합니다. 예제 stats:initCollectInquiry 2024-06-24 2024-07-24';
    private $moduleSrl = null;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $this->argument('start'));
        $endDate = Carbon::createFromFormat('Y-m-d', $this->argument('end'));

        // 날짜 유효성 검사
        if (!$startDate || !$endDate || $startDate->format('Y-m-d') != $this->argument('start') || $endDate->format('Y-m-d') != $this->argument('end')) {
            $this->error('문의하기 지정일 스냅샷 실패. 날짜 형식을 지켜주세요: Y-m-d');
            return false;
        }

        $modules = Modules::select(['module_srl', 'mid'])->where('mid', 'NCS_OneNOne')->first();
        $this->moduleSrl = $modules->module_srl;
        $iCountInquiry = 0;
        for ($rangeDate = $startDate; $rangeDate->lte($endDate); $rangeDate->addDay()) {
            $aInquiry = $this->getInquiry($rangeDate);
            if (count($aInquiry) === 0) {
                continue;
            }
            $iCountInquiry += count($aInquiry);
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
        $this->info("문의하기 지정일 스냅샷 완료 / {$startDate} ~ {$endDate} / 카운트({$iCountInquiry})");
    }

    private function getInquiry($date)
    {
        $documentInquiryStats = Documents::with(['documentCategories', 'documentExtraVars'])
           ->select(['document_srl', 'module_srl', 'category_srl', 'user_id', 'regdate', 'last_update', 'user_name', 'nick_name', 'status', 'comment_status'])
           ->where('last_update', '>=', $date->format('Ymd') . '000000')
           ->where('last_update', '<', ($date->copy()->addDay())->format('Ymd') . '000000')
           ->where('module_srl', $this->moduleSrl)
           ->where('status', 'PUBLIC')
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

            // faq 리뉴얼 이전 데이터 처리
            if ($strInquiryStatus == '신규') {
                if (!in_array($strAssignedManager, ['', '미배정'])) {
                    $strInquiryStatus = '처리중';
                }
                if ($documents->comment_status == 'DENY') {
                    $strInquiryStatus = '답변완료';
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
