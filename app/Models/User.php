<?php

//namespace App\Models;

//use Illuminate\Contracts\Auth\MustVerifyEmail;
//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Notifications\Notifiable;

//class User extends Authenticatable
//{
//    use HasFactory, Notifiable;
//
//    /**
//     * The attributes that are mass assignable.
//     *
//     * @var array<int, string>
//     */
//    protected $fillable = [
//        'name',
//        'email',
//        'password',
//        'isBlocked'
//    ];
//
//    /**
//     * The attributes that should be hidden for serialization.
//     *
//     * @var array<int, string>
//     */
//    protected $hidden = [
//        'password',
//        'remember_token',
//    ];
//
//    /**
//     * Get the attributes that should be cast.
//     *
//     * @return array<string, string>
//     */
//    protected function casts(): array
//    {
//        return [
//            'email_verified_at' => 'datetime',
//            'password' => 'hashed',
//            'isBlocked' => 'boolean',
//        ];
//    }
//}

namespace App\Models;

// No need to use Laravel default traits and properties as
// they're already present in the base class exactly as
// they're defined in a default Laravel installation
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Konekt\Acl\Traits\HasRoles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Vanilo\Foundation\Models\Order;

class User extends \Konekt\User\Models\User implements HasMedia
{
    use HasRoles;
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'name', 'email', 'password', 'type', 'is_active', 'phone_number', 'surname'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('avatars')
            ->useFallbackPath(public_path('/avatars/default.jpg'))
            ->singleFile();
    }
}
