<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller; 
use App\formularioModel;
use App\preguntasModel;
use App\respuestasModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use Maatwebsite\Excel\Facades\Excel;


class respuestasAplicadasController extends Controller
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
        $respuestas=DB::table('respuestas')->join('formulario','formulario.id','=','respuestas.id_formulario')
        ->select('respuestas.*','formulario.nombre')->where('formulario.id_user','=',Auth::user()->id)->get();

        return view('contestadas.index',['respuestas'=>$respuestas]);
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
        $respuestas=respuestasModel::findOrFail($id);
        if($respuestas){
            $formulario=formularioModel::findOrFail($respuestas->id_formulario);
            $preguntas=DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->orderBy('posicion','asc')->get();
            return view('contestadas.detalle',['formulario'=>$formulario,'respuestas'=>$respuestas,'preguntas'=>$preguntas]);

        }
        //
    }

    public function generar_reporte($id,$tipo){
        $respuestas=respuestasModel::findOrFail($id);
        if($respuestas){
            $formulario=formularioModel::findOrFail($respuestas->id_formulario);
            $preguntas=DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->orderBy('posicion','asc')->get();
       
       
            if($tipo == "PDF"){
            
            $view =  \View::make('contestadas.invoice', compact('respuestas', 'formulario', 'preguntas'))->render();
            //->setPaper($customPaper, 'landscape');
            $pdf = \App::make('dompdf.wrapper');
            $pdf->loadHTML($view);
            return $pdf->stream('ACUSE.pdf');

            

           }elseif($tipo == "excel"){
            $encabezados=[];           
            $array=[];

            array_push($encabezados,'NOMBRE DEL FORMULARIO');
            foreach($preguntas as $pregunta){
             array_push($encabezados,$pregunta->titulo_pregunta." ".$pregunta->titulo_despues);
            }

            array_push($array,$formulario->nombre);
            for ($i=1; $i <= count($preguntas) ; $i++) { 
                # code...
                array_push($array,$respuestas['respuesta_'.$i]);
            }

        
            $file=Excel::create('REPORTE'.$formulario->url, function($excel)use($array,$encabezados) {
                $excel->sheet('Excel sheet', function($sheet)use($array,$encabezados) {
                          //otra opción -> $products = Product::select('name')->get();             
                  $sheet->fromArray([$array]);
                  $sheet->row(1,$encabezados);
                  $sheet->row(1, function($row) { $row->setBackground('#CCCCCC'); });
                  $sheet->setOrientation('landscape');
                });
            })->export('xls');

           }

        }

    }

    public function descargar_reporte_form($id,$tipo){

        $formulario=formularioModel::findOrFail($id);
        $preguntas=DB::table('preguntas_formulario')->where('id_formulario','=',$formulario->id)->orderBy('posicion','asc')->get();
        
        $respuestas=DB::table('respuestas')->join('formulario','formulario.id','=','respuestas.id_formulario')
        ->select('respuestas.*','formulario.nombre')->where('formulario.id_user','=',Auth::user()->id)
        ->where('respuestas.id_formulario','=',$id)->get();
       
        if($tipo == "PDF"){
            
            $view =  \View::make('contestadas.invoice_todas', compact('respuestas', 'formulario', 'preguntas'))->render();
            //->setPaper($customPaper, 'landscape');
            $pdf = \App::make('dompdf.wrapper');
            $pdf->loadHTML($view);
            return $pdf->stream('ACUSE.pdf');

            

        }elseif($tipo == "EXCEL"){
            $encabezados=[];           
            $array=[];

            array_push($encabezados,'NOMBRE DEL FORMULARIO');
            foreach($preguntas as $pregunta){
             array_push($encabezados,$pregunta->titulo_pregunta." ".$pregunta->titulo_despues);
            }

            array_push($array,$formulario->nombre);
            for ($i=1; $i <= count($preguntas) ; $i++) { 
                # code...
                array_push($array,$respuestas['respuesta_'.$i]);
            }

        
            $file=Excel::create('REPORTE'.$formulario->url, function($excel)use($array,$encabezados) {
                $excel->sheet('Excel sheet', function($sheet)use($array,$encabezados) {
                          //otra opción -> $products = Product::select('name')->get();             
                  $sheet->fromArray([$array]);
                  $sheet->row(1,$encabezados);
                  $sheet->row(1, function($row) { $row->setBackground('#CCCCCC'); });
                  $sheet->setOrientation('landscape');
                });
            })->export('xls');

        }
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