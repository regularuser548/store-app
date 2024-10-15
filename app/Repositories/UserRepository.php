<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        parent::__construct($user);
    }

//    public function allWithRolesAndPermissions(): Collection
//    {
//        return $this->model->with(['roles', 'permissions'])->get();
//    }
}
