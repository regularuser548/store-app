<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Interfaces\BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements BaseRepositoryInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    public function all(): Collection
    {
        return $this->model->all();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(array $data, $id)
    {
        $model = $this->model->findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id): true
    {
        $model = $this->model->findOrFail($id);
        $model->delete();
        return true;
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function paginateAndFilter($perPage = 15, $filters = [], $sortBy = 'created_at', $sortDirection = 'desc'): LengthAwarePaginator
    {
        $query = $this->model->query();

        // Apply filters if provided
        if (!empty($filters)) {
            foreach ($filters as $key => $value) {
                $query->where($key, 'like', "%$value%");
            }
        }

        // Apply sorting
        $query->orderBy($sortBy, $sortDirection);

        return $query->paginate($perPage);
    }

    public function firstMediaForEach(\Illuminate\Support\Collection $collection, string $mediaCollection = "default", string $urlType=""): array
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
