<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Favorite;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Favorite::where('user_id', auth()->id())
            ->with('product')
            ->get()
            ->map(function ($favorite) {
                return $favorite->product;
            });

        return Inertia::render('Storefront/Favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function toggleLike(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);

        // Переключаем состояние `is_liked`
        $isLiked = Favorite::where('user_id', auth()->id())
            ->where('product_id', $product->id)
            ->exists();

        if ($isLiked) {
            Favorite::where('user_id', auth()->id())
                ->where('product_id', $product->id)
                ->delete();
        } else {
            Favorite::create([
                'user_id' => auth()->id(),
                'product_id' => $product->id,
            ]);
        }

        return response()->json([
            'is_liked' => !$isLiked,
            'message' => !$isLiked
                ? 'Товар добавлен в избранное'
                : 'Товар удалён из избранного',
        ]);
    }



//    public function exists($productId)
//    {
//        $exists = Favorite::where('user_id', auth()->id())
//            ->where('product_id', $productId)
//            ->exists();
//
//        return response()->json(['exists' => $exists]);
//    }

    //    public function store(Request $request)
//    {
//        $product = Product::findOrFail($request->input('product_id'));
//
//        Favorite::updateOrCreate([
//            'user_id' => auth()->id(),
//            'product_id' => $product->id,
//        ]);
//
//        return back()->with('success', "Product added to favorites");
//    }

//    public function destroy($productId)
//    {
//        $favorite = Favorite::where('user_id', auth()->id())
//            ->where('product_id', $productId)
//            ->first();
//
//        if (!$favorite) {
//            return response()->json(['message' => 'Product not found in favorites'], 404);
//        }
//
//        $favorite->delete();
//
//        return response()->json(['message' => 'Product removed from favorites']);
//    }

}
