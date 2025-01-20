<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Добавляем поле address_id, которое будет внешним ключом
            $table->unsignedBigInteger('address_id')->nullable()->after('status');

            // Устанавливаем внешний ключ, который ссылается на таблицу addresses
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Удаляем внешний ключ и поле
            $table->dropForeign(['address_id']);
            $table->dropColumn('address_id');
        });
    }
};
