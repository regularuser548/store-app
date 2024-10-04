<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StorefrontController extends Controller
{
    protected ProductRepository $repository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->repository = $productRepository;
    }

    public function index()
    {
        $products = $this->repository->all();
        return Inertia::Render('products.index', compact('products'));
    }



    public function show(Product $product)
    {
        return Inertia::Render('products.show', compact('product'));
    }

}
