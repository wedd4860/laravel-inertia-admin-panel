<?php

namespace App\Http\Requests\KR\FH;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePopupRequest extends FormRequest
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
            'imageUrl' => ['nullable', 'url', 'max:300'],
            'linkUrl' => ['nullable', 'string', 'max:300'],
            'status' => ['required', 'in:Y,N'],
            'startDate' => ['nullable', 'date'],
            'endDate' => ['nullable', 'date'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'startDate' => $this->input('startDate', ''),
            'endDate' => $this->input('endDate', ''),
        ]);
    }

    public function messages()
    {
        return [
            'imageUrl.max' => '이미지 URL은 300자까지 입력 가능합니다.',
            'linkUrl.max' => '링크 URL은 300자까지 입력 가능합니다.',
            'status.required' => '팝업 사용 유무 값은 필수 항목입니다.',
            'status.in' => '팝업 사용 유무 값이 유효하지 않습니다',
        ];
    }
}
