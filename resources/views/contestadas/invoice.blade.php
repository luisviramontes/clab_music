<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>ACUSE </title>



    <link rel="stylesheet" href="assets/css/invoice.css" media="all" />
</head>

<body  id="img_marca_agua">

    <header class="clearfix">
        <div id="logo">
            <img src="PORTADAS/{{$formulario->logo}}" width="150" height="100" />
        </div>


        <div id="project" align="center">
            <h1>
                <b>{{$formulario->nombre}}</b>
            </h1>
        </div>

    </header>
    <main>
        <div>

            <h2 id="fecha">{{$respuestas->created_at}}</h2>
            <h2><b>Descripción: {{$formulario->descripcion}}<br>
                    URL: {{$formulario->url}}<br>
                    IP PUBLICA: {{$respuestas->ip_publica}}<br>
                </b></h2>
            <br><br>
        </div>
        <br><br>










        <div>
            <h2> <b>RESPUESTAS:</b> </h2>
        </div>
        <div class="tg-wrap">
            <div class="row">

                <div class="col-lg-12">
                    <table class="table table-centered table-borderless table-striped mb-0">
                        <tbody>
                            <tr>
                                <td style="width: 35%;"><b>PREGUNTAS</b></td>
                                <td><b>RESPUESTAS</b></td>
                            </tr>
                            @if($respuestas->respuesta_1 <> "")
                                <tr>
                                    <td style="width: 35%;"><b>{{$preguntas[0]->posicion}};</b>
                                        {{$preguntas[0]->titulo_pregunta}}
                                        {{$preguntas[0]->titulo_despues}}</td>
                                    <td><a href="#" id="inline-username" data-type="text" data-pk="1"
                                            data-title="Enter username">{{$respuestas->respuesta_1}}</a></td>
                                </tr>
                                @endif

                                @if($respuestas->respuesta_2 <> "")
                                    <tr>
                                        <td style="width: 35%;">
                                            <b>{{$preguntas[1]->posicion}};</b>{{$preguntas[1]->titulo_pregunta}}
                                            {{$preguntas[1]->titulo_despues}}
                                        </td>
                                        <td><a href="#" id="inline-username" data-type="text" data-pk="1"
                                                data-title="Enter username">{{$respuestas->respuesta_2}}</a></td>
                                    </tr>
                                    @endif

                                    @if($respuestas->respuesta_3 <> "")
                                        <tr>
                                            <td style="width: 35%;"><b>{{$preguntas[2]->posicion}};</b>
                                                {{$preguntas[2]->titulo_pregunta}}
                                                {{$preguntas[2]->titulo_despues}}</td>
                                            <td><a href="#" id="inline-username" data-type="text" data-pk="1"
                                                    data-title="Enter username">{{$respuestas->respuesta_3}}</a></td>
                                        </tr>
                                        @endif

                                        @if($respuestas->respuesta_4 <> "")
                                            <tr>
                                                <td style="width: 35%;">
                                                    <b>{{$preguntas[3]->posicion}};</b>{{$preguntas[3]->titulo_pregunta}}
                                                    {{$preguntas[3]->titulo_despues}}
                                                </td>
                                                <td><a href="#" id="inline-username" data-type="text" data-pk="1"
                                                        data-title="Enter username">{{$respuestas->respuesta_4}}</a>
                                                </td>
                                            </tr>
                                            @endif

                                            @if($respuestas->respuesta_5 <> "")
                                                <tr>
                                                    <td style="width: 35%;"><b>{{$preguntas[4]->posicion}};</b>
                                                        {{$preguntas[4]->titulo_pregunta}}
                                                        {{$preguntas[4]->titulo_despues}}</td>
                                                    <td><a href="#" id="inline-username" data-type="text" data-pk="1"
                                                            data-title="Enter username">{{$respuestas->respuesta_5}}</a>
                                                    </td>
                                                </tr>
                                                @endif

                                                @if($respuestas->respuesta_6 <> "")
                                                    <tr>
                                                        <td style="width: 35%;"><b>{{$preguntas[5]->posicion}};</b>
                                                            {{$preguntas[5]->titulo_pregunta}}
                                                            {{$preguntas[5]->titulo_despues}}</td>
                                                        <td><a href="#" id="inline-username" data-type="text"
                                                                data-pk="1"
                                                                data-title="Enter username">{{$respuestas->respuesta_6}}</a>
                                                        </td>
                                                    </tr>
                                                    @endif

                                                    @if($respuestas->respuesta_7 <> "")
                                                        <tr>
                                                            <td style="width: 35%;"><b>{{$preguntas[6]->posicion}};</b>
                                                                {{$preguntas[6]->titulo_pregunta}}
                                                                {{$preguntas[6]->titulo_despues}}</td>
                                                            <td><a href="#" id="inline-username" data-type="text"
                                                                    data-pk="1"
                                                                    data-title="Enter username">{{$respuestas->respuesta_7}}</a>
                                                            </td>
                                                        </tr>
                                                        @endif

                                                        @if($respuestas->respuesta_8 <> "")
                                                            <tr>
                                                                <td style="width: 35%;">
                                                                    <b>{{$preguntas[7]->posicion}};</b>
                                                                    {{$preguntas[7]->titulo_pregunta}}
                                                                    {{$preguntas[7]->titulo_despues}}
                                                                </td>
                                                                <td><a href="#" id="inline-username" data-type="text"
                                                                        data-pk="1"
                                                                        data-title="Enter username">{{$respuestas->respuesta_8}}</a>
                                                                </td>
                                                            </tr>
                                                            @endif

                                                            @if($respuestas->respuesta_9 <> "")
                                                                <tr>
                                                                    <td style="width: 35%;">
                                                                        <b>{{$preguntas[8]->posicion}};</b>
                                                                        {{$preguntas[8]->titulo_pregunta}}
                                                                        {{$preguntas[8]->titulo_despues}}
                                                                    </td>
                                                                    <td><a href="#" id="inline-username"
                                                                            data-type="text" data-pk="1"
                                                                            data-title="Enter username">{{$respuestas->respuesta_9}}</a>
                                                                    </td>
                                                                </tr>
                                                                @endif

                                                                @if($respuestas->respuesta_10 <> "")
                                                                    <tr>
                                                                        <td style="width: 35%;">
                                                                            <b>{{$preguntas[9]->posicion}};</b>
                                                                            {{$preguntas[9]->titulo_pregunta}}
                                                                            {{$preguntas[9]->titulo_despues}}
                                                                        </td>
                                                                        <td><a href="#" id="inline-username"
                                                                                data-type="text" data-pk="1"
                                                                                data-title="Enter username">{{$respuestas->respuesta_10}}</a>
                                                                        </td>
                                                                    </tr>
                                                                    @endif

                                                                    @if($respuestas->respuesta_11 <> "")
                                                                        <tr>
                                                                            <td style="width: 35%;">
                                                                                <b>{{$preguntas[10]->posicion}};</b>
                                                                                {{$preguntas[10]->titulo_pregunta}}
                                                                                {{$preguntas[10]->titulo_despues}}
                                                                            </td>
                                                                            <td><a href="#" id="inline-username"
                                                                                    data-type="text" data-pk="1"
                                                                                    data-title="Enter username">{{$respuestas->respuesta_11}}</a>
                                                                            </td>
                                                                        </tr>
                                                                        @endif

                                                                        @if($respuestas->respuesta_12 <> "")
                                                                            <tr>
                                                                                <td style="width: 35%;">
                                                                                    <b>{{$preguntas[11]->posicion}};</b>
                                                                                    {{$preguntas[11]->titulo_pregunta}}
                                                                                    {{$preguntas[11]->titulo_despues}}
                                                                                </td>
                                                                                <td><a href="#" id="inline-username"
                                                                                        data-type="text" data-pk="1"
                                                                                        data-title="Enter username">{{$respuestas->respuesta_12}}</a>
                                                                                </td>
                                                                            </tr>
                                                                            @endif

                                                                            @if($respuestas->respuesta_13 <> "")
                                                                                <tr>
                                                                                    <td style="width: 35%;">
                                                                                        <b>{{$preguntas[12]->posicion}};</b>
                                                                                        {{$preguntas[12]->titulo_pregunta}}
                                                                                        {{$preguntas[12]->titulo_despues}}
                                                                                    </td>
                                                                                    <td><a href="#" id="inline-username"
                                                                                            data-type="text" data-pk="1"
                                                                                            data-title="Enter username">{{$respuestas->respuesta_13}}</a>
                                                                                    </td>
                                                                                </tr>
                                                                                @endif

                                                                                @if($respuestas->respuesta_14 <> "")
                                                                                    <tr>
                                                                                        <td style="width: 35%;">
                                                                                            <b>{{$preguntas[13]->posicion}};</b>
                                                                                            {{$preguntas[13]->titulo_pregunta}}
                                                                                            {{$preguntas[13]->titulo_despues}}
                                                                                        </td>
                                                                                        <td><a href="#"
                                                                                                id="inline-username"
                                                                                                data-type="text"
                                                                                                data-pk="1"
                                                                                                data-title="Enter username">{{$respuestas->respuesta_14}}</a>
                                                                                        </td>
                                                                                    </tr>
                                                                                    @endif

                                                                                    @if($respuestas->respuesta_15 <> "")
                                                                                        <tr>
                                                                                            <td style="width: 35%;">
                                                                                                <b>{{$preguntas[14]->posicion}};</b>
                                                                                                {{$preguntas[14]->titulo_pregunta}}
                                                                                                {{$preguntas[14]->titulo_despues}}
                                                                                            </td>
                                                                                            <td><a href="#"
                                                                                                    id="inline-username"
                                                                                                    data-type="text"
                                                                                                    data-pk="1"
                                                                                                    data-title="Enter username">{{$respuestas->respuesta_15}}</a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        @endif

                                                                                        @if($respuestas->respuesta_16 <>
                                                                                            "")
                                                                                            <tr>
                                                                                                <td style="width: 35%;">
                                                                                                    <b>{{$preguntas[15]->posicion}};</b>
                                                                                                    {{$preguntas[15]->titulo_pregunta}}
                                                                                                    {{$preguntas[15]->titulo_despues}}
                                                                                                </td>
                                                                                                <td><a href="#"
                                                                                                        id="inline-username"
                                                                                                        data-type="text"
                                                                                                        data-pk="1"
                                                                                                        data-title="Enter username">{{$respuestas->respuesta_16}}</a>
                                                                                                </td>
                                                                                            </tr>
                                                                                            @endif

                                                                                            @if($respuestas->respuesta_17
                                                                                            <> "")
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style="width: 35%;">
                                                                                                        <b>{{$preguntas[16]->posicion}};</b>
                                                                                                        {{$preguntas[16]->titulo_pregunta}}
                                                                                                        {{$preguntas[16]->titulo_despues}}
                                                                                                    </td>
                                                                                                    <td><a href="#"
                                                                                                            id="inline-username"
                                                                                                            data-type="text"
                                                                                                            data-pk="1"
                                                                                                            data-title="Enter username">{{$respuestas->respuesta_17}}</a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                @endif

                                                                                                @if($respuestas->respuesta_18
                                                                                                <> "")
                                                                                                    <tr>
                                                                                                        <td
                                                                                                            style="width: 35%;">
                                                                                                            <b>{{$preguntas[17]->posicion}};</b>
                                                                                                            {{$preguntas[17]->titulo_pregunta}}
                                                                                                            {{$preguntas[17]->titulo_despues}}
                                                                                                        </td>
                                                                                                        <td><a href="#"
                                                                                                                id="inline-username"
                                                                                                                data-type="text"
                                                                                                                data-pk="1"
                                                                                                                data-title="Enter username">{{$respuestas->respuesta_18}}</a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    @endif

                                                                                                    @if($respuestas->respuesta_19
                                                                                                    <> "")
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="width: 35%;">
                                                                                                                <b>{{$preguntas[18]->posicion}};</b>
                                                                                                                {{$preguntas[18]->titulo_pregunta}}
                                                                                                                {{$preguntas[18]->titulo_despues}}
                                                                                                            </td>
                                                                                                            <td><a href="#"
                                                                                                                    id="inline-username"
                                                                                                                    data-type="text"
                                                                                                                    data-pk="1"
                                                                                                                    data-title="Enter username">{{$respuestas->respuesta_19}}</a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        @endif

                                                                                                        @if($respuestas->respuesta_20
                                                                                                        <> "")
                                                                                                            <tr>
                                                                                                                <td
                                                                                                                    style="width: 35%;">
                                                                                                                    <b>{{$preguntas[19]->posicion}};</b>
                                                                                                                    {{$preguntas[19]->titulo_pregunta}}
                                                                                                                    {{$preguntas[19]->titulo_despues}}
                                                                                                                </td>
                                                                                                                <td><a href="#"
                                                                                                                        id="inline-username"
                                                                                                                        data-type="text"
                                                                                                                        data-pk="1"
                                                                                                                        data-title="Enter username">{{$respuestas->respuesta_20}}</a>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            @endif

                                                                                                            @if($respuestas->respuesta_21
                                                                                                            <> "")
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style="width: 35%;">
                                                                                                                        <b>{{$preguntas[20]->posicion}};</b>
                                                                                                                        {{$preguntas[20]->titulo_pregunta}}
                                                                                                                        {{$preguntas[20]->titulo_despues}}
                                                                                                                    </td>
                                                                                                                    <td><a href="#"
                                                                                                                            id="inline-username"
                                                                                                                            data-type="text"
                                                                                                                            data-pk="1"
                                                                                                                            data-title="Enter username">{{$respuestas->respuesta_21}}</a>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                @endif

                                                                                                                @if($respuestas->respuesta_22
                                                                                                                <> "")
                                                                                                                    <tr>
                                                                                                                        <td
                                                                                                                            style="width: 35%;">
                                                                                                                            <b>{{$preguntas[21]->posicion}};</b>
                                                                                                                            {{$preguntas[21]->titulo_pregunta}}
                                                                                                                            {{$preguntas[21]->titulo_despues}}
                                                                                                                        </td>
                                                                                                                        <td><a href="#"
                                                                                                                                id="inline-username"
                                                                                                                                data-type="text"
                                                                                                                                data-pk="1"
                                                                                                                                data-title="Enter username">{{$respuestas->respuesta_22}}</a>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    @endif

                                                                                                                    @if($respuestas->respuesta_23
                                                                                                                    <> "")
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style="width: 35%;">
                                                                                                                                <b>{{$preguntas[22]->posicion}};</b>
                                                                                                                                {{$preguntas[22]->titulo_pregunta}}
                                                                                                                                {{$preguntas[22]->titulo_despues}}
                                                                                                                            </td>
                                                                                                                            <td><a href="#"
                                                                                                                                    id="inline-username"
                                                                                                                                    data-type="text"
                                                                                                                                    data-pk="1"
                                                                                                                                    data-title="Enter username">{{$respuestas->respuesta_23}}</a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        @endif

                                                                                                                        @if($respuestas->respuesta_24
                                                                                                                        <> "")
                                                                                                                            <tr>
                                                                                                                                <td
                                                                                                                                    style="width: 35%;">
                                                                                                                                    <b>{{$preguntas[23]->posicion}};</b>
                                                                                                                                    {{$preguntas[23]->titulo_pregunta}}
                                                                                                                                    {{$preguntas[23]->titulo_despues}}
                                                                                                                                </td>
                                                                                                                                <td><a href="#"
                                                                                                                                        id="inline-username"
                                                                                                                                        data-type="text"
                                                                                                                                        data-pk="1"
                                                                                                                                        data-title="Enter username">{{$respuestas->respuesta_24}}</a>
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                            @endif

                                                                                                                            @if($respuestas->respuesta_25
                                                                                                                            <> "")
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style="width: 35%;">
                                                                                                                                        <b>{{$preguntas[24]->posicion}};</b>
                                                                                                                                        {{$preguntas[24]->titulo_pregunta}}
                                                                                                                                        {{$preguntas[24]->titulo_despues}}
                                                                                                                                    </td>
                                                                                                                                    <td><a href="#"
                                                                                                                                            id="inline-username"
                                                                                                                                            data-type="text"
                                                                                                                                            data-pk="1"
                                                                                                                                            data-title="Enter username">{{$respuestas->respuesta_25}}</a>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                @endif

                                                                                                                                @if($respuestas->respuesta_26
                                                                                                                                <> "")
                                                                                                                                    <tr>
                                                                                                                                        <td
                                                                                                                                            style="width: 35%;">
                                                                                                                                            <b>{{$preguntas[25]->posicion}};</b>
                                                                                                                                            {{$preguntas[25]->titulo_pregunta}}
                                                                                                                                            {{$preguntas[25]->titulo_despues}}
                                                                                                                                        </td>
                                                                                                                                        <td><a href="#"
                                                                                                                                                id="inline-username"
                                                                                                                                                data-type="text"
                                                                                                                                                data-pk="1"
                                                                                                                                                data-title="Enter username">{{$respuestas->respuesta_26}}</a>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                    @endif

                                                                                                                                    @if($respuestas->respuesta_27
                                                                                                                                    <> "")
                                                                                                                                        <tr>
                                                                                                                                            <td
                                                                                                                                                style="width: 35%;">
                                                                                                                                                <b>{{$preguntas[26]->posicion}};</b>
                                                                                                                                                {{$preguntas[26]->titulo_pregunta}}
                                                                                                                                                {{$preguntas[26]->titulo_despues}}
                                                                                                                                            </td>
                                                                                                                                            <td><a href="#"
                                                                                                                                                    id="inline-username"
                                                                                                                                                    data-type="text"
                                                                                                                                                    data-pk="1"
                                                                                                                                                    data-title="Enter username">{{$respuestas->respuesta_27}}</a>
                                                                                                                                            </td>
                                                                                                                                        </tr>
                                                                                                                                        @endif

                                                                                                                                        @if($respuestas->respuesta_28
                                                                                                                                        <> "")
                                                                                                                                            <tr>
                                                                                                                                                <td
                                                                                                                                                    style="width: 35%;">
                                                                                                                                                    <b>{{$preguntas[27]->posicion}};</b>
                                                                                                                                                    {{$preguntas[27]->titulo_pregunta}}
                                                                                                                                                    {{$preguntas[27]->titulo_despues}}
                                                                                                                                                </td>
                                                                                                                                                <td><a href="#"
                                                                                                                                                        id="inline-username"
                                                                                                                                                        data-type="text"
                                                                                                                                                        data-pk="1"
                                                                                                                                                        data-title="Enter username">{{$respuestas->respuesta_28}}</a>
                                                                                                                                                </td>
                                                                                                                                            </tr>
                                                                                                                                            @endif

                                                                                                                                            @if($respuestas->respuesta_29
                                                                                                                                            <> "")
                                                                                                                                                <tr>
                                                                                                                                                    <td
                                                                                                                                                        style="width: 35%;">
                                                                                                                                                        <b>{{$preguntas[28]->posicion}};</b>
                                                                                                                                                        {{$preguntas[28]->titulo_pregunta}}
                                                                                                                                                        {{$preguntas[28]->titulo_despues}}
                                                                                                                                                    </td>
                                                                                                                                                    <td><a href="#"
                                                                                                                                                            id="inline-username"
                                                                                                                                                            data-type="text"
                                                                                                                                                            data-pk="1"
                                                                                                                                                            data-title="Enter username">{{$respuestas->respuesta_29}}</a>
                                                                                                                                                    </td>
                                                                                                                                                </tr>
                                                                                                                                                @endif

                                                                                                                                                @if($respuestas->respuesta_30
                                                                                                                                                <> "")
                                                                                                                                                    <tr>
                                                                                                                                                        <td
                                                                                                                                                            style="width: 35%;">
                                                                                                                                                            <b>{{$preguntas[29]->posicion}};</b>
                                                                                                                                                            {{$preguntas[29]->titulo_pregunta}}
                                                                                                                                                            {{$preguntas[29]->titulo_despues}}
                                                                                                                                                        </td>
                                                                                                                                                        <td><a href="#"
                                                                                                                                                                id="inline-username"
                                                                                                                                                                data-type="text"
                                                                                                                                                                data-pk="1"
                                                                                                                                                                data-title="Enter username">{{$respuestas->respuesta_30}}</a>
                                                                                                                                                        </td>
                                                                                                                                                    </tr>
                                                                                                                                                    @endif




                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <br>



</body>

</html>