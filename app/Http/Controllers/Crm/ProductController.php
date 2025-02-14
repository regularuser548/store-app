<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\Product\ProductDeleteRequest;
use App\Http\Requests\Crm\Product\ProductShowRequest;
use App\Http\Requests\Crm\Product\ProductStoreRequest;
use App\Http\Requests\Crm\Product\ProductUpdateRequest;
use App\Models\Product;
use App\Repositories\MediaRepository;
use App\Repositories\ProductRepository;
use App\Repositories\TaxonomyRepository;
use App\Repositories\TaxonRepository;
use Auth;
use Http;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Vanilo\Category\Models\Taxonomy;
use Vanilo\Foundation\Models\Taxon;

class ProductController extends Controller
{
    protected ProductRepository $repository;
    protected MediaRepository $mediaRepository;
    protected TaxonRepository $taxonRepository;
    protected TaxonomyRepository $taxonomyRepository;

    const productsPerPage = 20;

    public function __construct(ProductRepository $productRepository,
                                MediaRepository   $mediaRepository,
                                TaxonRepository   $taxonRepository,
                                TaxonomyRepository $taxonomyRepository)
    {
        $this->repository = $productRepository;
        $this->mediaRepository = $mediaRepository;
        $this->taxonRepository = $taxonRepository;
        $this->taxonomyRepository = $taxonomyRepository;
    }

    private function isVideoIdValid(?string $videoId): bool
    {
        //Video id can be null
        if ($videoId === null)
            return true;

        $res = Http::head("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={$videoId}&format=json");

        if ($res->successful())
            return true;

        return false;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $query = Product::query();

        if (!Auth::user()->hasRole('admin'))
            $query->where('seller_id', '=', Auth::id());

        $paginator = $query->paginate(self::productsPerPage)->withQueryString();

        //$categories = $this->taxonomyRepository->buildTaxonomyTree(collect($paginator->items()));
        //dd($paginator->items()[0]->taxons()->get());

        //$imageUrls = $this->mediaRepository->primaryImageForEach(collect($paginator->items()), urlType: 'thumbnail');

        return Inertia::render('Crm/Product/Index', ['paginator' => $paginator]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $taxonomies = Taxonomy::with('taxons.children')->get(); // Eager load taxons and their children
        $taxonomyTree = $this->taxonomyRepository->buildTaxonomyTree($taxonomies);
        //dd(json_encode($result, JSON_PRETTY_PRINT));

        return Inertia::render('Crm/Product/Create', compact('taxonomyTree'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request): RedirectResponse
    {
        if (!$this->isVideoIdValid($request->input('video_id')))
            return redirect()->back()->withErrors(['video_id' => 'Invalid video id']);

        $data = $request->validated();
        $data['seller_id'] = Auth::id();

        $product = $this->repository->create($data);

        $product->addTaxon(Taxon::find($data['taxon_id']));

        $this->mediaRepository->addMultipleMediaFromArray($product, $data['images']);

        //we will set first image as primary, by default
        $product->getMedia()->first()->setCustomProperty('isPrimary', true)->save();

        return to_route('product.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductShowRequest $request, Product $product): Response
    {
        $taxonomies = Taxonomy::with('taxons.children')->get(); // Eager load taxons and their children

        $taxonomyTree = $this->taxonomyRepository->buildTaxonomyTree($taxonomies);
        //dd($taxonomyTree);

        $currentCategory = null;
        if ($product->taxons()->count() > 0)
            $currentCategory = $this->taxonRepository->findTaxonParents($product->taxons()->first());
            //dd($currentCategory);

        $images = $this->mediaRepository->allMediaForModelWithIds($product);

        return Inertia::render('Crm/Product/Edit', compact('product', 'taxonomyTree',
            'images', 'currentCategory'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, Product $product): RedirectResponse
    {
        if (!$this->isVideoIdValid($request->get('video_id')))
            return redirect()->back()->withErrors(['video_id' => 'Invalid video id']);

        $product = $this->repository->update($request->validated(), $product->id);

        $product->taxons()->detach();
        $product->addTaxon(Taxon::find($request['taxon_id']));

        if ($request->hasFile('images'))
            $this->mediaRepository->addMultipleMediaFromArray($product, $request->file('images'));

        return to_route('product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductDeleteRequest $request, Product $product): RedirectResponse
    {
        $this->repository->delete($product->id);

        return to_route('product.index');
    }
}
