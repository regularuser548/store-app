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
        $product = Product::find($productId);

        $cartItem = Cart::getItems()->firstWhere('product.id', $productId);

        if (!$cartItem) {
            return response()->json(['error' => 'Product not found in cart'], 400);
        }

        if ($newQuantity < 1) {
            return response()->json(['error' => 'Quantity can’t be less than 1'], 400);
        }

        if ($cartItem->product->stock < $newQuantity) {
            return response()->json(['error' => 'На складе доступно только '.$newQuantity -1  ." штук товара ".$product->name], 400);
        }


        $cartItem->quantity = $newQuantity;
        $cartItem->save();

        return response()->json(['success' => 'Quantity updated', 'quantity' => $newQuantity], 200);
    }

    public function showCart()
    {
        $cartItems = Cart::getItems()->map(function ($item) {
            //$product = Product::find($item->product->id);
            return [
                'id' => $item->product->id,
                'name' => $item->product->name,
                //'image' => $item->product->getMedia()?->first()?->getUrl(),
                'image' => $item->product->getMedia()?->first()?->getUrl(),
                'price' => $item->price,
                'seller' => $item->product->seller->name,
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
        //return response()->json(['success' => true, 'message' => "Товар доданий до кошику"]);
    }

    public function removeFromCart(Request $request,Product $product)
    {
        //$product = Product::find($request->input('product.id'));

        Cart::removeProduct($product);

//        return back()->with('success', "Product removed from cart");
        return response()->json(['success' => true, 'message' => "Product removed from cart"]);
    }

    public function addMultipleToCart(Request $request)
    {
        $productIds = $request->input('productIds', []);

        if (empty($productIds)) {
            return response()->json(['success' => false, 'message' => 'Список товарів порожній.'], 400);
        }

        $products = Product::whereIn('id', $productIds)->get();

        if ($products->isEmpty()) {
            return response()->json(['success' => false, 'message' => 'Не знайдено жодного товару.'], 404);
        }

        foreach ($products as $product) {
            Cart::addItem($product);
        }

        return response()->json(['success' => true, 'message' => 'Всі товари додані до кошику.']);
    }

}
