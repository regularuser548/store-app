<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ProductRepository extends BaseRepository
{
    public function __construct(Product $product)
    {
        parent::__construct($product);
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

    public function addMultipleMediaFromArray(Model $model, array $files, string $mediaCollection = "default"): bool
    {
        foreach ($files as $file) {
            // Add each file to the media library
            $model->addMedia($file)
                ->toMediaCollection($mediaCollection);
        }
        return true;
    }
}

