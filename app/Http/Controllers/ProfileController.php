<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Product;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
//    public function edit(Request $request): Response
//    {
//        return Inertia::render('Profile/Edit', [
//            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
//            'status' => session('status'),
//        ]);
//    }

//    public function edit(Request $request): Response
//    {
//        $user = $request->user();
//        $orders = $user->orders()->with('items')->get();
//
//        return Inertia::render('Profile/Edit', [
//            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
//            'status' => session('status'),
//            'userData' => [
//                'name' => $user->name,
//                'surname' => $user->surname ?? 'Пусто',
//                'phone_number' => $user->phone_number ?? 'Пусто',
//                'email' => $user->email,
//            ],
//            'orders' => $orders->map(function ($order) {
//                return [
//                    'id' => $order->id,
//                    'name' => $order->name,
//                    'phone_number' => $order->phone_number,
//                    'items' => $order->items->map(function ($item) {
//                        return [
//                            'name' => $item->name,
//                            'quantity' => $item->quantity,
//                            'price' => $item->price,
//                        ];
//                    }),
//                ];
//            }),
//        ]);
//    }

    public function edit(Request $request): Response
    {
        $user = $request->user();
        $orders = $user->orders()->with('items')->get();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'userData' => [
                'name' => $user->name,
                'surname' => $user->surname,
                'phone_number' => $user->phone_number,
                'email' => $user->email,
                'street' => $user->street,
                'house' => $user->house,
                'apartment' => $user->apartment,
            ],
            'orders' => $orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'name' => $order->name,
                    'phone_number' => $order->phone_number,
                    'items' => $order->items->map(function ($item) {
                        return [
                            'name' => $item->name,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                        ];
                    }),
                ];
            }),
        ]);
    }

    /**
     * Update the user's profile information.
     */

    public function update(ProfileUpdateRequest $request)
    {
        $validatedData = $request->validated();

        $user = \auth()->user();

//        $user->fill([
//            'email' => $validatedData['email'] ?? $user->email,
//            'phone_number' => $validatedData['phone_number'] ?? $user->phone_number,
//            'surname' => $validatedData['surname'] ?? $user->surname,
//            'name' => $validatedData['name'] ?? $user->name,
//        ]);

        $user->fill([
            'email' => $validatedData['email'] ?? $user->email,
            'phone_number' => $validatedData['phone_number'] ?? $user->phone_number,
            'surname' => $validatedData['surname'] ?? $user->surname,
            'name' => $validatedData['name'] ?? $user->name,
            'street' => $validatedData['street'] ?? $user->street,
            'house' => $validatedData['house'] ?? $user->house,
            'apartment' => $validatedData['apartment'] ?? $user->apartment,
        ]);


        if ($user->isDirty('email')) {
            $user->forceFill(['email_verified_at' => null]);
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Профіль оновлено',
        ]);
    }


    public function orders()
    {
        $orders = auth()->user()->orders()->with('items')->get()->map(function ($order) {
            $order->date = $order->created_at->format('d.m.Y');
            $order->status = $order->status ?? 'Очікується';
            $order->items->each(function ($item) {
//                dd($item->product);
                  $item->image = $item->product?->getImageUrl();

            });
//            dd($order);
            return $order;
        });
//        dd($orders);
        return inertia('Storefront/MyOrders', ['orders' => $orders]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

//    public function update(ProfileUpdateRequest $request): RedirectResponse
//    {
//        $request->user()->fill($request->validated());
//
//        if ($request->user()->isDirty('email')) {
//            $request->user()->email_verified_at = null;
//        }
//
//        $request->user()->save();
//
//        return Redirect::route('profile.edit');
//    }

//    public function update(ProfileUpdateRequest $request)
//    {
////        \auth()->user()->update($request->all());
//
//        $validatedData = $request->validated();
//
//        $user = \auth()->user();
//
//        $user->update($validatedData);
//
//        if ($request->user()->isDirty('email')) {
//            $request->user()->email_verified_at = null;
//        }
//
//        $request->user()->save();
//
//        return response()->json(['success' => true, 'message' => 'Профиль обновлен']);
//    }
