<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Resources\KR\CS\McoinMasangResource;
use App\Models\KR\Member;
use Illuminate\Http\Request;

class McoinMasangController extends Controller
{
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
                'user_name' => 'string'
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = Member::query();
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

            //appends url 파람추가
            $members = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Mcoin/Masang/Index', [
                'members' => McoinMasangResource::collection($members),
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
    public function destroy(string $id)
    {
        //
    }
}
