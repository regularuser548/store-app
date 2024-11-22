<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function index()
    {
        // Отображение всех комментариев
        $comments = Comment::with(['user', 'order'])->get();
        return Inertia::render('Comments/Index', ['comments' => $comments]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'nullable|exists:orders,id',
            'content' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5', // Проверка оценки
            'photo' => 'nullable|image|max:2048', // Проверка фото
        ]);

        // Загрузка фото, если оно было добавлено
        $photoPath = $request->hasFile('photo')
            ? $request->file('photo')->store('comments/photos', 'public')
            : null;

        Comment::create([
            'user_id' => auth()->id(),
            'order_id' => $request->input('order_id'),
            'content' => $request->input('content'),
            'rating' => $request->input('rating'),
            'photo' => $photoPath,
        ]);

        return back()->with('success', 'Комментарий добавлен!');
    }


    public function destroy(Comment $comment)
    {
        // Удаление комментария
        $this->authorize('delete', $comment); // Добавить авторизацию, если требуется
        $comment->delete();

        return back()->with('success', 'Комментарий удален!');
    }
}
