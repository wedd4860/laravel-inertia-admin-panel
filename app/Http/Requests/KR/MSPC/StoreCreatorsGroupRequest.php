<?php

namespace App\Http\Requests\KR\MSPC;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCreatorsGroupRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'gameid' => ['required', 'in:1,2,3,4,5,6,7,8,10'],
            'enddate' => ['required', 'date'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '타입은 필수 입력 항목입니다.',
            'name.string' => '잘못된 접근입니다.',
            'gameid.required' => '타입은 필수 입력 항목입니다.',
            'gameid.in' => '잘못된 접근입니다.',
            'enddate.required' => '타입은 필수 입력 항목입니다.',
            'enddate.date' => '입력된 텍스트가 길이 제한을 초과했습니다. 줄여서 다시 시도해 주십시오.',
        ];
    }
}
