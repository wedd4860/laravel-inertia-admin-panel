<?php

namespace App\Http\Requests\KR\CS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateLinkLauncherRequest extends FormRequest
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
            'launcher' => ['required', 'url', 'max:200'],
            'version' => ['nullable', 'string', 'max:10'],
            'text' => ['nullable', 'string', 'max:50'],
        ];
    }

    public function messages()
    {
        return [
            'launcher.required' => '런처링크는 필수 입력 항목입니다.',
            'launcher.url' => 'url형태로 입력해야 합니다.',
            'launcher.max' => '입력된 텍스트가 길이 제한을 초과했습니다. 줄여서 다시 시도해 주십시오.',
            'version.max' => '입력된 텍스트가 길이 제한을 초과했습니다. 줄여서 다시 시도해 주십시오.',
            'text.max' => '입력된 텍스트가 길이 제한을 초과했습니다. 줄여서 다시 시도해 주십시오.',
        ];
    }
}