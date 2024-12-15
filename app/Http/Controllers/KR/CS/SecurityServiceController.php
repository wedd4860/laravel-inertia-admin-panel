<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Resources\KR\CS\SecurityServiceResource;
use App\Models\KR\TSecurityInfo;
use App\Repositories\KR\CS\SecurityRepository;
use Illuminate\Http\Request;

class SecurityServiceController extends Controller
{
    protected $securityRepository;

    public function __construct(SecurityRepository $securityRepository)
    {
        $this->securityRepository = $securityRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:regDate',
                'order_type' => 'in:asc,desc',
                'type' => 'string',
                'memberSrl' => 'int',
                'extra_vars' => 'string',
                'user_id' => 'string',
                'email_address' => 'string',
                'nick_name' => 'string',
                'user_name' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regDate');
            $orderType = request('order_type', 'desc');
            // TSecurityInfo
            $query = TSecurityInfo::with(['member'])
            ->whereHas('member', function ($query) {
                //검색
                if (request('user_id')) {
                    $query->where('user_id', 'like', '%' . request('user_id') . '%');
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
            });

            if (request('memberSrl')) {
                $query->where('memberSrl', request('memberSrl'));
            }
            if (request('extra_vars')) {
                $query->where('extra_vars', request('extra_vars'));
            }
            if (request('type')) {
                $query->where('type', request('type'));
            } else {
                //1: OTP, 3: 전화인증, 10: 해외IP차단
                $query->whereIn('type', [1, 3, 10]);
            }
            //appends url 파람추가
            $members = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Security/Service/Index', [
                'members' => SecurityServiceResource::collection($members),
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
    public function destroy(int $memberSrl, string $type)
    {
        try {
            $iType = '';
            //1: OTP, 3: 전화인증, 10: 해외IP차단
            if ($type == 'otp') {
                $iType = 1;
            } elseif ($type == 'phone') {
                $iType = 3;
            } elseif ($type == 'ip') {
                $iType = 10;
            } else {
                throw new \Exception('잘못된 접근입니다.', 400);
            }
            TSecurityInfo::query()->where('memberSrl', $memberSrl)->firstOrFail();
            $result = $this->securityRepository->destroyServiceMemberSrl(['memberSrl' => $memberSrl, 'type' => $iType]);
            $strMsg = $memberSrl . '의 계정 정보가 삭제되었습니다.';
            if ($result != '0000') {
                $strMsg = '계정 정보삭제에 실패하였습니다. 관리자에게 문의 부탁드립니다.';
            }
            return to_route('kr.cs.security.service.index')
                ->with('success', $strMsg);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
