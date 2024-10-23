<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Vanilo\Cart\Contracts\CartItem;
use Vanilo\Cart\Facades\Cart;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $product = Product::findOrFail($request->input('product.id'));

        Cart::addItem($product);

        return back()->with('success', "Product added to cart");
    }

    public function removeFromCart(Request $request)
    {
        $product = Product::findOrFail($request->input('product.id'));

        Cart::removeItem($product);

        return back()->with('success', "Product removed from cart");
    }

    public function addQuantity(Request $request)
    {
        $productId = $request->input('product_id');
        $cartItem = Cart::getItems()->firstWhere('product.id', $productId);

        if (!$cartItem) {
            return response()->json(['error' => 'Product not found in cart'], 400);
        }

        $newQuantity = $cartItem->quantity + 1;

        Cart::removeItem($cartItem);
        Cart::addItem($cartItem->product, $newQuantity);

        return response()->json(['success' => 'Quantity increased', 'quantity' => $newQuantity], 200);
    }

    public function removeQuantity(Request $request)
    {
        $productId = $request->input('product_id');
        $cartItem = Cart::getItems()->firstWhere('product.id', $productId);

        if (!$cartItem) {
            return response()->json(['error' => 'Product not found in cart'], 400);
        }

        $newQuantity = max($cartItem->quantity - 1, 0);

        Cart::removeItem($cartItem);

        if ($newQuantity > 0) {
            Cart::addItem($cartItem->product, $newQuantity);
        }

        return response()->json(['success' => 'Quantity decreased', 'quantity' => $newQuantity], 200);
    }



    public function showCart()
    {
        $cartItems = Cart::getItems();
        $cartItems = $cartItems->map(function ($item) {
            $item['id'] = $item->product->id;
            $item['name'] = $item->product->name;
            $item['image'] = $item->product->getMedia()?->first()?->getUrl();
            return $item;
        });
        $total = $cartItems->sum(fn($item) => $item->price * $item->quantity);

        return inertia('Storefront/Cart/Show', ['cart' => $cartItems, 'total' => $total]);
    }


}
