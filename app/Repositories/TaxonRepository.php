<?php

namespace App\Repositories;

use Illuminate\Support\Collection;
use Vanilo\Category\Contracts\Taxon as TaxonContract;
use Vanilo\Foundation\Models\Taxon;

class TaxonRepository extends BaseRepository
{
    public function __construct(TaxonContract $taxon)
    {
        parent::__construct($taxon);
    }

    public function buildTaxonTree(Taxon $taxon): array
    {
        $tree = [
            'id' => $taxon->id,
            'name' => $taxon->name,
        ];

        foreach ($taxon->children as $child) {
            $tree['children'][] = $this->buildTaxonTree($child);
        }

        return $tree;
    }

    public function findTaxonParents(Taxon $taxon)
    {
        $parents = [$taxon];
        $parent = $taxon->parent;

        if ($parent === null)
            return $parents;

        $parents[] = $this->findTaxonParents($parent);
        return $parent;
    }


}

