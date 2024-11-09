<?php

declare(strict_types=1);

namespace App\Http\Requests\Crm;

use App\Traits\ValidatesMedia;
use Illuminate\Foundation\Http\FormRequest;

class CreateTaxonomy extends FormRequest
{
    use ValidatesMedia;
    public function rules(): array
    {
        return [
            'name' => 'required|min:2|max:191',
            'slug' => 'nullable|max:191',
            'image' => 'nullable|'.$this->getImageRules(),
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
