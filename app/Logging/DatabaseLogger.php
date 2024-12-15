<?php

namespace App\Logging;

use Psr\Log\LoggerInterface;
use Illuminate\Support\Facades\DB;
use Monolog\Logger;

class DatabaseLogger
{
    public function __invoke(array $config): Logger
    {
        return new Logger(
            'db',
            [
                new DatabaseHandler(),
            ]
        );
    }
}
