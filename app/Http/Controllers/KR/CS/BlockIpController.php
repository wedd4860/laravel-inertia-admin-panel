<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\DeleteBlockIpRequest;
use App\Http\Requests\KR\CS\StoreBlockIpRequest;
use App\Http\Resources\KR\CS\BlockIpResource;
use Illuminate\Http\Request;
use App\Services\BlockIPService;

class BlockIpController extends Controller
{
    protected $blockIPService;

    public function __construct(BlockIPService $blockIPService)
    {
        $this->blockIPService = $blockIPService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $request->validate([
                'ipaddress' => 'string',
            ]);
            $blockedIps = $this->blockIPService->paginateIps(20, null, request('ipaddress'));
            return inertia('KR/CS/Block/Ip/Index', [
                'ips' => BlockIpResource::collection($blockedIps),
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
            return inertia('KR/CS/Block/Ip/Create', []);
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlockIpRequest $request)
    {
        try {
            $data = $request->validated();
            $strIp = $data['ipaddress'];
            $this->blockIPService->addBlockedIp($strIp);
            return to_route('kr.cs.block.ip.index')
                ->with('success', $strIp . ': 해당 IP의 정보가 추가되었습니다.');
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
    public function edit()
    {
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
    public function destroy(string $ipaddress)
    {
        try {
            $this->blockIPService->removeBlockedIp($ipaddress);
            return to_route('kr.cs.block.ip.index')
                ->with('success', $ipaddress . ': 해당 IP의 정보가 삭제되었습니다.');
        } catch (\Exception $e) {
            return $this->error($e->getCode(), $e->getMessage());
        }
    }
}
