<?php

namespace App\Http\Requests\Storefront;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;

class ProductSearchRequest extends FormRequest
{
    public function filters(Collection $properties): array
    {
        $filters = [];

        foreach ($this->query() as $propertySlug => $values) {
            if ($properties->contains(function ($property) use ($propertySlug) {
                return $property->slug == $propertySlug;
            })) {
                $filters[$propertySlug] = is_array($values) ? $values : [$values];
            }
        }

        return $filters;
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [];
    }
}
