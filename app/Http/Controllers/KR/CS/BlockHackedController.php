<?php

namespace App\Http\Controllers\KR\CS;

use App\Exceptions\InvalidOrderException;
use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\StoreBlockHackedRequest;
use App\Http\Requests\KR\CS\UpdateBlockHackedRequest;
use App\Http\Resources\KR\CS\BlockHackedResource;
use App\Models\KR\TLoginBlock;
use App\Repositories\KR\CS\BlockRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Redirect;

class BlockHackedController extends Controller
{
    protected $blockRepository;
    public function __construct(BlockRepository $blockRepository)
    {
        $this->blockRepository = $blockRepository;
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
                'member_srl' => 'int',
            ]);
            //정렬
            $sortColumn = request("sort_column", "regdate");
            $orderType = request("order_type", "desc");

            $query = TLoginBlock::with('member');
            //검색
            if (request('member_srl')) {
                $query->where("member_srl", request("member_srl"));
            }
            //appends url 파람추가
            $hacks = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia("KR/CS/Block/Hacked/Index", [
                "hacks" => BlockHackedResource::collection($hacks),
                "queryParams" => request()->query() ?: null,
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
            return inertia('KR/CS/Block/Hacked/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlockHackedRequest $request)
    {
        try {
            $data = $request->validated();
            $data['regdate'] = Carbon::now();
            $exists = TLoginBlock::where('member_srl', $data['member_srl'])->exists();
            TLoginBlock::create($data);
            return to_route('kr.cs.block.hacked.index')
                ->with('success', $data['member_srl'] . '를 차단계정으로 추가하였습니다.');
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
            $hack = TLoginBlock::with('member')->where("member_srl", $memberSrl)->firstOrFail();
            return inertia('KR/CS/Block/Hacked/Edit', [
                'hack' => new BlockHackedResource($hack),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return inertia('Errors/Default', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlockHackedRequest $request, TLoginBlock $tLoginBlock, int $memberSrl)
    {
        try {
            $postData = $request->validated();
            $tLoginBlock->where("member_srl", $memberSrl)->firstOrFail();
            $tLoginBlock->where("member_srl", $memberSrl)->update($postData);
            return to_route('kr.cs.block.hacked.edit', ['memberSrl' => $memberSrl])
                ->with('success', $memberSrl . " 계정의 정보가 수정되었습니다.");
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
            TLoginBlock::with('member')->where("member_srl", $memberSrl)->firstOrFail();
            $this->blockRepository->destroyHackedMemberSrl(['memberSrl' => $memberSrl]);
            return to_route('kr.cs.block.hacked.index')
                ->with('success', $memberSrl . "의 계정 정보가 삭제되었습니다.");
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
