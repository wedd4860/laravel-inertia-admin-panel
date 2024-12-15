<?php

namespace App\Rules\LH;

use App\Models\KR\TLHLevelAchievementReward;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class RewardIndexRule implements ValidationRule
{
    protected $eventIndex;

    public function __construct($eventIndex)
    {
        $this->eventIndex = $eventIndex;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail) : void
    {
        $isSelectIndex = TLHLevelAchievementReward::where('event_index', $this->eventIndex)
            ->where('reward_index', $value)->count();

        if(!$isSelectIndex){
            $fail("reward_index", "유효한 보상 INDEX가 아닙니다.");
        }
    }
}
