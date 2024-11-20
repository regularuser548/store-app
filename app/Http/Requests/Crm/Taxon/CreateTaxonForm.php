<?php

declare(strict_types=1);

namespace App\Http\Requests\Crm\Taxon;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Vanilo\Category\Contracts\Taxon;
use Vanilo\Category\Models\TaxonProxy;

class CreateTaxonForm extends FormRequest
{
    /** @var Taxon|null|bool */
    protected bool|null|Taxon $defaultParent = false;

    /**
     * @inheritDoc
     */
    public function rules(): array
    {
        return [
            'parent' => 'sometimes|exists:' . app(Taxon::class)->getTable() . ',id'
        ];
    }

    /**
     * @inheritDoc
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public function getDefaultParent(): Model|Collection|null
    {
        if ($id = $this->query('parent')) {
            return TaxonProxy::find($id);
        }

        return null;
    }

    /**
     * @inheritdoc
     */
    public function getNextPriority(Taxon $taxon): int
    {
        // Workaround due to `neighbours` relation not working on root level taxons
        if ($taxon->isRootLevel()) {
            $lastNeighbour = TaxonProxy::byTaxonomy($taxon->taxonomy_id)->roots()->sortReverse()->first();
        } else {
            $lastNeighbour = $taxon->lastNeighbour();
        }

        return $lastNeighbour ? $lastNeighbour->priority + 10 : 10;
    }
}
