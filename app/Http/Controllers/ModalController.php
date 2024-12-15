<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ModalController extends Controller
{
    public function default()
    {
        return Inertia::render('Modals/Default');
    }
}
