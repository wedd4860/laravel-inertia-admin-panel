<?php

namespace App\Http\Requests\KR\CS;

use App\Rules\KR\PrimeMemberSrlRule;
use App\Rules\KR\PrimeUserIdRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StorePermissionPrimeRequest extends FormRequest
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
            'member_srl' => ['required', 'numeric', new PrimeMemberSrlRule()],
            'user_id' => ['required', 'string', new PrimeUserIdRule()],
            'permission_group' => ['required', 'array'],
            'permission_group.*' => ['string', 'in:' . config('globalvar.permission.group')],
            'text' => ['required', 'in:OP,PL']
        ];
    }

    public function messages()
    {
        return [
            'member_srl.required' => '회원번호는 필수 입력 항목입니다.',
            'member_srl.numeric' => '회원번호는 숫자로만 입력해야 합니다.',
            'user_id.required' => '관리자 아이디는 필수 입력 항목입니다.',
            'permission_group.required' => '권한그룹은 필수 선택 항목입니다.',
            'permission_group.array' => '관리자에게 문의 부탁합니다.',
            'text.required' => '권한그룹은 필수 선택 항목입니다.',
            'text.in' => '관리자에게 문의 부탁합니다.',
        ];
    }
}
