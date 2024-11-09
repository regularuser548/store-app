<?php

namespace App\Http\Requests\Crm;

use Illuminate\Foundation\Http\FormRequest;

class SyncMediaOrderRequest extends FormRequest
{
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
            'media_order' => 'required|list',
            'media_order.*' => 'exists:media,id|distinct',
            'collection_name' => 'required|string|in:default,videos',
        ];
    }
}
