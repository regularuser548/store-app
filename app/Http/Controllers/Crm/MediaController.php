<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\SetPrimaryRequest;
use App\Models\Product;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    protected MediaRepository $repository;

    public function __construct(MediaRepository $mediaRepository)
    {
        $this->repository = $mediaRepository;
    }

    public function syncMediaOrder(Request $request, Product $product)
    {
        $request->validate([
            'media_order' => 'required|list',
            'media_order.*' => 'exists:media,id|distinct',
            'collection_name' => 'required|string|in:default,videos',
            ]);

        $orderedMediaIds = $request->input('media_order'); // This will be an array of media IDs in the new order
        $collectionName = $request->input('collection_name');

        $this->repository->syncMediaOrder($product, $orderedMediaIds, $collectionName);

        return response()->json(['success' => true]);
    }

    public function setPrimaryImage(SetPrimaryRequest $request, Media $media)
    {
        $this->repository->setPrimaryImage($media);
    }

}
