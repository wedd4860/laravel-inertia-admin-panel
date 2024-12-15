<?php

namespace App\Rules\KR;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CouponStringRule implements ValidationRule
{
    protected $duplicates = [];

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail) : void
    {
        $values = array_column($value, 'string_coupon');
        $uniqueValues = array_unique($values);
        $duplicates = array_diff_assoc($values, $uniqueValues);

        foreach ($values as $index => $value) {
            foreach ($duplicates as $duplicate) {
                if($duplicate == $value && $value != null){
                    $fail("coupons.{$index}.string_coupon", "동일한 문구는 사용할 수 없습니다.");
                }
            }
        }
    }
}
