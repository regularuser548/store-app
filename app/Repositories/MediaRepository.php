<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaRepository extends BaseRepository
{
    private const IMAGE_COLLECTION_NAME = 'default';
    private const VIDEO_COLLECTION_NAME = 'videos';

    public function __construct(Media $media)
    {
        parent::__construct($media);
    }

    public function firstMediaForEach(Collection $collection, string $mediaCollection = "default", string $urlType=""): array
    {
        return $collection->mapWithKeys(function ($model) use ($urlType, $mediaCollection) {
            // Return an associative array with the product id as key and image URLs as value
            return [
                $model->id => $model->getMedia($mediaCollection)?->first()?->getUrl($urlType)
            ];
        })?->toArray();
    }

    public function allMediaForModel(Model $model, string $mediaCollection = "default", string $urlType=""): array
    {
        return $model->getMedia($mediaCollection)->map(function ($mediaItem) use ($urlType) {
            return $mediaItem->getUrl($urlType);
        })->toArray();
    }

    public function allMediaForModelWithIds(Model $model, string $mediaCollection = "default", string $urlType=""): array
    {
        return $model->getMedia($mediaCollection)->map(function ($mediaItem) use ($urlType) {
            return ['id' => $mediaItem->id, 'url' => $mediaItem->getUrl($urlType)];
        })->toArray();
    }

    public function addMultipleMediaFromArray(Model $model, array $files, string $mediaCollection = "default"): bool
    {
        foreach ($files as $file) {
            // Add each file to the media library
            $model->addMedia($file)
                ->toMediaCollection($mediaCollection);
        }
        return true;
    }

    public function primaryImageForEach(Collection $collection, string $mediaCollection = self::IMAGE_COLLECTION_NAME, string $urlType=""): array
    {
        return $collection->mapWithKeys(function ($model) use ($urlType, $mediaCollection) {
            // Return an associative array with the product id as key and image URLs as value
            return [
                $model->id => $model->getMedia($mediaCollection, ['isPrimary' => true])?->first()?->getUrl($urlType)
            ];
        })?->toArray();
    }

    public function setPrimaryImage(Media $image): bool
    {
        $model = $image->model;
        $sortOrder = [];
        foreach ($model->getMedia(self::IMAGE_COLLECTION_NAME) as $mediaItem) {
            if ($image->id !== $mediaItem->id) {
                $mediaItem->forgetCustomProperty('isPrimary');
                $mediaItem->save();
                $sortOrder[] = $mediaItem->id;
            }
        }

        $image->setCustomProperty('isPrimary', true);
        $image->save();
        Media::setNewOrder([$image->id, ...$sortOrder]);

        return true;
    }

    public function syncMediaOrder(Model $model, array $mediaOrder, string $collectionName): bool
    {
        foreach ($mediaOrder as $index => $mediaId) {
            Media::where('id', $mediaId)->where('model_id', $model->id)->where('collection_name', $collectionName)->update(['order_column' => $index + 1]);
        }

        return true;
    }



}

