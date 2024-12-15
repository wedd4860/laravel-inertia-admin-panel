<?php

namespace App\Rules\KR;

use App\Models\KR\Member;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PrimeUserIdRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!Member::where(['user_id' => $value, 'is_admin' => 'Y'])->exists()) {
            $fail('해당 관리자를 찾을수 없습니다.');
        }
    }
}
