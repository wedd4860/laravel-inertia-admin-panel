<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Resources\KR\CS\LogAuthenticationResource;
use App\Models\KR\LMspCertify;
use Illuminate\Http\Request;

class LogAuthenticationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:certDate,regdate,reqNum',
                'order_type' => 'in:asc,desc',
                'name' => 'string',
                'birthday' => 'int',
                'sex' => 'in:F,M',
                'result' => 'in:Y,N',
                'certGb' => 'in:H,ipin,IPIN',
                'cellNo' => 'string',
                'ip' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = LMspCertify::query();
            //검색
            if (request('name')) {
                $query->where('name', 'like', '%' . request('name') . '%');
            }
            if (request('birthday')) {
                $query->where('birthday', request('birthday'));
            }
            if (request('sex')) {
                $query->where('sex', request('sex'));
            }
            if (request('result')) {
                $query->where('result', request('result'));
            }
            if (request('certGb')) {
                $query->where('certGb', request('certGb'));
            }
            if (request('cellNo')) {
                $query->where('cellNo', 'like', '%' . request('cellNo') . '%');
            }
            if (request('ip')) {
                $query->where('ip', 'like', '%' . request('ip') . '%');
            }

            //appends url 파람추가
            $members = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Log/Authentication/Index', [
                'members' => LogAuthenticationResource::collection($members),
                'queryParams' => request()->query() ?: null,
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
