<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\StoreBlockPhoneRequest;
use App\Http\Resources\KR\CS\BlockPhoneResource;
use App\Models\KR\TSecurityBlockPhone;
use App\Repositories\KR\CS\BlockRepository;
use Illuminate\Http\Request;

class BlockPhoneController extends Controller
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
                'sort_column' => 'in:regDate',
                'order_type' => 'in:asc,desc',
                'phone' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regDate');
            $orderType = request('order_type', 'desc');
            $query = TSecurityBlockPhone::query();

            if (request('phone')) {
                $query->where('phone', 'like', '%' . request('phone') . '%');
            }
            //appends url 파람추가
            $phones = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Block/Phone/Index', [
                'phones' => BlockPhoneResource::collection($phones),
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
            return inertia('KR/CS/Block/Phone/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlockPhoneRequest $request)
    {
        try {
            $data = $request->validated();
            $this->blockRepository->insertPhoneSingle($data);
            return to_route('kr.cs.block.phone.index')
                ->with('success', $data['phone'] . '를 차단 전화번호로 추가하였습니다.');
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
    public function destroy(int $seq)
    {
        try {
            TSecurityBlockPhone::query()->where('seq', $seq)->firstOrFail();
            $this->blockRepository->destroyPhoneSingle(['seq' => $seq]);
            return to_route('kr.cs.block.phone.index')
                ->with('success', $seq . '의 차단 전화번호 정보가 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
