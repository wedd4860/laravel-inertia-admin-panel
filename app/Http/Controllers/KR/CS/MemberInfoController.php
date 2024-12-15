<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\LeaveMemberRecoverRequest;
use App\Http\Requests\KR\CS\UpdateMemberInfoRequest;
use App\Http\Resources\KR\CS\MemberInfoResource;
use App\Repositories\KR\CS\MemberRepository;
use App\Library\MasangConfig;
use App\Models\KR\Member;
use App\Models\KR\MemberLoginDeviceSwitch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use App\Services\DirectSendMailService;

class MemberInfoController extends Controller
{
    protected $memberRepository;

    public function __construct(MemberRepository $memberRepository)
    {
        $this->memberRepository = $memberRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:regdate,member_srl,last_login',
                'order_type' => 'in:asc,desc',
                'user_id' => 'string',
                'member_srl' => 'int',
                'email_address' => 'string',
                'nick_name' => 'string',
                'user_name' => 'string',
                'denied' => 'in:Y,N'
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = Member::with('memberLoginDeviceSwitch');
            //검색
            if (request('user_id')) {
                $query->where('user_id', 'like', '%' . request('user_id') . '%');
            }
            if (request('member_srl')) {
                $query->where('member_srl', request('member_srl'));
            }
            if (request('email_address')) {
                $query->where('email_address', 'like', '%' . request('email_address') . '%');
            }
            if (request('nick_name')) {
                $query->where('nick_name', 'like', '%' . request('nick_name') . '%');
            }
            if (request('user_name')) {
                $query->where('user_name', 'like', '%' . request('user_name') . '%');
            }
            if (request('denied')) {
                $query->where('denied', request('denied'));
            }

            //appends url 파람추가
            $members = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Member/Info/Index', [
                'members' => MemberInfoResource::collection($members),
                'queryParams' => request()->query() ?: null,
                'success' => session()->get('success') ?? ''
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
    public function edit(Member $member)
    {
        try {
            return inertia('KR/CS/Member/Info/Edit', [
                'member' => new MemberInfoResource($member),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemberInfoRequest $request, Member $member)
    {
        try {
            $postData = $request->validated();

            if (Arr::get($postData, 'member_login_device_switch')) {
                MemberLoginDeviceSwitch::updateOrCreate([
                    'member_srl' => $member->member_srl,
                ], [
                    'member_srl' => $member->member_srl,
                    'switch' => $postData['member_login_device_switch'],
                    'regdate' => Carbon::now()
                ]);
                unset($postData['member_login_device_switch']);
            }
            //패스워드 처리
            if (is_null($postData['password'])) {
                unset($postData['password']);
            } else {
                $postData['password'] = MasangConfig::sha2Enc($postData['password']);
                $postData['chang_password_date'] = (Carbon::now()->setTimezone('Asia/Seoul'))->format('YmdHis');
            }

            if (!is_null($postData['limit_date'])) {
                $postData['limit_date'] = (Carbon::parse($postData['limit_date'])->setTimezone('Asia/Seoul'))->format('YmdHis');
            }

            if (!is_null($postData['birthday'])) {
                $postData['birthday'] = (Carbon::parse($postData['birthday'])->setTimezone('Asia/Seoul'))->format('Ymd');
            }
            $member->update($postData);
            return to_route('kr.cs.member.info.edit', ['member' => $member])
                ->with('success', $member->member_srl . ' 계정의 정보가 수정되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function leave(LeaveMemberRecoverRequest $request, int $memberSrl)
    {
        try {
            $strMessage = '탈퇴요청이 실패하였습니다. 관리자에게 문의 바랍니다.';
            $user = Auth::user();
            $returnCode = $this->memberRepository->updateLeaveMemberById($memberSrl);

            if ($returnCode == '0000') {
                //탈퇴 요청 로그 남기기
                $this->memberRepository->insertLogLeaveMember([
                    'memberSrl' => $memberSrl,
                    'adminSrl' => $user->member_srl
                ]);
                $strMessage = $memberSrl . ' 계정 번호의 정보를 탈퇴요청 하였습니다.';
            } elseif ($returnCode == '0001') {
                $strMessage = '이미 탈퇴요청 되어있습니다.';
            }

            return to_route('kr.cs.member.info.index')
                ->with('success', $strMessage);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
