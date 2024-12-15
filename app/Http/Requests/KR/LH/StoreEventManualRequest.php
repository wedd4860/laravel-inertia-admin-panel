<?php

namespace App\Http\Requests\KR\LH;

use App\Rules\LH\RewardIndexRule;
use App\Rules\LH\SelectIndexRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreEventManualRequest extends FormRequest
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
        $iEventIndex = $this->route('eventId');
        return [
            'reward_index' => ['required', 'numeric', new RewardIndexRule($iEventIndex)],
            'select_index' => ['required', 'numeric', new SelectIndexRule($iEventIndex)],
        ];
    }

    public function messages()
    {
        return [
            'reward_index.required' => '이벤트 보상은 필수 선택 항목입니다.',
            'select_index.required' => '캐릭터 선택 INDEX는 필수 입력 항목입니다.',
        ];
    }
}
