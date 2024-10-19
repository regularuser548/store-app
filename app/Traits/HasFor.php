<?php

declare(strict_types=1);


namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

trait HasFor
{
    public function getFor()
    {
        $id = $this->forId;
        $for = $this->for;

        if ($id && $for) {
            $modelClass = concord()->model(concord()->short($for));

            return $modelClass::find($id);
        }

        return null;
    }

    public function getForRelationName()
    {
        $for = $this->for;
        if ($for) {
            return Str::camel(Str::plural($for));
        }

        return null;
    }

    protected function getForRules(): array
    {
        if (!property_exists($this, 'allowedFor') || !is_array($this->allowedFor)) {
            throw new \LogicException('The allowedFor property must be an array containing the allowed entity short names');
        }

        return [
            'for' => ['sometimes', Rule::in($this->allowedFor)],
            'forId' => 'required_with:for'
        ];
    }
}
