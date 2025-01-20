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
                'seller' => $item->product->seller,
                'image' => $item->product->getImageUrl(),
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




        $validated['items'] = collect($validated['items'])->map(function ($item) {
            // Добавляем seller_id в корневой уровень
            $item['seller_id'] = $item['seller']['id'];
            return $item;
        })->toArray();


        // Группируем товары по продавцам
        $itemsGroupedBySeller = collect($validated['items'])->groupBy('seller_id');

//        dump('Grouped items by seller_id:', $itemsGroupedBySeller->toArray());

//        dump($validated['items']);

//        dump($itemsGroupedBySeller);


        $orders = [];

        // Создаем заказы для каждого продавца
        foreach ($itemsGroupedBySeller as $sellerId => $items) {

            // Формируем полный адрес для каждого продавца
            $fullAddress = "{$validated['street']}, {$validated['house']}, {$validated['apartment']}";

            // Создаем запись в таблице addresses
            $address = Address::create([
                'city' => $validated['city'],
                'address' => $fullAddress,
                'name' => $validated['name'],
                'country_id' => 'UA',
            ]);

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
                'seller_id' => $sellerId, // Добавляем ID продавца в заказ
                'address_id' => $address->id,
            ]);

            // Добавляем товары в заказ
            foreach ($items as $item) {
                $order->items()->create([
                    'product_type' => 'App\Models\Product',
                    'product_id'   => $item['id'],
                    'name'         => $item['name'],
                    'quantity'     => $item['quantity'],
                    'price'        => $item['price'],
                ]);
            }

            $orders[] = $order;
        }

        // Преобразуем массив заказов в коллекцию
        $orderCollection = collect($orders);

        // Очистка корзины
        Cart::clear();

        return Inertia::render('Storefront/OrderConfirmation', ['orderIds' => $orderCollection->pluck('id')]);
    }




//    public function store(Request $request)
//    {
//        $validated = $request->validate([
//            'name' => 'required|string|max:255',
//            'surname' => 'required|string|max:255',
//            'email' => 'required|email',
//            'phone_number' => 'required|string|regex:/^\+380\d{9}$/',
//            'notes' => 'nullable|string',
//            'items' => 'required|array',
//            'city' => 'required|string|max:255',
//            'street' => 'nullable|string|max:255',
//            'house' => 'nullable|string|max:255',
//            'apartment' => 'nullable|string|max:255',
//        ]);
//
//
//        // Обновляем данные пользователя
//        $user = auth()->user();
//        $user->update([
//            'street' => $validated['street'],
//            'house' => $validated['house'],
//            'apartment' => $validated['apartment'],
//        ]);
//
//        // Формируем полный адрес
//        $fullAddress = "{$validated['street']}, {$validated['house']}, {$validated['apartment']}";
//
//        // Создаем запись в таблице addresses
//        $address = Address::create([
//            'city' => $validated['city'],
//            'address' => $fullAddress,
//            'name' => $validated['name'],
//            'country_id' => 'UA',
//        ]);
//
//        // Создаем заказ
//        $orderNumber = 'PO-' . str_pad(Order::max('id') + 1, 4, '0', STR_PAD_LEFT);
//
//        $order = Order::create([
//            'number' => $orderNumber,
//            'status' => 'pending',
//            'user_id' => $user->id,
//            'notes' => $validated['notes'] ?? '',
//            'name' => $validated['name'],
//            'surname' => $validated['surname'],
//            'email' => $validated['email'],
//            'phone_number' => $validated['phone_number'],
//            'shipping_address_id' => $address->id,
//        ]);
//
//        // Добавляем товары в заказ
//        foreach ($validated['items'] as $item) {
//            $order->items()->create([
//                'product_type' => 'App\Models\Product',
//                'product_id'   => $item['id'],
//                'name'         => $item['name'],
//                'quantity'     => $item['quantity'],
//                'price'        => $item['price'],
//            ]);
//        }
//
//        // Очистка корзины
//        Cart::clear();
//
//        return Inertia::render('Storefront/OrderConfirmation', ['orderId' => $order->id]);
//    }

}
