<?php

namespace App\Http\Requests\KR\CS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreBlockPhoneRequest extends FormRequest
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
            'phone' => ['required', 'string', 'regex:/^\d+$/'],
        ];
    }

    public function messages()
    {
        return [
            'phone.required' => '전화번호는 필수 입력 항목입니다.',
            'phone.regex' => '전화번호는 숫자로만 입력해야 합니다.',
        ];
    }
}
