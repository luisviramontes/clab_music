<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use App\respuestasModel;
use funciones\funciones;
use Illuminate\Support\Facades\Redirect;
use App\respuesDependeModel;
use Barryvdh\DomPDF\Facade as PDF;


class respuestasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $formulario=DB::table('formulario')->where('url','=',$id)->where('estado','=','ACTIVO')->first();

        if($formulario){
            $funcion= new funciones;
            $ip_publica=$funcion->getUserIpAddress();

            $formulario_ip=DB::table('formulario')->join('respuestas','respuestas.id_formulario','=','formulario.id')
            ->where('formulario.url','=',$id)->where('respuestas.ip_publica','=',$ip_publica)
            ->where('formulario.estado','=','ACTIVO')->first();
            if($formulario_ip){
                return view('respuestas.contestado',['formulario'=>$formulario]);
            }else{
                return view('respuestas.comenzar',['formulario'=>$formulario]);
            }         
        }
        //
    }

    public function iniciar_formulario($id){

        $formulario=DB::table('formulario')->where('url','=',$id)->where('estado','=','ACTIVO')->first();
        if($formulario){
            $funcion= new funciones;
            $ip_publica=$funcion->getUserIpAddress();
            $formulario_ip=DB::table('formulario')->join('respuestas','respuestas.id_formulario','=','formulario.id')
            ->where('formulario.url','=',$id)->where('respuestas.ip_publica','=',$ip_publica)
            ->where('formulario.estado','=','ACTIVO')->first();
            if($formulario_ip){
                return view('respuestas.contestado',['formulario'=>$formulario]);
            }else{
            $preguntas= DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->orderBy('posicion','asc')->get();
            $depende="NO";
            $total_depende= count(DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->where('depende_otra','=','SI')->get());
            $total=count($preguntas);
            foreach($preguntas as $pregunta){
                if($pregunta->depende_otra == "SI"){
                 $depende="SI";
                 $preguntas= DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->orderBy('posicion','asc')->get();
                 $total=count($preguntas)+1;
                 return view('respuestas.iniciar_depende',['total_depende'=>$total_depende,'formulario'=>$formulario,'preguntas'=>$preguntas,'total'=>$total,'depende'=>$depende]);
                }
            }                     
            return view('respuestas.iniciar',['total_depende'=>$total_depende,'formulario'=>$formulario,'preguntas'=>$preguntas,'total'=>$total,'depende'=>$depende]);
            }
        }

    }

    public function formulario_depende(Request $request){
       
        $id=$request->get('id_formulario');

        $formulario=DB::table('formulario')->where('id','=',$id)->where('estado','=','ACTIVO')->first();
        if($formulario){
            $funcion= new funciones;
            $ip_publica=$funcion->getUserIpAddress();
            $formulario_ip=DB::table('formulario')->join('respuestas','respuestas.id_formulario','=','formulario.id')
            ->where('formulario.url','=',$id)->where('respuestas.ip_publica','=',$ip_publica)
            ->where('formulario.estado','=','ACTIVO')->first();
            if($formulario_ip){
                return view('respuestas.contestado',['formulario'=>$formulario]);
            }else{
                $total=$request->get('total')-1;
                $id_formulario=$request->get('id_formulario');
                $preguntas=DB::table('preguntas_formulario')->where('id_formulario','=',$id_formulario)->get();
                $funcion= new funciones;
                $ip_publica=$funcion->getUserIpAddress();

                
                $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';              
                for ($a = 0; $a < 100; $a++) {
                    $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 30);
                $valida_clave = DB::table('respuestas_dependen')->where('clave_alfa', '==', $clave_alfa_asig)->get();
                if ($valida_clave == null) {
                    $clave_alfa_asig = $clave_alfa_asig;
                    break;
                 } 
                }
                $total=0;
                $puntaje=0;
                foreach($preguntas as $pregunta){
                    $resp = new respuesDependeModel;
                    $resp->clave_alfa=$clave_alfa_asig;
                    $resp->ip_publica=$ip_publica;
                    $resp->id_pregunta=$pregunta->id;
                    $respuesta=$request->get('hidden_'.$pregunta->posicion."_".$pregunta->id);
                
                    if($respuesta != ""){
                    
                        if($pregunta->respuesta_1 == $respuesta && ($pregunta->puntaje_1 >= 1 || $pregunta->puntaje_1 == -1)){                           
                                $total=$total+1;
                                if($pregunta->puntaje_1 == 1){
                                    $puntaje=$puntaje+($pregunta->puntaje_1);
                                }
                              
                                $resp->puntaje=$pregunta->puntaje_1;
                                
                        }elseif($pregunta->respuesta_2 == $respuesta &&($pregunta->puntaje_2 >= 1 || $pregunta->puntaje_2 == -1)){
                                $total=$total+1;
                                if($pregunta->puntaje_2 >= 1){
                                    $puntaje=$puntaje+($pregunta->puntaje_2);
                                }                               
                                $resp->puntaje=$pregunta->puntaje_2;
                        }elseif($pregunta->respuesta_3 == $respuesta && ($pregunta->puntaje_3 >= 1 || $pregunta->puntaje_3 == -1)){
                                $total=$total+1;
                                if($pregunta->puntaje_3 >= 1){
                                    $puntaje=$puntaje+($pregunta->puntaje_3);
                                }                               
                                $resp->puntaje=$pregunta->puntaje_3;
                        }
                        $resp->respuesta=$respuesta;
                        $resp->save();
                    }                   
                }
                //crear resultado
                /*
                total---100 %
                puntaje
                */
                $calificacion=$puntaje*100/$total;
                $calificacion=round($calificacion);
                if($calificacion <0){
                    $calificacion=0;
                }

             
                $nombre=$request->get('hidden_136_192');
                if($nombre == ""){
                    $nombre=$request->get('hidden_137_193');
                }

                $email=$request->get('hidden_138_194');
                if($email == ""){
                    $email=$request->get('hidden_139_195');
                }

                $respuestas=DB::table('respuestas_dependen')->join('preguntas_formulario','preguntas_formulario.id','=','respuestas_dependen.id_pregunta')
                ->select('respuestas_dependen.*','preguntas_formulario.titulo_pregunta')->where('respuestas_dependen.clave_alfa','=',$clave_alfa_asig)->get();

                $bien=public_path('img\bien.png');
             
         
                /*
                $view =  \View::make('respuestas.invoice', compact('email','nombre','bien','calificacion','total','respuestas','pregunta'))->render();
                //->setPaper($customPaper, 'landscape');
                $pdf = \App::make('dompdf.wrapper');
               // $options->set('isRemoteEnabled', TRUE);
                //$pdf->setOptions(['isPhpEnabled' => true,'setIsRemoteEnabled'=>true]);
                //$options = new Options(); $options->setIsRemoteEnabled(true); 
               // $pdf->page_text(1,1, "{PAGE_NUM} of {PAGE_COUNT}", $font, 10, array(0,0,0));
                $pdf->loadHTML($view);
                $pdf->render();
                */
                $fecha=date('Y-m-d');

                $data=['email'=>$email,'nombre'=>$nombre,'bien'=>$bien,'calificacion'=>$calificacion,'total'=>$total,'respuestas'=>$respuestas,'pregunta'=>$pregunta,'fecha'=>$fecha];
                
   
                $data = PDF::loadView('respuestas.invoice',$data)->save(public_path('/REPORTES/') ."REPORTE_".$clave_alfa_asig.".pdf"); 
                //return $ruta_pdf;
                $formulario=DB::table('formulario')->where('id','=',$id_formulario)->first();
                $user=DB::table('users')->where('id','=',$formulario->id_user)->first();

                $cuerpo_email_2='<br><br><p style="text-align:center"><span style="font-size:14px"><span style="font-family:Calibri,sans-serif"><strong>Hola, gracias por contestar el formulario :<b>'.$formulario->nombre.' </b><br>
                puedes consultar el resultado en el siguiente enlace:</strong> <br><br>
                <a style="background-color:#00c4f5;line-height:1.1;padding:0.7em 1em;text-align:center;font-size:16px;display:inline-block;color:white;font-weight:bold;border-radius:4px;text-decoration:none" target="_blank" href="https://www.rgca.com.mx/REPORTES/REPORTE_'.$clave_alfa_asig.'.pdf">Click para ver reporte</a>
                <br><br></p>';

                $cuerpo_email='<br><br><p style="text-align:center"><span style="font-size:14px"><span style="font-family:Calibri,sans-serif"><strong>Hola '.$user->name.', te informamos que el formulario :<b>'.$formulario->nombre.' </b><br>
                ha recibido una nueva consulta, la cual puedes descargar en el siguiente enlace:</strong> <br><br>
                <a style="background-color:#00c4f5;line-height:1.1;padding:0.7em 1em;text-align:center;font-size:16px;display:inline-block;color:white;font-weight:bold;border-radius:4px;text-decoration:none" target="_blank" href="https://www.rgca.com.mx/REPORTES/REPORTE_'.$clave_alfa_asig.'.pdf">Click para ver reporte</a>
                <br><br></p>';
        
                try {
                    //code...
                    $funcion->enviar_mail([$email],'CONSULTA TÚ REPORTE',$cuerpo_email_2);
                    $funcion->enviar_mail(['luis.viramontes@tecnored.mx',$user->email],'NUEVO REPORTE GENERADO ',$cuerpo_email);
                } catch (\Throwable $th) {
                    //throw $th;
                }
           
        

                return view('respuestas.fin',['formulario'=>$formulario]);
                //return $calificacion;
              



          
           
            //return view('respuestas.continuar_depende',['formulario'=>$formulario,'preguntas'=>$preguntas,'total'=>$total,'hidden_1'=>$hidden_1]);
            }
        }else{
            echo "No existe el formulario";
        }

    }

    public function valida_respuesta($id,$valor,$id_form){
        $preguntas= DB::table('preguntas_formulario')
        //->where('posicion_depende','=',1)
        ->where('depende_otra','=','SI')
        ->where('id_pregunta','=',$id)
        ->where('respuesta_depende','=',$valor)
        ->where('id_formulario','=',$id_form)
        ->orderBy('posicion','asc')->get();

        $preguntas_ocultar= DB::table('preguntas_formulario')
        //->where('posicion_depende','=',1)
        ->where('depende_otra','=','SI')
        ->where('id_pregunta','=',$id)
        ->where('respuesta_depende','<>',$valor)
        ->where('id_formulario','=',$id_form)
        ->orderBy('posicion','asc')->get();

        return response()->json(['preguntas'=>$preguntas,'preguntas_ocultar'=>$preguntas_ocultar]);

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
       
        $respuesta =new respuestasModel;
        $respuesta->id_formulario=$request->get('id_formulario');
        if($request->get('hidden_1') <> ""){
            $respuesta->respuesta_1=$request->get('hidden_1');
        }
        if($request->get('hidden_2') <> ""){
            $respuesta->respuesta_2=$request->get('hidden_2');
        }
        if($request->get('hidden_3') <> ""){
            $respuesta->respuesta_3=$request->get('hidden_3');
        }
        if($request->get('hidden_4') <> ""){
            $respuesta->respuesta_4=$request->get('hidden_4');
        }
        if($request->get('hidden_5') <> ""){
            $respuesta->respuesta_5=$request->get('hidden_5');
        }
        if($request->get('hidden_6') <> ""){
            $respuesta->respuesta_6=$request->get('hidden_6');
        }
        if($request->get('hidden_7') <> ""){
            $respuesta->respuesta_7=$request->get('hidden_7');
        }
        if($request->get('hidden_8') <> ""){
            $respuesta->respuesta_8=$request->get('hidden_8');
        }
        if($request->get('hidden_9') <> ""){
            $respuesta->respuesta_9=$request->get('hidden_9');
        }
        if($request->get('hidden_10') <> ""){
            $respuesta->respuesta_10=$request->get('hidden_10');
        }
        if($request->get('hidden_11') <> ""){
            $respuesta->respuesta_11=$request->get('hidden_11');
        }
        if($request->get('hidden_12') <> ""){
            $respuesta->respuesta_12=$request->get('hidden_12');
        }
        if($request->get('hidden_13') <> ""){
            $respuesta->respuesta_13=$request->get('hidden_13');
        }
        if($request->get('hidden_14') <> ""){
            $respuesta->respuesta_14=$request->get('hidden_14');
        }
        if($request->get('hidden_15') <> ""){
            $respuesta->respuesta_15=$request->get('hidden_15');
        }
        if($request->get('hidden_16') <> ""){
            $respuesta->respuesta_16=$request->get('hidden_16');
        }
        if($request->get('hidden_17') <> ""){
            $respuesta->respuesta_17=$request->get('hidden_17');
        }
        if($request->get('hidden_18') <> ""){
            $respuesta->respuesta_18=$request->get('hidden_18');
        }
        if($request->get('hidden_19') <> ""){
            $respuesta->respuesta_19=$request->get('hidden_19');
        }
        if($request->get('hidden_20') <> ""){
            $respuesta->respuesta_20=$request->get('hidden_20');
        }
        if($request->get('hidden_21') <> ""){
            $respuesta->respuesta_21=$request->get('hidden_21');
        }
        if($request->get('hidden_22') <> ""){
            $respuesta->respuesta_22=$request->get('hidden_22');
        }
        if($request->get('hidden_23') <> ""){
            $respuesta->respuesta_23=$request->get('hidden_23');
        }
        if($request->get('hidden_24') <> ""){
            $respuesta->respuesta_24=$request->get('hidden_24');
        }
        if($request->get('hidden_25') <> ""){
            $respuesta->respuesta_25=$request->get('hidden_25');
        }
        if($request->get('hidden_26') <> ""){
            $respuesta->respuesta_26=$request->get('hidden_26');
        }
        if($request->get('hidden_27') <> ""){
            $respuesta->respuesta_27=$request->get('hidden_27');
        }
        if($request->get('hidden_28') <> ""){
            $respuesta->respuesta_28=$request->get('hidden_28');
        }
        if($request->get('hidden_29') <> ""){
            $respuesta->respuesta_29=$request->get('hidden_29');
        }
        if($request->get('hidden_30') <> ""){
            $respuesta->respuesta_30=$request->get('hidden_30');
        }
      
        $funcion= new funciones;
        $ip_publica=$funcion->getUserIpAddress();
        $getLocation=$funcion->getLocation($ip_publica);


        $respuesta->ip_publica=$ip_publica;
        $respuesta->estado=$getLocation['country'];
        $respuesta->ciudad=$getLocation['region'];
        $respuesta->region=$getLocation['city'];
        $respuesta->org=$getLocation['org'];
        $respuesta->save();

        $formulario=DB::table('formulario')->where('id','=',$respuesta->id_formulario)->first();
        $user=DB::table('users')->where('id','=',$formulario->id_user)->first();

        $cuerpo_email='<br><br><p style="text-align:center"><span style="font-size:14px"><span style="font-family:Calibri,sans-serif"><strong>Hola buen día '.$user->name.', te informamos que el formulario:<b>'.$formulario->nombre.' </b><br>
        recibio una nueva respuesta que puedes consultar en el siguiente enlace:</strong> <br><br>
        <a style="background-color:#00c4f5;line-height:1.1;padding:0.7em 1em;text-align:center;font-size:16px;display:inline-block;color:white;font-weight:bold;border-radius:4px;text-decoration:none" target="_blank" href="https://www.rgca.com.mx/formularios_contestados/'. $respuesta->id.'">Click para ver respuesta</a>
        <br><br>
        Ip publica:'.$ip_publica.'<br>
        País:'. $getLocation['country'].'<br>
        Estado:'. $getLocation['region'].'<br>
        Región:'. $getLocation['city'].'<br>
        </p>';

        $funcion->enviar_mail([$user->email,'luis_alfonso133@hotmail.com'],'NUEVA RESPUESTA DEL FORMULARIO '.$formulario->nombre,$cuerpo_email);

        return view('respuestas.fin',['formulario'=>$formulario]);
      //  return Redirect::to('iniciar_formulario/'.$formulario->url)->with('errors','Agradecemos tu tiempo para contestar este cuestionario, en breve te haremos llegar la propuesta');
      
        //


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

    
    public function lista_reproduccion(){
        setlocale(LC_ALL, 'spanish');
        setlocale(LC_ALL,"es_ES");
        $mes_a=strftime('%B');
        $year=date('Y');
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

       
        
        $canciones=DB::table('reproductor')->where('mes','=',$mes)->where('año','=',$year)->get();

        return response()->json(['canciones'=>$canciones]);

    }

}