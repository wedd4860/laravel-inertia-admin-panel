<?php

namespace App\Http\Controllers\KR\MSPC;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\MSPC\UpdateCreatorsSponsorshipRequest;
use App\Http\Resources\KR\MSPC\CreatorsSponsorshipResource;
use App\Models\KR\Creators;
use App\Models\KR\CreatorSponsorship;
use App\Repositories\KR\MSPC\CreatorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class CreatorsSponsorshipController extends Controller
{
    protected $creatorRepository;

    public function __construct(CreatorRepository $creatorRepository)
    {
        $this->creatorRepository = $creatorRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, int $creatorSeq)
    {
        try {
            $request->validate([
                'sort_column' => 'in:startdate',
                'order_type' => 'in:asc,desc',
                'creatorName' => 'string',
                'creatorUserId' => 'string',
                'sponsorshipUserId' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'seq');
            $orderType = request('order_type', 'desc');

            $query = CreatorSponsorship::where('creators_seq', $creatorSeq)
                ->where('status', 1)
                ->with(['creators', 'member'])
                ->whereHas('member', function ($query) {
                });
            //appends url 파람추가
            $sponsorships = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());
            if (!$sponsorships->isEmpty() && isset($sponsorships->items()[0])) {
                $creator = $sponsorships->items()[0]['creators'];
            } else {
                $creator = Creators::where('seq', $creatorSeq)->first();
            };
            // dd(session());
            return inertia('KR/MSPC/Creators/Creator/Sponsorship', [
                'creator' => $creator,
                'sponsorships' => CreatorsSponsorshipResource::collection($sponsorships),
                'queryParams' => request()->query() ?: null,
                'success' => session()->get('success') ?? '',
                'toast' => session()->get('toast') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
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
    public function update(UpdateCreatorsSponsorshipRequest $request, int $sponsorshipSeq, string $type)
    {
        try {
            $sponsorship = CreatorSponsorship::where('seq', $sponsorshipSeq)->firstOrFail();
            // 상태값 승인:1, 대기:0
            $iStatus = 0;
            $strMsg = '';
            if ($type == 'cancel') {
                $iStatus = 0;
                $strMsg = '후원을 취소하였습니다.';
            } elseif ($type == 'approve') {
                $iStatus = 1;
                $strMsg = '후원을 진행합니다.';
            }

            $result = $this->creatorRepository->updateSponsorshipStatus(
                [
                    'sponsor_seq' => $sponsorshipSeq,
                    'admin_id' => Auth::user()->user_id,
                    'sponsor_status' => $iStatus,
                ]
            );
            if ($result != 'SUCC') {
                return $this->flashToast(['toast' => '후원취소/진행에 문제가 발생하였습니다. 관리자에게 문의 부탁드립니다.']);
            }
            return to_route('kr.mspc.creators.sponsorship.index', [
                'creatorSeq' => $sponsorship->creators_seq
            ])
                ->with('success', $sponsorship->member_srl . '스폰서가 ' . $strMsg);
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
