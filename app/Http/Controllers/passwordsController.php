<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\passwordResetModel;
use Illuminate\Support\Facades\Redirect;
use DB;
use App\User;
use Hash;
use Crypt;

class passwordsController extends Controller
{
    /** 
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getEmail()
    {
        return view('auth.password');
    }

    public function postEmail(request $request)
    {
       
        
        $email=$request->get('email');
        $valida=DB::table('users')->where('email','=',$email)->where('estado','=','ACTIVO')->first();
        if($valida){

            $permitted_chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm';
            //GENERA LA CLAVE ALFANUMERICA PARA LA ASIGNACION
             $clave_alfa_asig = substr(str_shuffle($permitted_chars), 0, 60);

            $reset= new passwordResetModel;
            $reset->email=$valida->email;
            $reset->token=$clave_alfa_asig;
            $reset->save();
            $cuerpo='
            <p class="pt-1 text-white-50" aling="center">Hola '.$valida->name.'.</p><br><br>
            <p>Ha solicitado una reposición de contraseña para acceder al sistema.</p>                        
            <p><strong>Haz click en el siguiente enlace para resetear el password:</strong></p>
            <a class="pt-1 text-white-50" aling="center" href="https://www.rgca.com.mx/password/reset/'.$clave_alfa_asig.'">Resetear mi password</a>           
            ';
            $asunto="Recuperar Contraseña";
            $destinatarios=[$reset->email];

            \Mail::send('mail', ['cuerpo_email' => $cuerpo], function ($message)use($asunto,$destinatarios) {
                //remitente
                $message->to($destinatarios, $asunto)
                   ->subject($asunto);
                //asunto
                $message->from('notificaciones@revisat.org'); 
                //receptor                               
             
                });
                
                return Redirect::to('password/email')->with('status','Hemos enviando un link a tu cuenta de correo electrónico para que puedas resetear el password');

        }else{
            return Redirect::to('password/email')->with('errors','El correo proporcionado no se encuentra activo');
        }

   
        //
    }

    public function getReset($token)
    {

        $email=DB::table('password_resets')->where('token','=',$token)->first();
        if($email){
            return view('auth.reset',['email'=>$email->email])->with('token', $token);
        }else{
            return Redirect::to('password/email')->with('errors','El token para reestablecer tu contraseña es incorrecto ó expiro');
        }        
    }

    public function postReset(Request $request)
    {
        $email=$request->get('email');
        $token=$request->get('token');
        $email_aux=DB::table('password_resets')->where('token','=',$token)->where('email','=',$email)->first();
        if($email_aux){
            $password=$request->get('password');
            $confirm=$request->get('password_confirmation');
            $user=DB::table('users')->where('email','=',$email)->where('estado','=','ACTIVO')->first();
            if($user){
                if($password == $confirm){            
                    $user=User::findOrFail($user->id);
                    $user->password=bcrypt($request->get('password'));
                    $user->update();                     
                    $cuerpo='
                    <p class="pt-1 text-white-50" aling="center">Hola '.$user->name.'.</p><br><br>
                    <p>Enhorabuena tu password ha sido reseteado con éxito.</p>                        
                    <p><strong>Haz click en el siguiente enlace para ingresar al sistema:</strong></p>
                    <a class="pt-1 text-white-50" aling="center" href="https://www.rgca.com.mx/welcome/">Ingresar</a>           
                    ';
                    $asunto="Contraseña restablecida";
                    $destinatarios=[$user->email];
        
                    \Mail::send('mail', ['cuerpo_email' => $cuerpo], function ($message)use($asunto,$destinatarios) {
                        //remitente
                        $message->to($destinatarios, $asunto)
                           ->subject($asunto);
                        //asunto
                        $message->from('notificaciones@revisat.org'); 
                        //receptor                               
                     
                        });
                    return Redirect::to('/auth/login')->with('status','Enhorabuena tu password ha sido reseteado con éxito');
                }else{
                    return Redirect::to('password/reset/'.$token)->with('errors','Las contraseñas no coinciden');
                }

            }else{
                return Redirect::to('password/email')->with('errors','El correo proporcionado se encuentra inactivo, no se puede reestablecer la contraseña');
            }

        }else{
            return Redirect::to('password/reset/'.$token)->with('errors','El token o correo para reestablecer tu contraseña es incorrecto ó expiro');
        }
       
        

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
