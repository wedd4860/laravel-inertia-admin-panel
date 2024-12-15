<?php

namespace App\Http\Requests\KR\LH;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreEventRewardRequest extends FormRequest
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
            'event_index' => ['required', 'numeric'],
            'reward_item_code' => ['required', 'string', 'max:10'],
            'reward_level' => ['required', 'numeric'],
            'reward_count' => ['required', 'numeric'],
            'reward_name' => ['nullable', 'string', 'max:100'],
            'reward_description' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages()
    {
        return [
            'reward_item_code.required' => '보상 아이템 코드는 필수 입력 항목입니다.',
            'reward_item_code.max' => '보상 아이템 코드는 10자까지 입력 가능합니다.',
            'reward_count.required' => '보상 아이템 갯수는 필수 입력 항목입니다.',
            'reward_count.numeric' => '보상 아이템 갯수는 숫자로 입력할 수 있습니다.',
            'reward_level.required' => '해당 값은 필수 입력 항목입니다.',
            'reward_level.numeric' => '해당 값은 숫자로 입력할 수 있습니다.',
            'reward_name.max' => '보상 아이템 이름은 100자까지 입력 가능합니다.',
            'reward_description.max' => '보상 아이템 설명은 500자까지 입력 가능합니다.',
        ];
    }
}
