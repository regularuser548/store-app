<?php

namespace App\Http\Requests\Crm\Product;

use App\Traits\ValidatesMedia;
use Illuminate\Foundation\Http\FormRequest;

abstract class BaseProductRequest extends FormRequest
{
    use ValidatesMedia;

    public function authorize(): bool
    {
        if ($this->user()->hasRole('admin'))
            return true;

        return $this->user()->id === $this->product->seller_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:3|max:255',
            'sku' => 'required|min:3|max:255|unique:products,sku',
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'weight' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'width' => 'nullable|numeric|min:0',
            'length' => 'nullable|numeric|min:0',
            'description' => 'required|min:3|max:255',
            'meta_keywords' => 'nullable|min:3|max:255',
            'state' => 'required|in:draft,inactive,active,unavailable,retired',
            'video_id' => 'nullable|max:255',
            'taxon_id' => 'required|integer|exists:taxons,id',

            'images' => 'nullable|list|max:10',
            'images.*' => $this->getImageRules(),
        ];
    }
}
