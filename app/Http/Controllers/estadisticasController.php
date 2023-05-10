<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;

class estadisticasController extends Controller
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function formularios_registrados($inicio,$fin,$year)
    {
        $datos = [];
        $datos2 = [];
        $user = Auth::user();

        $formularios = DB::table('formulario')->where('id_user','=',$user->id)
        ->where('formulario.estado','=','ACTIVO')
            ->select('created_at')->distinct('created_at')->get();

        $dias = array();
        foreach($formularios as $formulario){ 
                    $dia = substr($formulario->created_at, 0, 10);
                    $fecha = date('Y-m-d', strtotime($dia));    
                  if (in_array($fecha, $dias)) {
                   }else{
                    array_push($dias, $fecha);
                   }
        }     
                  
        foreach($dias as $dia){                                                           
            $clientes = DB::table('formulario')
            ->where('formulario.estado','=','ACTIVO')
            ->where('id_user','=',$user->id)
            ->whereDate('created_at','=',$dia)->get();
            if(count($clientes)>0){
                array_push($datos, ['nombre'=>$dia, 'total'=>count($clientes)]);
                array_push($datos2, ['nombre'=>$dia, 'total'=>count($clientes)+1]);
            }
            array_push($datos, ['nombre'=>'2020-09-02', 'total'=>8]);
            array_push($datos2, ['nombre'=>'2020-08-02', 'total'=>18]);
        }      
               
        return response()->json(['datos'=>$datos,'datos2'=>$datos2]);
        //
    }

    public function respuestas_registradas($inicio,$fin,$year)
    {
        $datos = [];
        $user = Auth::user();

        $formularios=DB::table('respuestas')->join('formulario','formulario.id','=','respuestas.id_formulario')
        ->where('formulario.id_user','=',$user->id)
        ->where('formulario.estado','=','ACTIVO')
        ->select('formulario.*')->distinct('formulario.id')->get();

        $fecha_formularios= [];
        foreach($formularios as $form){
          $resp = DB::table('respuestas')->join('formulario','formulario.id','=','respuestas.id_formulario')
          ->where('formulario.id_user','=',$user->id)
          ->where('formulario.id','=',$form->id)
          ->where('formulario.estado','=','ACTIVO')
          ->select('respuestas.created_at')->distinct('respuestas.created_at')->get();
          foreach($resp as $res){
            array_push($fecha_formularios, ['id_form'=>$form->id,'fecha'=>$res->created_at]);
          }
        }

     
        //$dias = array();
        $dias=[];
        foreach($fecha_formularios as $formulario){ 
            $dia = substr($formulario['fecha'], 0, 10);
            $fecha = date('Y-m-d', strtotime($dia));    
            array_push($dias, ['id_form'=>$formulario['id_form'],'fecha'=>$fecha]);                                           
        }
        return $dias;
        
       
                  
        foreach($dias as $dia){                                                           
            $clientes = DB::table('formulario')
            ->where('formulario.estado','=','ACTIVO')
            ->where('id_user','=',$user->id)
            ->whereDate('created_at','=',$dia)->get();
            if(count($clientes)>0){
                array_push($datos, ['nombre'=>$dia, 'total'=>count($clientes)]);
            }
         
         
        }                                    
        return response()->json(['datos'=>$datos]);
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
