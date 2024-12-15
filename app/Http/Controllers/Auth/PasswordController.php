<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Library\MasangConfig;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'password' => ['required', 'min:8', 'max:20', 'confirmed'],
        ]);
        $member = $request->user();
        $member->update([
            'password' => MasangConfig::sha2Enc($validated['password']),
            'chang_password_date' => (Carbon::now()->setTimezone('Asia/Seoul'))->format('YmdHis'),
        ]);
        // return back();
        return to_route('profile.edit')
            ->with('success', "member \"$member->user_name\" was updated");
    }
}
