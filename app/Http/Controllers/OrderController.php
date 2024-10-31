<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Vanilo\Cart\Facades\Cart;
use Vanilo\Foundation\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $cartItems = Cart::getItems()->map(function ($item) {
            return [
                'id' => $item->product->id,
                'name' => $item->product->name,
                'price' => $item->price,
                'quantity' => $item->quantity,
            ];
        });

        $total = $cartItems->sum(fn($item) => $item['price'] * $item['quantity']);

        return Inertia::render('Storefront/Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }
    public function showConfirmation($orderId)
    {
        return Inertia::render('Storefront/OrderConfirmation', ['orderId' => $orderId]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'notes' => 'nullable|string',
            'items' => 'required|array',
        ]);

        $order = Order::create([
            'number' => 'PO-' . now()->timestamp,
            'status' => 'pending',
            'user_id' => auth()->id(),
            'notes' => $validated['notes'] ?? '',
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_type' => 'product',
                'product_id'   => $item['id'],
                'name'         => $item['name'],
                'quantity'     => $item['quantity'],
                'price'        => $item['price'],
            ]);
        }


        Cart::clear();

        return redirect()->route('order.confirmation', ['orderId' => $order->id]);
//        return redirect()->route('checkout.index')
//            ->with('success', 'Order placed successfully!');
    }
}
