<?php

namespace App\Repositories;

use App\Http\Controllers\Crm\TaxonomyController;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Vanilo\Category\Contracts\Taxonomy;

class TaxonomyRepository extends BaseRepository
{
    private TaxonRepository $taxonRepository;
    public function __construct(Taxonomy $taxonomy, TaxonRepository $taxonRepository)
    {
        parent::__construct($taxonomy);
        $this->taxonRepository = $taxonRepository;
    }

    public function buildTaxonomyTree(Collection $taxonomies): Collection
    {
        return $taxonomies->map(function ($taxonomy) {
            return [
                'id' => $taxonomy->id,
                'slug' => $taxonomy->slug,
                'name' => $taxonomy->name,
                'children' => $taxonomy->rootLevelTaxons()->map(function ($taxon) {
                    return $this->taxonRepository->buildTaxonTree($taxon);
                })
            ];
        });
    }


}

