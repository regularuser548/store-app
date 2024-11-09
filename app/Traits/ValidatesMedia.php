<?php

namespace App\Traits;
trait ValidatesMedia {
    public function getImageRules(): string
    {
        return 'mimes:jpg,jpeg,png,bmp,gif,svg,webp,avif|max:2048';
    }

    public function getVideoRules(): string
    {
        return 'mimes:mp4,avi,mov|max:50000';
    }
}
