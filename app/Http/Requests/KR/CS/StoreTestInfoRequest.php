<?php

namespace App\Http\Requests\KR\CS;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTestInfoRequest extends FormRequest
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
            'test_id' => ['required', 'string', 'max:20'],
            'nickname' => ['required', 'string', 'max:20'],
            'pwd' => ['required', 'string', 'max:20'],
            'birthdate' => ['nullable', 'date'],
            'txt' => ['nullable', 'string', 'max:200'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'birthdate' => $this->input('birthdate', ''),
            'txt' => $this->input('txt', ''),
        ]);
    }
}
