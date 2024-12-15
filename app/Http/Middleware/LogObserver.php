<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LogObserver
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $response = $next($request);
        if (!in_array($request->route()->getName(), ['api.kr.st.inquiry'])) {
            $postData = $request->all();
            unset($postData['password']);
            $logData = [
                'member_srl' => $user->member_srl ?? 0,
                'path' => $request->path(),
                'route_name' => $request->route()?->getName(),
                'method' => $request->method(),
                'controller' => $request->route()?->getAction('controller'),
                'params' => json_encode($postData),
                'ip_address' => $request->ip(),
            ];
            Log::channel('db')->info('Request with data', $logData);
        }
        return $response;
    }
}
