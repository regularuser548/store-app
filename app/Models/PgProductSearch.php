<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Konekt\Search\Exceptions\UnsupportedOperationException;
use Vanilo\Foundation\Search\ProductSearch;

class PgProductSearch extends ProductSearch
{
    //Workaround to achieve case-insensitive search on pgsql
    public function nameContains(string $term): self
    {
        if ('pgsql' === DB::connection()->getDriverName()) {
            $this->productQuery->where('name', 'ilike', "%$term%");
            $this->masterProductQuery->where('name', 'ilike', "%$term%");
            $this->variantQuery?->where('name', 'ilike', "%$term%");

            return $this;
        }

       return parent::nameContains($term);

    }
}
