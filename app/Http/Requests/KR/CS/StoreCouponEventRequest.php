<?php

namespace App\Http\Requests\KR\CS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreCouponEventRequest extends FormRequest
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
            'event_name' => ['required', 'string', 'max:50'],
            'contants' => ['required', Rule::in(['DK', 'CC', 'LH', 'AO'])],
            'make_coupon' => ['required', 'numeric', 'between: 1, 100'],
            'use_coupon' => ['required', 'numeric'],
            'start_event' => ['required', 'date'],
            'end_event' => ['required', 'date'],
            'item_code' => ['required', 'string', 'max:10'],
            'item_name' => ['required', 'string', 'max:50'],
            'event_status' => ['required', Rule::in([-1])],
        ];
    }

    public function messages()
    {
        return [
            'event_name.required' => '쿠폰 이벤트명은 필수 입력 항목입니다.',
            'contants.required' => '적용 게임을 선택해 주십시오.',
            'make_coupon.required' => '쿠폰 생성 수는 필수 입력 항목입니다.',
            'make_coupon.numeric' => '쿠폰 생성 수는 숫자로 입력해 주십시오.',
            'make_coupon.between' => '쿠폰 생성 수는 1부터 100까지의 숫자로 입력해 주십시오.',
            'use_coupon.required' => '쿠폰 사용 횟수는 필수 입력 항목입니다.',
            'use_coupon.numeric' => '쿠폰 사용 횟수는 숫자로 입력해 주십시오.',
            'start_event.required' => '쿠폰 사용 시작 시간은 필수 입력 항목입니다.',
            'end_event.required' => '쿠폰 사용 시작 시간은 필수 입력 항목입니다.',
            'item_code.required' => '지급 아이템 코드는 필수 입력 항목입니다.',
            'item_code.max' => '지급 아이템 코드는 10자까지 입력 가능합니다.',
            'item_name.required' => '지급 아이템 이름은 필수 입력 항목입니다.',
            'item_name.max' => '지급 아이템 이름은 50자까지 입력 가능합니다.',
        ];
    }
}
