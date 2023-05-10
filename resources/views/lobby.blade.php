@extends('layouts.principal')
@section('contenido')

@if(Auth::User()->estado=='POR_VALIDAR')
<div class="alert alert-danger  alert-dismissible fade show mt-4 bt-4" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Necesitas activar tu cuenta, en el enlace que se envió a tu correo, una ves activa tu cuenta
        podrás acceder al sistema FORMULARIOS Y todas las funciones.</strong>
</div>
@else
<div class="row">
    <div class="col-12">
        <div class="card-box">

            <h4 class="header-title"> Hola {{Auth::User()->name}} bienvenido al Sistema FORMULARIOS
            </h4>
        </div>

    </div>
</div>
@endif

<div class="container-fluid">


    <div class="row">


    <div class="col-lg-12 col-xl-12">
            <div id="display_exp_asig">
                <div class="card-box">
                    <h4 class="header-title mb-3">Formularios registrados</h4>

                    <div id="formularios_registrados" class="morris-chart" data-colors="#29abe2,#ffc142,#1ab394"
                        style="height: 380;"></div>

                </div>
            </div><!-- end col-->
        </div>








    </div>
</div>


@stop
@section('javascript')
<script type="text/javascript">
window.onload = function() {
    $("#formularios_registrados").empty();

    
    grafica_lineal_json(0, 0, 'formularios_registrados_json', 'formularios_registrados', 0);



}
</script>
@endsection