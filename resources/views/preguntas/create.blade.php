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
                        <li class="breadcrumb-item active">Registro de preguntas</li>
                    </ol>
                </div>
                <h4 class="page-title">Registrar nueva pregunta</h4>

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

                            <form id="wizard-validation-form" action="{{route('preguntas.store')}}" name="formulario"
                                method="post" files="true" enctype="multipart/form-data">
                                {{csrf_field()}}
                                <div>
                                    <h3>Titulo</h3>
                                    <section>
                                        <div>
                                            <input value="{{$formulario->id}}" type="hidden" id="id_formulario" name="id_formulario">

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
                                                    value="{{$ultima}}" placeholder="Ingresar el N° de pregunta"
                                                    class="form-control" id="posicion">
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Título de pregunta<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" required name="titulo_pregunta"
                                                    parsley-trigger="change"
                                                    placeholder="Ingresar el titulo de la pregunta" class="form-control"
                                                    id="titulo_pregunta">
                                            </div>


                                            <div class="form-group">
                                                <label for="userName">Concatenar título de otra respuesta<span
                                                        class="text-danger">*</span></label>
                                                <select class="form-control select2-multiple" style="width: 100%"
                                                    name="concatenar" onchange="concat(this.value);"
                                                    data-placeholder="Seleccione una opción ..." id="concatenar">
                                                    <option value="" selected>Seleccione una opción</option>
                                                    <option value="SI">SI</option>
                                                    <option value="NO">NO</option>
                                                </select>
                                            </div>

                                            <div id="div_concatenar" style='display:none;'>
                                                <div class="form-group">
                                                    <label for="userName">Seleccione el número de pregunta
                                                        respuesta<span class="text-danger">*</span></label>
                                                    <select class="form-control select2-multiple" style="width: 100%"
                                                        name="heredado" data-placeholder="Seleccione una opción ..."
                                                        id="heredado">
                                                        <option value="" selected>Seleccione una opción</option>
                                                        @foreach($preguntas as $pregunta)
                                                        <option value="{{$pregunta->posicion}}">PREGUNTA:
                                                            {{$pregunta->posicion}}: {{$pregunta->titulo_pregunta}}
                                                        </option>
                                                        @endforeach

                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="userName">Posición del título heredado<span
                                                            class="text-danger">*</span></label>
                                                    <select class="form-control select2-multiple" style="width: 100%"
                                                        name="posicion_h" onchange="titulo_des(this.value);"
                                                        data-placeholder="Seleccione una opción ..." id="posicion_h">
                                                        <option value="" selected>Seleccione una opción</option>
                                                        <option value="INICIO">Al inicio del título</option>
                                                        <option value="DESPUES">Al Final del título</option>
                                                        <option value="MEDIO">En medio de dos titulos</option>
                                                    </select>
                                                </div>

                                                <div class="form-group" id="div_despues" style='display:none;'>
                                                    <label for="userName">Título despues de concatenar<span
                                                            class="text-danger">*</span></label>
                                                    <input type="text" name="titulo_despues" parsley-trigger="change"
                                                        placeholder="Ingresar el titulo despues de concatenar"
                                                        class="form-control" id="titulo_despues">
                                                </div>


                                            </div>

                                            <div class="form-group">
                                                <label for="userName">La pregunta depende de la respuesta de otra
                                                    pregunta<span class="text-danger">*</span></label>
                                                <select class="form-control select2-multiple" style="width: 100%"
                                                    name="depende" onchange="depend(this.value);"
                                                    data-placeholder="Seleccione una opción ..." id="depende">
                                                    <option value="" selected>Seleccione una opción</option>
                                                    <option value="SI">SI</option>
                                                    <option value="NO">NO</option>
                                                </select>
                                            </div>

                                            <div id="div_depend" style='display:none;'>
                                                <div class="form-group">
                                                    <label for="userName">Seleccione el número de pregunta<span
                                                            class="text-danger">*</span></label>
                                                    <select class="form-control select2-multiple" style="width: 100%"
                                                        name="depend_orig" onchange="cambiar_pregunta(this.value);"data-placeholder="Seleccione una opción ..."
                                                        id="depend_orig">
                                                        <option value="" selected>Seleccione una opción</option>
                                                        @foreach($preguntas as $pregunta)
                                                        <option value="{{$pregunta->id}}">PREGUNTA:
                                                            {{$pregunta->posicion}}: {{$pregunta->titulo_pregunta}}
                                                        </option>
                                                        @endforeach

                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="userName">Respuesta<span
                                                            class="text-danger">*</span></label>
                                                    <select class="form-control select2-multiple" style="width: 100%"
                                                        name="resp_dep"
                                                        data-placeholder="Seleccione una opción ..." id="resp_dep">
                                                        <option value="" selected>Seleccione una opción</option>                                                     
                                                    </select>
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
                                                <option value="" selected>Seleccione una opción</option>
                                                <option value="TEXTO">TEXTO</option>
                                                <option value="NÚMERICO">NÚMERICO</option>
                                                <option value="RADIO">RADIO</option>
                                                <option value="TEXTAREA">TEXTAREA</option>
                                                <option value="MULTIPLE">OPCIÓN MULTIPLE</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="userName">Pregunta obligatoria<span
                                                    class="text-danger">*</span></label>
                                            <select class="form-control select2-multiple" style="width: 100%"
                                                name="obligatorio" data-placeholder="Seleccione una opción ..."
                                                id="obligatorio">
                                                <option value="" selected>Seleccione una opción</option>
                                                <option value="SI">SI</option>
                                                <option value="NO">NO</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="userName">Placeholder<span class="text-danger">*</span></label>
                                            <input type="text" required name="placeholder" parsley-trigger="change"
                                                placeholder="Ingresar el texto que aparecera en el input ejem. Ingrese su respuesta"
                                                class="form-control" id="placeholder">
                                        </div>

                                        <div id="div_maximo" style='display:none;'>
                                            <div class="form-group">
                                                <label for="userName">Máximo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" name="maximo" parsley-trigger="change"
                                                    placeholder="Ingresar el máximo de caracteres de la pregunta"
                                                    class="form-control" id="maximo">
                                            </div>
                                            <div class="form-group">
                                                <label for="userName">Máximo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" name="maximo" parsley-trigger="change"
                                                    placeholder="Ingresar el máximo de caracteres de la pregunta"
                                                    class="form-control" id="maximo">
                                            </div>


                                            <div class="form-group">
                                                <label for="userName">Mínimo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" name="minimo" parsley-trigger="change"
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
                                                required name="fondo" />
                                        </div>


                                    </section>

                                    <h3>Respuestas</h3>
                                    <section>

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

                                    </section>
                                    <h3>Agregar otra opción</h3>
                                    <section>


                                        <div class="form-group">
                                            <label for="userName">Desea agregar otra opción de texto<span
                                                    class="text-danger"></span></label>
                                            <select class="form-control select2-multiple" style="width: 100%"
                                                name="otra_opcion" onchange="anexar_opcion(this.value);"
                                                data-placeholder="Seleccione una opción ..." id="otra_opcion" required>
                                                <option value="" selected>Seleccione una opción</option>
                                                <option value="SI">SI</option>
                                                <option value="NO">NO</option>

                                            </select>
                                        </div>

                                        <div id="div_otra_opcion" style='display:none;'>
                                            <div class="form-group">
                                                <label for="userName">Título de la opción<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" name="titulo_pregunta_2" parsley-trigger="change"
                                                    placeholder="Ingresar el titulo de la pregunta" class="form-control"
                                                    id="titulo_pregunta_2">
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Tipo de opción<span
                                                        class="text-danger">*</span></label>
                                                <select class="form-control select2-multiple" style="width: 100%"
                                                    name="tipo_2" data-placeholder="Seleccione una opción ..."
                                                    id="tipo_2">
                                                    <option value="" selected>Seleccione una opción</option>
                                                    <option value="TEXTO">TEXTO</option>
                                                    <option value="NÚMERICO">NÚMERICO</option>
                                                    <option value="TEXTAREA">TEXTAREA</option>
                                                    <option value="MULTIPLE">OPCIÓN</option>
                                                </select>
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Placeholder<span
                                                        class="text-danger">*</span></label>
                                                <input type="text" name="placeholder_2" parsley-trigger="change"
                                                    placeholder="Ingresar el texto que aparecera en el input ejem. Ingrese su respuesta"
                                                    class="form-control" id="placeholder_2">
                                            </div>


                                            <div class="form-group">
                                                <label for="userName">Máximo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" name="maximo_2" parsley-trigger="change"
                                                    placeholder="Ingresar el máximo de caracteres de la pregunta"
                                                    class="form-control" id="maximo_2">
                                            </div>


                                            <div class="form-group">
                                                <label for="userName">Mínimo de caracteres<span
                                                        class="text-danger">*</span></label>
                                                <input type="number" name="minimo_2" parsley-trigger="change"
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