<?php

namespace App\Http\Requests\KR\LH;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateLinkRedirectRequest extends FormRequest
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
            'redirect_url' => ['nullable', 'string', 'max:200'],
            'on_off_swtich' => ['required', 'in:N,Y'],
        ];
    }

    public function messages()
    {
        return [
            'redirect_url.max' => 'url은 200자까지 입력 가능합니다.',
            'on_off_swtich.required' => '상태는 필수 입력 항목입니다.',
            'on_off_swtich.in' => '상태는 Y 또는 N의 값만 올수 있습니다.',
        ];
    }
}
