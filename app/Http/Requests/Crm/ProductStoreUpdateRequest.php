<?php

namespace App\Http\Requests\Crm;

use App\Models\Product;
use App\Traits\ValidatesMedia;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Vanilo\Product\Models\ProductState;

class ProductStoreUpdateRequest extends FormRequest
{
    use ValidatesMedia;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->isMethod('POST') or $this->user()->hasRole('admin')) {
            return true;
        }
        elseif ($this->isMethod('PUT')) {
            return $this->user()->id === $this->product->seller_id;
        }
        else
            return false;
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
            'sku' => 'required|min:3|max:255',
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'weight' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'width' => 'nullable|numeric|min:0',
            'length' => 'nullable|numeric|min:0',
            'description' => 'required|min:3|max:255',
            'meta_keywords' => 'nullable|min:3|max:255',
            'state' => 'required|in:draft,inactive,active,unavailable,retired',

            'images' => 'nullable|list|max:10',
            'images.*' => $this->getImageRules(),

            'videos' => 'nullable|list|max:3',
            'videos.*' => $this->getVideoRules(),
        ];
    }
}
