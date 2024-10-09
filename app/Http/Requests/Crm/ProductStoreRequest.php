<?php

namespace App\Http\Requests\Crm;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(Product $product): bool
    {
        if ($this->routeIs('product.store')) {
            return true;
        }
        elseif ($this->routeIs('product.update')) {
            return $this->user()->id === $product->seller->id;
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
            'sku' => 'required|min:3|max:255|unique:products,sku',
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'weight' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'width' => 'nullable|numeric|min:0',
            'length' => 'nullable|numeric|min:0',
            'description' => 'required|min:3|max:255',
            'meta_keywords' => 'nullable|min:3|max:255',

            'images' => 'nullable|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',

            'videos' => 'nullable|array|max:3',
            'videos.*' => 'mimes:mp4,avi,mov|max:10000'
        ];
    }
}
