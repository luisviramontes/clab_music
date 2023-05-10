@extends('layouts.principal')
@section('contenido')
<div class="container-fluid">

    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="/welcome">Inicio</a></li>
                        <li class="breadcrumb-item"><a href="/formularios">Formularios</a></li>
                    </ol>
                </div>
                <h4 class="page-title">Catálogo de formularios Registrados</h4>

                <a href="/formularios/create" class="button-list">
                    <button type="button" class="btn btn-success waves-effect waves-light">
                        <span class="btn-label"><i class="mdi mdi-plus-box"></i>
                        </span>Registrar nuevo formulario</button>
                </a>


            </div>
        </div>


    </div>
    <!-- end page title -->



    <div class="row">
        <div class="col-12">
            <div class="card-box">
                <h4 class="header-title">Descarga</h4>


                <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap"
                    style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>

                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Url</th>
                            <th>Ver formulario</th>
                            <th>Agregar preguntas</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                            <th>Estado</th>
                            <th>Fecha de registro</th>
                            <th>Ultima actualización</th>
                            <th>Modificado por</th>

                        </tr>
                    </thead>


                    <tbody>
                        @foreach($formularios as $formulario)
                        <tr>
                            <td>{{$formulario->nombre}}</td>
                            <td>{{$formulario->descripcion}}</td>
                            <td><a target="blank" href="/contestar_formulario/{{$formulario->url}}">{{$formulario->url}}</a></td>
                            <td>
                                <a href="{{URL::action('formularioController@show',$formulario->id)}}"
                                    class="btn waves-effect waves-light btn-info" role="button">
                                    <i class="mdi mdi-eye"></i></a>
                            </td>

                            <td>
                                <a href="/registrar_preguntas/{{$formulario->id}}"
                                    class="btn waves-effect waves-light btn-info" role="button">
                                    <i class="ion ion-md-add-circle"></i></a>
                            </td>

                            <td> <a href="{{URL::action('formularioController@edit',$formulario->id)}}"
                                    class="btn waves-effect waves-light btn-primary" role="button"><i
                                        class="mdi mdi-account-edit-outline"></i></a>
                            </td>
                            @if($formulario->estado == "ACTIVO")
                            <td> <input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
                                <a class="btn waves-effect waves-light btn-warning"
                                    onclick=inactivar('{{$formulario->id}}','formularios'); style="margin-right: 10px;"
                                    role="button"><i class="mdi mdi-delete"></i></a>
                            </td>
                            <td><span class="badge badge-success">{{$formulario->estado}}</span></td>

                            @else
                            <td>No aplica</td>
                            <td><span class="badge badge-danger">{{$formulario->estado}}</span></td>
                            @endif

                            <td>{{$formulario->created_at}}</td>
                            <td>{{$formulario->updated_at}}</td>
                            <td>{{$formulario->captura}}</td>

                        </tr>
                        @endforeach

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- end row -->

</div> <!-- end container-fluid -->
@endsection