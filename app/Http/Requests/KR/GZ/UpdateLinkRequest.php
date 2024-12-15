<?php

namespace App\Http\Requests\KR\GZ;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateLinkRequest extends FormRequest
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
            'idx' => ['required', 'numeric'],
            'imageTargetlink' => ['required', 'url', 'max:200'],
        ];
    }

    public function messages()
    {
        return [
            'imageTargetlink.required' => '링크 URL은 필수 입력 항목입니다.',
            'imageTargetlink.url' => 'url형태로 입력해야합니다.',
            'imageTargetlink.max' => '링크 URL은 200자까지 입력 가능합니다.',
        ];
    }
}
