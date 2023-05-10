<?php

namespace Illuminate\Foundation\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mail;

trait RegistersUsers
{
    use RedirectsUsers;

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
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
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }

        Auth::login($this->create($request->all()));
        $user = Auth::user();
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

        return redirect($this->redirectPath());
    }
}
