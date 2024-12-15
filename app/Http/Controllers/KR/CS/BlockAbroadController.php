<?php

namespace App\Http\Controllers\KR\CS;

use App\Http\Controllers\Controller;
use App\Http\Requests\KR\CS\UpdateBlockAbroadRequest;
use App\Http\Resources\KR\CS\CommonArrayResource;
use App\Services\GameStartSwitchService;
use Illuminate\Http\Request;

class BlockAbroadController extends Controller
{
    public function show()
    {
        try {
            $gameStartSwitchService = new GameStartSwitchService('ip');
            $iServiceStatus = $gameStartSwitchService->getFileContent();
            if ($gameStartSwitchService->getFileContent() === false) {
                throw new \Exception('파일에러: 관리자에게 문의 부탁드립니다.', 400);
            }
            $abroad = ['status' => '-'];
            if ($iServiceStatus === '0') {
                $abroad = ['status' => 'OFF'];
            } elseif ($iServiceStatus === '1') {
                $abroad = ['status' => 'ON'];
            }
            return inertia('KR/CS/Block/Abroad/Show', [
                'abroad' => collect($abroad),
                'success' => session()->get('success') ?? ''
            ]);
        } catch (\Exception $e) {
            return inertia('Errors/Default', ['code' => $e->getCode(), 'message' => $e->getMessage()]);
        }
    }

    public function update(UpdateBlockAbroadRequest $request)
    {
        try {
            $postData = $request->validated();
            $iStatus = 0;
            if ($postData['status'] == 'OFF') {
                $iStatus = 1;
            }
            $gameStartSwitchService = new GameStartSwitchService('ip');
            $gameStartSwitchService->setFileContent($iStatus);
            return to_route('kr.cs.block.abroad.show')
                ->with('success', '해외 IP 접근제한 상태를 변경하였습니다.');
        } catch (\Exception $e) {
            $this->error($e->getCode(), $e->getMessage());
        }
    }
}
