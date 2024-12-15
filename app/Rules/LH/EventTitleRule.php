<?php

namespace App\Rules\LH;

use App\Models\KR\TLHLevelAchievement;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EventTitleRule implements ValidationRule
{
    protected $duplicates = [];

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail) : void
    {
        $eventTitle = Carbon::parse($value)->setTimezone('Asia/Seoul')->format('Ymd');
        $eventTitleCount = TLHLevelAchievement::where('event_title', $eventTitle)->count();

        if($eventTitleCount){
            $fail("event_title", "이미 사용중인 이벤트 번호입니다.");
        }
    }
}
