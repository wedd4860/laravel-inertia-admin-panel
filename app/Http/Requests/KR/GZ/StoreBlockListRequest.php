<?php

namespace App\Http\Requests\KR\GZ;

use App\Rules\GZ\BlockMemberSrlRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreBlockListRequest extends FormRequest
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
            'member_srl' => ['required', 'numeric', new BlockMemberSrlRule()],
            'date' => ['nullable', 'date'],
            'text' => ['nullable', 'string', 'max:50'],
        ];
    }

    public function messages()
    {
        return [
            'member_srl.required' => '회원번호는 필수 입력 항목입니다.',
            'member_srl.numeric' => '회원번호는 숫자로만 입력해야 합니다.',
            'date.date' => '잘못된 접근입니다.',
            'text.string' => '내용은 문자열로 입력해야합니다.',
            'text.max' => '내용이 너무 깁니다.',
        ];
    }
}
