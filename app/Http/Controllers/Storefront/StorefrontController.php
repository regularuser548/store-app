<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Product;
use App\Repositories\MediaRepository;
use App\Repositories\ProductRepository;
use App\Repositories\TaxonomyRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Vanilo\Category\Models\Taxonomy;
use Vanilo\Foundation\Search\ProductSearch;

class StorefrontController extends Controller
{
    protected ProductRepository $repository;
    protected MediaRepository $mediaRepository;
    protected TaxonomyRepository $taxonomyRepository;

    public function __construct(ProductRepository $productRepository,
                                MediaRepository $mediaRepository,
                                TaxonomyRepository $taxonomyRepository)
    {
        $this->repository = $productRepository;
        $this->mediaRepository = $mediaRepository;
        $this->taxonomyRepository = $taxonomyRepository;
    }

    public function index(): Response
    {
        $products = $this->repository->all();
        $images = $this->mediaRepository->primaryImageForEach($products);
        return Inertia::render('Storefront/Index', compact('products', 'images'));//map for checking products inCard
    }

    public function show(Product $product): Response
    {
        $images = $this->mediaRepository->allMediaForModel($product);

        $comments = Comment::where('product_id', $product->id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Storefront/Show', compact('product', 'images','comments'));
    }

    public function search(Request $request): Response
    {
        //todo: переделать с использованием https://vanilo.io/docs/4.x/product-search
        $query = $request->input('query');

        //$products = Product::where('name', 'like', '%' . $query . '%')->get();

        $products = (new ProductSearch())
            ->withinTaxon(Taxon::findBySlug('mens-shoes'))
            ->havingPropertyValuesByName('color', ['red', 'yellow'])
            ->havingPropertyValuesByName('style', ['casual'])
            ->nameContains('Retro')
            ->paginate(50);

        $images = $this->mediaRepository->primaryImageForEach($products);

        return Inertia::render('Storefront/Index', ['products' => $products, 'images' => $images]);
    }

    public function PrivacyPolicy(): Response
    {
        return Inertia::render('Storefront/FooterLinks/PrivacyPolicy');
    }

    public function MessageToSeller(): Response
    {
        return Inertia::render('Storefront/MessageToSeller');
    }

    public function returnCategoryTree(): JsonResponse
    {
        $taxonomies = Taxonomy::with('taxons.children')->get();
        $taxonomyTree = $this->taxonomyRepository->buildTaxonomyTree($taxonomies);
        return response()->json($taxonomyTree);
    }

}
