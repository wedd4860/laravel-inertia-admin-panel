<?php

namespace App\Http\Requests\KR\LH;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateUserPointRequest extends FormRequest
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
            'lpu_user_idx' => ['required', 'numeric'],
            'lpu_user_idname' => ['required', 'string', 'max:200'],
            'lpu_user_lag_point' => ['required', 'numeric'],
            'member_srl' => ['required', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'lpu_user_idx.required' => '게임 유저 no는 필수값 입니다.',
            'lpu_user_idx.numeric' => '게임 유저 no는 숫자로 작성되야 합니다.',
            'lpu_user_idname.required' => '마상no/id는 필수값 입니다.',
            'lpu_user_lag_point.required' => '라그하임포인트는 필수값 입니다.',
            'lpu_user_lag_point.numeric' => '라그하임포인트는 숫자로 작성되야 합니다.',
            'member_srl.required' => '마상맴버는 필수값 입니다.',
            'member_srl.numeric' => '마상맴버는 숫자로 작성되야 합니다.',
        ];
    }
}
