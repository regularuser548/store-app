<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Vanilo\Foundation\Models\Order;
use Vanilo\Foundation\Models\Address;


class ReportController extends Controller
{

    public function salesReport()
    {
        $currentUser = Auth::user();
        $isSeller = $currentUser->hasRole('seller');

        $query = \DB::table('order_items as items')
            ->join('orders', 'items.order_id', '=', 'orders.id')
            ->join('products', 'items.product_id', '=', 'products.id')
            ->select(
                'items.product_id as id',
                'products.name as product_name',
                \DB::raw('CAST(items.price AS DECIMAL(10, 2)) as price'),
                \DB::raw('SUM(items.quantity) as total_quantity'),
                \DB::raw('COUNT(orders.id) as total_orders')
            )
            ->groupBy('items.product_id', 'products.name', 'items.price');

        if ($isSeller) {
            $query->where('products.seller_id', $currentUser->id);
        }

        $salesData = $query->orderBy('total_quantity', 'desc')->get();

        $salesData->transform(function ($item) {
            $item->price = is_numeric($item->price) ? number_format($item->price, 2, '.', '') : null;
            return $item;
        });


        return Inertia::render('Crm/Reports/SalesReport', ['salesData' => $salesData]);
    }


    public function userActivityReport()
    {
        $userActivityData = \DB::table('users')
            ->leftJoin('orders', 'users.id', '=', 'orders.user_id')
            ->select('users.id', 'users.name', 'users.email', \DB::raw('COUNT(orders.id) as orders_count'))
            ->groupBy('users.id')
            ->orderBy('orders_count', 'desc')
            ->get();

        return Inertia::render('Crm/Reports/UserActivityReport', ['userActivityData' => $userActivityData]);
    }


    public function orderStatistics($productId)
    {
        $currentUser = Auth::user();

        $productStatistics = \DB::table('order_items as items')
            ->join('orders', 'items.order_id', '=', 'orders.id')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select(
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email',
                'users.surname',
                'users.phone_number',
                'orders.status',
                'items.name as product_name',
                'items.price',
                \DB::raw('SUM(items.quantity) as total_quantity_by_user'),
                \DB::raw('COUNT(items.order_id) as total_orders_by_user')
            )
            ->where('items.product_id', $productId)
            ->groupBy(
                'users.id',
                'users.name',
                'users.email',
                'users.surname',
                'users.phone_number',
                'orders.status',
                'items.name',
                'items.price'
            )
            ->orderBy('total_quantity_by_user', 'desc')
            ->get();

        return Inertia::render('Crm/Reports/OrderStatistics', [
            'productStatistics' => $productStatistics,
            'userRole' => $currentUser->roles->pluck('name')->first(),
        ]);
    }

    public function userOrders($userId)
    {
        $orders = \DB::table('orders')
            ->where('user_id', $userId)
            ->select('id', 'user_id', 'status', 'created_at', 'name', 'surname', 'email', 'phone_number', 'status')
            ->get();

        $orderItems = \DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->whereIn('order_id', $orders->pluck('id'))
            ->select(
                'order_items.order_id',
                'products.name as product_name',
                'order_items.quantity',
                'order_items.price',
                'order_items.created_at',
            )
            ->get();

        return Inertia::render('Crm/Reports/UserOrders', [
            'orders' => $orders,
            'orderItems' => $orderItems,
        ]);
    }







// Добавление city и address в метод updateOrderStatistics
    public function updateOrderStatistics(Request $request)
    {
        \Log::info('Request data', $request->all());

        $validatedData = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $currentUser = Auth::user();

        if ($currentUser->hasRole('seller')) {
            // Обновление только статуса заказа
            \DB::table('orders')
                ->where('id', $validatedData['order_id'])
                ->update(['status' => $validatedData['status']]);
        } elseif ($currentUser->hasRole('moderator') || $currentUser->hasRole('admin')) {
            // Обновление статуса, почты и телефона для указанного заказа
            \DB::table('orders')
                ->where('id', $validatedData['order_id'])
                ->update([
                    'status' => $validatedData['status'],
                    'email' => $validatedData['email'],
                    'phone_number' => $validatedData['phone_number'],
                ]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(['message' => 'Order updated successfully']);
    }





}
