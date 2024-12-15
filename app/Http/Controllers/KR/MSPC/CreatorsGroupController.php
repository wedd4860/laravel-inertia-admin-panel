<?php

namespace App\Http\Controllers\KR\MSPC;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\MSPC\StoreCreatorsGroupRequest;
use App\Http\Requests\KR\MSPC\UpdateCreatorsGroupRequest;
use App\Http\Resources\KR\MSPC\CreatorsGroupResource;
use App\Models\KR\CreatorGroup;
use App\Repositories\KR\MSPC\CreatorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CreatorsGroupController extends Controller
{
    protected $creatorRepository;

    public function __construct(CreatorRepository $creatorRepository)
    {
        $this->creatorRepository = $creatorRepository;
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
                'seq' => 'string',
                'name' => 'string',
                'gameid' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = CreatorGroup::query();
            if (request('seq')) {
                $query->where('seq', request('seq'));
            }
            if (request('name')) {
                $query->where('name', 'like', '%' . request('name') . '%');
            }
            if (request('gameid')) {
                $query->where('gameid', request('gameid'));
            }
            //appends url 파람추가
            $groups = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/MSPC/Creators/Group/Index', [
                'groups' => CreatorsGroupResource::collection($groups),
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
            return inertia('KR/MSPC/Creators/Group/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCreatorsGroupRequest $request)
    {
        try {
            $data = $request->validated();
            $data['regdate'] = Carbon::now();
            CreatorGroup::create($data);
            return to_route('kr.mspc.creators.group.index')
                ->with('success', $data['name'] . '의 그룹정보를 추가하였습니다.');
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
    public function edit(int $groupSeq)
    {
        try {
            $group = CreatorGroup::where('seq', $groupSeq)->firstOrFail();
            return inertia('KR/MSPC/Creators/Group/Edit', [
                'group' => new CreatorsGroupResource($group),
                'success' => session()->get('success') ?? '',
                'toast' => session()->get('toast') ?? ''
            ]);
        } catch (\Exception $e) {
            return inertia('Errors/Default', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCreatorsGroupRequest $request, int $groupSeq)
    {
        try {
            $postData = $request->validated();
            $creatorGroup = CreatorGroup::query();
            $creatorGroup->where('seq', $groupSeq)->firstOrFail();
            $strResult = $this->creatorRepository->updateGroup($postData + ['seq' => $groupSeq]);
            if ($strResult === '2627') {
                return $this->flashToast(['toast' => '같은 이름의 그룹이 존재합니다.']);
            } elseif ($strResult !== '0000') {
                return $this->flashToast(['toast' => '관리자에게 문의 부탁드립니다.']);
            }
            return to_route('kr.mspc.creators.group.edit', ['groupSeq' => $groupSeq])
                ->with('success', $groupSeq . ' 번째의 정보가 수정되었습니다.');
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
