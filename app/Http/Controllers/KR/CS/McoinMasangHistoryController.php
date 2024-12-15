<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Resources\KR\CS\CommonArrayResource;
use App\Http\Resources\KR\CS\McoinMasangHistoryBalanceResource;
use App\Models\KR\Member;
use App\Services\BPService;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class McoinMasangHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     * balance: 잔액, usage: 사용, recharge: 충전, gift: 선물
     */
    public function show(Member $member, string $history, Request $request)
    {
        try {
            $validated = $request->validate([
                'page' => 'numeric|min:1'
            ]);
            $page = $validated['page'] ?? 1;
            $perPage = 20;  // 페이지 당 데이터 수

            $bPService = new BPService();
            $items = [];

            if (env('APP_ENV') == 'qa') {
                $globalvarBpApi = config('globalvar.bp.api.qa');
            } else {
                $globalvarBpApi = config('globalvar.bp.api.live');
            }

            if ($history == 'balance') {
                $items['masang'] = $bPService->getBalance([
                    'member_srl' => $member->member_srl,
                    'user_id' => $member->user_id,
                    'page' => $page,
                    'limit' => $perPage
                ]);
                $items['masang']['product'] = 'masang';
                foreach ($globalvarBpApi as $key => $val) {
                    $items[$key] = $bPService->getBalanceSingle([
                        'product' => $val,
                        'member_srl' => $member->member_srl,
                        'user_id' => $member->user_id,
                        'page' => $page,
                        'limit' => $perPage
                    ]);
                    $items[$key]['product'] = $key;
                }
                $result = $bPService->getResource($items, 'default', $page, $perPage, $request);
            } elseif ($history == 'recharge') {
                $items['masang'] = $bPService->getRecharge([
                    'member_srl' => $member->member_srl,
                    'user_id' => $member->user_id,
                    'page' => 1,
                    'limit' => 20
                ]);
                $items['masang']['product'] = 'masang';
                $result = $bPService->getResource($items, 'page', $page, $perPage, $request);
            } elseif ($history == 'usage') {
                //test id : xhrlakdhkd
                $items['masang'] = $bPService->getUsage([
                    'member_srl' => $member->member_srl,
                    'user_id' => $member->user_id,
                    'page' => $page,
                    'limit' => $perPage
                ]);
                $items['masang']['product'] = 'masang';
                $result = $bPService->getResource($items, 'page', $page, $perPage, $request);
            } elseif ($history == 'gift') {
                $items['masang'] = $bPService->getGift([
                    'member_srl' => $member->member_srl,
                    'user_id' => $member->user_id,
                    'page' => $page,
                    'limit' => $perPage
                ]);
                $items['masang']['product'] = 'masang';
                $result = $bPService->getResource($items, 'page', $page, $perPage, $request);
            } else {
                throw new \Exception('잘못된 접근입니다.');
            }
            $strFrontComponent = 'KR/CS/Mcoin/Masang/' . ucfirst($history);
            return inertia($strFrontComponent, [
                'items' => $result,
                'queryParams' => request()->query() ?: null,
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
