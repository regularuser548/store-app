<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Vanilo\Contracts\Buyable;

class Product extends \Vanilo\Foundation\Models\Product
{
    use HasFactory;

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->getThumbnailUrl();
    }

    protected $appends = ['thumbnail_url'];
}
