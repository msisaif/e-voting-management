<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\json;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->get();

        return Inertia::render('users/index', [
            'users' => $users->toArray(),
        ]);
    }
}
