<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use App\Repositories\TaxonomyRepository;
use App\Repositories\TaxonRepository;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use App\Http\Requests\Crm\Taxon\CreateTaxon;
use App\Http\Requests\Crm\Taxon\CreateTaxonForm;
use App\Http\Requests\Crm\Taxon\UpdateTaxon;
use Inertia\Inertia;
use Inertia\Response;
use Vanilo\Category\Contracts\Taxonomy;
use Vanilo\Category\Models\Taxon;
use Vanilo\Category\Models\TaxonProxy;

class TaxonController extends Controller
{
    protected TaxonRepository $repository;
    public function __construct(TaxonRepository $taxonRepository)
    {
        $this->repository = $taxonRepository;
    }
    public function create(CreateTaxonForm $request, Taxonomy $taxonomy): Response
    {
        $taxon = app(Taxon::class);

        $taxon->taxonomy_id = $taxonomy->id;

        //dd($taxonomy);
        if ($defaultParent = $request->getDefaultParent()) {
            $taxon->parent_id = $defaultParent->id;
        }
        else
            $taxon->parent_id = null;

        $taxon->priority = $request->getNextPriority($taxon);


        $taxonTree = [];
        $taxons = TaxonProxy::roots()->byTaxonomy($taxonomy)->get();
        foreach ($taxons as $item) {
            $taxonTree[] = $this->repository->buildTaxonTree($item);
        }

        return Inertia::render('Crm/Taxon/Create', [
            'taxons' => $taxonTree,
            'taxonomy' => $taxonomy,
            'taxon' => $taxon
        ]);
    }

    public function store(Taxonomy $taxonomy, CreateTaxon $request): RedirectResponse
    {
//        //workaround for https://vanilo.io/docs/4.x/categorization#duplicate-taxon-slugs-on-root-level
//        if ($request->input('parent_id') === null)
//            $request->validate(['slug' => 'unique:taxons,slug']);

        try {
            $taxon = TaxonProxy::create(array_merge(
                $request->except('images'),
                ['taxonomy_id' => $taxonomy->id],
            ));

            Session::flash('success', __(':name :taxonomy has been created', [
                'name' => $taxon->name,
                'taxonomy' => Str::singular($taxonomy->name)
            ]));

            //$this->createMedia($taxon, $request);
            if ($request->hasFile('image')) {
                $taxon->addMediaFromRequest('image')
                    ->withCustomProperties(['isPrimary' => true])
                    ->toMediaCollection();
            }

        } catch (\Exception $e) {
            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back()->withInput();
        }

        //return redirect(route('vanilo.admin.taxonomy.show', $taxonomy));
        return to_route('taxonomy.show', $taxonomy);
    }

    public function edit(Taxonomy $taxonomy, Taxon $taxon): Response
    {
        $taxons = \Vanilo\Foundation\Models\Taxon::roots()->byTaxonomy($taxonomy)->get();

        $taxonTree = [];
        foreach ($taxons as $item) {
            $taxonTree[] = $this->repository->buildTaxonTree($item);
        }

        //dd($taxon->getMedia()->first()?->getUrl());
        return Inertia::render('Crm/Taxon/Edit', [
            'taxons' => $taxonTree,
            'taxonomy' => $taxonomy,
            'taxon' => $taxon,
            'image' => $taxon->getFirstMediaUrl()
        ]);
    }

    public function update(Taxonomy $taxonomy, Taxon $taxon, UpdateTaxon $request): RedirectResponse
    {
        $newParent = app(Taxon::class)::find($request->input('parent_id'));

        if ($taxon->id == $newParent?->id)
            return redirect()->back()->withErrors('error', 'Impossible parent taxon');

        try {

            $oldParentId = $taxon->parent_id;
            $taxon->update($request->except('image'));

            if ($request->hasFile('image')) {
                $taxon->clearMediaCollection();
                $taxon->addMediaFromRequest('image')
                    ->withCustomProperties(['isPrimary' => true])
                    ->toMediaCollection();
            }

//            if ($newParent->parent_id == $taxon->parent_id and $newParent->level > $taxon->level)
//            {
//                $newParent->parent_id = $oldParentId;
//                $newParent->save();
//            }

            Session::flash('success', __(':name has been updated', ['name' => $taxon->name]));
        } catch (\Exception $e) {

            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back()->withInput();
        }

        return to_route('taxonomy.show', $taxonomy);
    }

    public function destroy(Taxonomy $taxonomy, Taxon $taxon): Application|Redirector|RedirectResponse
    {
        try {
            $name = $taxon->name;
            $taxon->delete();

            Session::flash('success', __(':name has been deleted', ['name' => $name]));
        } catch (\Exception $e) {
            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back();
        }

        return to_route('taxonomy.show', $taxonomy);
    }
}
