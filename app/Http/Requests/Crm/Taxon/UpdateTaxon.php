<?php

declare(strict_types=1);

namespace App\Http\Requests\Crm\Taxon;

use App\Traits\ValidatesMedia;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTaxon extends FormRequest
{
    use ValidatesMedia;
    public function rules(): array
    {
        return [
            'name' => 'required|min:2|max:255',
            'slug' => 'nullable|min:2|max:255',
            'parent_id' => 'nullable|exists:taxons,id',
            'priority' => 'nullable|integer',
            'image' => 'nullable|'.$this->getImageRules()
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
