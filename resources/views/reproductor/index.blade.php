@extends('layouts.reproductor')
@section('contenido')
<div class="container-fluid">

    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box">
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="/welcome">Inicio</a></li>
                        <li class="breadcrumb-item"><a href="/reproductor_admin">Canciones</a></li>
                    </ol>
                </div>
                <h4 class="page-title">Catálogo de canciones</h4>

                <a href="/reproductor_admin/create" class="button-list">
                    <button type="button" class="btn btn-success waves-effect waves-light">
                        <span class="btn-label"><i class="mdi mdi-plus-box"></i>
                        </span>Registrar nueva canción</button>
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

                            <th>N°</th>
                            <th>Titulo</th>
                            <th>Artista</th>
                            <th>Mes</th>
                            <th>Año</th>
                            <th>Ver</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                            <th>Estado</th>
                            <th>Fecha de registro</th>
                            <th>Ultima actualización</th>
                            <th>Modificado por</th>

                        </tr>
                    </thead>


                    <tbody>
                        @foreach($canciones as $cancion)
                        <tr>

                            <td>{{$cancion->id}}</td>
                            <td>{{$cancion->titulo}}</td>
                            <td>{{$cancion->artista}}</td>
                            <td>{{$cancion->mes}}</td>
                            <td>{{$cancion->año}}</td>
                            <td>
                                <a target="blank" href="/files/{{$cancion->archivo}}"
                                    class="btn waves-effect waves-light btn-info" role="button">
                                    <i class="mdi mdi-eye"></i></a>
                            </td>
                            <td> <a href="{{URL::action('reproductorController@edit',$cancion->id)}}"
                                    class="btn waves-effect waves-light btn-primary" role="button"><i
                                        class="mdi mdi-account-edit-outline"></i></a>
                            </td>
                            @if($cancion->estado == "ACTIVO")
                            <td> <input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
                                <a class="btn waves-effect waves-light btn-warning"
                                    onclick=inactivar('{{$cancion->id}}','reproductor_admin'); style="margin-right: 10px;"
                                    role="button"><i class="mdi mdi-delete"></i></a>
                            </td>
                            <td><span class="badge badge-success">{{$cancion->estado}}</span></td>

                            @else
                            <td>No aplica</td>
                            <td><span class="badge badge-danger">{{$cancion->estado}}</span></td>
                            @endif

                            <td>{{$cancion->created_at}}</td>
                            <td>{{$cancion->updated_at}}</td>
                            <td>{{$cancion->captura}}</td>

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