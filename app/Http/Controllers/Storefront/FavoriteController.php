<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Favorite::with('product')
            ->where('user_id', auth()->id())
            ->get();

        return Inertia::render('Favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function store(Request $request)
    {
        // Добавление товара в избранное
        $request->validate(['product_id' => 'required|exists:products,id']);

        $favorite = Favorite::firstOrCreate([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json(['message' => 'Product added to favorites', 'favorite' => $favorite]);
    }

    public function exists($productId)
    {
        $exists = Favorite::where('user_id', auth()->id())
            ->where('product_id', $productId)
            ->exists();

        return response()->json(['exists' => $exists]);
    }

    public function destroy($id)
    {
        // Удаление товара из избранного
        $favorite = Favorite::where('user_id', auth()->id())->where('product_id', $id)->first();

        if (!$favorite) {
            return response()->json(['message' => 'Product not found in favorites'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Product removed from favorites']);
    }
}
