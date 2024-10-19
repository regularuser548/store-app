<?php

namespace App\Repositories;

use App\Http\Controllers\Crm\TaxonomyController;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Vanilo\Category\Contracts\Taxonomy;

class TaxonomyRepository extends BaseRepository
{
    public function __construct(Taxonomy $taxonomy)
    {
        parent::__construct($taxonomy);
    }


}

