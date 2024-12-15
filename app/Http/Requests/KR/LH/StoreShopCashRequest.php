<?php

namespace App\Http\Requests\KR\LH;

use App\Rules\LH\EventTitleRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreShopCashRequest extends FormRequest
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
            'itemCate' => ['required', Rule::in(['1', '2', '3', '4'])],
            'itemSeq' => ['required', 'string', 'max:30'],
            'itemName' => ['required', 'string', 'max:30'],
            'itemImg' => ['nullable', 'url', 'max:250'],
            'itemCost' => ['required', 'numeric'],
            'itemGeneralQuantify' => ['nullable', 'numeric'],
            'itemPremiumQuantify' => ['nullable', 'numeric'],
            'itemFixed' => ['nullable', 'numeric'],
            'itemLagRush' => ['nullable', 'numeric'],
            'itemLPPoint' => ['nullable', 'numeric'],
            'itemLPPointMax' => ['nullable', 'numeric'],
            'itemAmount' => ['nullable', 'numeric'],
            'itemAddCode' => ['required', 'string', 'max:255', 'regex:/^([a-zA-Z0-9]+,\d+\\|)+$/'],
            'itemSummary' => ['required', 'string', 'max:300'],
            'itemWarning' => ['required', 'string'],
            'itemOrder' => ['nullable', 'numeric', 'between:0,255'],
            'itemView' => ['required', Rule::in(['N', 'Y'])],
            'itemRecommend' => ['nullable', 'string'],
            'itemReturnUser' => ['required', Rule::in(['N', 'Y', 'L'])],
        ];
    }

    public function messages()
    {
        return [
            'itemCate.required' => '카테고리는 필수 선택 항목입니다.',
            'itemCate.in' => '유효한 카테고리가 아닙니다.',
            'itemSeq.required' => '상점 코드는 필수 입력 항목입니다.',
            'itemSeq.max' => '상점 코드는 30자까지 입력 가능합니다.',
            'itemName.required' => '아이템 이름은 필수 입력 항목입니다.',
            'itemName.max' => '아이템 이름은 30자까지 입력 가능합니다.',
            'itemImg.url' => '아이템 이미지 경로는 올바른 URL 형식으로 입력되어야 합니다.',
            'itemImg.max' => '아이템 이미지 경로는 250자까지 입력 가능합니다.',
            'itemCost.required' => '아이템 가격은 필수 입력 항목입니다.',
            'itemAddCode.required' => '인게임 아이템 코드는 필수 입력 항목입니다.',
            'itemAddCode.max' => '인게임 아이템 코드는 255자까지 입력 가능합니다.',
            'itemAddCode.regex' => '인게임 아이템 코드는 반드시 "영어or숫자,숫자|"의 형태가 포함되게 작성되어야 합니다.',
            'itemSummary.required' => '아이템 상세설명은 필수 입력 항목입니다.',
            'itemSummary.max' => '아이템 상세설명은 300자까지 입력 가능합니다.',
            'itemWarning.required' => '아이템 구매 추가혜택은 필수 입력 항목입니다.',
            'itemOrder.between' => '정렬 값은 0과 255 사이의 숫자만 입력 가능합니다.',
            'itemView.required' => '공개 여부는 필수 선택 항목입니다.',
            'itemView.in' => '유효한 공개 옵션이 아닙니다.',
            'itemReturnUser.required' => '아이템 구매 종류는 필수 선택 항목입니다.',
            'itemReturnUser.in' => '유효한 구매 종류 옵션이 아닙니다.',
        ];
    }
}
