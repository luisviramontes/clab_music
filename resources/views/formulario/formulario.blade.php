<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Shuffle Bootstrap Template - Index</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="assets/img/favicon.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="assets/css/style.css" rel="stylesheet">

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
    </style>
</head>

<body>

    <!-- ======= Hero Section ======= -->
    <section id="hero">
        <form action="/formulario" method="post" files="true" enctype="multipart/form-data"
            class="form-horizontal parsley-examples">
            {{csrf_field()}}
            <div class="hero-container" style="background-image: url(assets/img/slide/slide-1.jpg);">
                <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-interval="false">



                    <div class="carousel-inner" role="listbox">

                        <!-- Slide 1 -->
                        <div class="carousel-item active" id="1" value="1"
                            style="background-image: url(assets/img/slide/slide-1.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_1" class="carousel-content">
                                    <h2 class="animate__animated animate__fadeInDown">¡Hola!, <span>¿cuál es tu
                                            nombre?</span></h2>
                                    <input type="text" name="name" autocomplete="anyrandominvalidvalue"
                                        onkeyup="cambia_texto(this.value,'h_2','Mucho gusto ,','¿a qué se dedica tu empresa?')&cambia_texto(this.value,'h_4','','¿Cuántos trabajadores promedio tiene la empresa actualmente? No importa si están o no dados de alta en el IMSS')&asigna_valor(this.value,'hidden_1')"
                                        class="text2 form-control animate__animated animate__fadeInLeft" id="name"
                                        placeholder="Escribe aquí tu respuesta..." required>







                                    <input type="hidden" id="hidden_1" name="hidden_1">
                                </div>
                            </div>
                        </div>

                        <!-- Slide 2 -->
                        <div class="carousel-item" id="2" value="2"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_2" class="carousel-content">
                                    <h2 id="h_2" class="animate__animated animate__fadeInDown">Mucho gusto ________, ¿a
                                        qué
                                        se dedica
                                        tu empresa?</h2>
                                    <input type="text" name="pregunta_2" onkeyup="asigna_valor(this.value,'hidden_2')"
                                        class="text2 form-control animate__animated animate__fadeInLeft" id="pregunta_2"
                                        placeholder="Escribe aquí tu respuesta..." required>

                                    <input type="hidden" id="hidden_2" name="hidden_2">
                                </div>
                            </div>
                        </div>

                        <!-- Slide 3 -->
                        <div class="carousel-item" id="3" value="3"
                            style="background-image: url(assets/img/slide/slide-3.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_3" class="carousel-content">
                                    <h2 id="h_3" class="animate__animated animate__fadeInDown">Gracias, ¿actualmente
                                        están
                                        dados de alta en el SAT?</h2>
                                    <p>
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_3')" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault1">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault1">
                                                &nbsp; Sí, como persona física con actividad
                                                empresarial
                                            </label>
                                        </span>
                                    </div>
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_3')" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault2">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault2">
                                                &nbsp; Sí, como RIF
                                            </label>
                                        </span>
                                    </div>
                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_3')" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault3">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault3">
                                                &nbsp;Sí, como RESICO persona física
                                            </label>
                                        </span>
                                    </div>

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_3')" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault4">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault4">
                                                &nbsp;Sí, como RESICO persona física
                                            </label>
                                        </span>
                                    </div>

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_3')" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault5">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault5">
                                                &nbsp;Sí, como persona moral RESICO
                                            </label>
                                        </span>
                                    </div>

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input"
                                                onclick="asigna_valor(this.value,'hidden_3')" type="radio"
                                                name="flexRadioDefault" id="flexRadioDefault6">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault6">
                                                &nbsp;No
                                            </label>
                                        </span>
                                    </div>
                                    <input type="hidden" id="hidden_3" name="hidden_3">
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Slide 4 -->
                        <div class="carousel-item" id="4" value="4"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_4" class="carousel-content">
                                    <h2 id="h_4" class="animate__animated animate__fadeInDown">NOMBRE… ¿Cuántos
                                        trabajadores<br>
                                        promedio tiene la empresa actualmente? No importa si están o no dados de alta en
                                        el
                                        IMSS</h2>
                                    <input type="number" onkeyup="asigna_valor(this.value,'hidden_4')" name="pregunta_4"
                                        class="text2 form-control animate__animated animate__fadeInLeft" id="pregunta_2"
                                        placeholder="Escribe aquí tu respuesta..." required>

                                    <input type="hidden" id="hidden_4" name="hidden_4">
                                </div>
                            </div>
                        </div>

                        <!-- Slide 5 -->
                        <div class="carousel-item" id="5" value="5"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_5" class="carousel-content">
                                    <h2 id="h_5" class="animate__animated animate__fadeInDown">¿En cuál ciudad se ubica
                                        la
                                        empresa?</h2>
                                    <input type="text" onkeyup="asigna_valor(this.value,'hidden_5')" name="pregunta_5"
                                        class="text2 form-control animate__animated animate__fadeInLeft" id="pregunta_5"
                                        placeholder="Escribe aquí tu respuesta..." required>

                                    <input type="hidden" id="hidden_5" name="hidden_5">
                                </div>
                            </div>
                        </div>

                        <!-- Slide 6 -->
                        <div class="carousel-item" id="6" value="6"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_6" class="carousel-content">
                                    <h2 id="h_6" class="animate__animated animate__fadeInDown">Genial, ¿Aproximadamente
                                        cuantos CFDI emite la empresa por mes?</h2>
                                    <input type="text" onkeyup="asigna_valor(this.value,'hidden_6')" name="pregunta_6"
                                        class="text2 form-control animate__animated animate__fadeInLeft" id="pregunta_6"
                                        placeholder="Escribe aquí tu respuesta..." required>
                                    <br>

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input" type="radio" name="radio_6" id="radio_6">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault1">
                                                &nbsp;No se….
                                            </label>
                                        </span>
                                    </div>

                                    <input type="hidden" id="hidden_6" name="hidden_6">
                                </div>
                            </div>
                        </div>

                        <!-- Slide 7 -->
                        <div class="carousel-item" id="7" value="7"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_7" class="carousel-content">
                                    <h2 id="h_7" class="animate__animated animate__fadeInDown">¿Aproximadamente cuantos
                                        CFDI
                                        recibe la empresa por mes?</h2>
                                    <input type="text" onkeyup="asigna_valor(this.value,'hidden_7')" name="pregunta_7"
                                        class="text2 form-control animate__animated animate__fadeInLeft" id="pregunta_7"
                                        placeholder="Escribe aquí tu respuesta..." required>
                                    <br>

                                    <div style="text-align:left!important; margin-left:40%!important; "
                                        class=" form-check animate__animated animate__fadeInDown">
                                        <span class="badge text-bg-light">
                                            <input class="form-check-input" type="radio" name="radio_7" id="radio_7">
                                            <label style="font-size: 17.3px!important;" class="form-check-label"
                                                for="flexRadioDefault1">
                                                &nbsp;No se….
                                            </label>
                                        </span>
                                    </div>

                                    <input type="hidden" id="hidden_7" name="hidden_7">
                                </div>
                            </div>
                        </div>

                        <!-- Slide 8 -->
                        <div class="carousel-item" id="8" value="8"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_8" class="carousel-content">
                                    <h2 id="h_8" class="animate__animated animate__fadeInDown">¿Cuáles son los ingresos
                                        anuales estimados para 2022?</h2>
                                    <input type="text" onkeyup="asigna_valor(this.value,'hidden_8')" name="pregunta_8"
                                        class="text2 form-control animate__animated animate__fadeInLeft" id="pregunta_8"
                                        placeholder="Escribe aquí tu respuesta..." required>


                                    <input type="hidden" id="hidden_8" name="hidden_8">
                                </div>
                            </div>
                        </div>


                        <!-- Slide 9 -->
                        <div class="carousel-item" id="9" value="9"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_9" class="carousel-content">
                                    <h2 id="h_9" class="animate__animated animate__fadeInDown">¿Has tenido o estás
                                        teniendo
                                        alguna auditoria de parte del SAT,<br> INFONAVIT, IMSS u otra Autoridad?</h2>
                                    <div>
                                        <a href="javascript:envia_hidden('hidden_9','SI','card_1','p_1');">
                                            <div id="card_1"
                                                class="card Card_ mb-3 mt-4  animate__animated animate__fadeInLeft">
                                                <p id="p_1" class="textoCard"><span
                                                        class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; SI
                                                </p>


                                            </div>
                                        </a>


                                        <a href="javascript:envia_hidden('hidden_9','NO','card_2','p_2');">
                                            <div class="card Card_ mb-3 mt-4" id="card_2">
                                                <p id="p_2" class="textoCard  animate__animated animate__fadeInLeft">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; NO
                                                </p>

                                            </div>
                                        </a>

                                        <input type="hidden" id="hidden_9" name="hidden_9">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Slide 10 -->
                        <div class="carousel-item" id="10" value="10"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_10" class="carousel-content">
                                    <h2 id="h_10" class="animate__animated animate__fadeInDown">¿Llevas a cabo
                                        operaciones
                                        con socios/proveedores/clientes<br> en el extranjero?</h2>
                                    <div>
                                        <a href="javascript:envia_hidden('hidden_10','SI','card_10','p_10');">
                                            <div id="card_10"
                                                class="card Card_ mb-3 mt-4  animate__animated animate__fadeInLeft">
                                                <p id="p_10" class="textoCard"><span
                                                        class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; SI
                                                </p>


                                            </div>
                                        </a>


                                        <a href="javascript:envia_hidden('hidden_10','NO','card_11','p_1');">
                                            <div class="card Card_ mb-3 mt-4" id="card_11">
                                                <p id="p_11" class="textoCard  animate__animated animate__fadeInLeft">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; NO
                                                </p>

                                            </div>
                                        </a>

                                        <input type="hidden" id="hidden_10" name="hidden_10">

                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Slide 11 -->
                        <div class="carousel-item" id="11" value="11"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_11" class="carousel-content">
                                    <h2 id="h_11" class="animate__animated animate__fadeInDown">¿Tienes contador@ o
                                        departamento contable dentro de la empresa?</h2>
                                    <div>
                                        <a href="javascript:envia_hidden('hidden_11','SI','card_12','p_12');">
                                            <div id="card_12"
                                                class="card Card_ mb-3 mt-4  animate__animated animate__fadeInLeft">
                                                <p id="p_12" class="textoCard"><span
                                                        class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; SI
                                                </p>


                                            </div>
                                        </a>


                                        <a href="javascript:envia_hidden('hidden_11','NO','card_13','p_13');">
                                            <div class="card Card_ mb-3 mt-4" id="card_13">
                                                <p id="p_13" class="textoCard  animate__animated animate__fadeInLeft">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; NO
                                                </p>

                                            </div>
                                        </a>

                                        <input type="hidden" id="hidden_11" name="hidden_11">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Slide 12 -->
                        <div class="carousel-item" id="12" value="12"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_12" class="carousel-content">
                                    <h2 id="h_11" class="animate__animated animate__fadeInDown">Actualmente estás
                                        buscando
                                        servicios contables….</h2>
                                    <div>


                                        <a
                                            href="javascript:envia_hidden('hidden_12','Porque no estoy agusto con mi actual contador@','card_16','p_16');">
                                            <div class="card Card_ mb-3 mt-4  animate__animated animate__fadeInLeft"
                                                id="card_16">
                                                <p id="p_16" class="textoCard"><span
                                                        class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; Porque no estoy agusto con mi actual contador@
                                                </p>


                                            </div>
                                        </a>


                                        <a
                                            href="javascript:envia_hidden('hidden_12','Porque quiero tener una estrategia y planeación fiscal y mi contador@ actual no me lo da','card_14','p_14');">
                                            <div class="card Card_ mb-3 mt-4" id="card_14">
                                                <p id="p_14" class="textoCard  animate__animated animate__fadeInLeft">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; Porque quiero tener una estrategia y planeación fiscal y mi
                                                    contador@ actual no me lo da
                                                </p>

                                            </div>
                                        </a>

                                        <a
                                            href="javascript:envia_hidden('hidden_12','Porque voy comenzando y estoy buscando contador@','card_15','p_15');">
                                            <div class="card Card_ mb-3 mt-4" id="card_15">
                                                <p id="p_15" class="textoCard  animate__animated animate__fadeInLeft">
                                                    <span class="badge bg-primary">C</span>&nbsp;
                                                    &nbsp; Porque voy comenzando y estoy buscando contador@
                                                </p>

                                            </div>
                                        </a>

                                        <input type="hidden" id="hidden_12" name="hidden_12">

                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Slide 13 -->
                        <div class="carousel-item" id="13" value="13"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_13" class="carousel-content">
                                    <h2 id="h_11" class="animate__animated animate__fadeInDown">Gustas que te mandemos
                                        la
                                        propuesta por correo o whatsapp</h2>
                                    <div>

                                        <a href="javascript:envia_hidden('hidden_13','Correo','card_17','p_17');">
                                            <div class="card Card_ mb-3 mt-4  animate__animated animate__fadeInLeft"
                                                id="card_17">
                                                <p id="p_17" class="textoCard"><span
                                                        class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; Correo
                                                </p>
                                            </div>
                                        </a>


                                        <a href="javascript:envia_hidden('hidden_13','Whatsapp','card_18','p_18');">
                                            <div class="card Card_ mb-3 mt-4" id="card_18">
                                                <p id="p_18" class="textoCard  animate__animated animate__fadeInLeft">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; Whatsapp
                                                </p>

                                            </div>
                                        </a>

                                        <input type="text" name="pregunta_13"
                                            class="text2 form-control animate__animated animate__fadeInLeft"
                                            id="pregunta_13" placeholder="Escribe aquí tu respuesta..." required>


                                        <input type="hidden" id="hidden_13" name="hidden_13">

                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Slide 14 -->
                        <div class="carousel-item" id="14" value="14"
                            style="background-image: url(assets/img/slide/slide-2.jpg);">
                            <div class="carousel-container">
                                <div id="carousel-content_14" class="carousel-content">
                                    <h2 id="h_14" class="animate__animated animate__fadeInDown">_________ ¿Gustas
                                        dejarnos
                                        algún otro comentario?</h2>
                                    <div>

                                        <a href="javascript:envia_hidden('hidden_13','SI','card_19','p_19');">
                                            <div class="card Card_ mb-3 mt-4  animate__animated animate__fadeInLeft"
                                                id="p_19">
                                                <p id="p_17" class="textoCard"><span
                                                        class="badge bg-primary">A</span>&nbsp;
                                                    &nbsp; SI
                                                </p>
                                            </div>
                                        </a>


                                        <a href="javascript:envia_hidden('hidden_14','NO','card_20','p_20');">
                                            <div class="card Card_ mb-3 mt-4" id="card_20">
                                                <p id="p_20" class="textoCard  animate__animated animate__fadeInLeft">
                                                    <span class="badge bg-primary">B</span>&nbsp;
                                                    &nbsp; NO
                                                </p>

                                            </div>
                                        </a>

                                        <input type="text" name="pregunta_14"
                                            class="text2 form-control animate__animated animate__fadeInLeft"
                                            id="pregunta_14" placeholder="Escribe aquí tu respuesta..." required>


                                        <input type="hidden" id="hidden_14" name="hidden_14">

                                        <button type="submit" class="mt-4 btn btn-primary btn-lg">ENVIAR</button>

                                    </div>
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

    <div id="number_page" class="whatsapp animate__animated animate__fadeInLeft"> 1</a>




        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
                class="bi bi-arrow-up-short"></i></a>

        <!-- Vendor JS Files -->
        <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
        <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="assets/vendor/waypoints/noframework.waypoints.js"></script>
        <script src="assets/vendor/php-email-form/validate.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <!-- Template Main JS File -->
        <script src="assets/js/main.js"></script>
        <script>
        window.onload = function() {
            setTimeout(carousel_valid, 0);
        };

        function carousel_valid() {
            number = $(".carousel-item.active").attr('id');
            console.log(number);
            value = document.getElementById('hidden_' + number).value;
            console.log(value);


            // console.log(number.length);

            document.getElementById('number_page').innerHTML = number;
            if (number > 1) {
                document.getElementById('anterior').style.display = 'block';
                document.getElementById('siguiente').style.display = 'block';

            } else if (number <= 1) {
                document.getElementById('anterior').style.display = 'none';
                document.getElementById('siguiente').style.display = 'block';


            }

            if (number >= 14) {
                document.getElementById('siguiente').style.display = 'none';
                document.getElementById('anterior').style.display = 'block';
            }

        }


        function avanza() {
            number = $(".carousel-item.active").attr('id');

            value = document.getElementById('hidden_' + number).value;
            alerta = $(".mt-4.alert.alert-danger.animate__animated.animate__fadeInLeft");
            console.log(alerta);
            if (alerta) {
                alerta.remove();

            }
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