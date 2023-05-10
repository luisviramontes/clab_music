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
                        <li class="breadcrumb-item"><a href="/formularios">Formularios contestados</a></li>
                    </ol>
                </div>
                <h4 class="page-title">Respuestas de formularios contestadas</h4>


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
                            <th>Fecha de registro</th>
                            <th>Nombre del formulario</th>
                            <th>Ver respuesta</th>
                            <th>Ver formulario</th>
                            <th>Borrar</th>
                            <th>Ultima actualización</th>
                        </tr>
                    </thead>


                    <tbody>
                        @foreach($respuestas as $respuesta)
                        <tr>
                        <td>{{$respuesta->created_at}}</td>
                            <td>{{$respuesta->nombre}}</td>
                            <td>
                                <a href="{{URL::action('respuestasAplicadasController@show',$respuesta->id)}}"
                                    class="btn waves-effect waves-light btn-info" role="button">
                                    <i class="mdi mdi-eye"></i></a>
                            </td>
                            <td>
                                <a href="{{URL::action('formularioController@show',$respuesta->id_formulario)}}"
                                    class="btn waves-effect waves-light btn-info" role="button">
                                    <i class="mdi mdi-eye"></i></a>
                            </td>

                           
                        
                            <td> <input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
                                <a class="btn waves-effect waves-light btn-warning"
                                    onclick=inactivar('{{$respuesta->id}}','formularios_contestados'); style="margin-right: 10px;"
                                    role="button"><i class="mdi mdi-delete"></i></a>
                            </td>
                            
                          
                            <td>{{$respuesta->updated_at}}</td>
                           

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