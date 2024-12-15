<?php

namespace App\Http\Controllers\KR\MSPC;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\MSPC\UpdateCreatorsDecisionCreatorRequest;
use App\Models\KR\Creators;
use App\Repositories\KR\MSPC\CreatorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreatorsCreatorDecisionController extends Controller
{
    protected $creatorRepository;

    public function __construct(CreatorRepository $creatorRepository)
    {
        $this->creatorRepository = $creatorRepository;
    }

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
     */
    public function show(string $id)
    {
        //
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
    public function update(UpdateCreatorsDecisionCreatorRequest $request, int $creatorSeq, string $type)
    {
        try {
            $creator = Creators::where('seq', $creatorSeq)->firstOrFail();
            // 상태값 승인:1, 대기:0
            $iStatus = 0;
            $strMsg = '';
            if ($type == 'cancel') {
                $iStatus = 0;
                $strMsg = '승인을 취소하였습니다.';
            } elseif ($type == 'approve') {
                $iStatus = 1;
                $strMsg = '심사를 승인하였습니다.';
            }
            $result = $this->creatorRepository->updateCreatorStatus(
                [
                    'creators_seq' => $creatorSeq,
                    'review_user_id' => Auth::user()->user_id,
                    'review_comment' => '',
                    'creator_status' => $iStatus,
                ]
            );
            if ($result != 'SUCC') {
                return $this->flashToast(['toast' => '크리에이터 심사에 문제가 발생하였습니다. 관리자에게 문의 부탁드립니다.']);
            }

            return to_route('kr.mspc.creators.creator.index')
                ->with('success', $creator->nickname . '의 크리에이터 ' . $strMsg);
        } catch (\Exception $e) {
            $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
