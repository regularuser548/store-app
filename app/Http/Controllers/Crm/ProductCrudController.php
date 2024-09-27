<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ProductCrudController extends Controller
{
    protected ProductRepository $repository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->repository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //todo: add pagination
        $products = $this->repository->all();

        $imageUrls = $products->mapWithKeys(function ($model) {
            // Return an associative array with the product id as key and image URLs as value
            return [
                $model->id => $model->getMedia('*')?->first()?->getUrl()
            ];
        });

        return Inertia::render('Crm/Product/Index', ['products' => $products, 'images' => $imageUrls]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {

        return Inertia::render('Crm/Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        //todo: validate request

        $product = $this->repository->create($request->except('images'));

        //todo: move this to repository
        if (!empty($request->files->filter('images'))) {
            $product->addMultipleMediaFromRequest(['images'])->each(function ($fileAdder) {
                $fileAdder->toMediaCollection();
                Log::debug('Images processed!');
            });
        }

        return to_route('product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        return Inertia::render('Crm/Product/Show', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        $imageUrls = $product->getMedia('*')->map(function ($mediaItem) {
                    return $mediaItem->getUrl();
                    });

        return Inertia::render('Crm/Product/Edit', ['product' => $product, 'images' => $imageUrls]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product): RedirectResponse
    {
        //todo: validate request
        $product = $this->repository->update($request->except('images'), $product->id);

        $product->clearMediaCollection();

        //todo: move this to repository
        if (!empty($request->files->filter('images'))) {
            $product->addMultipleMediaFromRequest(['images'])->each(function ($fileAdder) {
                $fileAdder->toMediaCollection();
                Log::debug('Images processed');
            });
        }

        return to_route('product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        $this->repository->delete($product->id);

        return to_route('product.index');
    }
}
