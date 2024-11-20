<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
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
use Vanilo\Category\Contracts\Taxon;
use Vanilo\Category\Contracts\Taxonomy;
use Vanilo\Category\Models\TaxonProxy;

class TaxonController extends Controller
{
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
        //dd($taxon);

        return Inertia::render('Crm/Taxon/Create', [
            'taxons' => TaxonProxy::byTaxonomy($taxonomy)->select('id as value', 'name as lable')->get(),
            'taxonomy' => $taxonomy,
            'taxon' => $taxon
        ]);
    }

    public function store(Taxonomy $taxonomy, CreateTaxon $request): RedirectResponse
    {
        try {
            $taxon = TaxonProxy::create(array_merge(
                $request->except('images'),
                ['taxonomy_id' => $taxonomy->id],
                ['parent_id' => $request->input('parent')]
            ));
            //dd($taxon);

            Session::flash('success', __(':name :taxonomy has been created', [
                'name' => $taxon->name,
                'taxonomy' => Str::singular($taxonomy->name)
            ]));

            //$this->createMedia($taxon, $request);
            if ($request->has('images'))
                $taxon->addMultipleMediaFromRequest('images');

        } catch (\Exception $e) {
            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back()->withInput();
        }

        //return redirect(route('vanilo.admin.taxonomy.show', $taxonomy));
        return to_route('taxonomy.show', $taxonomy);
    }

    public function edit(Taxonomy $taxonomy, Taxon $taxon): Response
    {
        return Inertia::render('Crm/Taxon/Edit', [
            'taxons' => TaxonProxy::byTaxonomy($taxonomy)->except($taxon)->get()->pluck('name', 'id'),
            'taxonomy' => $taxonomy,
            'taxon' => $taxon
        ]);
    }

    public function update(Taxonomy $taxonomy, Taxon $taxon, UpdateTaxon $request): RedirectResponse
    {
        try {
            $taxon->update($request->except('images'));

            Session::flash('success', __(':name has been updated', ['name' => $taxon->name]));
        } catch (\Exception $e) {
            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back()->withInput();
        }

        return to_route('taxonomy.edit', $taxonomy);
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

        return redirect('taxonomy.edit', $taxonomy);
    }
}
