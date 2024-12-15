<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\StorePermissionPrimeRequest;
use App\Http\Requests\KR\CS\UpdatePermissionPrimeRequest;
use App\Http\Resources\KR\CS\PermissionPrimeResource;
use App\Models\KR\ManagingUsersType;
use App\Models\KR\Member;
use App\Models\KR\TPermissionGroup;
use App\Repositories\KR\CS\PermissionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class PermissionPrimeController extends Controller
{
    protected $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:regdate,member_srl,last_login,user_id',
                'order_type' => 'in:asc,desc',
                'member_srl' => 'int',
                'user_id' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = TPermissionGroup::with(['member'])
            ->whereHas('member', function ($query) {
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

            if (request('user_id')) {
                $query->where('user_id', 'like', '%' . request('user_id') . '%');
            }
            if (request('member_srl')) {
                $query->where('member_srl', request('member_srl'));
            }
            if (request('permission_group')) {
                $query->where('permission_group', 'like', '%' . request('permission_group') . '%');
            }
            if (request('text')) {
                $query->where('text', request('text'));
            }
            //appends url 파람추가
            $member = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Permission/Prime/Index', [
                'member' => PermissionPrimeResource::collection($member),
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
        try {
            return inertia('KR/CS/Permission/Prime/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionPrimeRequest $request)
    {
        try {
            $data = $request->validated();
            $exist = TPermissionGroup::where('member_srl', $data['member_srl'])->exists();
            if ($exist) {
                return $this->flashError(['member_srl' => '이미 등록된 회원입니다.', 'user_id' => '이미 등록된 회원입니다.']);
            }
            $strPermissionGroup = implode(',', Arr::get($data, 'permission_group', ''));
            if(Str::length($strPermissionGroup) > 20){
                return $this->flashError(['permission_group' => '등록 가능한 권한 그룹을 초과하였습니다.']);
            }
            $this->permissionRepository->insertPermissionGroup([
                'member_srl' => $data['member_srl'],
                'user_id' => $data['user_id'],
                'permission_group' => $strPermissionGroup,
                'text' => $data['text'],
            ]);
            
            ManagingUsersType::create([
                'member_srl' => $data['member_srl'],
                'type' => $data['text']
            ]);
            
            return to_route('kr.cs.permission.prime.index')
                ->with('success', $data['user_id'] . ': 해당 회원의 정보가 추가되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
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
    public function edit(int $memberSrl)
    {
        try {
            $member = TPermissionGroup::where('member_srl', $memberSrl)->firstOrFail();
            return inertia('KR/CS/Permission/Prime/Edit', [
                'member' => new PermissionPrimeResource($member),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionPrimeRequest $request, int $memberSrl)
    {
        try {
            $postData = $request->validated();
            $strPermissionGroup = implode(',', Arr::get($postData, 'permission_group', ''));
            if(Str::length($strPermissionGroup) > 20){
                return $this->flashError(['permission_group' => '등록 가능한 권한 그룹을 초과하였습니다.']);
            }
            TPermissionGroup::where('member_srl', $memberSrl)->firstOrFail();
            $this->permissionRepository->updatePermissionGroup([
                'member_srl' => $memberSrl,
                'user_id' => $postData['user_id'],
                'permission_group' => $strPermissionGroup,
                'text' => $postData['text'],
            ]);
            return to_route('kr.cs.permission.prime.edit', ['memberSrl' => $memberSrl])
                ->with('success', $memberSrl . ' 계정의 정보가 수정되었습니다.');
        } catch (\Exception $e) {
            $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $memberSrl)
    {
        try {
            if (!TPermissionGroup::where('member_srl', $memberSrl)->delete()) {
                throw new \Exception();
            }
            return to_route('kr.cs.permission.prime.index')
                ->with('success', $memberSrl . '의 관리자 정보가 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
