<?php

namespace App\Http\Controllers\KR\MSPC;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\MSPC\StoreCreatorsCreatorRequest;
use App\Http\Resources\KR\MSPC\CreatorsCreatorResource;
use App\Http\Resources\KR\MSPC\CreatorsGroupResource;
use App\Models\KR\CreatorGroup;
use App\Models\KR\Creators;
use App\Repositories\KR\MSPC\CreatorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CreatorsCreatorController extends Controller
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
                'memberUserid' => 'string',
                'groupGameid' => 'string',
                'groupName' => 'string',
                'nickname' => 'string',
                'phone' => 'string',
                'email' => 'string',
                'sponsorcode' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'seq');
            $orderType = request('order_type', 'desc');

            $query = Creators::with(['creatorGroup', 'member'])
                ->whereHas('member', function ($query) {
                    $query->whereNotNull('member_srl');
                })
                ->whereHas('creatorGroup', function ($query) {
                    if (request('gameid')) {
                        $query->where('gameid', request('gameid'));
                    }
                    if (request('groupName')) {
                        $query->where('name', 'like', '%' . request('groupName') . '%');
                    }
                })
                ->withCount(['creatorsCreatorSponsorship' => function ($query) {
                    $query->where('status', 1);
                }]);

            if (request('memberUserid')) {
                $query->where('member_userid', 'like', '%' . request('memberUserid') . '%');
            }
            if (request('nickname')) {
                $query->where('nickname', 'like', '%' . request('nickname') . '%');
            }
            if (request('phone')) {
                $query->where('phone', request('phone'));
            }
            if (request('email')) {
                $query->where('email', 'like', '%' . request('email') . '%');
            }
            if (request('sponsorcode')) {
                $query->where('sponsorcode', 'like', '%' . request('sponsorcode') . '%');
            }
            //appends url 파람추가
            $creators = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());
            return inertia('KR/MSPC/Creators/Creator/Index', [
                'creators' => CreatorsCreatorResource::collection($creators),
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
        try {
            $aGroup = CreatorGroup::where('enddate', '>', Carbon::now())->get();
            return inertia('KR/MSPC/Creators/Creator/Create', [
                'groups' => CreatorsGroupResource::collection($aGroup),
                'success' => session()->get('success') ?? '',
                'toast' => session()->get('toast') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCreatorsCreatorRequest $request)
    {
        try {
            $postData = $request->validated();
            $group = CreatorGroup::where('seq', $postData['creator_group'])->firstOrFail();
            $result = $this->creatorRepository->insertCreator(
                [
                    'nickname' => $postData['nickname'],
                    'member_userid' => $postData['member_userid'],
                    'phone' => $postData['phone'],
                    'email' => $postData['email'],
                    'sponsorcode' => $postData['sponsorcode'],
                    'creator_fullName' => null,
                    'creator_birthDate' => null,
                    'creator_desc' => null,
                    'creator_img' => null,
                    'creator_game_id' => $group->gameid,
                    'creator_group' => $postData['creator_group'],
                ]
            );

            if ($result == '0001') {
                return $this->flashError(['member_userid' => '잘못된 마상ID 입니다.']);
            } elseif ($result == '0002') {
                return $this->flashError(['member_userid' => '마상ID 또는 후원코드가 이미 등록되었습니다.', 'sponsorcode' => '마상ID 또는 후원코드가 이미 등록되었습니다.']);
            } elseif ($result == '0003') {
                return $this->flashError(['creator_group' => '마상ID 또는 후원코드가 이미 등록되었습니다.', 'sponsorcode' => '마상ID 또는 후원코드가 이미 등록되었습니다.']);
            } elseif ($result == '0004') {
                return $this->flashError(['creator_group' => '그룹 데이터가 정상적이지 않습니다.']);
            } elseif ($result != 'SUCC') {
                return $this->flashToast(['toast' => '크리에이터 추가에 문제가 발생하였습니다. 관리자에게 문의 부탁드립니다.']);
            }

            return to_route('kr.mspc.creators.creator.index')
                ->with('success', $postData['nickname'] . '의 크리에이터 정보를 추가하였습니다.');
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
    public function destroy(string $id)
    {
        //
    }
}
