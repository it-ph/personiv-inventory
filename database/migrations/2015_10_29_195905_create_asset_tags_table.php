<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssetTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asset_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->string('component_type');
            $table->integer('component_id');
            $table->integer('work_station_id');
            $table->string('serial');
            $table->string('property_code')->unique();
            $table->date('date_purchase')->nullable();
            $table->string('supplier')->nullable();
            $table->string('status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('asset_tags');
    }
}
