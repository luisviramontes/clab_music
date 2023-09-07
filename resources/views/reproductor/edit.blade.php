@extends('layouts.reproductor')
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
                        <li class="breadcrumb-item"><a href="/reproductor_admin">Reproductor</a></li>
                        <li class="breadcrumb-item active">Registro de canciones</li>
                    </ol>
                </div>
                <h4 class="page-title">Registrar nueva canción</h4>

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
                            <h4 class="header-title">Canciones en el reproductor </h4>


                            <form id="wizard-validation-form" action="/reproductor_admin/{{$cancion->id}}"
                                name="formulario" method="post" files="true" enctype="multipart/form-data">
                                {{csrf_field()}}

                                <input type="hidden" name="_method" value="PUT">

                                <div>
                                    <h3>Información de la canción</h3>
                                    <section>
                                        <div>

                                          

                                            <div class="form-group">
                                                <label for="userName">Mes<span class="text-danger"></span></label>
                                                <select class="form-control select2" required="true" name="mes" id="mes"
                                                    data-placeholder="Seleccione el mes ..." aria-hidden="true">
                                                    @foreach($meses as $mes)
                                                    @if($mes == $cancion->mes)
                                                    <option value="{{$mes}}" selected>{{$mes}}</option>
                                                    @else
                                                    <option value="{{$mes}}">{{$mes}}</option>
                                                    @endif
                                                    @endforeach
                                                </select>
                                            </div>

                                            <div class="form-group">
                                                <label for="userName">Año<span class="text-danger"></span></label>
                                                <input type="text" name="año" value="{{$cancion->año}}"
                                                    parsley-trigger="change" placeholder="Ingresar el año"
                                                    class="form-control" id="año">
                                            </div>

                                            <div class="form-group">
                                                <h4 class="header-title mb-4">Subir archivo</h4>
                                                <input type="file" accept=".mp3" id="archivo"  name="archivo" />
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
    $(".select2-multiple").select2({
        width: '100%'
    });
    $('.select2-multiple').val(null).trigger('change');
    $('#archivo').dropify();

});
</script>
@endsection