<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\StoreLinkLauncherRequest;
use App\Http\Requests\KR\CS\UpdateLinkLauncherRequest;
use App\Http\Resources\KR\CS\LinkLauncherResource;
use App\Models\KR\TLauncherDownload;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class LinkLauncherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'sort_column' => 'in:type',
                'order_type' => 'in:asc,desc',
                'type' => 'int',
                'version' => 'string',
                'text' => 'string',
            ]);
            //정렬
            $sortColumn = request('sort_column', 'type');
            $orderType = request('order_type', 'desc');

            $query = TLauncherDownload::query();
            //검색
            if (request('type')) {
                $query->where('type', request('type'));
            }
            if (request('version')) {
                $query->where('version', 'like', '%' . request('version') . '%');
            }
            if (request('text')) {
                $query->where('text', 'like', '%' . request('text') . '%');
            }

            //appends url 파람추가
            $launchers = $query->orderBy($sortColumn, $orderType)
                ->paginate(20)->onEachSide(1)->appends(request()->query());

            return inertia('KR/CS/Link/Launcher/Index', [
                'launchers' => LinkLauncherResource::collection($launchers),
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
            return inertia('KR/CS/Link/Launcher/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLinkLauncherRequest $request)
    {
        try {
            $data = $request->validated();
            $data['regdate'] = Carbon::now();
            TLauncherDownload::create($data);
            return to_route('kr.cs.link.launcher.index')
                ->with('success', $data['type'] . '을 런처링크에 추가하였습니다.');
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
    public function edit(int $launcherSeq)
    {
        try {
            $launcher = TLauncherDownload::where('type', $launcherSeq)->firstOrFail();
            return inertia('KR/CS/Link/Launcher/Edit', [
                'launcher' => new LinkLauncherResource($launcher),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return inertia('Errors/Default', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLinkLauncherRequest $request, int $launcherSeq)
    {
        try {
            $postData = $request->validated();
            $launcher = TLauncherDownload::where('type', $launcherSeq);
            $launcher->firstOrFail();
            $launcher->update($postData);
            return to_route('kr.cs.link.launcher.edit', ['launcherSeq' => $launcherSeq])
                ->with('success', $launcherSeq . '의 런처링크 정보가 수정되었습니다.');
        } catch (\Exception $e) {
            $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $launcherSeq)
    {
        try {
            $launcher = TLauncherDownload::where('type', $launcherSeq);
            $launcher->firstOrFail();
            $launcher->delete();
            return to_route('kr.cs.link.launcher.index')
                ->with('success', $launcherSeq . '의 런처링크 정보가 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
