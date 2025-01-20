<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    /**
     * Display the avatar for the specified user.
     */
    public function show(User $user): JsonResponse
    {
        if (!auth()->user())
            return response()->json(['avatar_url' => public_path('/avatars/default.jpg')]);

        $avatar = $user->getFirstMediaUrl('avatars');

//        if (!$avatar) {
//            return response()->json(['message' => 'Avatar not found.'], 404);
//        }

        return response()->json(['avatar_url' => $avatar]);
    }

    /**
     * Store a newly uploaded avatar for the user.
     */
    public function store(Request $request, User $user): JsonResponse
    {
        //dd($request->file('avatar'));
        $request->validate([
            'avatar' => 'required|image|max:2048', // Validate image file up to 2MB
        ]);

        // Clear any existing avatar
        //$user->clearMediaCollection('avatars');

        // Add the new avatar
        $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');

        return response()->json([
            'message' => 'Avatar uploaded successfully.',
            'avatar_url' => $user->getFirstMediaUrl('avatars'),
        ]);
    }

    /**
     * Update the avatar for the specified user.
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'avatar' => 'required|image|max:2048', // Validate image file up to 2MB
        ]);

        // Clear existing avatar and update with the new one
        //$user->clearMediaCollection('avatars');
        $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');

        return response()->json([
            'message' => 'Avatar updated successfully.',
            'avatar_url' => $user->getFirstMediaUrl('avatars'),
        ]);
    }

    /**
     * Remove the avatar for the specified user.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->clearMediaCollection('avatars');

        return response()->json(['message' => 'Avatar deleted successfully.']);
    }
}
