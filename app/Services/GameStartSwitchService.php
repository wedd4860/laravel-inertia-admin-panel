<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;

class GameStartSwitchService
{
    protected $folder;
    protected $filePath;

    public function __construct(?string $type)
    {
        if (is_null($type) || empty($type) || !in_array($type, ['ip', 'gz', 'nx', 'lh', 'fh'])) {
            throw new \Exception('Type cannot be empty.');
        }
        $this->folder = storage_path('gamestart_switch');
        if ($type == 'ip') {
            $this->filePath = "{$this->folder}/geoip_result.txt";
        } elseif ($type == 'gz') {
            $this->filePath = "{$this->folder}/gz_result.txt";
        } elseif ($type == 'nx') {
            $this->filePath = "{$this->folder}/nx_result.txt";
        } elseif ($type == 'lh') {
            $this->filePath = "{$this->folder}/lh_result.txt";
        } elseif ($type == 'fh') {
            $this->filePath = "{$this->folder}/fh_result.txt";
        }
    }

    protected function getFilePath()
    {
        return $this->filePath;
    }

    protected function isFile()
    {
        return File::exists($this->getFilePath());
    }

    public function getFileContent()
    {
        if (!$this->isFile()) {
            return false;
        }
        return File::get($this->getFilePath());
    }

    public function setFileContent($strContent)
    {
        if (!$this->isFile()) {
            return false;
        }
        File::put($this->getFilePath(), $strContent);
    }
}
