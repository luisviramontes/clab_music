<?php namespace funciones;

use Illuminate\Http\Request;
use App\Http\Requests;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Controller;
use \Milon\Barcode\DNS1D;
use \Milon\Barcode\DNS2D;
use \Crypt;
use ZipArchive;
use Mail;

use DB;
use Illuminate\Support\Facades\Storage;
use Input;
use Illuminate\Support\Facades\Auth;

class funciones {
    public function getUserIpAddress() {

        foreach ( [ 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR' ] as $key ) {
    
            // Comprobamos si existe la clave solicitada en el array de la variable $_SERVER 
            if ( array_key_exists( $key, $_SERVER ) ) {
    
                // Eliminamos los espacios blancos del inicio y final para cada clave que existe en la variable $_SERVER 
                foreach ( array_map( 'trim', explode( ',', $_SERVER[ $key ] ) ) as $ip ) {
    
                    // Filtramos* la variable y retorna el primero que pase el filtro
                    if ( filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE ) !== false ) {
                        return $ip;
                    }
                }
            }
        }
    
        return '?'; // Retornamos '?' si no hay ninguna IP o no pase el filtro
    }
    
    public function enviar_mail($destinatarios,$asunto,$cuerpo){
        
        \Mail::send('mail', ['cuerpo_email' => $cuerpo], function ($message)use($asunto,$destinatarios) {
            //remitente
            $message->to($destinatarios, $asunto)
               ->subject($asunto);
            //asunto
            $message->from('notificaciones@revisat.org'); 
            //receptor                               
         
            });   

    }           
    
    public function getIpAddress()
    {
    $ipAddress = '';
    if (! empty($_SERVER['HTTP_CLIENT_IP']) && $this->isValidIpAddress($_SERVER['HTTP_CLIENT_IP'])) {
    // check for shared ISP IP
    $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    // check for IPs passing through proxy servers
    // check if multiple IP addresses are set and take the first one
    $ipAddressList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    foreach ($ipAddressList as $ip) {
    if ($this->isValidIpAddress($ip)) {
    $ipAddress = $ip;
    break;
    }
    }
    } else if (! empty($_SERVER['HTTP_X_FORWARDED']) && $this->isValidIpAddress($_SERVER['HTTP_X_FORWARDED'])) {
    $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (! empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && $this->isValidIpAddress($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])) {
    $ipAddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    } else if (! empty($_SERVER['HTTP_FORWARDED_FOR']) && $this->isValidIpAddress($_SERVER['HTTP_FORWARDED_FOR'])) {
    $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if (! empty($_SERVER['HTTP_FORWARDED']) && $this->isValidIpAddress($_SERVER['HTTP_FORWARDED'])) {
    $ipAddress = $_SERVER['HTTP_FORWARDED'];
    } else if (! empty($_SERVER['REMOTE_ADDR']) && $this->isValidIpAddress($_SERVER['REMOTE_ADDR'])) {
    $ipAddress = $_SERVER['REMOTE_ADDR'];
    }
    return $ipAddress;
    }
    
    public function isValidIpAddress($ip)
    {
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
    return false;
    }
    return true;
    }
    
    public function getLocation($ip)
    {
    $ch = curl_init('http://ipwhois.app/json/' . $ip);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $json = curl_exec($ch);
    curl_close($ch);
    // Decode JSON response
    $ipWhoIsResponse = json_decode($json, true);
    // Country code output, field "country_code"
    return $ipWhoIsResponse;
    }

    
}