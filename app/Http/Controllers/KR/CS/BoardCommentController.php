<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Resources\KR\CS\BoardCommentResource;
use App\Models\KR\Comments;
use Illuminate\Http\Request;

class BoardCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:comment_srl,regdate,last_update',
                'order_type' => 'in:asc,desc',
                'comment_srl' => 'int',
                'user_id' => 'string',
                'user_name' => 'string',
                'nick_name' => 'string',
                'is_secret' => 'in:Y,N',
                'last_updater' => 'string',
                'content' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = Comments::query();
            //검색
            if (request('comment_srl')) {
                $query->where('comment_srl', request('comment_srl'));
            }
            if (request('user_id')) {
                $query->where('user_id', 'like', '%' . request('user_id') . '%');
            }
            if (request('user_name')) {
                $query->where('user_name', 'like', '%' . request('user_name') . '%');
            }
            if (request('nick_name')) {
                $query->where('nick_name', 'like', '%' . request('nick_name') . '%');
            }
            if (request('is_secret')) {
                $query->where('is_secret', request('is_secret'));
            }
            if (request('last_updater')) {
                $query->where('last_updater', 'like', '%' . request('last_updater') . '%');
            }
            if (request('content')) {
                $query->where('content', 'like', '%' . request('content') . '%');
            }

            //appends url 파람추가
            $comments = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Board/Comment/Index', [
                'comments' => BoardCommentResource::collection($comments),
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
