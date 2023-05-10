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

    .cargando {
        position: fixed;
        width: 0px;
        height: 40px;
        bottom: 40px;
        right: 55%;
        background-color: transparent;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        z-index: 101;
    }

    .loader {
							border: 8px solid #f3f3f3;
							border-radius: 25%;
							border-top: 8px solid #3498db;
							width: 60px!important;
							height: 60px!important;
							-webkit-animation: spin 2s linear infinite; /* Safari */
							animation: spin 2s linear infinite;
						}

						/* Safari */
						@-webkit-keyframes spin {
							0% { -webkit-transform: rotate(0deg); }
							100% { -webkit-transform: rotate(360deg); }
						}

						@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
						}
    </style>
</head>

<body>
    <!-- ======= Hero Section ======= -->
    <section id="hero">
   
        <form action="/formulario_depende" id="form" method="post" files="true" enctype="multipart/form-data"
            class="form-horizontal parsley-examples">
            <input id="total" value="{{$total}}" name="total" type="hidden">
            <input type="hidden" id="id_formulario" name="id_formulario" value="{{$formulario->id}}">
           
            {{csrf_field()}}
            <div class="hero-container">
                <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-interval="false">
                    <div class="carousel-inner" role="listbox">
                        @foreach($preguntas as $pregunta)
                        @if($pregunta->posicion == 1)
                        <div class="carousel-item active" id='{{$pregunta->posicion}}_{{$pregunta->id}}'  value="{{$pregunta->posicion}}"
                            style="background-image: url(/PORTADAS/{{$pregunta->imagen_fondo}});">
                            <div class="carousel-container">
                                <div id="carousel-content_{{$pregunta->posicion}}_{{$pregunta->id}}" class="carousel-content">
                             
                                    <h2 id="h2_{{$pregunta->posicion}}" class="animate__animated {{$pregunta->animacio_entrada}}"><span>{{$pregunta->titulo_pregunta}}</span></h2>
                                    @if($pregunta->tipo == "TEXTO")
                                    <input type="text" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxle
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "NÚMERICO")
                                    <input type="number" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}" name="input_{{$pregunta->posicion}}" autocomplete="false"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "RADIO")

                                    @if($pregunta->respuesta_1 <> null)

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_1}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"  value="{{$pregunta->respuesta_2}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_3}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_4}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_5}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_6}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_7}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_8}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_9}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_10}}" type="radio"
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
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" ></textarea>
                                    @elseif($pregunta->tipo == "MULTIPLE")
                                    
                                    @if($pregunta->respuesta_1 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_1}}','card_{{$pregunta->posicion}}_1','p_{{$pregunta->posicion}}_1','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_1">
                                                <p id="p_{{$pregunta->posicion}}_1" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_1}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_2 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_2}}','card_{{$pregunta->posicion}}_2','p_{{$pregunta->posicion}}_2','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_2">
                                                <p id="p_{{$pregunta->posicion}}_2" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_2}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_3 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_3}}','card_{{$pregunta->posicion}}_3','p_{{$pregunta->posicion}}_3','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_3">
                                                <p id="p_{{$pregunta->posicion}}_3" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">C</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_3}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_4 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_4}}','card_{{$pregunta->posicion}}_4','p_{{$pregunta->posicion}}_4','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_4">
                                                <p id="p_{{$pregunta->posicion}}_4" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">D</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_4}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_5 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_5}}','card_{{$pregunta->posicion}}_5','p_{{$pregunta->posicion}}_5','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_5">
                                                <p id="p_{{$pregunta->posicion}}_5" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">E</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_5}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_6 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_6}}','card_{{$pregunta->posicion}}_6','p_{{$pregunta->posicion}}_6','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_6">
                                                <p id="p_{{$pregunta->posicion}}_6" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">F</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_6}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_7 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_7}}','card_{{$pregunta->posicion}}_7','p_{{$pregunta->posicion}}_7','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_7">
                                                <p id="p_{{$pregunta->posicion}}_7" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">G</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_7}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_8 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_8}}','card_{{$pregunta->posicion}}_8','p_{{$pregunta->posicion}}_8','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_8">
                                                <p id="p_{{$pregunta->posicion}}_8" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">H</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_8}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_9 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_9}}','card_{{$pregunta->posicion}}_9','p_{{$pregunta->posicion}}_9','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_9">
                                                <p id="p_{{$pregunta->posicion}}_9" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">I</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_9}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif    
                                    @if($pregunta->respuesta_10 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_10}}','card_{{$pregunta->posicion}}_10','p_{{$pregunta->posicion}}_10','{{$pregunta->id}}');">
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
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "NÚMERICO")
                                    <input type="number" name="input_otra{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "TEXTAREA")
                                    <textarea  type="number" name="input_otra_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" ></textarea>
                                    @else
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->titulo_pregunta_2}}','card_{{$pregunta->posicion}}_OTRA','p_{{$pregunta->posicion}}_OTRA','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_OTRA">
                                                <p id="p_{{$pregunta->posicion}}_OTRA" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->titulo_pregunta_2}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @endif
                                   
                                   
                                 

                                    <input type="hidden" id="hidden_{{$pregunta->posicion}}_{{$pregunta->id}}" name="hidden_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="concatena_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->titulo_heredado_respuesta}}" name="concatena_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="titulo_inicial_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->titulo_pregunta}}" name="titulo_inicial_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="pos_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->posicion_titulo_heredado}}" name="pos_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="tit_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->titulo_despues}}" name="tit_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="obligatorio{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->obligatorio}}" name="obligatorio{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="visible_{{$pregunta->posicion}}_{{$pregunta->id}}" value="1" name="visible_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                </div>
                            </div>
                        </div>
                        @else

                        @if($pregunta->depende_otra == "SI")
                        <div class="carousel-item" id="{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->posicion}}"
                            style="background-image: url(/PORTADAS/{{$pregunta->imagen_fondo}});display:none;">
                        @else
                        <div class="carousel-item" id="{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->posicion}}"
                            style="background-image: url(/PORTADAS/{{$pregunta->imagen_fondo}});">
                        @endif
                            <div class="carousel-container">
                                <div id="carousel-content_{{$pregunta->posicion}}_{{$pregunta->id}}" class="carousel-content">
                                    <h2 id="h2_{{$pregunta->posicion}}" class="animate__animated {{$pregunta->animacio_entrada}}"><span>{{$pregunta->titulo_pregunta}}</span></h2>
                                    @if($pregunta->tipo == "TEXTO")
                                    <input type="text" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "NÚMERICO")
                                    <input type="number" name="input_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" >
                                    @elseif($pregunta->tipo == "RADIO")

                                    @if($pregunta->respuesta_1 <> null)

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated {{$pregunta->animacio_entrada}}">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_1}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"  value="{{$pregunta->respuesta_2}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_3}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_4}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_5}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_6}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_7}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_8}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_9}}" type="radio"
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
                                                onclick="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" value="{{$pregunta->respuesta_10}}" type="radio"
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
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" maxlength="{{$pregunta->maximo_caracteres}}" minlength="{{$pregunta->minimo_caracteres}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder}}" ></textarea>
                                    @elseif($pregunta->tipo == "MULTIPLE")
                                    
                                    @if($pregunta->respuesta_1 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_1}}','card_{{$pregunta->posicion}}_1','p_{{$pregunta->posicion}}_1','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_1">
                                                <p id="p_{{$pregunta->posicion}}_1" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_1}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_2 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_2}}','card_{{$pregunta->posicion}}_2','p_{{$pregunta->posicion}}_2','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_2">
                                                <p id="p_{{$pregunta->posicion}}_2" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_2}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_3 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_3}}','card_{{$pregunta->posicion}}_3','p_{{$pregunta->posicion}}_3','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_3">
                                                <p id="p_{{$pregunta->posicion}}_3" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">C</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_3}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_4 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_4}}','card_{{$pregunta->posicion}}_4','p_{{$pregunta->posicion}}_4','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_4">
                                                <p id="p_{{$pregunta->posicion}}_4" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">D</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_4}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_5 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_5}}','card_{{$pregunta->posicion}}_5','p_{{$pregunta->posicion}}_5','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_5">
                                                <p id="p_{{$pregunta->posicion}}_5" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">E</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_5}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_6 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_6}}','card_{{$pregunta->posicion}}_6','p_{{$pregunta->posicion}}_6','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_6">
                                                <p id="p_{{$pregunta->posicion}}_6" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">F</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_6}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_7 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_7}}','card_{{$pregunta->posicion}}_7','p_{{$pregunta->posicion}}_7','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_7">
                                                <p id="p_{{$pregunta->posicion}}_7" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">G</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_7}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_8 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_8}}','card_{{$pregunta->posicion}}_8','p_{{$pregunta->posicion}}_8','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_8">
                                                <p id="p_{{$pregunta->posicion}}_8" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">H</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_8}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif
                                    @if($pregunta->respuesta_9 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_9}}','card_{{$pregunta->posicion}}_9','p_{{$pregunta->posicion}}_9','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_9">
                                                <p id="p_{{$pregunta->posicion}}_9" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">I</span>&nbsp;
                                                    &nbsp; {{$pregunta->respuesta_9}}
                                                </p>

                                            </div>
                                        </a>
                                    @endif    
                                    @if($pregunta->respuesta_10 <> null)
                                    <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->respuesta_10}}','card_{{$pregunta->posicion}}_10','p_{{$pregunta->posicion}}_10','{{$pregunta->id}}');">
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
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "NÚMERICO")
                                    <p class="mt-4 animate__animated {{$pregunta->animacio_entrada}}">{{$pregunta->titulo_pregunta_2}}</p>
                                    <input type="number" name="input_otra{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" >
                                    @elseif($pregunta->tipo_otra_opcion == "TEXTAREA")
                                    <p class="mt-4 animate__animated {{$pregunta->animacio_entrada}}">{{$pregunta->titulo_pregunta_2}}</p>
                                    <textarea  type="number" name="input_otra_{{$pregunta->posicion}}" autocomplete="anyrandominvalidvalue" maxlength="{{$pregunta->maximo_caracteres_otra_opcion}}" minlength="{{$pregunta->minimo_caracteres_otra_opcion}}"
                                        onkeyup="asigna_valor(this.value,'hidden_{{$pregunta->posicion}}','{{$pregunta->id}}')"
                                        class="text2 form-control animate__animated {{$pregunta->animacio_entrada}}" id="input_otra_{{$pregunta->posicion}}"
                                        placeholder="{{$pregunta->placeholder_2}}" ></textarea>
                                    @else
                                          <a href="javascript:envia_hidden('hidden_{{$pregunta->posicion}}_{{$pregunta->id}}','{{$pregunta->titulo_pregunta_2}}','card_{{$pregunta->posicion}}_OTRA','p_{{$pregunta->posicion}}_OTRA','{{$pregunta->id}}');">
                                            <div class="card Card_ mb-3 mt-4" id="card_{{$pregunta->posicion}}_OTRA">
                                                <p id="p_{{$pregunta->posicion}}_OTRA" class="textoCard  animate__animated {{$pregunta->animacio_entrada}}">
                                                    <span class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; {{$pregunta->titulo_pregunta_2}}
                                                </p>

                                            </div>
                                        </a>
                                  
                                    @endif
                                    @endif 
                                    
                                  


                                    <input type="hidden" id="hidden_{{$pregunta->posicion}}_{{$pregunta->id}}" name="hidden_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="concatena_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->titulo_heredado_respuesta}}" name="concatena_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="titulo_inicial_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->titulo_pregunta}}" name="titulo_inicial_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="pos_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->posicion_titulo_heredado}}" name="pos_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="tit_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->titulo_despues}}" name="tit_concatena_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="obligatorio{{$pregunta->posicion}}_{{$pregunta->id}}" value="{{$pregunta->obligatorio}}" name="obligatorio{{$pregunta->posicion}}_{{$pregunta->id}}">
                                    <input type="hidden" id="visible_{{$pregunta->posicion}}_{{$pregunta->id}}" value="0" name="visible_{{$pregunta->posicion}}_{{$pregunta->id}}">
                                </div>                               
                            </div>
                        </div>
                        @endif
                    

                        @endforeach
                        <!-- Slide 1 -->
                        
                      
                        <div class="carousel-item"  id='{{$total}}_0'  value="0"
                            style="background-image: url(/PORTADAS/{{$pregunta->imagen_fondo}});">
                            <div class="carousel-container">
                                <div id="carousel-content_{{$total}}_0" class="carousel-content">
                             
                                <p class="mt-4 animate__animated {{$pregunta->animacio_entrada}}">Terminar cuestionario</p>
                                   
                                                         
                                     <button type="button" onclick="enviar_form();" id="submit_3" class="mt-4 btn btn-primary btn-lg">ENVIAR</button>                                                           
                                 
                                 
                                     <input type="hidden" id="visible_{{$total}}_0" value="1" name="visible_{{$total}}_0">
                               
                                </div>
                            </div>
                        </div>


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

    <div style='display:none;' id="div_cargando"class="cargando animate__animated animate__fadeInLeft" width="120" height="120">					
						<div class="loader"></div>
                        <h6>Cargando</h6>
					</div>

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
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <!-- Template Main JS File -->
        <script src="/assets/js/main.js"></script>
        <script>

        function enviar_form(){
            document.getElementById('div_cargando').style.display = 'block';
            $('#form').submit();
        }
        window.onload = function() {
            setTimeout(carousel_valid, 0);
        };

        function carousel_valid() {
            total = parseInt(document.getElementById('total').value);
           // number = parseInt($(".carousel-item.active").attr('id'));
            number = $(".carousel-item.active").attr('id');
            number = number.split('_');
            number=parseInt(number[0]);
         
            console.log(number);
            //value = document.getElementById('hidden_' + number).value;
            //console.log(value);


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
            //$("#heroCarousel").carousel("next");          
            number = $(".carousel-item.active").attr('id');
            number = number.split('_');
            id=number[1];
            number=number[0];            
            console.log('id'+id);
            //sig=parseInt(number)+1;
            sig=parseInt(number);
            //console.log('sig:'+sig);
            total = document.getElementById('total').value;       
            
           
            
            //checamos si es cammpo obligatorio
            value = document.getElementById('hidden_' + number+"_"+id).value;
            alerta = $(".mt-4.alert.alert-danger.animate__animated.animate__fadeInLeft");
            obligatorio = document.getElementById('obligatorio' + number+"_"+id).value;
            if (alerta) {
                alerta.remove();

            }
            if(obligatorio == "SI"){
                if (value != null && value != "") {

                 $("#heroCarousel").carousel("next");
                 setTimeout(carousel_valid, 500);
                 setTimeout(valida_avanze, 600);
                 setTimeout(titulo_heredado, 700);
                 
             

                } else {
                 card = document.getElementById('carousel-content_' + number+"_"+id);
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
                setTimeout(valida_avanze, 800);
                 setTimeout(titulo_heredado, 1000);
                 
            }
         
         

        }

        function valida_avanze(){                           
                number = $(".carousel-item.active").attr('id');
                 number = number.split('_');
                 id=number[1];
                 number=parseInt(number[0]);   
                visible = document.getElementById('visible_' + number+"_"+id).value;
                total = parseInt(document.getElementById('total').value);     
                console.log('visible_'+visible+" number:"+number+" total:"+total+" ID:"+id);  
                document.getElementById('div_cargando').style.display = 'block';
        


                if(visible == 0 && number < total ){
                    console.log('no encontro .pasa siguiente');
                    $("#heroCarousel").carousel("next");
                    setTimeout(carousel_valid, 450);
                    setTimeout(valida_avanze, 600);
                    setTimeout(titulo_heredado, 700);
                   // document.getElementById('div_concatenar').style.display = 'block';
                }else{
                    console.log('termino de girar');
                    document.getElementById('div_cargando').style.display = 'none';
                }
             
            
        }

        function titulo_heredado(){
            number = $(".carousel-item.active").attr('id');
            number = number.split('_');
            id=number[1];
            number=number[0];            
            console.log('id'+id);
            //sig=parseInt(number)+1;
            sig=parseInt(number);
            console.log('sig:'+sig);
            total = document.getElementById('total').value;             
            
            //buscamos en el siguiente carousel si teiene titulo heredado
            id_heredado=document.getElementById('concatena_'+sig+"_"+id).value;
            if(id_heredado > 0 && sig <= total){              
               // titulo_final=document.getElementById('h2_'+sig).innerHTML="";            
                valor_heredado=document.getElementById('hidden_'+id_heredado).value;    
                                  
                posicion=document.getElementById('pos_concatena_'+sig+"_"+id).value;
              
                titulo_inicial=document.getElementById('titulo_inicial_'+sig+"_"+id).value;                    
           
 
                if(posicion=="INICIO"){
                  titulo_final=valor_heredado+" "+titulo_inicial;
                }else if(posicion=="DESPUES"){
                    titulo_final=titulo_inicial+" "+valor_heredado;
                }else{
                    //en medio
                    titulo_despues=document.getElementById('tit_concatena_'+sig+"_"+id).value;   
                    titulo_final=titulo_inicial+" "+valor_heredado+" "+titulo_despues;                  
                } 
                titulo_final=document.getElementById('h2_'+sig+"_"+id).innerHTML=titulo_final;
                //alert(titulo_final);               
            }
             
        }

        function retrocede() {
            $("#heroCarousel").carousel("prev");
            setTimeout(carousel_valid, 500);
            setTimeout(valida_retrocede, 600);
        }

        function valida_retrocede(){                           
                number = $(".carousel-item.active").attr('id');
                 number = number.split('_');
                 id=number[1];
                 number=parseInt(number[0]);   
                visible = document.getElementById('visible_' + number+"_"+id).value;
                total = parseInt(document.getElementById('total').value);     
                console.log('visible_'+visible+" number:"+number+" total:"+total);  
                document.getElementById('div_cargando').style.display = 'block';
        


                if(visible == 0 && number < total ){
                    console.log('no encontro .pasa siguiente');
                    $("#heroCarousel").carousel("prev");
                    setTimeout(carousel_valid, 600);
                    setTimeout(valida_retrocede, 800);
                    setTimeout(titulo_heredado, 1000);
                   // document.getElementById('div_concatenar').style.display = 'block';
                }else{
                    console.log('termino de girar');
                    document.getElementById('div_cargando').style.display = 'none';
                }
             
            
        }

        function cambia_texto(value, destino, texto1, texto2) {

            document.getElementById(destino).innerHTML = texto1 + " " + value + " " + texto2;
        }

        function envia_hidden(hiden, value, card, p,id_pregunta) {
            document.getElementById(hiden).value = value;
            console.log("valor:"+document.getElementById(hiden).value );

            valida_siguiente(value, hiden,id_pregunta);

            id_card = $(".Card_select").attr('id');
            console.log(card);
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

        function asigna_valor(value, hidden,id_pregunta) {
            document.getElementById(hidden+"_"+id_pregunta).value = value;
            console.log("valor:"+document.getElementById(hidden+"_"+id_pregunta).value);
            valida_siguiente(value, hidden,id_pregunta);

           
        }

        function valida_siguiente(valor, hidden,id_pregunta){
            console.log('entro');
            formulario=document.getElementById('id_formulario').value;
            var arrayDeCadenas = hidden.split('_');
            //carousel-content_    
            console.log('value:'+valor+". hidden: "+hidden+". id_pregunta:"+id_pregunta+". id_form:"+formulario);
            
            $.ajax({
             type: "get",
             method: 'get',
             url: "/valida_respuesta/" + id_pregunta+"/"+valor+"/"+formulario,
               success: function (data) {
                data.preguntas.forEach(pregunta => {
                    console.log(pregunta);
                    document.getElementById(pregunta.posicion+'_'+pregunta.id).style.display = 'block';
                    document.getElementById('visible_' + pregunta.posicion+"_"+pregunta.id).value=1;
                });     
                //preguntas_ocultar
                data.preguntas_ocultar.forEach(pregunta => {
                    console.log("pregunta_ocultar:");
                    console.log(pregunta);
                    document.getElementById(pregunta.posicion+'_'+pregunta.id).style.display = 'none';
                    document.getElementById('visible_' + pregunta.posicion+"_"+pregunta.id).value=0;

                });            
               }
            });
            
        }
        </script>

</body>

</html>