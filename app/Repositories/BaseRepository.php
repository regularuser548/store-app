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

}
