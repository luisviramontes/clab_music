<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use Mp3Info\Mp3Info;

use App\reproductorModel;

class reproductorController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
   
        print phpinfo();
        return 1;
      
        if(Auth::user()){
            if(Auth::user()->funcion == "MUSICA")
            $canciones=DB::table('reproductor')->get();

            return view('reproductor.index',['canciones'=>$canciones]);
        }else{
            return view('auth.login_clab');
        }
      
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if(Auth::user()){
            if(Auth::user()->funcion == "MUSICA")
        $meses = array('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
       'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
       setlocale(LC_ALL, 'spanish');

       $m=date("m");

       if($m == 01){
           $mes="enero";

       }elseif($m == 02){
           $mes="febrero";

       }elseif($m == 03){
           $mes="marzo";

       }elseif($m == 04){
           $mes="abril";

       }elseif($m == 05){
           $mes="mayo";

       }elseif($m == 06){
           $mes="junio";

       }elseif($m == 07){
           $mes="julio";

       }elseif($m == 8){
           $mes="agosto";

       }elseif($m == 9){
           $mes="septiembre";

       }elseif($m == 10){
           $mes="octubre";

       }elseif($m == 11){
           $mes="noviembre";

       }elseif($m == 12){
           $mes="diciembre";

       }

      

        $mes_a=$mes;
        $year=date('Y');
      
        
    return view('reproductor.create',['meses'=>$meses,'mes_a'=>$mes_a,'year'=>$year]);
}else{
    return view('auth.login_clab');
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

        if(Auth::user()){
            if(Auth::user()->funcion == "MUSICA")
        $cancion= new reproductorModel;   
        $cancion->mes=$request->get('mes');
        $cancion->año=$request->get('año');

        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        //GENERA EL NOMBRE DE ARCHIVO UNICO PARA LA ASIGNACION
        for ($a = 0; $a < 100; $a++) {
          $clave_alfa_nombre = substr(str_shuffle($permitted_chars), 0, 10);
          $nombreArchivo =  "file_". $clave_alfa_nombre . ".mp3";       
          $valida_archivo = DB::table('reproductor')->where('archivo', '==', $nombreArchivo)->get();
          if ($valida_archivo == null) {
            break;
          }
        }

      


        if ($request->file('archivo')) {
      
            $file = $request->file('archivo');
            $path_valida = pathinfo($file->getClientoriginalName());
            if($path_valida['extension'] <> "mp3" && $path_valida['extension'] <> "MP3"){
                return Redirect::to('/reproductor')->with('errors','Archivo no valido');
            }

      
            $file->move('files/', $file->getClientoriginalName());                  
            rename("files/" . $file->getClientoriginalName(), "files/" . $nombreArchivo);

            try {
                //code...
                $audio = new Mp3Info("files/" . $nombreArchivo, true);

                $cancion->titulo=$audio->tags1['song'];
                $cancion->artista=$audio->tags1['artist'];
            } catch (\Throwable $th) {
                //throw $th;
            }       

           // echo 'Canción: '.$audio->tags1['song'].' Artista: '.$audio->tags1['artist'].PHP_EOL;
           // print_r($audio);
            //return 1;

            $cancion->archivo=$nombreArchivo;
            $cancion->estado="ACTIVO";
            $cancion->captura=Auth::user()->name;
            $cancion->save();
          return Redirect::to('reproductor_admin')->with('errors','Canción subida correctamente');
        }

       return Redirect::to('reproductor_admin')->with('errors','Error al subir el archivo');
    }else{
        return view('auth.login_clab');
    }

       
       
        //
    }

    function getVideoInfo($video_id){

        $ch = curl_init();
    
        curl_setopt($ch, CURLOPT_URL, 'https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, '{  "context": {    "client": {      "hl": "en",      "clientName": "WEB",      "clientVersion": "2.20210721.00.00",      "clientFormFactor": "UNKNOWN_FORM_FACTOR",   "clientScreen": "WATCH",      "mainAppWebInfo": {        "graftUrl": "/watch?v='.$video_id.'",           }    },    "user": {      "lockedSafetyMode": false    },    "request": {      "useSsl": true,      "internalExperimentFlags": [],      "consistencyTokenJars": []    }  },  "videoId": "'.$video_id.'",  "playbackContext": {    "contentPlaybackContext": {        "vis": 0,      "splay": false,      "autoCaptionsDefaultOn": false,      "autonavState": "STATE_NONE",      "html5Preference": "HTML5_PREF_WANTS",      "lactMilliseconds": "-1"    }  },  "racyCheckOk": false,  "contentCheckOk": false}');
        curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');
    
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
        return $result;
    
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        if(Auth::user()){
            if(Auth::user()->funcion == "MUSICA")
          $cancion = reproductorModel::findOrFail($id);


          return view('reproductor.detalle',['cancion'=>$cancion]);
        }else{
          return view('auth.login_clab');
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
        if(Auth::user()){
            if(Auth::user()->funcion == "MUSICA")
         $meses = array('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
         'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
         setlocale(LC_ALL, 'spanish');

         $cancion = reproductorModel::findOrFail($id);
      

         return view('reproductor.edit',['cancion'=>$cancion,'meses'=>$meses]);
        }else{
            return view('auth.login_clab');
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
        if(Auth::user()){
            if(Auth::user()->funcion == "MUSICA")
         $cancion = reproductorModel::findOrFail($id);
         $cancion->titulo=$request->get('titulo');
         $cancion->artista=$request->get('artista');
         $cancion->mes=$request->get('mes');
         $cancion->año=$request->get('año');

         $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
         //GENERA EL NOMBRE DE ARCHIVO UNICO PARA LA ASIGNACION
         for ($a = 0; $a < 100; $a++) {
           $clave_alfa_nombre = substr(str_shuffle($permitted_chars), 0, 10);
           $nombreArchivo =  "file_". $clave_alfa_nombre . ".mp3";       
           $valida_archivo = DB::table('reproductor')->where('archivo', '==', $nombreArchivo)->get();
           if ($valida_archivo == null) {
             break;
           }
         }


         if ($request->hasFile('archivo')) {
             $file = $request->file('archivo');
             $path_valida = pathinfo($file->getClientoriginalName());
             if($path_valida['extension'] <> "mp3" && $path_valida['extension'] <> "MP3"){
                 return Redirect::to('/reproductor/'.$id)->with('errors','Archivo no valido');
             }
             $file->move('files/', $file->getClientoriginalName());                  
             rename("files/" . $file->getClientoriginalName(), "files/" . $nombreArchivo);
 
             $cancion->archivo=$nombreArchivo;
             $cancion->estado="ACTIVO";
             $cancion->captura=Auth::user()->name;
             $cancion->update();
             return Redirect::to('reproductor_admin')->with('errors','Canción actualizada correctamente');
         }

         return Redirect::to('reproductor_admin/'.$cancion->id)->with('errors','Error al actualizar el botón');

        }else{
            return view('auth.login_clab');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Auth::user()){
            if(Auth::user()->funcion == "MUSICA")
        $cancion = reproductorModel::findOrFail($id);
        if(@is_writable('files/' . $cancion->archivo)) {          
            unlink('files/' . $cancion->archivo);
        }; 
        
        if($cancion->delete()){
          return 1;
        }else{
            return 0;
        }    
    }else{
        return view('auth.login_clab');
    }
        //
    }
}
