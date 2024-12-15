<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\StoreTestInfoRequest;
use App\Http\Requests\KR\CS\UpdateTestInfoRequest;
use App\Http\Resources\KR\CS\TestInfoResource;
use App\Models\KR\TTestAccount;
use App\Repositories\KR\CS\MemberRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TestInfoController extends Controller
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
                'sort_column' => 'in:regdate',
                'order_type' => 'in:asc,desc',
                'ID' => 'string',
                'nickname' => 'string',
                'birthdate' => 'date',
                'txt' => 'string',
                'creator_id' => 'string',
                'ip' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = TTestAccount::query();
            //검색
            if (request('ID')) {
                $query->where('ID', 'like', '%' . request('ID') . '%');
            }
            if (request('nickname')) {
                $query->where('nickname', 'like', '%' . request('nickname') . '%');
            }
            if (request('txt')) {
                $query->where('txt', 'like', '%' . request('txt') . '%');
            }
            if (request('creator_id')) {
                $query->where('creator_id', 'like', '%' . request('creator_id') . '%');
            }
            if (request('ip')) {
                $query->where('ip', 'like', '%' . request('ip') . '%');
            }

            //appends url 파람추가
            $members = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Member/TestInfo/Index', [
                'members' => TestInfoResource::collection($members),
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
            return inertia('KR/CS/Member/TestInfo/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTestInfoRequest $request)
    {
        try {
            $data = $request->validated();
            $exists = TTestAccount::query()->where('ID', $data['test_id'])->exists();
            if ($exists) {
                throw new \Exception('이미 존재하는 계정입니다.', 400);
            }
            $this->memberRepository->insertTestMember($data);
            return to_route('kr.cs.member.test.index')
                ->with('success', $data['test_id'] . '를 테스트 계정으로 생성하였습니다.');
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
    public function edit(string $testId)
    {
        try {
            $member = TTestAccount::query()->where('ID', $testId)->firstOrFail();
            return inertia('KR/CS/Member/TestInfo/Edit', [
                'member' => new TestInfoResource($member),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTestInfoRequest $request, string $testId)
    {
        try {
            $postData = $request->validated();
            TTestAccount::query()->where('ID', $testId)->firstOrFail();
            TTestAccount::query()->where('ID', $testId)->update($postData);
            return to_route('kr.cs.member.test.edit', ['testId' => $testId])
                ->with('success', $testId . ' 계정의 정보가 수정되었습니다.');
        } catch (\Exception $e) {
            $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $testId)
    {
        try {
            if (!TTestAccount::query()->where('ID', $testId)->delete()) {
                throw new \Exception();
            }
            return to_route('kr.cs.member.test.index')
                ->with('success', $testId . ': 해당 계정의 정보가 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
