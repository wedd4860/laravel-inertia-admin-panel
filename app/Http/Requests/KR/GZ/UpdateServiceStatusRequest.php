<?php

namespace App\Http\Requests\KR\GZ;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateServiceStatusRequest extends FormRequest
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
            'status' => ['required', 'in:inspection,live'],
        ];
    }

    public function messages()
    {
        return [
            'status.required' => '상태값은 필수 입력 항목입니다.',
            'status.in' => '잘못된 접근입니다.',
        ];
    }
}
