<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\Product\Media\DeleteProductImageRequest;
use App\Http\Requests\Crm\Product\Media\SetPrimaryRequest;
use App\Http\Requests\Crm\Product\Media\StoreProductImagesRequest;
use App\Http\Requests\Crm\Product\Media\SyncMediaOrderRequest;
use App\Models\Product;
use App\Repositories\MediaRepository;
use Illuminate\Http\JsonResponse;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    protected MediaRepository $repository;

    public function __construct(MediaRepository $mediaRepository)
    {
        $this->repository = $mediaRepository;
    }

    public function syncMediaOrder(SyncMediaOrderRequest $request, Product $product): JsonResponse
    {
        $orderedMediaIds = $request->input('media_order'); // This will be an array of media IDs in the new order
        $collectionName = $request->input('collection_name');

        $this->repository->syncMediaOrder($product, $orderedMediaIds, $collectionName);

        return response()->json(['success' => true]);
    }

    public function setPrimaryImage(SetPrimaryRequest $request, Media $media): void
    {
        $this->repository->setPrimaryImage($media);
    }

    public function destroy(DeleteProductImageRequest $request, Media $media): void
    {
        $this->repository->delete($media->id);
    }

    public function store(StoreProductImagesRequest $request, Product $product): void
    {
        $this->repository->addMultipleMediaFromArray($product, $request->file('images'));
    }

}
