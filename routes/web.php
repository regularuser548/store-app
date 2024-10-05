<?php

use App\Http\Controllers\Crm\ProductCrudController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Storefront\StorefrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


//Route::get('/', [StorefrontController::class, 'index'])->name('storefront.index');

//Route::get('/product/{id}/show', [StorefrontController::class, 'show'])->name('storefront.show');

Route::get('/', [StorefrontController::class, 'index'])->name('storefront.index');

Route::get('/product/{product}/show', [StorefrontController::class, 'show'])->name('storefront.show');


Route::get('/search', [StorefrontController::class, 'search'])->name('storefront.search');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('crm')->group(function () {
    Route::resource('product', ProductCrudController::class);
});


require __DIR__.'/auth.php';
