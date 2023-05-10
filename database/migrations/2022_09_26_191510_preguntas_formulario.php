<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PreguntasFormulario extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preguntas_formulario', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_formulario')->unsigned();
            $table->foreign('id_formulario')->references('id')->on('formulario'); 
            $table->string('posicion');   
            $table->string('titulo_pregunta');           
            $table->string('titulo_heredado_respuesta')->nullable();
            $table->string('posicion_titulo_heredado')->nullable();      
            $table->string('tipo');   
            $table->string('obligatorio');      
            $table->string('maximo_caracteres')->nullable();    
            $table->string('minimo_caracteres')->nullable();          
            $table->string('animacio_entrada');
            $table->string('imagen_fondo');      
            $table->string('total_respuestas')->nullable();    
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
            $table->string('agregar_otra_opcion')->nullable();
            $table->string('titulo_pregunta_2')->nullable();
            $table->string('maximo_caracteres_otra_opcion')->nullable();
            $table->string('minimo_caracteres_otra_opcion')->nullable();
            $table->string('estado');   
            $table->string('captura');   
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
        Schema::drop('preguntas_formulario');
    }
}
