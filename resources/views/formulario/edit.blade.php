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
                        <li class="breadcrumb-item"><a href="/formularios">Formularios</a></li>
                        <li class="breadcrumb-item active">Edición de formularios</li>
                    </ol>
                </div>
                <h4 class="page-title">Editar nuevo formulario</h4>

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

                            <form id="wizard-validation-form" action="{{url('/formularios', [$formulario->id])}}"
                                name="formulario" method="post" files="true" enctype="multipart/form-data">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" value="PUT">

                                <div>
                                    <h3>Información del formulario</h3>
                                    <section>
                                        <div>

                                            <div class="form-group">
                                                <label for="userName">Nombre del formulario<span
                                                        class="text-danger"></span></label>
                                                <input type="text" value="{{$formulario->nombre}}" required
                                                    name="nombre" parsley-trigger="change"
                                                    onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()"
                                                    placeholder="Ingresar el nombre del formulario" class="form-control"
                                                    id="nombre">
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Descripción<span
                                                        class="text-danger"></span></label>
                                                <input type="text" value="{{$formulario->descripcion}}" required
                                                    name="descripcion" parsley-trigger="change"
                                                    placeholder="Ingresar la descripción" class="form-control"
                                                    id="descripcion">
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Duración aproximada en minutos<span
                                                        class="text-danger"></span></label>
                                                <input type="number" value="{{$formulario->duracion}}" required
                                                    name="duracion" parsley-trigger="change"
                                                    placeholder="Ingresar la duración aproximada en minutos"
                                                    class="form-control" id="duracion">
                                            </div>

                                            <div class="col-lg-12 ">
                                                <h4 class="header-title mb-4">Portada de inicio</h4>
                                                <input class="files" type="file" accept=".png, .jpg, .jpeg" id="fondo"
                                                    name="fondo" />
                                            </div>

                                            <div class="col-lg-12 ">
                                                <h4 class="header-title mb-4">Logo lateral</h4>
                                                <input class="files" type="file" accept=".png, .jpg, .jpeg" id="logo"
                                                     name="logo" />
                                            </div>





                                        </div>
                                    </section>
                                    <h3>Pantalla al finalizar el formulario</h3>
                                    <section>
                                        <div class="form-group">
                                            <label for="userName">Título<span class="text-danger"></span></label>
                                            <input type="text" value="{{$formulario->titulo_fin}}" required name="titulo_fin" parsley-trigger="change"
                                                onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()"
                                                placeholder="Ingresar el título" class="form-control" id="titulo_fin">
                                        </div>

                                        <div class="form-group">
                                            <label for="userName">Texto<span class="text-danger"></span></label>
                                            <input type="text" value="{{$formulario->texto_fin}}" required name="texto_fin" parsley-trigger="change"
                                                placeholder="Ingresar el texto" class="form-control" id="texto_fin">
                                        </div>
                                        <div class="col-lg-12 ">
                                            <h4 class="header-title mb-4">Imagen de fondo</h4>
                                            <input class="files" type="file" accept=".png, .jpg, .jpeg" id="fondo_fin"
                                                 name="fondo_fin" />
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