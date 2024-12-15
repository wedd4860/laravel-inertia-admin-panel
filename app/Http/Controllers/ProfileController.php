<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Library\MasangConfig;
use App\Models\KR\Member;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $member = $request->user();
        $isSocial = 'N';
        if (Str::startsWith($member->user_id, 'sc_')) {
            $isSocial = 'Y';
        }
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $member instanceof MustVerifyEmail,
            'isSocial' => $isSocial,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $member = $request->user();
        $postData = $request->validated();
        $member->update($postData);
        return to_route('profile.edit')
            ->with('success', "member \"$member->user_name\" was updated");
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
