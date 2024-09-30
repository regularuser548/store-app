<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Vanilo\Product\Contracts\Product as ProductContract;
class Product extends \Vanilo\Product\Models\Product implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
