<?php

namespace App\Rules\LH;

use App\Models\KR\TLHLevelAchievementSelectedCharacter;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SelectIndexRule implements ValidationRule
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
        $isSelectIndex = TLHLevelAchievementSelectedCharacter::where('event_index', $this->eventIndex)
            ->where('select_index', $value)->count();

        if(!$isSelectIndex){
            $fail("select_index", "유효한 캐릭터 선택 INDEX가 아닙니다.");
        }
    }
}
