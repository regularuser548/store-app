<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Cities;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Vanilo\Cart\Facades\Cart;
use Vanilo\Foundation\Models\Address;
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
                'image' => Product::find($item->product->id)->getImageUrl(),
            ];
        });

        $total = $cartItems->sum(fn($item) => $item['price'] * $item['quantity']);

        $userData = auth()->check()
            ? [
                'name' => auth()->user()->name,
                'surname' => auth()->user()->surname ?? '',
                'email' => auth()->user()->email,
                'phone_number' => auth()->user()->phone_number ?? '',
                'street' => auth()->user()->street ?? '',
                'house' => auth()->user()->house ?? '',
                'apartment' => auth()->user()->apartment ?? '',
            ]
            : [
                'name' => '',
                'surname' => '',
                'email' => '',
                'phone_number' => '',
                'street' => '',
                'house' => '',
                'apartment' => '',
            ];

        $cities = Cities::select('id', 'name')->get();

        return Inertia::render('Storefront/Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
            'userData' => $userData,
            'cities' => $cities,
        ]);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email',
            'phone_number' => 'required|string|regex:/^\+380\d{9}$/',
            'notes' => 'nullable|string',
            'items' => 'required|array',
            'city' => 'required|string|max:255',
            'street' => 'nullable|string|max:255',
            'house' => 'nullable|string|max:255',
            'apartment' => 'nullable|string|max:255',
        ]);


        // Обновляем данные пользователя
        $user = auth()->user();
        $user->update([
            'street' => $validated['street'],
            'house' => $validated['house'],
            'apartment' => $validated['apartment'],
        ]);

        // Формируем полный адрес
        $fullAddress = "{$validated['street']}, {$validated['house']}, {$validated['apartment']}";

        // Создаем запись в таблице addresses
        $address = Address::create([
            'city' => $validated['city'],
            'address' => $fullAddress,
            'name' => $validated['name'],
            'country_id' => 'UA',
        ]);

        // Создаем заказ
        $orderNumber = 'PO-' . str_pad(Order::max('id') + 1, 4, '0', STR_PAD_LEFT);

        $order = Order::create([
            'number' => $orderNumber,
            'status' => 'pending',
            'user_id' => $user->id,
            'notes' => $validated['notes'] ?? '',
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'shipping_address_id' => $address->id,
        ]);

        // Добавляем товары в заказ
        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_type' => 'product',
                'product_id'   => $item['id'],
                'name'         => $item['name'],
                'quantity'     => $item['quantity'],
                'price'        => $item['price'],
            ]);
        }

        // Очистка корзины
        Cart::clear();

        return Inertia::render('Storefront/OrderConfirmation', ['orderId' => $order->id]);
    }



//    public function store(Request $request)
//    {
//        $validated = $request->validate([
//            'name' => 'required|string|max:255',
//            'surname' => 'required|string|max:255', // Валидация для фамилии
//            'email' => 'required|email',
//            'phone_number' => 'required|string|regex:/^\+380\d{9}$/', // Валидация телефона
//            'notes' => 'nullable|string',
//            'items' => 'required|array',
//            'city' => 'required|string|max:255',
//            'address' => 'required|string|max:500',
//        ]);
//
//        // Создаем заказ
//        $orderNumber = 'PO-' . str_pad(Order::max('id') + 1, 4, '0', STR_PAD_LEFT);
//
//        $order = Order::create([
//            'number' => $orderNumber,
//            'status' => 'pending',
//            'user_id' => auth()->id(),
//            'notes' => $validated['notes'] ?? '',
//            'name' => $validated['name'],
//            'surname' => $validated['surname'], // Сохраняем фамилию
//            'email' => $validated['email'],
//            'phone_number' => $validated['phone_number'], // Сохраняем номер телефона
//        ]);
//
//        // Создаем адрес
//
//        $address = Address::create([
//            'city' => $validated['city'],
//            'address' => $validated['address'],
//            'name' => '',
//            'country_id' => 'UA'
//        ]);
//
//        // Привязываем адрес к заказу (если есть связь, например order_id)
//        $order->shipping_address_id = $address->id;
//        $order->save();
//
//        // Добавляем товары в заказ
//        foreach ($validated['items'] as $item) {
//            $order->items()->create([
//                'product_type' => 'product',
//                'product_id'   => $item['id'],
//                'name'         => $item['name'],
//                'quantity'     => $item['quantity'],
//                'price'        => $item['price'],
//            ]);
//        }
//
//        // Очищаем корзину
//        Cart::clear();
//
//        return redirect()->route('order.confirmation', ['orderId' => $order->id]);
//    }
}
