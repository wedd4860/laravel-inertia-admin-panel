<?php

namespace App\Http\Requests\KR\LH;

use App\Rules\LH\EventTitleRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreShopLPRequest extends FormRequest
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
            'lsi_goods_code' => ['required', 'string', 'max:10'],
            'lsi_goods_name' => ['required', 'string', 'max:250'],
            'lsi_goods_type' => ['required', Rule::in(['NORMAL', 'MONTH', 'WEEK'])],
            'lsi_item_idx' => ['required', 'numeric', 'lt:32768'],
            'lsi_item_cnt' => ['required', 'numeric', 'lt:32768'],
            'lsi_sale_point' => ['required', 'numeric'],
            'lsi_sale_limit_cnt' => ['required', 'numeric'],
            'lsi_buy_limit_cnt' => ['required', 'numeric', 'lt:32768'],
            'lsi_sale_start_date' => ['nullable', 'date'],
            'lsi_sale_end_date' => ['nullable', 'date'],
            'lsi_description' => ['required', 'string'],
            'lsi_goods_img' => ['nullable', 'url', 'max:250'],
            'lsi_enabled' => ['required', Rule::in(['N', 'Y'])],
        ];
    }

    public function messages()
    {
        return [
            'lsi_goods_code.required' => '상점 코드는 필수 입력 항목입니다.',
            'lsi_goods_code.max' => '상점 코드는 10자까지 입력 가능합니다.',
            'lsi_goods_name.required' => '아이템 이름은 필수 입력 항목입니다.',
            'lsi_goods_name.max' => '아이템 이름은 250자까지 입력 가능합니다.',
            'lsi_goods_type.required' => '판매 종류는 필수 선택 항목입니다.',
            'lsi_goods_type.in' => '유효한 판매 종류가 아닙니다.',
            'lsi_item_idx.required' => '인게임 아이템 코드는 필수 입력 항목입니다.',
            'lsi_item_idx.lt' => '인게임 아이템 코드는 32767 이하의 숫자로 입력 가능합니다.',
            'lsi_item_cnt.required' => '아이템 지급 갯수는 필수 입력 항목입니다.',
            'lsi_item_cnt.lt' => '아이템 지급 갯수는 32767 이하의 숫자로 입력 가능합니다.',
            'lsi_sale_point.required' => 'LP 가격은 필수 입력 항목입니다.',
            'lsi_sale_limit_cnt.required' => '총 판매 갯수는 필수 입력 항목입니다.',
            'lsi_buy_limit_cnt.required' => '구매 가능 횟수는 필수 입력 항목입니다.',
            'lsi_buy_limit_cnt.lt' => '구매 가능 횟수는 32767 이하의 숫자로 입력 가능합니다.',
            'lsi_description.required' => '아이템 설명은 필수 입력 항목입니다.',
            'lsi_goods_img.url' => '아이템 이미지 경로는 올바른 URL 형식으로 입력되어야 합니다.',
            'lsi_goods_img.max' => '아이템 이미지 경로는 250자까지 입력 가능합니다.',
            'lsi_enabled.required' => '활성화 여부는 필수 선택 항목입니다.',
            'lsi_enabled.in' => '유효한 활성화 여부가 아닙니다.',
        ];
    }
}
