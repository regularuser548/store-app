<?php

namespace App\Http\Requests\Crm\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends BaseProductRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = parent::rules();

        //$rules['SKU'] = $rules['SKU'] . '';
        $rules['images'] = 'required|list|max:10';

        return $rules;
    }
}
