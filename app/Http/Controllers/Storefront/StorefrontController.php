<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StorefrontController extends Controller
{
    protected ProductRepository $repository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->repository = $productRepository;
    }

    public function index(): Response
    {
        $products = $this->repository->all();
        $images = $this->repository->firstMediaForEach($products);
        return Inertia::render('Storefront/Index', compact('products', 'images'));
    }

    public function show(Product $product): Response
    {
        $images = $this->repository->allMediaForModel($product);
        return Inertia::render('Storefront/Show', compact('product', 'images'));

    }

    public function search(Request $request): Response
    {
        $query = $request->input('query');

        $products = Product::where('name', 'like', '%' . $query . '%')->get();

        $images = $this->repository->firstMediaForEach($products);

        return Inertia::render('Storefront/Index', ['products' => $products, 'images' => $images]);
    }


}
