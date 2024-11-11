<?php

declare(strict_types=1);

namespace App\Http\Requests\Crm\Product;

use App\Traits\HasFor;
use Illuminate\Foundation\Http\FormRequest;

class SyncModelTaxons extends FormRequest
{
    use HasFor;

    protected array $allowedFor = ['product', 'master_product', 'master_product_variant'];

    public function rules()
    {
        return array_merge($this->getForRules(), [
            'taxons' => 'sometimes|array'
        ]);
    }

    public function getTaxonIds(): array
    {
        $taxons = $this->get('taxons') ?: [];

        return array_keys($taxons);
    }

    public function authorize()
    {
        return true;
    }
}
