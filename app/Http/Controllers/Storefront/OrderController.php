<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
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

        $userData = auth()->check() ? ['name' => auth()->user()->name, 'email' => auth()->user()->email] : ['name' => '', 'email' => ''];

        return Inertia::render('Storefront/Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
            'userData' => $userData,
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

        $orderNumber = 'PO-' . str_pad(Order::max('id') + 1, 4, '0', STR_PAD_LEFT);

        $order = Order::create([
            'number' => $orderNumber,
            'status' => 'pending',
            'user_id' => auth()->id(),
            'notes' => $validated['notes'] ?? '',
            'name' => $validated['name'],
            'email' => $validated['email'],
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
    }
}
