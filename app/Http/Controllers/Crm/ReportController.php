<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Vanilo\Foundation\Models\Order;


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
                'items.price',
                \DB::raw('SUM(items.quantity) as total_quantity'),
                \DB::raw('COUNT(orders.id) as total_orders')
            )
            ->groupBy('items.product_id', 'products.name', 'items.price');

        // Если пользователь "seller", добавляем фильтрацию по его продуктам
        if ($isSeller) {
            $query->where('products.seller_id', $currentUser->id);
        }

        $salesData = $query->orderBy('total_quantity', 'desc')->get();

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
        $productStatistics = \DB::table('order_items as items')
            ->join('orders', 'items.order_id', '=', 'orders.id')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select(
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email',
                'items.name as product_name',
                'items.price',
                \DB::raw('SUM(items.quantity) as total_quantity_by_user'),
                \DB::raw('COUNT(items.order_id) as total_orders_by_user')
            )
            ->where('items.product_id', $productId)
            ->groupBy('users.id', 'users.name', 'users.email', 'items.name', 'items.price')
            ->orderBy('total_quantity_by_user', 'desc')
            ->get();

        return Inertia::render('Crm/Reports/OrderStatistics', ['productStatistics' => $productStatistics]);
    }



}
