<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\MediaRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Konekt\Acl\Models\Permission;
use Konekt\Acl\Models\Role;

class UserRoleController extends Controller
{
    protected UserRepository $userRepository;
    protected MediaRepository $mediaRepository;

    public function __construct(UserRepository $userRepository, MediaRepository $mediaRepository)
    {
        $this->userRepository = $userRepository;
        $this->mediaRepository = $mediaRepository;
    }

    public function index() //Пробую сделать метод чтобы доставать только роли и разрешения
    {
        //$users = $this->userRepository->all();
        //return Inertia::render('Crm/UserRoles/Index', ['users' => $users]);

        //$users = $this->userRepository->allWithRolesAndPermissions();

        $users = $this->userRepository->all()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles()->pluck('name'),
            ];
        });


        return Inertia::render('Crm/UserRoles/Index', ['users' => $users]);
    }


    public function show(User $user)
    {
        $roles = $user->getRoleNames();
        $permissions = $user->getAllPermissions();
        return Inertia::render('Crm/UserRoles/Show', ['user' => $user, 'roles' => $roles, 'permissions' => $permissions]);
    }



    public function edit(User $user)
    {
        $roles = Role::all();
        $userRoles = $user->getRoleNames();
        $permissions = Permission::all();
        $userPermissions = $user->getAllPermissions();
        return Inertia::render('Crm/UserRoles/Edit', ['user' => $user, 'roles' => $roles, 'userRoles' => $userRoles,
            'permissions' => $permissions,
            'userPermissions' => $userPermissions
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|exists:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name|distinct'
        ]);
            $role = $request->input('role');
            $user->syncRoles($role);

        if ($request->has('permissions')) {
            $user->syncPermissions($request->input('permissions'));
        }

        return redirect()->route('user.show', $user->id)
            ->with('success', 'Roles was changed');
    }


    public function block(User $user)
    {
        $user->isBlocked = true;
        $user->save();

        return redirect()->route('user.index')->with('success', 'User blocked');
    }

    public function unblock(User $user)
    {
        $user->isBlocked = false;
        $user->save();

        return redirect()->route('user.index')->with('success', 'User unblocked');
    }

    public function viewUserOrders(User $user): Response
    {
        // Получаем все заказы пользователя и связанные продукты
        $userOrders = \DB::table('order_items as items')
            ->join('orders', 'items.order_id', '=', 'orders.id')
            ->join('products', 'items.product_id', '=', 'products.id')
            ->select(
                'orders.id as order_id',
                'orders.ordered_at as order_date',
                'items.quantity as ordered_quantity',
                'items.price as price_per_unit',
                'products.id as product_id',
                'products.name as product_name'
            )
            ->where('orders.user_id', $user->id)
            ->orderBy('orders.ordered_at', 'desc')
            ->get();

        return Inertia::render('Crm/UserRoles/ViewUserOrders', [
            'user' => $user,
            'orders' => $userOrders,
        ]);
    }
}
