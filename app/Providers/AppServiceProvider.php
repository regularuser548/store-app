<?php

namespace App\Providers;

use App\Models\Taxonomy;
use Illuminate\Support\ServiceProvider;
use Vanilo\Product\Contracts\Product as ProductContract;
use Vanilo\Category\Contracts\Taxonomy as TaxonomyContract;

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
        //$this->app->concord->registerModel(TaxonomyContract::class, \App\Models\Taxonomy::class);
    }
}
