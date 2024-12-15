<?php

namespace App\Http\Requests\KR\CS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateMemberExpiredRequest extends FormRequest
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
            "user_name" => ['required', 'string', 'max:125'],
            "nick_name" => ['required', 'string', 'max:125'],
            "birthday" => ['nullable', 'date'],
            "limit_date" => ['nullable', 'date'],
            "email_address" => ['required', 'email'],
            "denied" => ['nullable', Rule::in(['Y', 'N'])],
            "password" => ['nullable', 'string', 'max:125'],
        ];
    }
}
