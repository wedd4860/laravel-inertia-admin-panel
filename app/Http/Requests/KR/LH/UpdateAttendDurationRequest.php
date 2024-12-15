<?php

namespace App\Http\Requests\KR\LH;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateAttendDurationRequest extends FormRequest
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
            'startDate' => ['required', 'date'],
            'endDate' => ['required', 'date'],
        ];
    }

    public function messages()
    {
        return [
            'startDate.required' => '출석체크 시작 시간은 필수 입력 항목입니다.',
            'endDate.required' => '출석체크 종료 시간은 필수 입력 항목입니다.',
        ];
    }
}
