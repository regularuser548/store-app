<?php

declare(strict_types=1);


namespace App\Http\Requests\Crm\Taxon;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaxon extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|min:2|max:255',
            'parent_id' => 'nullable|exists:taxons,id',
            'priority' => 'nullable|integer',
            'images' => 'nullable',
            'images.*' => 'image|mimes:jpg,jpeg,pjpg,png,gif,webp',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
