<?php

namespace App\Http\Requests\Crm;

use App\Traits\ValidatesMedia;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductImagesRequest extends FormRequest
{
    use ValidatesMedia;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->user()->hasRole('admin')) {
            return true;
        }

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
            'images' => 'nullable|list|max:10',
            'images.*' => $this->getImageRules(),

        ];
    }
}
