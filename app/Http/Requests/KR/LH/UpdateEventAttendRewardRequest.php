<?php

namespace App\Http\Requests\KR\LH;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateEventAttendRewardRequest extends FormRequest
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
            'itemCode' => ['required', 'string'],
            'itemCount' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'itemCode.required' => '보상 아이템 코드는 필수 입력 항목입니다.',
            'itemCount.required' => '보상 아이템 갯수는 필수 입력 항목입니다.',
        ];
    }
}
