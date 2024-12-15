<?php

namespace App\Rules\LH;

use App\Models\KR\TLHEventItemGiveList;
use App\Models\KR\TLHLevelAchievementReward;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AttendRewardRule implements ValidationRule
{
    public function __construct()
    {
        //
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail) : void
    {
        $attendReward = TLHEventItemGiveList::query();
        if($attribute == 'day'){
            $attendReward = $attendReward->where('day', $value)->count();
        }else if($attribute == 'itemSequence'){
            $attendReward = $attendReward->where('itemSequence', $value)->count();
        }

        if($attendReward){
            if($attribute == 'day'){
                $msg = "이미 사용된 순번입니다.";
            }else if($attribute == 'itemSequence'){
                $msg = "이미 사용된 아이템 시퀀스 코드입니다.";
            }
            $fail($attribute, $msg);
        }
    }
}
