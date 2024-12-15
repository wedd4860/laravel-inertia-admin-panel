<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

class BlockIPService
{
    protected $folder;

    public function __construct()
    {
        $this->folder = storage_path('gamestart_switch/block_ip');
    }

    protected function getFilePath(string $strIp)
    {
        $aIp = explode(".", $strIp);
        $iFirstOctet = (int) $aIp[0];

        if ($iFirstOctet <= 55) {
            return "{$this->folder}/1-55_block_ip.txt";
        } else if ($iFirstOctet <= 105) {
            return "{$this->folder}/56-105_block_ip.txt";
        } else if ($iFirstOctet <= 155) {
            return "{$this->folder}/106-155_block_ip.txt";
        } else if ($iFirstOctet <= 205) {
            return "{$this->folder}/156-205_block_ip.txt";
        } else if ($iFirstOctet <= 255) {
            return "{$this->folder}/206-255_block_ip.txt";
        } else {
            return null;
        }
    }

    // 새로운 IP를 차단 목록에 추가하는 함수
    public function addBlockedIp($ip)
    {
        $filePath = $this->getFilePath($ip);
    
        if ($filePath && !empty($ip)) {
            File::append($filePath, "{$ip}\n");
        }
    }

    // 특정 IP를 차단 목록에서 제거하는 함수
    public function removeBlockedIp($ip)
    {
        $filePath = $this->getFilePath($ip);

        if ($filePath && File::exists($filePath)) {
            $contents = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $newContents = array_filter($contents, function ($line) use ($ip) {
                return trim($line) !== $ip;
            });

            // 내용이 변경되었으면 파일을 업데이트
            if (count($contents) !== count($newContents)) {
                File::put($filePath, implode("\n", $newContents) . "\n");
            }
        }
    }

    // 전체 차단된 IP 목록을 읽는 함수
    private function getAllBlockedIps()
    {
        $files = ['1-55_block_ip.txt', '56-105_block_ip.txt', '106-155_block_ip.txt', '156-205_block_ip', '06-255_block_ip.txt'];
        $allIps = [];

        foreach ($files as $file) {
            $filePath = "{$this->folder}/{$file}";
            if (File::exists($filePath)) {
                $contents = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                $allIps = array_merge($allIps, $contents);
            }
        }
        return $allIps;
    }


    public function paginateIps($perPage, $page = null, $search = null)
    {
        $page = $page ?: (request()->get('page', 1) - 1);
        $allIps = $this->getAllBlockedIps();
        $items = new Collection($allIps);

        // 검색 쿼리가 제공된 경우 필터링
        if (!is_null($search)) {
            $items = $items->filter(function ($ip) use ($search) {
                return strpos($ip, $search) !== false;
            });
        }

        $currentPageResults = $items->slice($page * $perPage, $perPage)->all();
        $total = $items->count(); // 필터링 후의 총 아이템 수를 갱신

        return new LengthAwarePaginator($currentPageResults, $total, $perPage, $page + 1, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}
