<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>RGCA</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons --> 
    <link href="/img/logo.png" rel="icon">
    <link href="/img/logo.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="/assets/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="/assets/css/style.css" rel="stylesheet">

    <!-- =======================================================
  * Template Name: Shuffle - v4.9.0
  * Template URL: https://bootstrapmade.com/bootstrap-3-one-page-template-free-shuffle/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
    <style>
    input[type=radio] {
        width: 30px;
        height: 30px;
    }

    .whatsapp {
        position: fixed;
        width: 40px;
        height: 40px;
        bottom: 40px;
        right: 40px;
        background-color: #B1BCFF;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        z-index: 100;
    }

    .whatsapp-icon {
        margin-top: 13px;
    }

    .text2 {
        background-color: #def;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        padding: 5px;
        font-size: 20px !important;
    }

    .textoCard {
        text-align: left;
        font-size: 20px !important;
    }

    .textoCard_select {
        text-align: left;
        font-size: 20px !important;
        color: #000000 !important;
    }

    .Card_ {
        max-width: 100%;
        max-height: 38px;
        background-color: #364647;
    }

    .Card_select {
        max-width: 100%;
        max-height: 38px;
        background-color: #B6FFD1;
        color: #000000 !important;

    }

    
    .logo {
        position: fixed;
        width: 40px;
        height: 40px;
        bottom: 40px;
        right: 95%;
        background-color: transparent;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        z-index: 101;
    }

    </style>
</head>

