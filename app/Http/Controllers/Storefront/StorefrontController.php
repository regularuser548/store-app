<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Storefront\ProductSearchRequest;
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
use Vanilo\Foundation\Models\Taxon;
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

//    public function show(Product $product): Response
//    {
//        $images = $this->mediaRepository->allMediaForModel($product);
//        $comments = Comment::where('product_id', $product->id)
//            ->with('user')
//            ->orderBy('created_at', 'desc')
//            ->get();
//        return Inertia::render('Storefront/Show', compact('product', 'images','comments'));
//    }
    public function show(Product $product): Response
    {
        $images = $this->mediaRepository->allMediaForModel($product);

        $comments = Comment::where('product_id', $product->id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($comment) {
                $user = auth()->user();
                $comment->can_delete = $user->role === 'admin'
                    || $user->role === 'moderator'
                    || $user->id === $comment->user_id;
                return $comment;
            });

        return Inertia::render('Storefront/Show', compact('product', 'images', 'comments'));
    }

    public function search(ProductSearchRequest $request, ?string $taxonomySlug = null, ?string $taxonSlug = null): Response
    {
        $productFinder = new ProductSearch();

        $properties = [];

        if ($taxonomySlug and $taxonSlug)
            $productFinder->withinTaxon(Taxon::findOneByParentsAndSlug($taxonomySlug, $taxonSlug));

//        foreach ($request->filters($properties) as $property => $values) {
//            $productFinder->havingPropertyValuesByName($property, $values);
//        }

        if ($request->filled('query'))
            $productFinder->nameContains($request->input('query'));

        $products = $productFinder->getResults();

        $images = $this->mediaRepository->primaryImageForEach($products);

        return Inertia::render('Storefront/Search', ['products' => $products, 'images' => $images]);
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
