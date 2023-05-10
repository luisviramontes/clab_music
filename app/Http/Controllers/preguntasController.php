<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller; 
use App\formularioModel;
use App\preguntasModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;

class preguntasController extends Controller
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
        $preguntas=DB::table('preguntas_formulario')->join('formulario','formulario.id','=','preguntas_formulario.id_formulario')
        ->where('formulario.id_user','=',Auth::user()->id)->select('preguntas_formulario.*','formulario.url','formulario.nombre')->get();

        return view('preguntas.index',['preguntas'=>$preguntas]);
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($id)
    {
        $formulario = formularioModel::findOrFail($id);
        if($formulario){
            $preguntas= DB::table('preguntas_formulario')->where('id_formulario','=',$id)->orderBy('posicion','asc')->get();
          
            $ultima=DB::table('preguntas_formulario')->where('id_formulario','=',$id)->orderBy('posicion','desc')->first();
            if($ultima){
             $ultima=$ultima->posicion+1;
            }else{
             $ultima=1;
            }
            return view('preguntas.create',['formulario'=>$formulario,'preguntas'=>$preguntas,'ultima'=>$ultima]);
        }else{
            return Redirect::to('preguntas')->with('errors','El formulario no existe');
        }
      
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
        $pregunta=new preguntasModel;
        $pregunta->id_formulario=$request->get('id_formulario');
        $formulario = formularioModel::findOrFail($pregunta->id_formulario);
        $pregunta->posicion=$request->get('posicion');
        $pregunta->titulo_pregunta=$request->get('titulo_pregunta');
        $concatenar=$request->get('concatenar');
        if($concatenar <> null){
            $pregunta->titulo_heredado_respuesta=$request->get('heredado');
            $pregunta->posicion_titulo_heredado=$request->get('posicion_h');
            if($pregunta->posicion_titulo_heredado=="MEDIO"){
                $pregunta->titulo_despues=$request->get('titulo_despues');
                
            }
        }

        $pregunta->tipo=$request->get('tipo');
        $pregunta->placeholder=$request->get('placeholder');
        $pregunta->placeholder_2=$request->get('placeholder_2');
        $pregunta->obligatorio=$request->get('obligatorio');
        $pregunta->maximo_caracteres=$request->get('maximo');
        $pregunta->minimo_caracteres=$request->get('minimo');
        $pregunta->animacio_entrada=$request->get('animacion');
        if ($request->hasFile('fondo')) {
            $year = date("Y"); 
            $permitted_chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 10);

            $file = $request->file('fondo');
            $file->move('PORTADAS/', $file->getClientoriginalName());
            $aviso_portada = $file->getClientoriginalName();
            $path_info = pathinfo($aviso_portada);
            $extension = $path_info['extension']; // "bill"
            $nombre = "PORTADA-" .$clave_alfa_asig. "-" . $year . "." . $extension;
            rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
            $pregunta->imagen_fondo=$nombre;
        } 
        
      
        $pregunta->total_respuestas=$request->get('total_respuestas');
        for($x=1; $x <= $pregunta->total_respuestas; $x++){
            if($x==1){
                $pregunta->respuesta_1=$request->get('respuesta_'.$x);
            }elseif($x==2){
                $pregunta->respuesta_2=$request->get('respuesta_'.$x);
            }elseif($x==3){
                $pregunta->respuesta_3=$request->get('respuesta_'.$x);
            }elseif($x==4){
                $pregunta->respuesta_4=$request->get('respuesta_'.$x);
            }elseif($x==5){
                $pregunta->respuesta_5=$request->get('respuesta_'.$x);
            }elseif($x==6){
                $pregunta->respuesta_6=$request->get('respuesta_'.$x);
            }elseif($x==7){
                $pregunta->respuesta_7=$request->get('respuesta_'.$x);
            }elseif($x==8){
                $pregunta->respuesta_8=$request->get('respuesta_'.$x);
            }elseif($x==9){
                $pregunta->respuesta_9=$request->get('respuesta_'.$x);
            }elseif($x==10){
                $pregunta->respuesta_10=$request->get('respuesta_'.$x);
            }   
        }
        $pregunta->agregar_otra_opcion=$request->get('otra_opcion');
        if( $pregunta->agregar_otra_opcion == "SI"){
            $pregunta->titulo_pregunta_2=$request->get('titulo_pregunta_2');
            $pregunta->tipo_otra_opcion=$request->get('tipo_2');
            $pregunta->maximo_caracteres_otra_opcion=$request->get('maximo_2');
            $pregunta->minimo_caracteres_otra_opcion=$request->get('minimo_2');
        }
        
        $pregunta->depende_otra=$request->get('depende');
        if($pregunta->depende_otra == "SI"){
            $pregunta->id_pregunta=$request->get('depend_orig');
            $pregunta->respuesta_depende=$request->get('resp_dep');
            $pregunta_aux= preguntasModel::findOrFail($pregunta->id_pregunta);
            $pregunta->posicion_depende=$pregunta_aux->posicion;
        }

        $pregunta->estado="ACTIVO";
        $pregunta->captura=Auth::user()->name;
        $pregunta->save();

        return Redirect::to('registrar_preguntas/'.$formulario->id)->with('errors','Pregunta creada correctamente');

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
        $pregunta= preguntasModel::findOrFail($id);
        if($pregunta){
            $formulario = formularioModel::findOrFail($pregunta->id_formulario);
            $preguntas= DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->orderBy('posicion','asc')->get();
            return view('preguntas.edit',['pregunta'=>$pregunta,'formulario'=>$formulario,'preguntas'=>$preguntas]);
        }else{
            return Redirect::to('preguntas')->with('errors','La pregunta no existe');
        }
        
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
        $pregunta=preguntasModel::findOrFail($id);
        if($pregunta){
            $formulario = formularioModel::findOrFail($pregunta->id_formulario);

            $pregunta->posicion=$request->get('posicion');
            $pregunta->titulo_pregunta=$request->get('titulo_pregunta');
            $concatenar=$request->get('concatenar');
            if($concatenar <> null){
                $pregunta->titulo_heredado_respuesta=$request->get('heredado');
                $pregunta->posicion_titulo_heredado=$request->get('posicion_h');
                if($pregunta->posicion_titulo_heredado=="MEDIO"){
                    $pregunta->titulo_despues=$request->get('titulo_despues');
                    
                }
            }
    
            $pregunta->tipo=$request->get('tipo');
            $pregunta->obligatorio=$request->get('obligatorio');
            $pregunta->maximo_caracteres=$request->get('maximo');
            $pregunta->minimo_caracteres=$request->get('minimo');
            $pregunta->animacio_entrada=$request->get('animacion');
            if ($request->hasFile('fondo')) {
                if($pregunta->imagen_fondo <> ""){
                    if(@is_writable('PORTADAS/'.$pregunta->imagen_fondo)) {
                        unlink('PORTADAS/'.$pregunta->imagen_fondo); 
                    }; 
                }
    
                $year = date("Y"); 
                $permitted_chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
                 $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 10);
    
                $file = $request->file('fondo');
                $file->move('PORTADAS/', $file->getClientoriginalName());
                $aviso_portada = $file->getClientoriginalName();
                $path_info = pathinfo($aviso_portada);
                $extension = $path_info['extension']; // "bill"
                $nombre = "PORTADA-" .$clave_alfa_asig. "-" . $year . "." . $extension;
                rename("PORTADAS/" .   $aviso_portada, "PORTADAS/" . $nombre);
                $pregunta->imagen_fondo=$nombre;
            } 
            
          
            $pregunta->total_respuestas=$request->get('total_respuestas');
            $limpiar=$this->limpiar_preguntas($pregunta->id);
            for($x=1; $x <= $pregunta->total_respuestas; $x++){
                if($x==1){
                    $pregunta->respuesta_1=$request->get('respuesta_'.$x);
                }elseif($x==2){
                    $pregunta->respuesta_2=$request->get('respuesta_'.$x);
                }elseif($x==3){
                    $pregunta->respuesta_3=$request->get('respuesta_'.$x);
                }elseif($x==4){
                    $pregunta->respuesta_4=$request->get('respuesta_'.$x);
                }elseif($x==5){
                    $pregunta->respuesta_5=$request->get('respuesta_'.$x);
                }elseif($x==6){
                    $pregunta->respuesta_6=$request->get('respuesta_'.$x);
                }elseif($x==7){
                    $pregunta->respuesta_7=$request->get('respuesta_'.$x);
                }elseif($x==8){
                    $pregunta->respuesta_8=$request->get('respuesta_'.$x);
                }elseif($x==9){
                    $pregunta->respuesta_9=$request->get('respuesta_'.$x);
                }elseif($x==10){
                    $pregunta->respuesta_10=$request->get('respuesta_'.$x);
                }   
            }
            $pregunta->agregar_otra_opcion=$request->get('otra_opcion');
            if( $pregunta->agregar_otra_opcion == "SI"){
                $pregunta->titulo_pregunta_2=$request->get('titulo_pregunta_2');
                $pregunta->tipo_otra_opcion=$request->get('tipo_2');
                $pregunta->maximo_caracteres_otra_opcion=$request->get('maximo_2');
                $pregunta->minimo_caracteres_otra_opcion=$request->get('minimo_2');
            }
            
          
            $pregunta->estado="ACTIVO";
            $pregunta->captura=Auth::user()->name;
            $pregunta->update();

            return Redirect::to('registrar_preguntas/'.$formulario->id)->with('errors','Pregunta actualizada correctamente');
        }else{
            return Redirect::to('preguntas')->with('errors','La pregunta no existe');
        }
       
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
        $pregunta= preguntasModel::findOrFail($id);
        if($pregunta){
            if($pregunta->imagen_fondo <> ""){
                if(@is_writable('PORTADAS/'.$pregunta->imagen_fondo)) {
                    unlink('PORTADAS/'.$pregunta->imagen_fondo); 
                }; 
            }
          $pregunta->delete();
          return response()->json(['1'=>1]);  
        }else{
            return Redirect::to('preguntas')->with('errors','La pregunta no existe');
        }
        //
    }

    public function limpiar_preguntas($id){
        $pregunta= preguntasModel::findOrFail($id);
        if($pregunta){
            $pregunta->respuesta_1='';
            $pregunta->respuesta_2='';
            $pregunta->respuesta_3='';
            $pregunta->respuesta_4='';
            $pregunta->respuesta_5='';
            $pregunta->respuesta_6='';
            $pregunta->respuesta_7='';
            $pregunta->respuesta_8='';
            $pregunta->respuesta_9='';
            $pregunta->respuesta_10='';
            $pregunta->update();
        }
    }

    public function traerPreguntas($id_form,$id_preg){

        $pregunta=DB::table('preguntas_formulario')->where('id_formulario','=',$id_form)->where('id','=',$id_preg)->get();
        print_r($pregunta);
        return response()->json(['pregunta'=>$pregunta]);
        
    }
}