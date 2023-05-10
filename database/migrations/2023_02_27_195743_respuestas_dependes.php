<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RespuestasDependes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuestas_dependen', function (Blueprint $table) {
            $table->increments('id');
            $table->string('clave_alfa')->nullable();  
            $table->integer('id_pregunta')->unsigned();
            $table->foreign('id_pregunta')->references('id')->on('preguntas_formulario'); 
            $table->string('respuesta')->nullable();  
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
        Schema::drop('respuestas_dependen');
    }
}