<body>

    <!-- ======= Hero Section ======= -->
    <section id="hero">
        <form action="/formulario" id="form" method="post" files="true" enctype="multipart/form-data"
            class="form-horizontal parsley-examples">
            <input id="total" value="{{$total}}" type="hidden">
            <input type="hidden" name="id_formulario" value="{{$formulario->id}}">
            {{csrf_field()}}
            <div class="hero-container">
                <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-interval="false">
                    <div class="carousel-inner" role="listbox">
                        @foreach($preguntas as $pregunta)
                        @if($pregunta->posicion == 1)
                        <div class="carousel-item active" id="{{$pregunta->posicion}}" value="{{$pregunta->posicion}}"
                            style="background-image: url(/PORTADAS/{{$pregunta->imagen_fondo}});">
                            <div class="carousel-container">
                                <div id="carousel-content_{{$pregunta->posicion}}" class="carousel-content">
                             
                                    <h2 id="h2_{{$pregunta->posicion}}" class="animate__animated {{$pregunta->animacio_entrada}}"><span>{{$pregunta->titulo_pregunta}}</span></h2>
                                    @if($pregunta->tipo == "TEXTO")
                                    <input type="text" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxle
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "NÚMERICO")
                                    <input type="number" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}" name="input_{{$pregunta->posicion}}" autocomplete="false"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "RADIO")

                                    @if($pregunta->respuesta_1 <> null)

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_1}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_1}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_2 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"  value="{{$pregunta->respuesta_2}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_2}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_3 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_3}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_3}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_4 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_4}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_4}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_5 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_5}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_5}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_6 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_6}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_6}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_7 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_7}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_7}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_8 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_8}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_8}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_9 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_9}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_9}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif    
                                    @if($pregunta->respuesta_10 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_10}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_10}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    

                                 
                                    @elseif($pregunta->tipo == "TEXTAREA")
                                    <textarea  type="number" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" ></textarea>
                                    @elseif($pregunta->tipo == "MULTIPLE")
                                    
                                    @if($pregunta->respuesta_1 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_1}}','card_{{$pregunta->posicion}}_1','p_{{$pregunta->posicion}}_1');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_1">
                                                <p id="p_{{$pregunta->posicion}}_1" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_1}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_2 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_2}}','card_{{$pregunta->posicion}}_2','p_{{$pregunta->posicion}}_2');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_2">
                                                <p id="p_{{$pregunta->posicion}}_2" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_2}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_3 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_3}}','card_{{$pregunta->posicion}}_3','p_{{$pregunta->posicion}}_3');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_3">
                                                <p id="p_{{$pregunta->posicion}}_3" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">C</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_3}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_4 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_4}}','card_{{$pregunta->posicion}}_4','p_{{$pregunta->posicion}}_4');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_4">
                                                <p id="p_{{$pregunta->posicion}}_4" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">D</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_4}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_5 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_5}}','card_{{$pregunta->posicion}}_5','p_{{$pregunta->posicion}}_5');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_5">
                                                <p id="p_{{$pregunta->posicion}}_5" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">E</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_5}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_6 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_6}}','card_{{$pregunta->posicion}}_6','p_{{$pregunta->posicion}}_6');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_6">
                                                <p id="p_{{$pregunta->posicion}}_6" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">F</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_6}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_7 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_7}}','card_{{$pregunta->posicion}}_7','p_{{$pregunta->posicion}}_7');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_7">
                                                <p id="p_{{$pregunta->posicion}}_7" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">G</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_7}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_8 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_8}}','card_{{$pregunta->posicion}}_8','p_{{$pregunta->posicion}}_8');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_8">
                                                <p id="p_{{$pregunta->posicion}}_8" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">H</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_8}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_9 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_9}}','card_{{$pregunta->posicion}}_9','p_{{$pregunta->posicion}}_9');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_9">
                                                <p id="p_{{$pregunta->posicion}}_9" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">I</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_9}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif    
                                    @if($pregunta->respuesta_10 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_10}}','card_{{$pregunta->posicion}}_10','p_{{$pregunta->posicion}}_10');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_10">
                                                <p id="p_{{$pregunta->posicion}}_10" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">J</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_10}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    

                                    @endif
                                    @if($pregunta->agregar_otra_opcion == 'SI')                                    
                                    <p class="mt-4 animate__animated {{$pregunta->animacio_entrada}}">{{$pregunta->titulo_pregunta_2}}</p>
                                    @if($pregunta->tipo_otra_opcion == "TEXTO")
                                    <input type="text" name="input_otra_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "NÚMERICO")
                                    <input type="number" name="input_otra{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "TEXTAREA")
                                    <textarea  type="number" name="input_otra_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" ></textarea>
                                    @else
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->titulo_pregunta_2}}','card_{{$pregunta->posicion}}_OTRA','p_{{$pregunta->posicion}}_OTRA');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_OTRA">
                                                <p id="p_{{$pregunta->posicion}}_OTRA" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->titulo_pregunta_2}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @endif
                                   
                                    @if($pregunta->posicion == $total)                        
                                     <button type="button" onclick="enviar_form();" id="submit_3" class="mt-4 btn btn-primary btn-lg">ENVIAR</button>                                                           
                                    @endif
                                 

                                    <input type="hidden" id="hidden_{{$pregunta->posicion}}" name="hidden_{{$pregunta->posicion}}">
                                    <input type="hidden" id="concatena_{{$pregunta->posicion}}" value="{{$pregunta->titulo_heredado_respuesta}}" name="concatena_{{$pregunta->posicion}}">
                                    <input type="hidden" id="titulo_inicial_{{$pregunta->posicion}}" value="{{$pregunta->titulo_pregunta}}" name="titulo_inicial_{{$pregunta->posicion}}">
                                    <input type="hidden" id="pos_concatena_{{$pregunta->posicion}}" value="{{$pregunta->posicion_titulo_heredado}}" name="pos_concatena_{{$pregunta->posicion}}">
                                    <input type="hidden" id="tit_concatena_{{$pregunta->posicion}}" value="{{$pregunta->titulo_despues}}" name="tit_concatena_{{$pregunta->posicion}}">
                                    <input type="hidden" id="obligatorio{{$pregunta->posicion}}" value="{{$pregunta->obligatorio}}" name="obligatorio{{$pregunta->posicion}}">
                                </div>
                            </div>
                        </div>
                        @else

                        <div class="carousel-item" id="{{$pregunta->posicion}}" value="{{$pregunta->posicion}}"
                            style="background-image: url(/PORTADAS/{{$pregunta->imagen_fondo}});">
                            <div class="carousel-container">
                                <div id="carousel-content_{{$pregunta->posicion}}" class="carousel-content">
                                    <h2 id="h2_{{$pregunta->posicion}}" class="animate__animated {{$pregunta->animacio_entrada}}"><span>{{$pregunta->titulo_pregunta}}</span></h2>
                                    @if($pregunta->tipo == "TEXTO")
                                    <input type="text" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "NÚMERICO")
                                    <input type="number" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "RADIO")

                                    @if($pregunta->respuesta_1 <> null)

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_1}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_1}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_2 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"  value="{{$pregunta->respuesta_2}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_2}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_3 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_3}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_3}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_4 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_4}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_4}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_5 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_5}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_5}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_6 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_6}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_6}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_7 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_7}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_7}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_8 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_8}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_8}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    @if($pregunta->respuesta_9 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_9}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_9}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif    
                                    @if($pregunta->respuesta_10 <> null)
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" value="{{$pregunta->respuesta_10}}" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;{{$pregunta->respuesta_10}} 
                                            </label>
                                        </span>
                                    </div>
                                    @endif
                                    

                                 
                                    @elseif($pregunta->tipo == "TEXTAREA")
                                    <textarea  type="number" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" ></textarea>
                                    @elseif($pregunta->tipo == "MULTIPLE")
                                    
                                    @if($pregunta->respuesta_1 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_1}}','card_{{$pregunta->posicion}}_1','p_{{$pregunta->posicion}}_1');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_1">
                                                <p id="p_{{$pregunta->posicion}}_1" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_1}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_2 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_2}}','card_{{$pregunta->posicion}}_2','p_{{$pregunta->posicion}}_2');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_2">
                                                <p id="p_{{$pregunta->posicion}}_2" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_2}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_3 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_3}}','card_{{$pregunta->posicion}}_3','p_{{$pregunta->posicion}}_3');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_3">
                                                <p id="p_{{$pregunta->posicion}}_3" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">C</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_3}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_4 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_4}}','card_{{$pregunta->posicion}}_4','p_{{$pregunta->posicion}}_4');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_4">
                                                <p id="p_{{$pregunta->posicion}}_4" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">D</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_4}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_5 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_5}}','card_{{$pregunta->posicion}}_5','p_{{$pregunta->posicion}}_5');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_5">
                                                <p id="p_{{$pregunta->posicion}}_5" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">E</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_5}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_6 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_6}}','card_{{$pregunta->posicion}}_6','p_{{$pregunta->posicion}}_6');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_6">
                                                <p id="p_{{$pregunta->posicion}}_6" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">F</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_6}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_7 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_7}}','card_{{$pregunta->posicion}}_7','p_{{$pregunta->posicion}}_7');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_7">
                                                <p id="p_{{$pregunta->posicion}}_7" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">G</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_7}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_8 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_8}}','card_{{$pregunta->posicion}}_8','p_{{$pregunta->posicion}}_8');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_8">
                                                <p id="p_{{$pregunta->posicion}}_8" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">H</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_8}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_9 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_9}}','card_{{$pregunta->posicion}}_9','p_{{$pregunta->posicion}}_9');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_9">
                                                <p id="p_{{$pregunta->posicion}}_9" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">I</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_9}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif    
                                    @if($pregunta->respuesta_10 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->respuesta_10}}','card_{{$pregunta->posicion}}_10','p_{{$pregunta->posicion}}_10');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_10">
                                                <p id="p_{{$pregunta->posicion}}_10" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">J</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_10}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    

                                    @endif
                                    @if($pregunta->agregar_otra_opcion == 'SI')                                    
                                    
                                    @if($pregunta->tipo_otra_opcion == "TEXTO")
                                    <p class="mt-4 animate__animated {{$pregunta->animacio_entrada}}">{{$pregunta->titulo_pregunta_2}}</p>
                                    <input type="text" name="input_otra_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "NÚMERICO")
                                    <p class="mt-4 animate__animated {{$pregunta->animacio_entrada}}">{{$pregunta->titulo_pregunta_2}}</p>
                                    <input type="number" name="input_otra{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "TEXTAREA")
                                    <p class="mt-4 animate__animated {{$pregunta->animacio_entrada}}">{{$pregunta->titulo_pregunta_2}}</p>
                                    <textarea  type="number" name="input_otra_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" ></textarea>
                                    @else
                                          <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}','{{$pregunta->titulo_pregunta_2}}','card_{{$pregunta->posicion}}_OTRA','p_{{$pregunta->posicion}}_OTRA');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_OTRA">
                                                <p id="p_{{$pregunta->posicion}}_OTRA" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->titulo_pregunta_2}}
                                                </p>

                                            </div>
                                        </a>
                                  
                                    @endif
                                    @endif 
                                    
                                    @if($pregunta->posicion == $total)                        
                                     <button type="button" onclick="enviar_form();" id="submit_2" class="mt-4 btn btn-primary btn-lg">ENVIAR</button>                                                           
                                    @endif
                                 


                                    <input type="hidden" id="hidden_{{$pregunta->posicion}}" name="hidden_{{$pregunta->posicion}}">
                                    <input type="hidden" id="concatena_{{$pregunta->posicion}}" value="{{$pregunta->titulo_heredado_respuesta}}" name="concatena_{{$pregunta->posicion}}">
                                    <input type="hidden" id="titulo_inicial_{{$pregunta->posicion}}" value="{{$pregunta->titulo_pregunta}}" name="titulo_inicial_{{$pregunta->posicion}}">
                                    <input type="hidden" id="pos_concatena_{{$pregunta->posicion}}" value="{{$pregunta->posicion_titulo_heredado}}" name="pos_concatena_{{$pregunta->posicion}}">
                                    <input type="hidden" id="tit_concatena_{{$pregunta->posicion}}" value="{{$pregunta->titulo_despues}}" name="tit_concatena_{{$pregunta->posicion}}">
                                    <input type="hidden" id="obligatorio{{$pregunta->posicion}}" value="{{$pregunta->obligatorio}}" name="obligatorio{{$pregunta->posicion}}">
                                </div>                               
                            </div>
                        </div>
                        @endif
                    

                        @endforeach
                        <!-- Slide 1 -->
                        
                      


                        <div id="anterior">
                            <a href="javascript:retrocede();" class="carousel-control-prev">
                                <span class="carousel-control-prev-icon bi bi-chevron-double-left"
                                    aria-hidden="true"></span>

                            </a>
                        </div>

                        <div id="siguiente">
                            <a href="javascript:avanza();" class="carousel-control-next" role="button">
                                <span class="carousel-control-next-icon bi bi-chevron-double-right"
                                    aria-hidden="true"></span>
                            </a>
                        </div>
                    </div>



                </div>
            </div>
        </form>

    </section><!-- End Hero -->

    <img class="logo animate__animated animate__fadeInLeft" src="/PORTADAS/{{$formulario->logo}}" alt="" width="120" height="120" />
    <div id="number_page" class="whatsapp animate__animated animate__fadeInLeft"> 1</a>
    




        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
                class="bi bi-arrow-up-short"></i></a>

        <!-- Vendor JS Files -->
        <script src="/assets/vendor/purecounter/purecounter_vanilla.js"></script>
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
        <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="/assets/vendor/waypoints/noframework.waypoints.js"></script>
        <script src="/assets/vendor/php-email-form/validate.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <!-- Template Main JS File -->
        <script src="/assets/js/main.js"></script>
        <script>

        function enviar_form(){
            $('#form').submit();
        }
        window.onload = function() {
            setTimeout(carousel_valid, 0);
        };

        function carousel_valid() {
            total = parseInt(document.getElementById('total').value);
            number = parseInt($(".carousel-item.active").attr('id'));
            console.log(number);
            value = document.getElementById('hidden_' + number).value;
            console.log(value);


            console.log(number+" de "+total);

            document.getElementById('number_page').innerHTML = number;

            if (number > 1) {
                document.getElementById('anterior').style.display = 'block';
                document.getElementById('siguiente').style.display = 'block';

            } else if (number <= 1) {
                document.getElementById('anterior').style.display = 'none';
                document.getElementById('siguiente').style.display = 'block';


            }

            if (number >= total) {                
                document.getElementById('siguiente').style.display = 'none';
                document.getElementById('anterior').style.display = 'block';
            }

        }


        function avanza() {
            number = $(".carousel-item.active").attr('id');
            sig=parseInt(number)+1;
            total = document.getElementById('total').value;
         
            //buscamos en el siguiente carousel si teiene titulo heredado
            id_heredado=document.getElementById('concatena_'+sig).value;
           
            if(id_heredado > 0 && sig <= total){              
               // titulo_final=document.getElementById('h2_'+sig).innerHTML="";            
                valor_heredado=document.getElementById('hidden_'+id_heredado).value;    
                                  
                posicion=document.getElementById('pos_concatena_'+sig).value;
              
                titulo_inicial=document.getElementById('titulo_inicial_'+sig).value;                    
           
 
                if(posicion=="INICIO"){
                  titulo_final=valor_heredado+" "+titulo_inicial;
                }else if(posicion=="DESPUES"){
                    titulo_final=titulo_inicial+" "+valor_heredado;
                }else{
                    //en medio
                    titulo_despues=document.getElementById('tit_concatena_'+sig).value;   
                    titulo_final=titulo_inicial+" "+valor_heredado+" "+titulo_despues;                  
                } 
                titulo_final=document.getElementById('h2_'+sig).innerHTML=titulo_final;
                //alert(titulo_final);               
            }

         
           

            value = document.getElementById('hidden_' + number).value;
            alerta = $(".mt-4.alert.alert-danger.animate__animated.animate__fadeInLeft");
            obligatorio = document.getElementById('obligatorio' + number).value;
         
      
            if (alerta) {
                alerta.remove();

            }
            if(obligatorio == "SI"){
                if (value != null && value != "") {

                 $("#heroCarousel").carousel("next");
                 setTimeout(carousel_valid, 600);

                } else {
                 card = document.getElementById('carousel-content_' + number);
                 console.log(number);
                 if (card) {

                    div = document.createElement("div");
                    div.setAttribute('class', 'mt-4 alert alert-danger animate__animated animate__fadeInLeft');
                    div.setAttribute('role', 'alert');
                    div.innerHTML = "Favor de ingresar su respuesta";

                    card.appendChild(div);
                 }



                }

            }else{
                $("#heroCarousel").carousel("next");
                setTimeout(carousel_valid, 600);
            }
           



        }

        function retrocede() {
            $("#heroCarousel").carousel("prev");
            setTimeout(carousel_valid, 600);
        }

        function cambia_texto(value, destino, texto1, texto2) {

            document.getElementById(destino).innerHTML = texto1 + " " + value + " " + texto2;
        }

        function envia_hidden(hiden, value, card, p) {
            document.getElementById(hiden).value = value;

            id_card = $(".Card_select").attr('id');
            if (id_card) {
                card_aux = document.getElementById(id_card);
                card_aux.setAttribute("class", 'card Card_ mb-3 mt-4');
            }

            id_p = $(".textoCard_select").attr('id');
            if (id_p) {
                p_aux = document.getElementById(id_p);
                p_aux.setAttribute("class", 'card-text textoCard  animate__animated animate__fadeInLeft');
            }
            span_ant = $(".position-absolute.top-0.start-100.translate-middle.badge.rounded-pill.bg-success").remove();

            card = document.getElementById(card);
            card.setAttribute("class", 'card Card_select mb-3 mt-4');

            texto = document.getElementById(p);
            texto.setAttribute("class", 'card-text textoCard_select  animate__animated animate__fadeInLeft');

            span = document.createElement("span");
            span.setAttribute('class',
                'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success');
            span.innerHTML = "✓";

            card.appendChild(span);

        }

        function asigna_valor(value, hidden) {
            document.getElementById(hidden).value = value;
        }
        </script>

</body>

</html>