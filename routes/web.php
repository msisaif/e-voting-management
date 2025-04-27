<?php

use App\Http\Controllers\ElectionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('/users', UserController::class);
    Route::get('/elections', [ElectionController::class, 'index'])->name('elections.index');
    Route::get('/elections/{election}/vote', [ElectionController::class, 'vote'])->name('elections.vote');
    Route::get('/elections/{election}/vote/{candidate}', [ElectionController::class, 'storeVote'])->name('elections.storeVote');
    Route::get('/elections/{election}/result', [ElectionController::class, 'result'])->name('elections.result');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
