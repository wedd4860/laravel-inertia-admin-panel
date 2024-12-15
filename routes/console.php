<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;

/*
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->everyMinute()->timezone('Asia/Seoul')
*/

Schedule::command('stats:collectInquiry')
    ->hourly()->timezone('Asia/Seoul')
    ->before(function () {
        Log::info('start : stats:collectInquiry');
    })
    ->after(function () {
        Log::info('completed : stats:collectInquiry');
    });

Schedule::command('sout:import "App\Models\KR\Documents"')
    ->dailyAt('01:10')->timezone('Asia/Seoul')
    ->before(function () {
        Log::info('start : scout App\Models\KR\Documents');
    })
    ->after(function () {
        Log::info('completed : scout App\Models\KR\Documents');
    });
