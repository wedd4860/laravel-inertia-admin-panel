<?php

namespace App\Http\Requests\Auth;

use App\Models\KR\Member;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Library\MasangConfig;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => '마상소프트 ID는 필수값 입니다.',
            'password.required' => '비밀번호는 필수값 입니다.',
        ];
    }

    /**
     * 인증 관련 함수
     * @see \app\Http\Controllers\Auth\AuthenticatedSessionController.php
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();
        $member = Member::where('user_id', $this->user_id)->first();

        if (!$member) {
            RateLimiter::hit($this->throttleKey());
            throw ValidationException::withMessages([
                'user_id' => ['아이디 또는 비밀번호가 잘못되었습니다.'],
                'password' => ['아이디 또는 비밀번호가 잘못되었습니다.'],
            ]);
        }

        $strPassword = $this->password;
        $strMemberPassword = $member->password;
        if ($strMemberPassword == md5($strPassword) || $strMemberPassword == $this->mysql_pre4_hash_password($strPassword)) {
            // md5 또는 MySQL pre-4 해시 검증
            $member->password = MasangConfig::sha2Enc($strPassword);
            $member->save();
        } else {
            // 기존방식
            if ($strMemberPassword != MasangConfig::sha2Enc($strPassword)) {
                RateLimiter::hit($this->throttleKey());
                throw ValidationException::withMessages([
                    'user_id' => ['아이디 또는 비밀번호가 잘못되었습니다.'],
                    'password' => ['아이디 또는 비밀번호가 잘못되었습니다.'],
                ]);
            }
        }
        Auth::login($member, $this->boolean('remember'));
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * 로그인 요청제한
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'user_id' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * 속도제한 키
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('user_id')) . '|' . $this->ip());
    }

    private function mysql_pre4_hash_password($password): string
    {
        $nr = 1345345333;
        $add = 7;
        $nr2 = 0x12345671;

        settype($password, 'string');

        for ($i = 0; $i < strlen($password); $i++) {
            if ($password[$i] == ' ' || $password[$i] == '\t') {
                continue;
            }
            $tmp = ord($password[$i]);
            $nr ^= ((($nr & 63) + $add) * $tmp) + ($nr << 8);
            $nr2 += ($nr2 << 8) ^ $nr;
            $add += $tmp;
        }
        $result1 = sprintf('%08lx', $nr & ((1 << 31) - 1));
        $result2 = sprintf('%08lx', $nr2 & ((1 << 31) - 1));

        if ($result1 == '80000000') {
            $nr += 0x80000000;
        }
        if ($result2 == '80000000') {
            $nr2 += 0x80000000;
        }

        return sprintf('%08lx%08lx', $nr, $nr2);
    }
}
