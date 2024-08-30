<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Vanilo\Product\Contracts\Product as ProductContract;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->concord->registerModel(\Konekt\User\Contracts\User::class, \App\Models\User::class);

        $this->app->concord->registerModel(ProductContract::class, \App\Models\Product::class);
    }
}
