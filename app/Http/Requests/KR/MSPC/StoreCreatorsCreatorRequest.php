<?php

namespace App\Http\Requests\KR\MSPC;

use App\Rules\MSPC\CreatorsUserIdRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCreatorsCreatorRequest extends FormRequest
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
            'creator_group' => ['required', 'numeric'],
            'nickname' => ['required', 'string'],
            'member_userid' => ['required', 'string', new CreatorsUserIdRule()],
            'phone' => ['required', 'string', 'regex:/^[0-9-]+$/'],
            'email' => ['required', 'email'],
            'sponsorcode' => ['required', 'string', 'regex:/[a-zA-Z0-9#]+/'],
        ];
    }

    public function messages()
    {
        return [
            'creator_group.required' => '그룹은 필수 선택 항목입니다.',
            'creator_group.numeric' => '잘못된 접근입니다.',
            'nickname.required' => '이름은 필수 입력 항목입니다.',
            'nickname.string' => '잘못된 접근입니다.',
            'member_userid.required' => '이름은 필수 입력 항목입니다.',
            'member_userid.string' => '잘못된 접근입니다.',
            'phone.required' => '전화번호는 필수 입력 항목입니다.',
            'phone.string' => '잘못된 접근입니다.',
            'phone.regex' => '숫자로만 입력해 주세요.',
            'email.required' => '메일주소는 필수 입력 항목입니다.',
            'email.email' => '잘못된 접근입니다.',
            'sponsorcode.required' => '후원코드는 필수 입력 항목입니다.',
            'sponsorcode.string' => '잘못된 접근입니다.',
            'sponsorcode.regex' => '특수문자는 #만 허용됩니다. 숫자또는 영어 특수문자를 입력해주세요.',
        ];
    }
}
