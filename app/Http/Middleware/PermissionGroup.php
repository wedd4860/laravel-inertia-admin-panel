<?php

namespace App\Http\Middleware;

use Illuminate\Support\Str;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class PermissionGroup
{
    private function hasPermission($member, $group)
    {
        if (!$member->memberTPermissionGroup) {
            return false;
        }

        $strGroup = Str::lower($member->memberTPermissionGroup->permission_group);
        if ($strGroup === 'all' || in_array($group, explode(',', $strGroup))) {
            return true;
        }
        return false;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $group): Response
    {
        $member = $request->user();
        if (!$this->hasPermission($member, $group)) {
            return Inertia::render('Errors/Default', [
                'code' => 403,
                'message' => '권한이 없습니다.'
            ])->toResponse($request)->setStatusCode(403);
        } else {
            return $next($request);
        }
    }
}
