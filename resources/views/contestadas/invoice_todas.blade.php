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

            <h2 id="fecha">{{$formulario->created_at}}</h2>
            <h2><b>Descripción: {{$formulario->descripcion}}<br>
                    URL: {{$formulario->url}}<br>           <br>
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
                          


                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <br>



</body>

</html>