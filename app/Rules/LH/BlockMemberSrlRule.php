<?php

namespace App\Rules\LH;

use App\Models\KR\Member;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class BlockMemberSrlRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        if (!Member::where(['member_srl' => $value])->exists()) {
            $fail('해당 맴버를 찾을수 없습니다.');
        }
    }
}
