<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\Crm\MediaController;
use App\Http\Controllers\Crm\ProductController;
use App\Http\Controllers\Crm\ReportController;
use App\Http\Controllers\Crm\TaxonController;
use App\Http\Controllers\Crm\TaxonomyController;
use App\Http\Controllers\Crm\UserRoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Storefront\CartController;
use App\Http\Controllers\Storefront\CommentController;
use App\Http\Controllers\Storefront\FavoriteController;
use App\Http\Controllers\Storefront\OrderController;
use App\Http\Controllers\Storefront\StorefrontController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Konekt\Acl\Http\Middleware\RoleMiddleware;

//Storefront
Route::get('/', [StorefrontController::class, 'index'])->name('storefront.index');
Route::get('/product/{product}/show', [StorefrontController::class, 'show'])->name('storefront.show');
Route::get('/search/{path?}', [StorefrontController::class, 'search'])->name('storefront.search')->where('path', '.*');
Route::get('/categories', [StorefrontController::class, 'returnCategoryTree'])->name('storefront.categories');
//Route::get('/cart/exists/{productId}', [StorefrontController::class, 'isInCart']);


//footer links
Route::get('/privacy-policy', [StorefrontController::class, 'PrivacyPolicy'])->name('storefront.PrivacyPolicy');
Route::get('/about-us', [StorefrontController::class, 'AboutUs'])->name('storefront.AboutUs');
Route::get('/message-to-seller', [StorefrontController::class, 'MessageToSeller'])->name('storefront.MessageToSeller');

//Avatars
Route::resource('avatar', AvatarController::class)->only(['show', 'store', 'update', 'destroy']);

Route::prefix('/cart')->group(function () {
    Route::post('/add', [CartController::class, 'addToCart'])->name('cart.add');
    Route::get('/show', [CartController::class, 'showCart'])->name('cart.show');
    Route::post('/remove/{product}', [CartController::class, 'removeFromCart'])->name('cart.remove');
    Route::post('/changeQuantity', [CartController::class, 'updateQuantity'])->name('cart.update.quantity');
    Route::post('/add-multiple', [CartController::class, 'addMultipleToCart']);
});

Route::middleware(['web'])->group(function () {
    Route::get('/checkout', [OrderController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('comments', [CommentController::class, 'index'])->name('comments.index');
    //Route::get('products/{product}', [CommentController::class, 'show'])->name('comments.show');
    Route::post('comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites/toggle/{productId}', [FavoriteController::class, 'toggleLike']);
    Route::get('/favorites/exists/{productId}', [FavoriteController::class, 'exists'])->name('favorites.exists');
});

Route::middleware('auth')->group(function () {
    Route::get('/my-orders', [ProfileController::class, 'orders'])->name('orders.index');
});

//Dashboard
Route::get('/dashboard', function () {
    return redirect()->route('profile.edit');
})->middleware(['auth', 'verified'])->name('dashboard');


//Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//CRM CRUD
Route::prefix('crm')->middleware(['auth', 'verified', RoleMiddleware::class . ':seller|admin'])->group(function () {
    Route::resource('product', ProductController::class)->except(['show'])->middleware([HandlePrecognitiveRequests::class]);
    Route::post('syncMediaOrder/{product}', [MediaController::class, 'syncMediaOrder'])->name('product.sync.mediaOrder');
    Route::post('setPrimary/{media}', [MediaController::class, 'setPrimaryImage'])->name('product.setPrimary');
    Route::delete('deleteMedia/{media}', [MediaController::class, 'destroy'])->name('product.deleteMedia');
    Route::post('product.addMedia/{product}', [MediaController::class, 'store'])->name('product.addMedia');
});

//CRM Categorization
Route::prefix('crm')->middleware(['auth', 'verified', RoleMiddleware::class . ':admin', HandlePrecognitiveRequests::class])->group(function () {
    Route::resource('taxonomy', TaxonomyController::class);
    //Route::post('syncTaxonomy/{taxonomy}', [TaxonomyController::class, 'sync'])->name('taxonomy.sync');
    //Route::resource('taxon', TaxonController::class)->except(['index', 'show']);
    Route::get('/taxonomy/{taxonomy}/taxon/create', [TaxonController::class, 'create'])->name('taxon.create');
    Route::post('/taxonomy/{taxonomy}/taxon', [TaxonController::class, 'store'])->name('taxon.store');
    Route::get('/taxonomy/{taxonomy}/taxon/{taxon}/edit', [TaxonController::class, 'edit'])->name('taxon.edit');
    Route::put('/taxonomy/{taxonomy}/taxon/{taxon}', [TaxonController::class, 'update'])->name('taxon.update');
    Route::delete('/taxonomy/{taxonomy}/taxon/{taxon}', [TaxonController::class, 'destroy'])->name('taxon.destroy');

    Route::put('/taxonomy/{taxonomy}/sync', [TaxonController::class, 'sync'])->name('taxonomy.sync');
});


Route::prefix('crm/user')->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/', [UserRoleController::class, 'index'])->name('user.index');
    Route::get('/{user}/show', [UserRoleController::class, 'show'])->name('user.show');
    Route::get('/{user}/edit', [UserRoleController::class, 'edit'])->name('user.edit');
    Route::put('/{user}/update', [UserRoleController::class, 'update'])->name('user.update');
    Route::post('/{user}/block', [UserRoleController::class, 'block'])->name('user.block');
    Route::post('/{user}/unblock', [UserRoleController::class, 'unblock'])->name('user.unblock');
    Route::get('/{user}/orders', [UserRoleController::class, 'viewUserOrders'])->name('user.orders');
});

Route::prefix('crm')->middleware(['auth', 'verified', RoleMiddleware::class . ':seller|admin'])->group(function () {
    Route::get('reports/sales', [ReportController::class, 'salesReport'])->name('reports.sales');
    Route::get('reports/activity', [ReportController::class, 'userActivityReport'])->name('reports.activity');
    Route::get('reports/statistics/{id}', [ReportController::class, 'orderStatistics'])->name('reports.statistics');

    Route::put('/reports/orders/update', [ReportController::class, 'updateOrderStatistics'])
        ->name('crm.reports.updateOrderStatistics');



    Route::get('reports/orders/{userId}', [ReportController::class, 'userOrders'])->name('reports.orders');
});


require __DIR__ . '/auth.php';
