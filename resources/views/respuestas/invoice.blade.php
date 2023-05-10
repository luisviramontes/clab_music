<!DOCTYPE html>
<html>

<head>
    <title>Reporte cumplimiento</title>
</head>

<style type="text/css">
body {
    font-family: 'Roboto Condensed', sans-serif;
}

.m-0 {
    margin: 0px;
}

.p-0 {
    padding: 0px;
}

.pt-5 {
    padding-top: 5px;
}

.mt-10 {
    margin-top: 10px;
}

.text-center {
    text-align: center !important;
}

.w-100 {
    width: 100%;
}

.w-95 {
    width: 95%;
}


.w-90 {
    width: 90%;
}


.w-50 {
    width: 50%;
}

.w-85 {
    width: 85%;
}

.w-75 {
    width: 75%;
}

.w-65 {
    width: 65%;
}

.w-15 {
    width: 15%;
}

.logo img {
    width: 45px;
    height: 45px;
    padding-top: 30px;
}

.logo span {
    margin-left: 8px;
    top: 19px;
    position: absolute;
    font-weight: bold;
    font-size: 25px;
}

.gray-color {
    color: #5D5D5D;
}

.text-bold {
    font-weight: bold;
}

.border {
    border: 1px solid black;
}

table tr,
th,
td {
    border: 1px solid #d2d2d2;
    border-collapse: collapse;
    padding: 7px 8px;
}

table tr th {
    background: #F4F4F4;
    font-size: 15px;
}

table tr td {
    font-size: 13px;
}

table {
    border-collapse: collapse;
}

.box-text p {
    line-height: 10px;
}

.float-left {
    float: left;
}

.total-part {
    font-size: 16px;
    line-height: 12px;
}

.total-right p {
    padding-right: 0px;
}


.saltoDePagina {
    display: block;
    page-break-before: always;
}
</style>

<body>
    <script type="text/php">
        if ( isset($pdf) ) {
        $font = $fontMetrics->getFont("helvetica", "bold");
        $pdf->page_text(72, 18, "PÁGINA: {PAGE_NUM} DE {PAGE_COUNT}", $font, 6, array(0,0,0));
    }
</script>
    <div class="head-title">
        <h1 class="text-center m-0 p-0">Reporte de cumplimiento legal-fiscal</h1>
    </div>
    <div class="add-detail mt-10">       

        <div style="clear: both;"></div>
        
    </div>
    <div class="table-section bill-tbl w-100 mt-10">
        <table class="table w-100 mt-10" style="border: hidden!important">         
            <tr>
                <td>
                    <div class="">
                        <p><b>Nombre:</b> {{$nombre}}</p>
                        <p><b>Email:</b> {{$email}}</p>
                        <p><b>Fecha:</b> {{$fecha}}</p>
                        <p><b>Total de porcentaje:</b> {{$calificacion}} %</p>                       

                    </div>
                </td>
                <td>
                    <div class="">                       
                        <p>
                           @if($calificacion <= 0)
                           <img src="../public/img/0.png"  width="350px" height="150px" alt="">
                           @elseif($calificacion > 0 && $calificacion <= 25)
                           <img src="../public/img/25.png"  width="350px" height="150px" alt="">
                           @elseif($calificacion > 25 && $calificacion <= 50)
                           <img src="../public/img/50.png"  width="350px" height="150px" alt="">
                           @elseif($calificacion > 50 && $calificacion <= 75)
                           <img src="../public/img/75.png"  width="350px" height="150px" alt="">
                           @elseif($calificacion > 75 && $calificacion <= 100)
                           <img src="../public/img/100.png"  width="350px" height="150px" alt="">
                           @endif
                           
                    
                    </p>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="table-section bill-tbl w-100 mt-10">
        <table class="table w-100 mt-10">
            <tr>
                <th colspan="3">Respuestas</th>
            </tr>
            <tr>
                <th class="w-50">Pregunta</th>
                <th class="w-50">Respuesta</th>
      
                <th class="w-50"></th>               
            </tr>
            @foreach($respuestas as $respuesta)
            <tr align="center">
                <td>{{$respuesta->titulo_pregunta}}</td>
                <td>{{$respuesta->respuesta}}</td>
                @if($respuesta->puntaje == "")
                <td></td>
                @else
                 @if($respuesta->puntaje == 1)
                 <td><img src="../public/img/bien.png"  width="50px" height="50px" alt=""></td>
                 @elseif($respuesta->puntaje == -1)               
                 <td>  <img src="../public/img/error.png"  width="50px" height="50px" alt=""></td>
                 @else
                 @endif               
                @endif
              
            </tr>
            @endforeach
        
     
        </table>
    </div>


   


    


</html>