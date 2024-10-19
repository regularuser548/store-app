<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $product = $request->input('product');
        $cart = Session::get('cart', []);

        if (isset($cart[$product['id']])) {
            $cart[$product['id']]['quantity']++;
        } else {
            $cart[$product['id']] = [
                'name' => $product['name'],
                'price' => $product['price'],
                'quantity' => 1
            ];
        }

        Session::put('cart', $cart);
        return back()->with('success', 'Product added to cart');
    }

    public function showCart()
    {
        $cart = Session::get('cart', []);
        return inertia('Storefront/Cart/Show', ['cart' => $cart]);
    }

    public function removeItem($id)
    {
        $cart = Session::get('cart', []);
        if (isset($cart[$id])) {
            unset($cart[$id]);
            Session::put('cart', $cart);
        }
        return back()->with('success', 'Item removed from cart');
    }
}
