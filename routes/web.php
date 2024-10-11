<?php

use App\Http\Controllers\Crm\ProductCrudController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Storefront\StorefrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Konekt\Acl\Http\Middleware\RoleMiddleware;


//Storefront
Route::get('/', [StorefrontController::class, 'index'])->name('storefront.index');
Route::get('/product/{product}/show', [StorefrontController::class, 'show'])->name('storefront.show');
Route::get('/search', [StorefrontController::class, 'search'])->name('storefront.search');

//Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//CRM Product CRUD
Route::prefix('crm')->middleware(['auth', 'verified', RoleMiddleware::class.':seller|admin'])->group(function () {
    Route::resource('product', ProductCrudController::class);
});


require __DIR__.'/auth.php';
