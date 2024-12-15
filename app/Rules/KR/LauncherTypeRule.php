<?php

namespace App\Rules\KR;

use App\Models\KR\TLauncherDownload;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LauncherTypeRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (TLauncherDownload::where(['type' => $value])->exists()) {
            $fail('이미 있는 type 입니다.');
        }
    }
}
