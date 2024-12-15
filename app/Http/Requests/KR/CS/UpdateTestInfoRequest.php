<?php

namespace App\Http\Requests\KR\CS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateTestInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // 사용자가 로그인 되어 있고, admin 필드가 'Y'인지 확인
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
            'nickname' => ['required', 'string', 'max:20'],
            'pwd' => ['required', 'string', 'max:20'],
            'txt' => ['nullable', 'string', 'max:200'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'txt' => $this->input('txt', ''),
        ]);
    }
}
