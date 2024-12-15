<?php

namespace App\Http\Requests\KR\CS;

use App\Rules\KR\CouponStringRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCouponNumberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->is_admin === 'Y';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_index' => ['required', 'int'],
            'coupons' => ['required', 'array', new CouponStringRule()],
            'coupons.*.number_coupon' => ['required', 'string', 'max:20'],
            'coupons.*.string_coupon' => ['nullable', 'unique:App\Models\KR\TCoupon,string_coupon', 'string', 'max:50'],
        ];
    }
    public function messages()
    {
        return [
            'coupons.*.string_coupon.unique' => '이미 사용중인 쿠폰 문구입니다.',
        ];
    }

}
