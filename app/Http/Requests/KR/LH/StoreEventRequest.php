<?php

namespace App\Http\Requests\KR\LH;

use App\Rules\LH\EventTitleRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreEventRequest extends FormRequest
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
            'event_title' => ['required', 'date', new EventTitleRule()],
            'event_type' => ['required', Rule::in(['1', '2'])],
            'event_start' => ['required', 'date'],
            'event_end' => ['required', 'date'],
            'event_description' => ['nullable', 'string', 'max:100'],
        ];
    }

    public function messages()
    {
        return [
            'event_title.required' => '이벤트 번호는 필수 입력 항목입니다.',
            'event_title.date' => '이벤트 번호는 기획서상의 이벤트 시작 날짜를 선택해주세요.',
            'event_type.required' => '이벤트 종류를 선택해 주십시오.',
            'event_type.in' => '유효한 이벤트 종류가 아닙니다.',
            'event_start.required' => '이벤트 시작 시간은 필수 입력 항목입니다.',
            'event_end.required' => '이벤트 종료 시간은 필수 입력 항목입니다.',
            'event_description.max' => '이벤트 설명은 100자까지 입력 가능합니다.',
        ];
    }
}
