<?php

namespace App\Repositories;

use App\Http\Controllers\Crm\TaxonomyController;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Vanilo\Category\Contracts\Taxon as TaxonContract;
use Vanilo\Category\Contracts\Taxonomy;
use Vanilo\Foundation\Models\Taxon;

class TaxonRepository extends BaseRepository
{
    public function __construct(TaxonContract $taxon)
    {
        parent::__construct($taxon);
    }

    public function buildTaxonTree(Taxon $taxon, string $idAlias = 'id', string $nameAlias = 'name'): array
    {
        $tree = [
            $idAlias => $taxon->id,
            $nameAlias => $taxon->name,
        ];

        foreach ($taxon->children as $child) {
            $tree['children'][] = $this->buildTaxonTree($child, $idAlias, $nameAlias);
        }

        return $tree;
    }

}

