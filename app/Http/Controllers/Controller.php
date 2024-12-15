<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
    public function error(int $code, string $message)
    {
        if (!$code) {
            $code = 404;
            $message = '잘못된 접근입니다.';
        }
        return inertia('Errors/Default', ['code' => $code, 'message' => $message]);
    }

    public function flashError(array $aData)
    {
        if (!$aData) {
            $aData = [];
        }
        return redirect()->back()->withErrors($aData);
    }

    public function flashToast(array $aData)
    {
        if (!$aData['toast']) {
            $aData['toast'] = '관리자에게 문의 부탁드립니다.';
        }
        return redirect()->back()->with('toast', $aData['toast']);
    }
}
