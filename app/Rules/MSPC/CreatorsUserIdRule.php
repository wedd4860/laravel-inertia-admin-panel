<?php

namespace App\Rules\MSPC;

use Closure;
use App\Models\KR\Member;
use Illuminate\Contracts\Validation\ValidationRule;

class CreatorsUserIdRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!Member::where(['user_id' => $value])->exists()) {
            $fail('해당 유저를 찾을수 없습니다.');
        }
    }
}
