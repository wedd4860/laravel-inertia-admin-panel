<?php

namespace App\Logging;

use App\Models\KR\LCtrlhubActivity;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\LogRecord;

class DatabaseHandler extends AbstractProcessingHandler
{
    protected function write(LogRecord $record): void
    {
        LCtrlhubActivity::create($record->context);
    }
}
