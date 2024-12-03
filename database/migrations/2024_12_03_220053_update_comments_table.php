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
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn(['content', 'photo']); // Удаление колонок
            $table->text('comment')->nullable();     // Добавление новой колонки
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->text('content')->nullable();     // Восстановление удаленных колонок
            $table->string('photo')->nullable();     // Восстановление удаленных колонок
            $table->dropColumn('comment');           // Удаление новой колонки
        });
    }
};
