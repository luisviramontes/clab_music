<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Respuestas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuestas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_formulario')->unsigned();
            $table->foreign('id_formulario')->references('id')->on('formulario'); 
            $table->string('respuesta_1')->nullable();  
            $table->string('respuesta_2')->nullable();
            $table->string('respuesta_3')->nullable();  
            $table->string('respuesta_4')->nullable();      
            $table->string('respuesta_5')->nullable();
            $table->string('respuesta_6')->nullable();
            $table->string('respuesta_7')->nullable();
            $table->string('respuesta_8')->nullable();     
            $table->string('respuesta_9')->nullable();  
            $table->string('respuesta_10')->nullable();   
            $table->string('respuesta_11')->nullable();   
            $table->string('respuesta_12')->nullable();   
            $table->string('respuesta_13')->nullable();   
            $table->string('respuesta_14')->nullable();   
            $table->string('respuesta_15')->nullable();   
            $table->string('respuesta_16')->nullable();   
            $table->string('respuesta_17')->nullable();   
            $table->string('respuesta_18')->nullable();   
            $table->string('respuesta_19')->nullable();   
            $table->string('respuesta_20')->nullable();   
            $table->string('respuesta_21')->nullable();   
            $table->string('respuesta_22')->nullable();   
            $table->string('respuesta_23')->nullable();   
            $table->string('respuesta_24')->nullable();   
            $table->string('respuesta_25')->nullable();   
            $table->string('respuesta_26')->nullable();   
            $table->string('respuesta_27')->nullable();   
            $table->string('respuesta_28')->nullable();   
            $table->string('respuesta_29')->nullable();   
            $table->string('respuesta_30')->nullable();   
            $table->string('ip_publica')->nullable();  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('respuestas');
    }
}
