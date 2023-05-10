@extends('layouts.principal')
@section('contenido')

<!-- Start Content-->
<div class="container-fluid">

    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="/welcome">Inicio</a></li>
                        <li class="breadcrumb-item"><a href="/preguntas">Preguntas</a></li>
                        <li class="breadcrumb-item active">Edición de preguntas</li>
                    </ol>
                </div>
                <h4 class="page-title">Editar pregunta</h4>

            </div>
        </div>
    </div>
    <!-- end page title -->



    <div class="row">
        <div class="col-12">
            <div class="card-box">
                <div class="row">
                    <div class="col-lg-12">
                        <div>
                            <h4 class="header-title">Formulario </h4>

                            <form id="wizard-validation-form" action="{{url('/preguntas', [$pregunta->id])}}" name="formulario"
                                method="post" files="true" enctype="multipart/form-data">
                                {{csrf_field()}} 
                                <input type="hidden" name="_method" value="PUT">
                                <div>
                                    <h3>Titulo</h3>
                                    <section>
                                        <div>
                                            <input value="{{$formulario->id}}" type="hidden" name="id_formulario">

                                            <div class="form-group">
                                                <label for="userName">Nombre del formulario<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" required name="nombre"
                                                    value="{{$formulario->nombre}}" parsley-trigger="change"
                                                    onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()"
                                                    placeholder="Ingresar el nombre del formulario" class="form-control"
                                                    id="nombre" readonly>
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Descripción<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" required name="descripcion"
                                                    value="{{$formulario->descripcion}}" parsley-trigger="change"
                                                    placeholder="Ingresar la descripción" class="form-control"
                                                    id="descripcion" readonly>
                                            </div>
                                            <hr>


                                            <div class="form-group">
                                                <label for="userName">N° pregunta<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" required name="posicion" parsley-trigger="change"
                                                    value="{{$pregunta->posicion}}" placeholder="Ingresar el N° de pregunta"
                                                    class="form-control" id="posicion">
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Título de pregunta<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" required name="titulo_pregunta"
                                                    parsley-trigger="change"   value="{{$pregunta->titulo_pregunta}}"
                                                    placeholder="Ingresar el titulo de la pregunta" class="form-control"
                                                    id="titulo_pregunta">
                                            </div>


                                            <div class="form-group">
                                                <label for="userName">Concatenar título de otra respuesta<span
                                                        class="text-danger">*</span></label>
                                                <select class="form-control select2-multiple" style="width: 100%"
                                                    name="concatenar" onchange="concat(this.value);"
                                                    data-placeholder="Seleccione una opción ..." id="concatenar">
                                                    @if($pregunta->titulo_heredado_respuesta <> "")
                                                    <option value="SI"selected>SI</option>
                                                    <option value="NO">NO</option>
                                                    @else                                                  
                                                    <option value="SI">SI</option>
                                                    <option value="NO"selected>NO</option>
                                                    @endif
                                                 
                                                </select>
                                            </div>

                                            @if($pregunta->titulo_heredado_respuesta <> "")
                                            <div id="div_concatenar" >
                                            @else  
                                            <div id="div_concatenar" style='display:none;'>
                                            @endif                                             
                                                <div class="form-group"> 
                                                    <label for="userName">Seleccione el número de pregunta
                                                        respuesta<span class="text-danger">*</span></label>
                                                    <select class="form-control select2-multiple" style="width: 100%"
                                                        name="heredado" data-placeholder="Seleccione una opción ..."
                                                        id="heredado">
                                                        @if($pregunta->titulo_heredado_respuesta <> "")                                                       
                                                        @foreach($preguntas as $preg) 
                                                        @if($pregunta->titulo_heredado_respuesta == $preg->posicion)
                                                        <option value="{{$preg->posicion}}" selected>PREGUNTA:
                                                            {{$preg->posicion}}: {{$preg->titulo_pregunta}}
                                                        </option>
                                                        @else
                                                        <option value="{{$preg->posicion}}">PREGUNTA:
                                                            {{$preg->posicion}}: {{$preg->titulo_pregunta}}
                                                        </option>
                                                        @endif
                                                        @endforeach
                                                        @else
                                                        <option value="" selected>Seleccione una opción</option>
                                                        @foreach($preguntas as $preg_2)
                                                        <option value="{{$preg_2->posicion}}">PREGUNTA:
                                                            {{$preg_2->posicion}}: {{$preg_2->titulo_pregunta}}
                                                        </option>
                                                        @endforeach
                                                        @endif                                                        

                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="userName">Posición del título heredado<span
                                                            class="text-danger">*</span></label>
                                                    <select class="form-control select2-multiple" style="width: 100%"
                                                        name="posicion_h" onchange="titulo_des(this.value);" data-placeholder="Seleccione una opción ..."
                                                        id="posicion_h">
                                                        @if($pregunta->titulo_heredado_respuesta <> "")       
                                                        @if($pregunta->posicion_titulo_heredado == "INICIO")
                                                        <option value="INICIO"selected>Al inicio del título</option>
                                                        <option value="DESPUES">Al Final del título</option>
                                                        <option value="MEDIO">En medio de dos titulos</option>
                                                        @elseif($pregunta->posicion_titulo_heredado == "DESPUES")
                                                        <option value="INICIO">Al inicio del título</option>
                                                        <option value="DESPUES"selected>Al Final del título</option>
                                                        <option value="MEDIO">En medio de dos titulos</option>
                                                        @elseif($pregunta->posicion_titulo_heredado == "MEDIO")
                                                        <option value="INICIO">Al inicio del título</option>
                                                        <option value="DESPUES">Al Final del título</option>
                                                        <option value="MEDIO" selected>En medio de dos titulos</option>
                                                        @endif
                                                        @else
                                                        <option value="" selected>Seleccione una opción</option>
                                                        <option value="INICIO">Al inicio del título</option>
                                                        <option value="DESPUES">Al Final del título</option>
                                                        <option value="MEDIO">En medio de dos titulos</option>
                                                        @endif                                                      
                                                    </select>
                                                </div>

                                                @if($pregunta->titulo_despues <> "")       
                                                <div class="form-group"  id="div_despues">
                                                @else
                                                <div class="form-group"  id="div_despues" style='display:none;'>
                                                @endif
                                                    <label for="userName">Título despues de concatenar<span
                                                            class="text-danger">*</span></label>
                                                    <input type="text"  name="titulo_despues"
                                                        parsley-trigger="change" value="{{$pregunta->titulo_despues}}"
                                                        placeholder="Ingresar el titulo despues de concatenar"
                                                        class="form-control" id="titulo_despues">
                                                </div>


                                            </div>






                                        </div>
                                    </section>
                                    <h3>Tipo de pregunta</h3>
                                    <section>
                                        <div class="form-group">
                                            <label for="userName">Tipo de pregunta<span
                                                    class="text-danger"></span></label>
                                            <select class="form-control select2-multiple" style="width: 100%"
                                                name="tipo" onchange="maximo_texto(this.value);"
                                                data-placeholder="Seleccione una opción ..." id="tipo" required>
                                                @if($pregunta->tipo == "TEXTO")
                                                <option value="TEXTO"selected>TEXTO</option>
                                                <option value="NÚMERICO">NÚMERICO</option>
                                                <option value="RADIO">RADIO</option>
                                                <option value="TEXTAREA">TEXTAREA</option>
                                                <option value="MULTIPLE">OPCIÓN MULTIPLE</option>
                                                @elseif($pregunta->tipo == "NÚMERICO")
                                                <option value="TEXTO">TEXTO</option>
                                                <option value="NÚMERICO"selected>NÚMERICO</option>
                                                <option value="RADIO">RADIO</option>
                                                <option value="TEXTAREA">TEXTAREA</option>
                                                <option value="MULTIPLE">OPCIÓN MULTIPLE</option>
                                                @elseif($pregunta->tipo == "RADIO")
                                                <option value="TEXTO">TEXTO</option>
                                                <option value="NÚMERICO">NÚMERICO</option>
                                                <option value="RADIO"selected>RADIO</option>
                                                <option value="TEXTAREA">TEXTAREA</option>
                                                <option value="MULTIPLE">OPCIÓN MULTIPLE</option>
                                                @elseif($pregunta->tipo == "TEXTAREA")
                                                <option value="TEXTO">TEXTO</option>
                                                <option value="NÚMERICO">NÚMERICO</option>
                                                <option value="RADIO">RADIO</option>
                                                <option value="TEXTAREA"selected>TEXTAREA</option>
                                                <option value="MULTIPLE">OPCIÓN MULTIPLE</option>
                                                @elseif($pregunta->tipo == "MULTIPLE")      
                                                <option value="TEXTO">TEXTO</option>
                                                <option value="NÚMERICO">NÚMERICO</option>
                                                <option value="RADIO">RADIO</option>
                                                <option value="TEXTAREA">TEXTAREA</option>
                                                <option value="MULTIPLE"selected>OPCIÓN MULTIPLE</option>                      
                                                @endif                                               
                                               
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="userName">Pregunta obligatoria<span
                                                    class="text-danger">*</span></label>
                                            <select class="form-control select2-multiple" style="width: 100%"
                                                name="obligatorio" data-placeholder="Seleccione una opción ..."
                                                id="obligatorio">
                                                @if($pregunta->obligatorio == "SI")
                                                <option value="SI"selected>SI</option>
                                                <option value="NO">NO</option>
                                                @else
                                                <option value="SI">SI</option>
                                                <option value="NO"selected>NO</option>
                                                @endif                                              
                                            </select>
                                        </div>

                                        <div class="form-group">
                                                <label for="userName">Placeholder<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" required name="placeholder" value="{{$pregunta->placeholder}}"  parsley-trigger="change"
                                                    placeholder="Ingresar el texto que aparecera en el input ejem. Ingrese su respuesta"
                                                    class="form-control" id="placeholder">
                                        </div>

                                        @if($pregunta->tipo == "TEXTO" || $pregunta->tipo == "NÚMERICO" || $pregunta->tipo == "TEXTAREA" )
                                        <div id="div_maximo">
                                        @else
                                        <div id="div_maximo" style='display:none;'>
                                        @endif                    
                                            <div class="form-group">
                                                <label for="userName">Máximo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number"  value="{{$pregunta->maximo_caracteres}}" name="maximo" parsley-trigger="change"
                                                    placeholder="Ingresar el máximo de caracteres de la pregunta"
                                                    class="form-control" id="maximo">
                                            </div>


                                            <div class="form-group">
                                                <label for="userName">Mínimo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" value="{{$pregunta->minimo_caracteres}}"  name="minimo" parsley-trigger="change"
                                                    placeholder="Ingresar el mínimo de caracteres de la pregunta"
                                                    class="form-control" id="minimo">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="userName">Animación de entrada<span
                                                    class="text-danger"></span></label>
                                            <select class="form-control select2-multiple" style="width: 100%"
                                                name="animacion" onchange="prueba_animacion(this.value);"
                                                data-placeholder="Seleccione una opción ..." id="animacion" required>
                                                <option value="" selected>Seleccione una opción</option>
                                                <option value="animate__bounce">animate__bounce</option>
                                                <option value="animate__flash">animate__flash</option>
                                                <option value="animate__pulse">animate__pulse</option>
                                                <option value="animate__pulse">animate__pulse</option>
                                                <option value="animate__rubberBand">animate__rubberBand</option>
                                                <option value="animate__shakeX">animate__shakeX</option>
                                                <option value="animate__shakeY">animate__shakeY</option>
                                                <option value="animate__headShake">animate__headShake</option>
                                                <option value="animate__swing">animate__swing</option>
                                                <option value="animate__tada">animate__tada</option>
                                                <option value="animate__wobble">animate__wobble</option>
                                                <option value="animate__jello">animate__jello</option>
                                                <option value="animate__heartBeat">animate__heartBeat</option>
                                                <option value="animate__backInDown">animate__backInDown</option>
                                                <option value="animate__backInLeft">animate__backInLeft</option>
                                                <option value="animate__backInRight">animate__backInRight</option>
                                                <option value="animate__lightSpeedInRight">animate__lightSpeedInRight
                                                </option>
                                                <option value="animate__flipInX">animate__flipInX</option>
                                                <option value="animate__hinge">animate__hinge</option>
                                                <option value="animate__zoomOutDown">animate__zoomOutDown</option>

                                            </select>
                                        </div>

                                        <div id="ejemplo_animacion" class="col-lg-12">
                                            <h1 class="callout-title">Animate.css</h1>
                                        </div>
                                        <hr>

                                        <div class="col-lg-12 ">
                                            <h4 class="header-title mb-4">Imagen de fondo</h4>
                                            <input class="files" type="file" accept=".png, .jpg, .jpeg" id="fondo"
                                                 name="fondo" />
                                        </div>


                                    </section>

                                    <h3>Respuestas</h3>
                                    <section>

                                    @if($pregunta->tipo == "RADIO" || $pregunta->tipo == "MULTIPLE" )
                                    <div id="div_respuestas" >
                                            <div class="form-group">
                                                <label for="userName">Total de respuestas<span
                                                        class="text-danger"></span></label>
                                                <input type="number" onchange="agregar_respuestas(this.value);"
                                                    name="total_respuestas" value="{{$pregunta->total_respuestas}}" parsley-trigger="change"
                                                    placeholder="Ingresar el total de respuestas de la pregunta"
                                                    class="form-control" id="total_respuestas">
                                            </div>

                                            <div class="form-group" id="form_respuestas">
                                                @if($pregunta->respuesta_1 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 1<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_1" value="{{$pregunta->respuesta_1}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_1">
                                                </div>
                                                  
                                                @endif

                                                @if($pregunta->respuesta_2 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 1<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_2" value="{{$pregunta->respuesta_2}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_2">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_3 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 3<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_3" value="{{$pregunta->respuesta_3}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_3">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_4 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 4<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_4" value="{{$pregunta->respuesta_4}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_4">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_5 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 5<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_5" value="{{$pregunta->respuesta_5}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_5">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_6 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 6<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_6" value="{{$pregunta->respuesta_6}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_6">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_7 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 7<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_7" value="{{$pregunta->respuesta_7}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_7">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_8 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 8<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_8" value="{{$pregunta->respuesta_8}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_8">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_9 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 9<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_9" value="{{$pregunta->respuesta_9}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_9">
                                                </div>
                                                  
                                                @endif
                                                @if($pregunta->respuesta_10 <> "")
                                                <div class="form-group">
                                                <label for="userName">Respuesta 10<span
                                                        class="text-danger"></span></label>
                                                        <input type="text" 
                                                    name="respuesta_10" value="{{$pregunta->respuesta_10}}" parsley-trigger="change"
                                                    placeholder="Ingresa la opción"
                                                    class="form-control" id="respuesta_10">
                                                </div>
                                                  
                                                @endif
                                              

                                            </div>

                                        </div>
                                    @else
                                    <div id="div_respuestas" style='display:none;'>
                                            <div class="form-group">
                                                <label for="userName">Total de respuestas<span
                                                        class="text-danger"></span></label>
                                                <input type="number" onchange="agregar_respuestas(this.value);"
                                                    name="total_respuestas" parsley-trigger="change"
                                                    placeholder="Ingresar el total de respuestas de la pregunta"
                                                    class="form-control" id="total_respuestas">
                                            </div>

                                            <div class="form-group" id="form_respuestas">

                                            </div>

                                        </div>
                                    @endif
                                  

                                    </section>
                                    <h3>Agregar otra opción</h3>
                                    <section>


                                        <div class="form-group">
                                            <label for="userName">Desea agregar otra opción de texto<span
                                                    class="text-danger"></span></label>
                                            <select class="form-control select2-multiple" style="width: 100%"
                                                name="otra_opcion" onchange="anexar_opcion(this.value);"
                                                data-placeholder="Seleccione una opción ..." id="otra_opcion" required>
                                                @if($pregunta->agregar_otra_opcion == "SI")
                                                <option value="SI"selected>SI</option>
                                                <option value="NO">NO</option>
                                                @else
                                                <option value="SI">SI</option>
                                                <option value="NO"selected>NO</option>
                                                @endif                                            

                                            </select>
                                        </div>

                                        @if($pregunta->agregar_otra_opcion == "SI")
                                        <div id="div_otra_opcion">
                                        @else
                                        <div id="div_otra_opcion" style='display:none;'>
                                        @endif
                                        
                                            <div class="form-group">
                                                <label for="userName">Título de la opción<span
                                                        class="text-danger">*</span></label>
                                                <input value="{{$pregunta->titulo_pregunta_2}}" type="text" name="titulo_pregunta_2" parsley-trigger="change"
                                                    placeholder="Ingresar el titulo de la pregunta" class="form-control"
                                                    id="titulo_pregunta_2">
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Tipo de opción<span
                                                        class="text-danger">*</span></label>
                                                <select class="form-control select2-multiple" style="width: 100%"
                                                    name="tipo_2" data-placeholder="Seleccione una opción ..."
                                                    id="tipo_2">
                                                    @if($pregunta->tipo_otra_opcion == "TEXTO")
                                                    <option value="TEXTO"selected>TEXTO</option>
                                                    <option value="NÚMERICO">NÚMERICO</option>
                                                    <option value="TEXTAREA">TEXTAREA</option>
                                                    <option value="MULTIPLE">OPCIÓN</option>
                                                    @elseif($pregunta->tipo_otra_opcion == "NÚMERICO")
                                                    <option value="TEXTO">TEXTO</option>
                                                    <option value="NÚMERICO"selected>NÚMERICO</option>
                                                    <option value="TEXTAREA">TEXTAREA</option>
                                                    <option value="MULTIPLE">OPCIÓN</option>
                                                    @elseif($pregunta->tipo_otra_opcion == "TEXTAREA")
                                                    <option value="TEXTO">TEXTO</option>
                                                    <option value="NÚMERICO">NÚMERICO</option>
                                                    <option value="TEXTAREA"selected>TEXTAREA</option>
                                                    <option value="MULTIPLE">OPCIÓN</option>
                                                    @elseif($pregunta->tipo_otra_opcion == "OPCIÓN")
                                                    <option value="TEXTO">TEXTO</option>
                                                    <option value="NÚMERICO">NÚMERICO</option>
                                                    <option value="TEXTAREA">TEXTAREA</option>
                                                    <option value="MULTIPLE"selected>OPCIÓN</option>
                                                    @else
                                                    <option value="" selected>Seleccione una opción</option>
                                                    <option value="TEXTO">TEXTO</option>
                                                    <option value="NÚMERICO">NÚMERICO</option>
                                                    <option value="TEXTAREA">TEXTAREA</option>
                                                    <option value="MULTIPLE">OPCIÓN</option>
                                                    @endif

                                                    
                                                </select>
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Placeholder<span
                                                        class="text-danger">*</span></label>
                                                <input type="text"  name="placeholder_2" value="{{$pregunta->placeholder_2}}"parsley-trigger="change"
                                                    placeholder="Ingresar el texto que aparecera en el input ejem. Ingrese su respuesta"
                                                    class="form-control" id="placeholder_2">
                                            </div>



                                            <div class="form-group">
                                                <label for="userName">Máximo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" value="{{$pregunta->maximo_caracteres_otra_opcion}}" name="maximo_2" parsley-trigger="change"
                                                    placeholder="Ingresar el máximo de caracteres de la pregunta"
                                                    class="form-control" id="maximo_2">
                                            </div>


                                            <div class="form-group">
                                                <label for="userName">Mínimo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" value="{{$pregunta->minimo_caracteres_otra_opcion}}" name="minimo_2" parsley-trigger="change"
                                                    placeholder="Ingresar el mínimo de caracteres de la pregunta"
                                                    class="form-control" id="minimo_2">
                                            </div>

                                        </div>

                                    </section>



                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div> <!-- end row -->
</div> <!-- end container-fluid -->

@stop
@section('javascript')
<script type="text/javascript">
$(document).ready(function() {
    $('.select2-multiple').select2({});
    $('.files').dropify();

});
</script>
@endsection