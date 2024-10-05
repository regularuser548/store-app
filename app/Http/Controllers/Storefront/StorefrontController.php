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

//    public function index()
//    {
//        $products = $this->repository->all();
//       return Inertia::Render('products.index', compact('products'));
//
//    }
//
//
//    public function show(Product $product)
//    {
//        return Inertia::Render('products.show', compact('product'));
//
//    }
    public function index()
    {
        $products = $this->repository->all();
        $images = $this->repository->firstMediaForEach($products);
        return Inertia::render('Storefront/Index', compact('products', 'images'));
    }

    public function show(Product $product)
    {
        $image = $this->repository->allMediaForModel($product);
        return Inertia::render('Storefront/Show', compact('product', 'image'));

    }



    public function search(Request $request)
    {
        $query = $request->input('query');

        $products = Product::where('name', 'like', '%' . $query . '%')->get();

        return Inertia::render('Storefront/Index', ['products' => $products]);
    }


}
