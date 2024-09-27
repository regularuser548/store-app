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


    public function firstMediaFromCollection(Collection $collection, string $mediaCollection = "default", string $urlType=""): Collection
    {
        return $collection->mapWithKeys(function ($model) use ($urlType, $mediaCollection) {
            // Return an associative array with the product id as key and image URLs as value
            return [
                $model->id => $model->getMedia($mediaCollection)?->first()?->getUrl($urlType)
            ];
        });
    }

    public function allMedia(Model $model, string $mediaCollection = "default", string $urlType="")
    {
        return $imageUrls = $model->getMedia($mediaCollection)->map(function ($mediaItem) use ($urlType) {
            return $mediaItem->getUrl($urlType);
        });
    }

//    public function firstMedia(Model $model, string $mediaCollection = "default", string $urlType=""): Collection
//    {
//
//    }
//
//
//    public function addMultipleMedia(Model $model, string $mediaCollection = "default"): bool
//    {
//
//    }
}

