<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

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
    public function index()
    {
        //todo: add pagination
        $products = $this->repository->all();

        //dd(gettype($products[0]));
        $imageUrls = $products->flatMap(function ($model) {
            // Retrieve all media in the 'images' collection
            return $model->getMedia('*')->map(function ($mediaItem) {
                // Return the URL of each media item
                return $mediaItem->getUrl();
            });
        })->toArray();

        return Inertia::render('Crm/Product/Index', ['products' => $products, 'images' => $imageUrls]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Crm/Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
        else
            Log::debug('Images not found!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $prod = $this->repository->find($id);
        return Inertia::render('Crm/product/show', compact('prod'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $prod = $this->repository->find($id);
        return Inertia::render('Crm/product/edit', compact('prod'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //todo: validate request
        $product = $this->repository->update($request->except('images'), $id);

        //todo: move this to repository
        if (!empty($request->files->filter('images'))) {
            $product->addMultipleMediaFromRequest(['images'])->each(function ($fileAdder) {
                $fileAdder->toMediaCollection();
                Log::debug('Images processed');
            });
        }
        else
            Log::debug('Images not found!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->repository->delete($id);
    }
}
