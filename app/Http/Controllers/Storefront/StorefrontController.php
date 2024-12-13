<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Product;
use App\Repositories\MediaRepository;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StorefrontController extends Controller
{
    protected ProductRepository $repository;
    protected MediaRepository $mediaRepository;

    public function __construct(ProductRepository $productRepository, MediaRepository $mediaRepository)
    {
        $this->repository = $productRepository;
        $this->mediaRepository = $mediaRepository;
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

    public function search(Request $request): Response
    {
        //todo: переделать с использованием https://vanilo.io/docs/4.x/product-search
        $query = $request->input('query');

        $products = Product::where('name', 'like', '%' . $query . '%')->get();

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

}
