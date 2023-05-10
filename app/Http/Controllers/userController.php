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

class userController extends Controller
{
    public function getRegister()
    {
       
        return view('auth.register');
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postRegister(Request $request)
    {
        $email=$request->get('email');
        $email_confirm=$request->get('email_confirm'); 
        $valida=DB::table('users')->where('email','=',$email)->first();
        if($valida){
        return Redirect::to('auth/register')->with('errors','El correo proporcionado ya se encuentra registrado');
        }else{
            if($email == $email_confirm){
                $pass=$request->get('password');
                $pass_confirm=$request->get('password_confirmation'); 
                if($pass == $pass_confirm){
                    $user=new User;
                    $user->name=$request->get('name');
                    $user->estado="POR_VALIDAR";
                    $user->email=$email;
                    $user->password=bcrypt($request->get('password'));
                    $user->save(); 
                    $id=base64_encode($user->id);
                    $cuerpo_email='<p>Bienvenido al sistema RGCA creador de formularios , para continuar con la activación de tu cuenta, por favor da click en el siguiente enlace:<p><br>
                    <p style="text-align:center"><span style="font-size:12px"><span style="font-family:Calibri,sans-serif"><a href="https://www.rgca.com.mx/activar_cuenta/'.$id.'" style="color:#0563c1; text-decoration:underline"><strong>https://www.rgca.com.mx/activar_cuenta/'.$id.'</strong></a></span></span></p>
                    ';
                    \Mail::send('mail',['cuerpo_email'=>$cuerpo_email], function ($message) use ($user)
                    {
                      //remitente
                      // $message->to($correo->email, 'AVISO ELECTRÓNICO DE NOTIFICACIÓN')->subject('AVISO ELECTRÓNICO DE NOTIFICACIÓN');
                      $message->to($user->email, 'CORFIRMA TU CUENTA')
                          ->subject('CORREO DE CONFIRMACIÓN');
                      //asunto
                      $message->from('notificaciones@revisat.org');
                      //receptor                               
                    });        
                    return Redirect::to('auth/login')->with('status','Se ha enviado un enlace a tu correo electrónico, para la activación de la cuenta,una ves activa
                    podrás acceder al sistema FORMULARIOS Y todas las funciones.');  
                }else{
                    return Redirect::to('auth/register')->with('errors','Las contraseñas no coiciden');  
                }

            }else{
                return Redirect::to('auth/register')->with('errors','Los emails no coiciden');  
            }
           
        }
       
    }

    public function activar_cuenta($id){
        $user=Auth::user();
        $id=base64_decode($id);
        if($user->id == $id){
            $user=User::findOrFail($id);
            if( $user->estado== "POR_CONFIRMAR"){
                $user->estado="ACTIVO";
                $user->update();
                return Redirect::to('/welcome')->with('errors','Tu cuenta se ha activado correctamente');
            }else{
                return Redirect::to('/welcome');
      
            }
            }else{
            return Redirect::to('/welcome')->with('errors','El link que ingreso no es valido, para poder activar su cuenta');
        }

    }
}
