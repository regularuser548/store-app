<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
//        Schema::table('products', function (Blueprint $table) {
//            $table->unsignedBigInteger('seller_id');
//            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
//        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        if ('sqlite' !== DB::connection()->getDriverName()) {
//            Schema::table('products', function (Blueprint $table) {
//                $table->dropForeign('seller_id');
//            });
//        }
//
//        Schema::table('products', function (Blueprint $table) {
//            $table->dropConstrainedForeignId('seller_id');
//        });
    }
};
