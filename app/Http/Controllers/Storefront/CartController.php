<?php


namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Vanilo\Cart\Facades\Cart;

class CartController extends Controller
{
    public function updateQuantity(Request $request)
    {
        $productId = $request->input('product_id');
        $newQuantity = $request->input('quantity');

        $cartItem = Cart::getItems()->firstWhere('product.id', $productId);

        if (!$cartItem) {
            return response()->json(['error' => 'Product not found in cart'], 400);
        }

        if ($newQuantity < 1) {
            return response()->json(['error' => 'Quantity can’t be less than 1'], 400);
        }

        if ($cartItem->product->stock < $newQuantity) {
            return response()->json(['error' => 'Quantity exceeds available stock'], 400);
        }

        $cartItem->quantity = $newQuantity;
        $cartItem->save();

        return response()->json(['success' => 'Quantity updated', 'quantity' => $newQuantity], 200);
    }

    public function showCart()
    {
        $cartItems = Cart::getItems()->map(function ($item) {
            return [
                'id' => $item->product->id,
                'name' => $item->product->name,
                'image' => $item->product->getMedia()?->first()?->getUrl(),
                'price' => $item->price,
                'quantity' => $item->quantity,
            ];
        });

        $total = $cartItems->sum(fn($item) => $item['price'] * $item['quantity']);

        return inertia('Storefront/Cart/Show', ['cart' => $cartItems, 'total' => $total]);
    }
    public function addToCart(Request $request)
    {
        $product = Product::findOrFail($request->input('product.id'));

        Cart::addItem($product);

        return back()->with('success', "Product added to cart");
    }

    public function removeFromCart(Request $request,Product $product)
    {
        //$product = Product::find($request->input('product.id'));

        Cart::removeProduct($product);

        return back()->with('success', "Product removed from cart");
    }
}
