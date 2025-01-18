<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cities extends Model
{
    use HasFactory;

    /**
     * Таблица, связанная с моделью.
     *
     * @var string
     */
    protected $table = 'cities';

    /**
     * Поля, доступные для массового заполнения.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Опционально: метод для получения всех городов в формате для выпадающего списка.
     *
     * @return array
     */
    public static function dropdown()
    {
        return self::all()->pluck('name', 'id')->toArray();
    }
}
