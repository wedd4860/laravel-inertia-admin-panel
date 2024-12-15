<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Resources\KR\CS\SecurityPCResource;
use App\Models\KR\TAppointPCInfo;
use App\Repositories\KR\CS\SecurityRepository;
use Illuminate\Http\Request;

class SecurityPCRegisterController extends Controller
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
                'memberSrl' => 'int',
                'pcname' => 'string',
                'user_id' => 'string',
                'email_address' => 'string',
                'nick_name' => 'string',
                'user_name' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regDate');
            $orderType = request('order_type', 'desc');
            $query = TAppointPCInfo::with(['member'])
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
            if (request('pcname')) {
                $query->where('pcname', 'like', '%' . request('pcname') . '%');
            }
            //appends url 파람추가
            $members = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Security/PC/Index', [
                'members' => SecurityPCResource::collection($members),
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
    public function destroy(int $memberSrl, string $pcname)
    {
        try {
            TAppointPCInfo::query()->where('memberSrl', $memberSrl)->firstOrFail();
            $this->securityRepository->destroyPCMemberSrl(['memberSrl' => $memberSrl, 'pcname' => $pcname]);
            return to_route('kr.cs.security.pc.index')
                ->with('success', $memberSrl . '의 계정 정보가 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
