<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Resources\KR\CS\BoardDocumentsResource;
use App\Models\KR\Documents;
use Illuminate\Http\Request;
use ReflectionClass;

class BoardDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:document_srl,regdate,last_update',
                'order_type' => 'in:asc,desc',
                'document_srl' => 'int',
                'user_id' => 'string',
                'is_notice' => 'in:Y,N',
                'title_bold' => 'in:Y,N',
                'title_color' => 'in:Y,N',
                'is_notice' => 'in:Y,N',
                'user_name' => 'string',
                'nick_name' => 'string',
                'last_updater' => 'string',
                'title' => 'string',
                'content' => 'string',
                'status' => 'in:SECRET,PUBLIC,TEMP',
                'comment_status' => 'in:ALLOW,DENY',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'regdate');
            $orderType = request('order_type', 'desc');

            $query = Documents::query();
            $isSearch = false;
            //검색
            if (request('document_srl')) {
                $query->where('document_srl', request('document_srl'));
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
            if (request('last_updater')) {
                $query->where('last_updater', 'like', '%' . request('last_updater') . '%');
            }
            if (request('is_notice')) {
                $query->where('is_notice', request('is_notice'));
            }
            if (request('title_bold')) {
                $query->where('title_bold', request('title_bold'));
            }
            if (request('title_color')) {
                $query->where('title_color', request('title_color'));
            }
            if (request('document_srl')) {
                $query->where('document_srl', request('document_srl'));
            }
            if (request('title')) {
                $query->where('title', 'like', '%' . request('title') . '%');
            }
            if (request('status')) {
                $query->where('status', request('status'));
            }
            if (request('comment_status')) {
                $query->where('comment_status', request('comment_status'));
            }

            if (request('content')) {
                $isSearch = true;
                $documents = Documents::search(request('content'));
            }

            if ($isSearch) {
                $documents = $documents->paginate(20)->appends('query', null)->appends(request()->query());
            } else {
                //appends url 파람추가
                $documents = $query->orderBy($sortColumn, $orderType)
                    ->paginate(20)->onEachSide(1)->appends(request()->query());
            }
            return inertia('KR/CS/Board/Document/Index', [
                'documents' => BoardDocumentsResource::collection($documents),
                'queryParams' => request()->query() ?: null,
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
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
