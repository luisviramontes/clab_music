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
                        <li class="breadcrumb-item"><a href="/">Inicio</a></li>
                        <li class="breadcrumb-item"><a href="/formulario">Formularios</a></li>
                        <li class="breadcrumb-item active">Detalles del formulario</li>
                    </ol>
                </div>
                <h4 class="page-title">Detalles del formulario: {{$formulario->nombre}}. </h4>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card-box tilebox-two" style='height: 120px!important;'>
                <i class="icon-chart float-right text-muted"></i>
                <h6 class="text-success text-uppercase">TOTAL DE PREGUNTAS DEL FORMULARIO</h6>
                <h3><span data-plugin="counterup">{{$total_preguntas}}</span></h3>
            </div>
        </div>

        <div class="col-xl-3 col-md-6">
            <div class="card-box tilebox-two" style='height: 120px!important;'>
                <i class="icon-chart float-right text-muted"></i>
                <h6 class="text-success text-uppercase">TOTAL DE RESPUESTAS</h6>
                <h3><span data-plugin="counterup">{{$total_respuestas}}</span></h3>
            </div>
        </div>


        <div class="col-xl-3 col-md-6">
            <div class="card-box tilebox-two" style='height: 120px!important;'>
                <i class="icon-chart float-right text-muted"></i>
                <h6 class="text-success text-uppercase">GENERAR EXCEL</h6>
                <a href="/descargar_reporte_form/{{$formulario->id}}/EXCEL"
                    class="btn btn-sm btn-success waves-effect waves-light float-right">Descargar</a>
            </div>

        </div>

        <div class="col-xl-3 col-md-6">
            <div class="card-box tilebox-two" style='height: 120px!important;'>
                <i class="icon-chart float-right text-muted"></i>
                <h6 class="text-success text-uppercase">GENERAR PDF</h6>
                <a href="/descargar_reporte_form/{{$formulario->id}}/PDF"
                    class="btn btn-sm btn-danger waves-effect waves-light float-right">Descargar</a>
            </div>

        </div>
    </div>
    <!-- end page title -->
    @include('formulario.modal')
    <form action="#" id="form" method="post" files="true" enctype="multipart/form-data"
        class="form-horizontal parsley-examples">
        {{csrf_field()}}

        <div class="row">
            <div class="col-12">
                <div class="card-box">
                    <h4 class="header-title">Datos:</h4>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card-box">
                                <div class="table-responsive">
                                    <table class="table table-borderless mb-0">




                                        <tr class="bg-light text-dark">
                                            <th>Nombre del formulario:</th>
                                            <td><select class="form-control" style="width: 100%" name="nombre[]"
                                                    id="nombre" data-toggle="select2" multiple="multiple" disabled>
                                                    <option selected>
                                                        {{$formulario->nombre}}
                                                    </option>
                                                </select></td>

                                        </tr>


                                        <tr class="bg-light text-dark">
                                            <th>Título final:</th>
                                            <td><select class="form-control" style="width: 100%" name="titulo_fin[]"
                                                    id="titulo_fin" data-toggle="select2" multiple="multiple" disabled>
                                                    <option selected>
                                                        {{$formulario->titulo_fin}}
                                                    </option>
                                                </select></td>

                                        </tr>





                                        <tr class="bg-white text-dark">
                                            <th>Estado: </th>
                                            <td id="estado"><select class="form-control " style="width: 100%"
                                                    name="estado[]" id="estado" data-toggle="select2"
                                                    multiple="multiple" disabled>

                                                    <option selected>
                                                        {{$formulario->estado}}
                                                    </option>

                                                </select></td>
                                        </tr>

                                        <tr class="bg-light text-dark">
                                            <th>Modificado por: </th>
                                            <td><select class="form-control" style="width: 100%" name="captura_amparo[]"
                                                    id="captura_amparo" data-toggle="select2" multiple="multiple"
                                                    disabled>
                                                    <option selected>
                                                        {{$formulario->captura}}
                                                    </option>
                                                </select></td>

                                        </tr>


                                        <tr class="bg-white text-dark">
                                            <th>Fecha de captura:</th>
                                            <td id="num_exp2"><select class="form-control " style="width: 100%"
                                                    name="created_amparo[]" id="created_amparo" data-toggle="select2"
                                                    multiple="multiple" disabled>

                                                    <option selected>
                                                        {{$formulario->created_at}}
                                                    </option>

                                                </select></td>
                                        </tr>

                                        <tr class="bg-light text-dark">
                                            <th>Ultima actualización: </th>
                                            <td> <select class="form-control s " style="width: 100%"
                                                    name="updated_amparo[]" id="updated_amparo" data-toggle="select2"
                                                    multiple="multiple" disabled>
                                                    <option selected>
                                                        {{$formulario->updated_at}}
                                                    </option>

                                                </select></td>
                                        </tr>

                                        <tr class="bg-light text-dark">
                                            <th>Generar codigo incrustable: </th>
                                            <td><button
                                                    onclick="generar_iframe('/iniciar_formulario/{{$formulario->url}}');"
                                                    type="button" class="btn btn-success waves-effect waves-light">
                                                    <span class="btn-label"><i class="ion ion-md-albums"></i>
                                                    </span>Generar</button></td>
                                        </tr>






                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="card-box">
                                <div class="table-responsive">
                                    <table class="table table-borderless mb-0">




                                        <tr class="bg-light text-dark">
                                            <th>Descripción:</th>
                                            <td><select class="form-control" style="width: 100%" name="descripcion[]"
                                                    id="descripcion" data-toggle="select2" multiple="multiple" disabled>
                                                    <option selected>
                                                        {{$formulario->descripcion}}
                                                    </option>
                                                </select></td>

                                        </tr>

                                        <tr class="bg-light text-dark">
                                            <th>Texto final:</th>
                                            <td><select class="form-control" style="width: 100%" name="archivo[]"
                                                    id="archivo" data-toggle="select2" multiple="multiple" disabled>
                                                    <option selected>
                                                        {{$formulario->texto_fin}}
                                                    </option>
                                                </select></td>

                                        </tr>

                                        <tr class="bg-light text-dark">
                                            <th>Url:</th>
                                            <td><a target="blank" href="/contestar_formulario/{{$formulario->url}}">
                                                    <span class="badge badge-success">{{$formulario->url}}</span></a>
                                            </td>

                                        </tr>

                                        <tr class="bg-light text-dark">
                                            <th>Duración:</th>
                                            <td><select class="form-control" style="width: 100%" name="duracion[]"
                                                    id="duracion" data-toggle="select2" multiple="multiple" disabled>
                                                    <option selected>
                                                        {{$formulario->duracion}} minutos
                                                    </option>
                                                </select></td>

                                        </tr>


                                        <tr class="bg-white text-dark">
                                            <th>Total de preguntas: </th>
                                            <td id="total_preguntas"><select class="form-control " style="width: 100%"
                                                    name="total_preguntas[]" id="total_preguntas" data-toggle="select2"
                                                    multiple="multiple" disabled>

                                                    <option selected>
                                                        {{$total_preguntas}}
                                                    </option>

                                                </select></td>
                                        </tr>


                                        <tr class="bg-white text-dark">
                                            <th>N° veces contestado: </th>
                                            <td id="fecha_inicio"><select class="form-control " style="width: 100%"
                                                    name="contestaciones[]" id="contestaciones" data-toggle="select2"
                                                    multiple="multiple" disabled>

                                                    <option selected>
                                                        {{$total_respuestas}}
                                                    </option>

                                                </select></td>
                                        </tr>


                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!--Fin del row -->

                </div>
            </div>


            <div class="row">
                <div class="col-12">
                    <div class="card-box">
                        <h4 class="header-title mb-4">Preguntas del formulario {{$formulario->nombre}} </h4>
                        <div class="table-responsive">
                            <table class="table table-centered table-borderless table-striped mb-0">
                                <tbody>

                                    <tr>
                                        <td><b>N°</td>
                                        <td>Nombre de la pregunta</td>
                                        <td>Tipo</td>
                                        <td>Obligatoria</td>
                                        <td>Img de fondo</td>
                                        <td>Ver pregunta</td>
                                        <td>Editar pregunta</td>
                                        <td>Eliminar pregunta</td>
                                        <td>Fecha de registro</td>
                                    </tr>
                                    @foreach($preguntas as $pregunta)
                                    <tr>
                                        <th>{{$pregunta->posicion}}</th>
                                        <th>{{$pregunta->titulo_pregunta}}</th>
                                        <th>{{$pregunta->tipo}}</th>
                                        <th>{{$pregunta->obligatorio}}</th>
                                        <th> <img src="/PORTADAS/{{$pregunta->imagen_fondo}}" width="100" height="50">
                                        </th>
                                        <th><a href="{{URL::action('preguntasController@show',$pregunta->id)}}"
                                                class="btn waves-effect waves-light btn-info" role="button">
                                                <i class="mdi mdi-eye"></i></a>
                                        </th>

                                        <th> <a href="{{URL::action('preguntasController@edit',$pregunta->id)}}"
                                                class="btn waves-effect waves-light btn-primary" role="button"><i
                                                    class="mdi mdi-account-edit-outline"></i></a>
                                        </th>
                                        <th>
                                            <a class="btn waves-effect waves-light btn-warning"
                                                onclick=inactivar('{{$pregunta->id}}','preguntas');
                                                style="margin-right: 10px;" role="button"><i class="mdi mdi-delete"></i>
                                        </th>
                                        <th>{{$pregunta->created_at}}</th>
                                    </tr>
                                    @endforeach


                                </tbody>
                            </table>
                        </div> <!-- end .table-responsive -->
                    </div> <!-- end card-box -->
                </div><!-- end col -->
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="card-box">
                        <h4 class="header-title">Respuestas del formulario</h4>
                        <div class="form-group" class="table-responsive">
                            <table id="autorizados" name="autorizados" class="table table-bordered dt-responsive nowrap"
                                style="border-collapse: collapse; border-spacing: 0; width: 100%!important;">
                                <thead>
                                    <tr>
                                        <th>Fecha de registro</th>                                      
                                        <th>Ver respuesta</th>
                                        <th>Ip publica</th>
                                        <th>País</th>
                                        <th>Estado</th>
                                        <th>Región</th>
                                        <th>Provedor</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    @foreach($respuestas as $respuesta)
                                    <tr>
                                        <td>{{$respuesta->created_at}}</td>                                      
                                        <td> <a href="{{URL::action('respuestasAplicadasController@show',$respuesta->id)}}"
                                                class="btn waves-effect waves-light btn-info" role="button">
                                                <i class="mdi mdi-eye"></i></a>


                                        </td>
                                        <td>{{$respuesta->ip_publica}}</td>
                                        <td>{{$respuesta->estado}}</td>
                                        <td>{{$respuesta->ciudad}}</td>
                                        <td>{{$respuesta->region}}</td>
                                        <td>{{$respuesta->org}}</td>

                                    </tr>
                                    @endforeach



                                </tbody>
                            </table>
                        </div>



                    </div>

                </div>

            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="card-box">
                        <div class="form-group">
                            <h4 class="form-group">Portada de inicio</h4>
                            <img src="/PORTADAS/{{$formulario->portada}}" width="400" height="200">
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card-box">
                        <div class="form-group">
                            <h4 class="form-group">Portada final</h4>
                            <img src="/PORTADAS/{{$formulario->fondo_fin}}" width="400" height="200">
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card-box">
                        <div class="form-group">
                            <h4 class="form-group">Logo del formulario</h4>
                            <img src="/PORTADAS/{{$formulario->logo}}" width="400" height="200">
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <!-- end row -->





    </form>

</div> <!-- end container-fluid -->

@stop