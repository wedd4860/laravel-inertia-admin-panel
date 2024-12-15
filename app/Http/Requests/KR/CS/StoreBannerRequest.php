<?php

namespace App\Http\Requests\KR\CS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreBannerRequest extends FormRequest
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
            'siteNo' => ['required', 'numeric'],
            'imageUrl' => ['required', 'url', 'max:400'],
            'imageTargetlink' => ['required', 'string', 'max:200'],
            'imageOrder' => ['required', 'numeric'],
            'imageTitle' => ['nullable', 'string', 'max:400'],
            'sdate' => ['nullable', 'date'],
            'edate' => ['nullable', 'date'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'siteNo' => $this->input('siteNo', '1'),
            'imageTitle' => $this->input('imageTitle', ''),
            'sdate' => $this->input('sdate', ''),
            'edate' => $this->input('edate', ''),
        ]);
    }

    public function messages()
    {
        return [
            'siteNo.required' => '사이트는 필수 선택 항목입니다.',
            'imageUrl.required' => '이미지 URL은 필수 입력 항목입니다.',
            'imageUrl.url' => '이미지 URL을 올바른 형태로 입력해 주십시오.',
            'imageUrl.max' => '이미지 URL은 400자까지 입력 가능합니다.',
            'imageTargetlink.required' => '링크 URL은 필수 입력 항목입니다.',
            'imageTargetlink.max' => '링크 URL은 200자까지 입력 가능합니다.',
            'imageOrder.required' => '배너 순서는 필수 입력 항목입니다.',
            'imageOrder.numeric' => '배너 순서는 숫자로 입력해 주십시오.',
            'imageTitle.max' => '배너 제목은 400자까지 입력 가능합니다.',
        ];
    }
}
