<?php

use App\Http\Controllers\Crm\MediaController;
use App\Http\Controllers\Crm\ProductController;
use App\Http\Controllers\Crm\TaxonomyController;
use App\Http\Controllers\Crm\UserRoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Storefront\CartController;
use App\Http\Controllers\Storefront\OrderController;
use App\Http\Controllers\Storefront\StorefrontController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Konekt\Acl\Http\Middleware\RoleMiddleware;

//Storefront
Route::get('/', [StorefrontController::class, 'index'])->name('storefront.index');
Route::get('/product/{product}/show', [StorefrontController::class, 'show'])->name('storefront.show');
Route::get('/search', [StorefrontController::class, 'search'])->name('storefront.search');


//footerlinks
Route::get('/privacyPolicy', [StorefrontController::class, 'PrivacyPolicy'])->name('storefront.PrivacyPolicy');
Route::get('/MessageToSeller', [StorefrontController::class, 'MessageToSeller'])->name('storefront.MessageToSeller');

Route::prefix('/cart')->group(function () {
    Route::post('/add', [CartController::class, 'addToCart'])->name('cart.add');
    Route::get('/show', [CartController::class, 'showCart'])->name('cart.show');
    Route::post('/remove/{product}', [CartController::class, 'removeFromCart'])->name('cart.remove');
    //Route::post('/addQuantity', [CartController::class, 'addQuantity'])->name('cart.update.quantity.add');
    //Route::post('/removeQuantity', [CartController::class, 'removeQuantity'])->name('cart.update.quantity.remove');
    Route::post('/changeQuantity', [CartController::class, 'updateQuantity'])->name('cart.update.quantity');

});

Route::middleware(['web'])->group(function () {
    Route::get('/checkout', [OrderController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');
    Route::get('/order/confirmation/{orderId}', [OrderController::class, 'showConfirmation'])
        ->name('order.confirmation');
});

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

//CRM CRUD
Route::prefix('crm')->middleware(['auth', 'verified', RoleMiddleware::class . ':seller|admin'])->group(function () {
    Route::resource('product', ProductController::class)->except(['show']);
    Route::resource('taxonomy', TaxonomyController::class);
    Route::post('syncMediaOrder/{product}', [MediaController::class, 'syncMediaOrder'])->name('product.sync.mediaOrder');
    Route::post('setPrimary/{media}', [MediaController::class, 'setPrimaryImage'])->name('product.setPrimary');
    Route::delete('deleteMedia/{media}', [MediaController::class, 'destroy'])->name('product.deleteMedia');
    Route::post('product.addMedia/{product}', [MediaController::class, 'store'])->name('product.addMedia');
});

//todo: turn to resource routes
Route::prefix('crm/user')->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/', [UserRoleController::class, 'index'])->name('user.index');
    Route::get('/{user}/show', [UserRoleController::class, 'show'])->name('user.show');
    Route::get('/{user}/edit', [UserRoleController::class, 'edit'])->name('user.edit');
    Route::put('/{user}/update', [UserRoleController::class, 'update'])->name('user.update');
    Route::post('/{user}/block', [UserRoleController::class, 'block'])->name('user.block');
    Route::post('/{user}/unblock', [UserRoleController::class, 'unblock'])->name('user.unblock');
});

require __DIR__ . '/auth.php';
