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
                <h4 class="page-title">Catálogo de preguntas registradas</h4>


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

                            <th>Nombre del formulario</th>
                            <th>Posición</th>
                            <th>Pregunta</th>
                            <th>Ver url formulario</th>
                            <th>Ver formulario</th>                          
                            <th>Editar</th>
                            <th>Borrar</th>
                            <th>Estado</th>
                            <th>Fecha de registro</th>
                            <th>Ultima actualización</th>
                            <th>Modificado por</th>

                        </tr>
                    </thead>


                    <tbody>
                        @foreach($preguntas as $pregunta)
                        <tr>
                            <td>{{$pregunta->nombre}}</td>
                            <td>{{$pregunta->posicion}}</td>
                            <td>{{$pregunta->titulo_pregunta}}</td>
                            <td>{{$pregunta->url}}</td>
                            <td> 
                                <a href="{{URL::action('preguntasController@show',$pregunta->id_formulario)}}"
                                    class="btn waves-effect waves-light btn-info" role="button">
                                    <i class="mdi mdi-eye"></i></a>
                            </td>

                            <td> <a href="{{URL::action('preguntasController@edit',$pregunta->id)}}"
                                    class="btn waves-effect waves-light btn-primary" role="button"><i
                                        class="mdi mdi-account-edit-outline"></i></a>
                            </td>
                            @if($pregunta->estado == "ACTIVO")
                            <td> <input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
                                <a class="btn waves-effect waves-light btn-warning"
                                    onclick=inactivar('{{$pregunta->id}}','preguntas'); style="margin-right: 10px;"
                                    role="button"><i class="mdi mdi-delete"></i></a>
                            </td>
                            <td><span class="badge badge-success">{{$pregunta->estado}}</span></td>

                            @else
                            <td>No aplica</td>
                            <td><span class="badge badge-danger">{{$pregunta->estado}}</span></td>
                            @endif

                            <td>{{$pregunta->created_at}}</td>
                            <td>{{$pregunta->updated_at}}</td>
                            <td>{{$pregunta->captura}}</td>

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