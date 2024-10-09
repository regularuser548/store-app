<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\ProductStoreRequest;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Auth;
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

        $imageUrls = $this->repository->firstMediaForEach($products);

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
    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $request->validate(['images' => 'required']);

        $data = $request->validated();
        $data['seller_id'] = Auth::id();

        $product = $this->repository->create($data);

        $this->repository->addMultipleMediaFromArray($product, $data['images']);

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
        $imageUrls = $this->repository->allMediaForModel($product);

        return Inertia::render('Crm/Product/Edit', ['product' => $product, 'images' => $imageUrls]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductStoreRequest $request, Product $product): RedirectResponse
    {
        $product = $this->repository->update($request->validated(), $product->id);

        if ($request->hasFile('images'))
        {
            $product->clearMediaCollection(); //this is temporary
            $this->repository->addMultipleMediaFromArray($product, $request->file('images'));
        }

        return to_route('product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        //todo: check product ownership
        $this->repository->delete($product->id);

        return to_route('product.index');
    }
}
