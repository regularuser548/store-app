<?php

namespace App\Models;

use Carbon\Carbon;
use Cart;
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

    public function getCategoryPathAttribute(): ?string
    {
        $taxon = $this->taxons()?->get()?->first();

        if (!$taxon)
            return null;

        $categoryPath = [$taxon->name];

        while ($taxon->parent) {
            $categoryPath[] = $taxon->parent->name;
            $taxon = $taxon->parent;
        }
        $categoryPath[] = $taxon->taxonomy()->get()->first()->name;

        return implode('/', array_reverse($categoryPath));
    }

    public function getIsLikedAttribute(): bool
    {
        return Favorite::where('user_id', auth()->id())
            ->where('product_id', $this->id)
            ->exists();
    }

    public function getIsInCartAttribute(): bool
    {
        //dd(Cart::getItems());
        return Cart::getItems()->contains('product_id', $this->id);
    }

    protected $appends = ['thumbnail_url', 'category_path', 'is_liked', 'is_in_cart'];
}
