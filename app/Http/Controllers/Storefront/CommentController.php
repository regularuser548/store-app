<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Vanilo\Foundation\Models\Product;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['user'])->get();
        return Inertia::render('Comments/Index', ['comments' => $comments]);
    }

//    public function show(Product $product)
//    {
//        $comments = Comment::where('product_id', $product->id)
//            ->with('user') // Загрузка связанного пользователя
//            ->orderBy('created_at', 'desc')
//            ->get();
//
//        return Inertia::render('Storefront/Show', [
//            'product' => $product,
//            'comments' => $comments,
//        ]);
//    }

    public function show(Product $product)
    {
        $comments = Comment::where('product_id', $product->id)
            ->with('user')
            ->get()
            ->map(function ($comment) {
                $user = auth()->user();
                $comment->can_delete = $user->role === 'admin'
                    || $user->role === 'moderator'
                    || $user->id === $comment->user_id;
                return $comment;
            });


        return Inertia::render('Storefront/Show', [
            'product' => $product,
            'comments' => $comments,
        ]);
    }



    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'comment' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        // Проверка, заказывал ли пользователь товар
        $hasOrderedProduct = \DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.user_id', auth()->id())
            ->where('order_items.product_id', $request->product_id)
            ->exists();

//        if (!$hasOrderedProduct) {
//            return back()->withErrors(['error' => 'Вы не можете оставить комментарий, так как не заказывали этот товар.']);
//        }

//        dd($request->all());
        Comment::create([
            'user_id' => auth()->id(),
            'order_id' => null,
            'product_id' => $request->product_id,
            'comment' => $request->comment,
            'rating' => $request->rating,
        ]);


        return back()->with('success', 'Комментарий успешно добавлен!');
    }

    public function destroy(Comment $comment)
    {
        $user = auth()->user();

        if ($user->role === 'admin' || $user->role === 'moderator' || $user->id === $comment->user_id) {
            $comment->delete();
            return back()->with('success', 'Комментарий удален!');
        }

        return back()->withErrors(['error' => 'У вас нет прав для удаления этого комментария.']);
    }



//    public function destroy(Comment $comment)
//    {
//        $this->authorize('delete', $comment);
//        $comment->delete();
//
//        return back()->with('success', 'Комментарий удален!');
//    }
}
