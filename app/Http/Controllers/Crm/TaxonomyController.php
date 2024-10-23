<?php

declare(strict_types=1);

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use App\Http\Requests\Crm\CreateTaxonomy;
use App\Http\Requests\Crm\SyncModelTaxons;
use App\Http\Requests\Crm\UpdateTaxonomy;
use App\Repositories\MediaRepository;
use App\Repositories\TaxonomyRepository;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use Vanilo\Category\Contracts\Taxonomy;
use Vanilo\Category\Models\TaxonomyProxy;

class TaxonomyController extends Controller
{
    protected TaxonomyRepository $repository;
    protected MediaRepository $mediaRepository;

    public function __construct(TaxonomyRepository $taxonomyRepository, MediaRepository $mediaRepository)
    {
        $this->repository = $taxonomyRepository;
        $this->mediaRepository = $mediaRepository;
    }
    public function index(): Response
    {
        $taxonomies = $this->repository->all();
        $images = $this->mediaRepository->primaryImageForEach($taxonomies);
        return Inertia::render('Crm/Taxonomy/Index', ['taxonomies' => $taxonomies, 'images' => $images]);
    }

    public function create(): Response
    {
        return Inertia::render('Crm/Taxonomy/Create');
    }

    public function store(CreateTaxonomy $request): Application|Redirector|RedirectResponse
    {
        try
        {
            $taxonomy = TaxonomyProxy::create($request->validated());
            Session::flash('success', __(':name has been created', ['name' => $taxonomy->name]));

//            if ($request->hasFile('image'))
//                $this->repository->addMultipleMediaFromArray($taxonomy, $request->file('image'));

            if ($request->hasFile('image')) {
                $taxonomy->addMediaFromRequest('image')
                    ->withCustomProperties(['isPrimary' => true])
                    ->toMediaCollection();
                }

        }
        catch (\Exception $e) {

            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back()->withInput();
        }

        return to_route('taxonomy.index');
    }

    public function show(Taxonomy $taxonomy): Response
    {
        return Inertia::render('Crm/Taxonomy/Show', ['taxonomy' => $taxonomy]);
    }

    public function edit(Taxonomy $taxonomy): Response
    {
        return Inertia::render('Crm/Taxonomy/Edit', ['taxonomy' => $taxonomy, 'image' => $taxonomy->getMedia()?->first()?->getUrl()]);
    }

    public function update(Taxonomy $taxonomy, UpdateTaxonomy $request): Application|Redirector|RedirectResponse
    {
        try
        {
            $taxonomy->update($request->validated());

            if ($request->hasFile('image')) {
                $taxonomy->clearMediaCollection();
                $taxonomy->addMediaFromRequest('image')
                    ->withCustomProperties(['isPrimary' => true])
                    ->toMediaCollection();
            }
            Session::flash('success', __(':name has been updated', ['name' => $taxonomy->name]));
        }
        catch (\Exception $e) {
            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back()->withInput();
        }

        return to_route('taxonomy.index');
    }

    public function destroy(Taxonomy $taxonomy): Application|Redirector|RedirectResponse
    {
        try
        {
            $name = $taxonomy->name;
            $taxonomy->delete();

           Session::flash('success', __(':name has been deleted', ['name' => $name]));
        }
        catch (\Exception $e) {
            Session::flash('error', __('Error: :msg', ['msg' => $e->getMessage()]));

            return redirect()->back();
        }

        return to_route('taxonomy.index');
    }

    public function sync(Taxonomy $taxonomy, SyncModelTaxons $request)
    {
        $taxonIds = $request->getTaxonIds();
        $model = $request->getFor();

        foreach (TaxonomyProxy::where('id', '<>', $taxonomy->id)->get() as $foreignTaxonomy) {
            $taxonIds = array_merge(
                $taxonIds,
                $model->taxons()->byTaxonomy($foreignTaxonomy)->get(['id'])->pluck('id')->toArray()
            );
        }

        $model->taxons()->byTaxonomy($taxonomy)->sync($taxonIds);

        //return redirect(route(sprintf('vanilo.admin.%s.show', shorten(get_class($model))), $model));
        return redirect()->back();
    }
}
