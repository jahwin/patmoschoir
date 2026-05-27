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
        Schema::table('donations', function (Blueprint $table) {
            $table->string('reference')->nullable()->unique()->after('currency');
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending')->after('reference');
            $table->string('provider_transaction_id')->nullable()->after('status');
            $table->json('provider_payload')->nullable()->after('provider_transaction_id');
            $table->timestamp('paid_at')->nullable()->after('provider_payload');
        });
    }

    public function down(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->dropColumn(['reference', 'status', 'provider_transaction_id', 'provider_payload', 'paid_at']);
        });
    }
};
