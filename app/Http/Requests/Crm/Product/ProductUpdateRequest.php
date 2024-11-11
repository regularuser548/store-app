<?php

namespace App\Http\Requests\Crm\Product;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductUpdateRequest extends BaseProductRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = parent::rules();

        //allow to insert same sku
        $rules['sku'] = 'required|min:3|max:255|' . Rule::unique(Product::class, 'sku')->ignore($this->product->sku, 'sku')->__toString();
        return $rules;
    }
}
