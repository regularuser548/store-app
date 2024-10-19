<?php

declare(strict_types=1);

namespace App\Http\Requests\Crm;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaxonomy extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|min:2|max:191',
            'slug' => 'nullable|max:191',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
