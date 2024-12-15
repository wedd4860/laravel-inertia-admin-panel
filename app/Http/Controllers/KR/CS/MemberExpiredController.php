<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\KR\CS\UpdateMemberExpiredRequest;
use App\Http\Resources\KR\CS\MemberExpiredResource;
use App\Library\MasangConfig;
use App\Models\KR\MemberExpired;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MemberExpiredController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:regdate',
                'order_type' => 'in:asc,desc',
                'user_id' => 'string',
                'member_srl' => 'int',
                'email_address' => 'string',
                'nick_name' => 'string',
                'user_name' => 'string',
                'denied' => 'in:Y,N'
            ]);

            //정렬
            $sortColumn = request("sort_column", "regdate");
            $orderType = request("order_type", "desc");

            $query = MemberExpired::query();
            //검색
            if (request('user_id')) {
                $query->where("user_id", "like", "%" . request('user_id') . "%");
            }
            if (request('member_srl')) {
                $query->where("member_srl", request("member_srl"));
            }
            if (request('email_address')) {
                $query->where("email_address", "like", "%" . request('email_address') . "%");
            }
            if (request('nick_name')) {
                $query->where("nick_name", "like", "%" . request('nick_name') . "%");
            }
            if (request('user_name')) {
                $query->where("user_name", "like", "%" . request('user_name') . "%");
            }
            if (request('denied')) {
                $query->where("denied", request("denied"));
            }

            //appends url 파람추가
            $members = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia("KR/CS/Member/Expired/Index", [
                "members" => MemberExpiredResource::collection($members),
                "queryParams" => request()->query() ?: null,
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
    public function edit(MemberExpired $member)
    {
        try {
            return inertia('KR/CS/Member/Expired/Edit', [
                'member' => new MemberExpiredResource($member),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemberExpiredRequest $request, MemberExpired $member)
    {
        try {
            $postData = $request->validated();
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
            return to_route('kr.cs.member.expired.edit', ['member' => $member->member_srl])
                ->with('success', $member->member_srl . " 휴먼계정의 정보가 수정되었습니다.");
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
}
