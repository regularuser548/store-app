<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Vanilo\Foundation\Models\Order;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'order_id', 'comment', 'product_id','rating'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
