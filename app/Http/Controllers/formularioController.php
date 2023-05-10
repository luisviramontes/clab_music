<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller; 
use App\formularioModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
 
class formularioController extends Controller
{

    public function __construct()
    {
      $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $formularios=DB::table('formulario')->where('id_user','=',Auth::user()->id)->get();
        return view('formulario.index',['formularios'=>$formularios]);
        //
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('formulario.create');
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

        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 50);

        $formulario = new formularioModel;
        $formulario->id_user=Auth::user()->id;
        $formulario->nombre=$request->get('nombre');
        $formulario->descripcion=$request->get('descripcion');
        $formulario->duracion=$request->get('duracion');
        $formulario->url=$clave_alfa_asig;
        $formulario->estado='ACTIVO';
        $formulario->captura=Auth::user()->name;
        $formulario->titulo_fin=$request->get('titulo_fin');
        $formulario->texto_fin=$request->get('texto_fin');

        if ($request->hasFile('fondo_fin')) {
            $year = date("Y");            
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 20);

            $file = $request->file('fondo_fin');
            $file->move('PORTADAS/', $file->getClientoriginalName());
            $aviso_portada = $file->getClientoriginalName();
            $path_info = pathinfo($aviso_portada);
            $extension = $path_info['extension']; // "bill"
            $nombre = "PORTADA-FIN-" .$clave_alfa_asig. "-" . $year . "." . $extension;
            rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
            $formulario->fondo_fin=$nombre;
        } 

        if ($request->hasFile('fondo')) {
            $year = date("Y");            
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 20);

            $file = $request->file('fondo');
            $file->move('PORTADAS/', $file->getClientoriginalName());
            $aviso_portada = $file->getClientoriginalName();
            $path_info = pathinfo($aviso_portada);
            $extension = $path_info['extension']; // "bill"
            $nombre = "PORTADA-" .$clave_alfa_asig. "-" . $year . "." . $extension;
            rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
            $formulario->portada=$nombre;
        } 

        if ($request->hasFile('logo')) {
            $year = date("Y");            
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 20);

            $file = $request->file('logo');
            $file->move('PORTADAS/', $file->getClientoriginalName());
            $aviso_portada = $file->getClientoriginalName();
            $path_info = pathinfo($aviso_portada);
            $extension = $path_info['extension']; // "bill"
            $nombre = "PORTADA-LOGO-" .$clave_alfa_asig. "-" . $year . "." . $extension;
            rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
            $formulario->logo=$nombre;
        }
        
        $formulario->save(); 
        return Redirect::to('registrar_preguntas/'.$formulario->id)->with('errors','Formulario creado correctamente, puede agregar preguntas');
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
        $formulario = formularioModel::findOrFail($id);
        if($formulario){
            $preguntas= DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->orderBy('posicion','asc')->get();
            
            $respuestas= DB::table('respuestas')->where('id_formulario','=',$formulario->id)->get();
            $total_preguntas=count($preguntas);
            $total_respuestas=count($respuestas);
            return view('formulario.detalle',['total_respuestas'=>$total_respuestas,'total_preguntas'=>$total_preguntas,'formulario'=>$formulario,'preguntas'=>$preguntas,'respuestas'=>$respuestas]);
        }     

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
        $formulario = formularioModel::findOrFail($id);
        return view('formulario.edit',['formulario'=>$formulario]);
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
        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $formulario = formularioModel::findOrFail($id);
        $formulario->id_user=Auth::user()->id;
        $formulario->nombre=$request->get('nombre');
        $formulario->descripcion=$request->get('descripcion');
        $formulario->estado='ACTIVO';
        $formulario->duracion=$request->get('duracion');
        $formulario->captura=Auth::user()->name;
        $formulario->titulo_fin=$request->get('titulo_fin');
        $formulario->texto_fin=$request->get('texto_fin');

        if ($request->hasFile('fondo_fin')) {
            if($formulario->fondo_fin <> ""){
                if(@is_writable('PORTADAS/'.$formulario->fondo_fin)) {
                    unlink('PORTADAS/'.$formulario->fondo_fin); 
                }; 
            }

            $year = date("Y");            
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 20);

            $file = $request->file('fondo_fin');
            $file->move('PORTADAS/', $file->getClientoriginalName());
            $aviso_portada = $file->getClientoriginalName();
            $path_info = pathinfo($aviso_portada);
            $extension = $path_info['extension']; // "bill"
            $nombre = "PORTADA-FIN-" .$clave_alfa_asig. "-" . $year . "." . $extension;
            rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
            $formulario->fondo_fin=$nombre;
        } 

        if ($request->hasFile('fondo')) {
            if($formulario->portada <> ""){
                if(@is_writable('PORTADAS/'.$formulario->portada)) {
                    unlink('PORTADAS/'.$formulario->portada); 
                }; 
            }


            $year = date("Y");            
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 20);

            $file = $request->file('fondo');
            $file->move('PORTADAS/', $file->getClientoriginalName());
            $aviso_portada = $file->getClientoriginalName();
            $path_info = pathinfo($aviso_portada);
            $extension = $path_info['extension']; // "bill"
            $nombre = "PORTADA-" .$clave_alfa_asig. "-" . $year . "." . $extension;
            rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
            $formulario->portada=$nombre;
        } 

        if ($request->hasFile('logo')) {
            if($formulario->logo <> ""){
                if(@is_writable('PORTADAS/'.$formulario->logo)) {
                    unlink('PORTADAS/'.$formulario->logo); 
                }; 
            }
            $year = date("Y");            
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 20);

            $file = $request->file('logo');
            $file->move('PORTADAS/', $file->getClientoriginalName());
            $aviso_portada = $file->getClientoriginalName();
            $path_info = pathinfo($aviso_portada);
            $extension = $path_info['extension']; // "bill"
            $nombre = "PORTADA-LOGO-" .$clave_alfa_asig. "-" . $year . "." . $extension;
            rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
            $formulario->logo=$nombre;
        }
        $formulario->update();
        return Redirect::to('formularios')->with('errors','Formulario actualizado correctamente');
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
        $formulario = formularioModel::findOrFail($id);
        if($formulario){    
             $formulario->estado='INACTIVO';
             $formulario->captura=Auth::user()->name;
             $formulario->update();
             return response()->json(['formulario'=>$formulario]);
        }
        //
    }
}