<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Vanilo\Contracts\Buyable;

class Product extends \Vanilo\Foundation\Models\Product //implements HasMedia, Buyable
{
    use HasFactory;

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

//    public function getId(): int
//    {
//
//        return $this->id;
//    }
//
//    public function getName(): string
//    {
//        return $this->name;
//    }
//
//    public function getPrice(): float
//    {
//        return $this->price;
//    }
//
//    public function morphTypeName(): string
//    {
//        return 'product';
//    }
//
//    public function hasImage(): bool
//    {
//        return $this->hasMedia();
//    }
//
//    public function addSale(Carbon $date, float|int $units = 1): void
//    {
//        return;
//    }
//
//    public function removeSale(float|int $units = 1): void
//    {
//        return;
//    }
//
//    public function imageCount(): int
//    {
//        return $this->media()->count();
//    }
//
//    public function getThumbnailUrl(): ?string
//    {
//        return $this->getFirstMediaUrl('default', 'thumb') ?? null;
//    }
//
//    public function getThumbnailUrls(): Collection
//    {
//        return collect($this->getMedia('default')->map(fn($media) => $media->getUrl('thumb'))->toArray());
//    }
//
//    public function getImageUrl(string $variant = ''): ?string
//    {
//        return $this->getFirstMediaUrl('default', $variant) ?? null;
//    }
//
//    public function getImageUrls(string $variant = ''): Collection
//    {
//        return collect($this->getMedia('default')->map(fn($media) => $media->getUrl())->toArray());
//    }
}
