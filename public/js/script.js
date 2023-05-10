//RUTA PARA LOCAL HOST
//var ruta_global = "http://localhost:8000";
//RUTA PARA EL SERVIDOR
var ruta_global = "https://www.sit-zac.org.mx";
///FUNCION PARA CONVERTIR LETRAS A MAYUSCULAS
function mayus(e) {
    var tecla = e.value;
    var tecla2 = tecla.toUpperCase();
}

function generar_iframe(url) {

    iframe = '<!DOCTYPE html> <html>' +
        '<style>'+
        'body {'+
        '   margin: 0;'+
        '}'+
        'iframe {'+
        '    display: block; '+
        '   background: #000;'+
        '    border: none;         '+
        '    height: 100vh;'+
        '    width: 100vw;'+
        '}'+
        '</style>'+
        '<body ><iframe src = "https://www.rgca.com.mx/' + url + '"' +
        'name = "RGCA"' +
        'height = "100%"' +
        'width = "100%"' +
        'title = "RGCA FORMULARIOS" </iframe>' +
        '</body></html>';

    document.getElementById('codigo').innerHTML = iframe;
    $('#modal').modal('show'); // abrir

}

function copy_html(){
    elimina = $('.span_copy');
 
    if (elimina) {
        elimina.remove();
    }

    texto=document.getElementById('codigo');
    texto.select();
    document.execCommand('copy');
    
    modal = document.getElementById('form-modal');

    span = document.createElement("span");
    span.setAttribute('class', 'span_copy text-info callout-title animate__animated animate__backInLeft');
    span.innerHTML = 'Texto copiado';
    modal.appendChild(span);
}



function descargar_html() {
    nombre=document.getElementById('nombre').value;
    filename="formulario_"+nombre+'.html';
    text=document.getElementById('codigo').innerHTML;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }


function prueba_animacion(value) {
    ejemplo = $('.callout-title');
    titulo = document.getElementById('titulo_pregunta').value;
    console.log(titulo);
    console.log(value);
    if (ejemplo) {
        ejemplo.remove();
    }
    ejemplo = document.getElementById('ejemplo_animacion');

    div = document.createElement("h1");
    div.setAttribute('class', 'callout-title animate__animated ' + value);
    div.innerHTML = titulo;

    ejemplo.appendChild(div);
}

function agregar_respuestas(value) {
    console.log(value);

    for (index = 1; index <= value; index++) {

        respuestas = document.getElementById('form_respuestas');

        div = document.createElement("div");
        div.setAttribute('class', 'form-group');
        div.setAttribute('id', 'div_resp' + index);
        respuestas.appendChild(div);

        div = document.getElementById('div_resp' + index);
        label = document.createElement("label");
        label.innerHTML = "Respuesta " + index;
        div.appendChild(label);

        input = document.createElement("input");
        input.setAttribute('required', true);
        input.setAttribute('name', 'respuesta_' + index);
        input.setAttribute('id', 'respuesta_' + index);
        input.setAttribute('parsley-trigger', 'change');
        input.setAttribute('placeholder', 'Ingresa la opción');
        input.setAttribute('class', 'form-control');
        div.appendChild(input);

    }


}

function concat(value) {

    if (value == "SI") {
        document.getElementById('div_concatenar').style.display = 'block';
        document.getElementById('heredado').required = true;
        document.getElementById('posicion_h').required = true;
    } else {
        document.getElementById('div_concatenar').style.display = 'none';
        document.getElementById('heredado').required = false;
        document.getElementById('posicion_h').required = false;
    }

}

function maximo_texto(value) {

    if (value == "TEXTO" || value == "NÚMERICO" || value == "TEXTAREA") {
        document.getElementById('div_maximo').style.display = 'block';
        document.getElementById('maximo').required = true;
        document.getElementById('minimo').required = true;

        document.getElementById('div_respuestas').style.display = 'none';
        document.getElementById('total_respuestas').required = false;


    } else {
        document.getElementById('div_maximo').style.display = 'none';
        document.getElementById('maximo').required = false;
        document.getElementById('minimo').required = false;

        document.getElementById('div_respuestas').style.display = 'block';
        document.getElementById('total_respuestas').required = true;
    }

}

function anexar_opcion(value) {

    if (value == "SI") {
        document.getElementById('div_otra_opcion').style.display = 'block';
        document.getElementById('tipo_2').required = true;
        document.getElementById('maximo_2').required = true;
        document.getElementById('minimo_2').required = true;
        document.getElementById('titulo_pregunta_2').required = true;
    } else {
        document.getElementById('div_otra_opcion').style.display = 'none';
        document.getElementById('tipo_2').required = false;
        document.getElementById('maximo_2').required = false;
        document.getElementById('minimo_2').required = false;
        document.getElementById('titulo_pregunta_2').required = false;
    }

}

function titulo_des(value) {
    if (value == "MEDIO") {
        document.getElementById('div_despues').style.display = 'block';
        document.getElementById('titulo_despues').required = true;

    } else {
        document.getElementById('div_despues').style.display = 'none';
        document.getElementById('titulo_despues').required = false;

    }


}

function depend(value){
    if (value == "SI") {
        document.getElementById('div_depend').style.display = 'block';
        document.getElementById('depend_orig').required = true;
        document.getElementById('resp_dep').required = true;
    } else {
        document.getElementById('div_depend').style.display = 'none';
        document.getElementById('depend_orig').required = false;
        document.getElementById('resp_dep').required = false;
    }

}

function cambiar_pregunta(value){
    id_form=document.getElementById('id_formulario').value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerPreguntas/"+id_form+"/"+value,
        success: function (data) {
            console.log(data);
          
                $("#resp_dep").empty();
                var x = $('#resp_dep');
                if(data.pregunta.respuesta_1 != null){
                    option = new Option(data.pregunta.respuesta_1, data.pregunta.respuesta_1, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_2 != null){
                    option = new Option(data.pregunta.respuesta_2, data.pregunta.respuesta_2, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_3 != null){
                    option = new Option(data.pregunta.respuesta_3, data.pregunta.respuesta_3, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_4 != null){
                    option = new Option(data.pregunta.respuesta_4, data.pregunta.respuesta_4, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_5 != null){
                    option = new Option(data.pregunta.respuesta_5, data.pregunta.respuesta_5, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_6 != null){
                    option = new Option(data.pregunta.respuesta_6, data.pregunta.respuesta_6, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_7 != null){
                    option = new Option(data.pregunta.respuesta_7, data.pregunta.respuesta_7, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_7 != null){
                    option = new Option(data.pregunta.respuesta_7, data.pregunta.respuesta_7, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_8 != null){
                    option = new Option(data.pregunta.respuesta_8, data.pregunta.respuesta_8, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_9 != null){
                    option = new Option(data.pregunta.respuesta_9, data.pregunta.respuesta_9, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                if(data.pregunta.respuesta_10 != null){
                    option = new Option(data.pregunta.respuesta_10, data.pregunta.respuesta_10, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            respuesta: data
                        }
                    });
                }
                
        }
    });

}
//FUNCION PARA PERMITIR SOLO NUMEROS
function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key);
    letras = " 1,2,3,4,5,6,7,8,9,0,.";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}


//FUNCION PARA SOLO PERMITIR LETRAS
function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz.";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

//FUNCION PARA MOSTRAR Y OCULTAR CAMPOS EN ACTORES SEGUN SI ES FISICA O MORAL
function mostrar_datos(value) {
    if (value == "FISICA") {
        document.getElementById('display_fisica').style.display = 'block';
        document.getElementById('display_moral').style.display = 'none';
        document.getElementById('display_autoridad').style.display = 'none';
        document.getElementById('display_sub').style.display = 'none';
        document.getElementById('nombre').required = true;
        document.getElementById('apellidoPaterno').required = true;
        document.getElementById('sexo').required = true;
        document.getElementById('razonSocial').required = false;
        document.getElementById('nombre_aut').required = false;
        document.getElementById('autoridad').required = false;
    } else if (value == "MORAL") {
        document.getElementById('display_moral').style.display = 'block';
        document.getElementById('display_sub').style.display = 'none';
        document.getElementById('display_autoridad').style.display = 'none';
        document.getElementById('display_fisica').style.display = 'none';
        document.getElementById('nombre').required = false;
        document.getElementById('apellidoPaterno').required = false;
        document.getElementById('sexo').required = false;
        document.getElementById('razonSocial').required = true;
        document.getElementById('nombre_aut').required = false;
        document.getElementById('autoridad').required = false;


    } else if (value == "AUTORIDAD") {
        document.getElementById('display_autoridad').style.display = 'block';
        document.getElementById('display_moral').style.display = 'none';
        document.getElementById('display_fisica').style.display = 'none';
        document.getElementById('display_sub').style.display = 'none';
        document.getElementById('nombre').required = false;
        document.getElementById('apellidoPaterno').required = false;
        document.getElementById('sexo').required = false;
        document.getElementById('razonSocial').required = false;
        document.getElementById('nombre_aut').required = true;
        document.getElementById('autoridad').required = false;

    } else if (value == "SUB") {
        document.getElementById('display_sub').style.display = 'block';
        document.getElementById('display_moral').style.display = 'none';
        document.getElementById('display_fisica').style.display = 'none';

        document.getElementById('display_autoridad').style.display = 'none';
        document.getElementById('nombre').required = false;
        document.getElementById('apellidoPaterno').required = false;
        document.getElementById('sexo').required = false;
        document.getElementById('razonSocial').required = false;
        document.getElementById('nombre_aut').required = false;
        document.getElementById('autoridad').required = true;

    } else if (value == "SI") {
        document.getElementById('display_moral').style.display = 'none';
        document.getElementById('display_autoridad').style.display = 'none';
        document.getElementById('display_abogado').style.display = 'block';
        document.getElementById('nombre').required = false;
        document.getElementById('apellidoPaterno').required = false;
        document.getElementById('sexo').required = false;
        document.getElementById('razonSocial').required = false;
        document.getElementById('nombre_aut').required = false;
        document.getElementById('autoridad').required = false;
        document.getElementById('cedulaAbogado').required = false;
        document.getElementById('file').required = false;
    } else if (value == "NO") {
        document.getElementById('display_moral').style.display = 'none';
        document.getElementById('display_autoridad').style.display = 'none';
        document.getElementById('display_abogado').style.display = 'none';
        document.getElementById('nombre').required = false;
        document.getElementById('apellidoPaterno').required = false;
        document.getElementById('sexo').required = false;
        document.getElementById('razonSocial').required = false;
        document.getElementById('nombre_aut').required = false;
        document.getElementById('autoridad').required = false;
        document.getElementById('cedulaAbogado').required = false;
        document.getElementById('file').required = false;

    }
}

function mostrar_datos_modal(value) {
    if (value == "FISICA") {
        document.getElementById('display_fisicaTercera').style.display = 'block';
        document.getElementById('display_moralTercera').style.display = 'none';
        document.getElementById('nombreTercera').required = true;
        document.getElementById('apellidoPaternoTercera').required = true;
        document.getElementById('razonSocialTercera').required = false;
    } else if (value == "MORAL") {
        document.getElementById('display_fisicaTercera').style.display = 'none';
        document.getElementById('display_moralTercera').style.display = 'block';
        document.getElementById('nombreTercera').required = false;
        document.getElementById('apellidoPaternoTercera').required = false;
        document.getElementById('razonSocialTercera').required = true;
    } else {

    }
}

function mostrar_datos_inicio(value) {
    if (value == "NULIDAD") {
        document.getElementById('display_generalidad').style.display = 'none';
        document.getElementById('display_tipoAmparo').style.display = 'none';
        document.getElementById('display_falta_pre').style.display = 'none';
        document.getElementById('display_particulares_vinculados').style.display = 'none';
        document.getElementById('tipoAmparo').required = false;
        document.getElementById('display_nuevo').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';
        document.getElementById('display_obs').style.display = 'block';
        document.getElementById('display_amparo').style.display = 'none';
        document.getElementById('suspension_div').style.display = 'block';
        document.getElementById('display_rag').style.display = 'none';
        document.getElementById('hojas_traslado').disabled = false;
        document.getElementById('actor').required = true;
        document.getElementById('demandado').required = true;
        document.getElementById('expediente').required = false;
        document.getElementById('presunto_resp').required = false;
        document.getElementById('autoridad_inv').required = false;
        document.getElementById('autoridad_sust').required = false;
        document.getElementById('tipo_falta').required = false;
        document.getElementById('id_juicio').required = true;
        document.getElementById('tipo_acto').required = true;
        document.getElementById('folio_gene').required = false;
        document.getElementById('observaciones_genera').required = false;
        document.getElementById('fecha_gene').required = false;
        document.getElementById('tipo_recepcion_gene').required = false;
        document.getElementById('suspension').required = true;
        document.getElementById('medida_cautelar_div').style.display = 'none';
        document.getElementById('tipo_promocion').required = true;
        document.getElementById('tipo_recepcion').required = true;
        document.getElementById('hojas_escrito').required = true;
        document.getElementById('escaneo_escrito').required = true;
        document.getElementById('display_recurso').style.display = 'none';
        document.getElementById('display_falta_pre').style.display = 'none';
        document.getElementById('display_tipoRecurso').style.display = 'none';
        document.getElementById('display_falta_no_grave').style.display = 'none';
        $('.select2-multiple').select2({
        })

    } else if (value == "RAG") {
        document.getElementById('display_falta_pre').style.display = 'block';
        document.getElementById('display_generalidad').style.display = 'none';
        document.getElementById('display_tipoAmparo').style.display = 'none';
        document.getElementById('display_nuevo').style.display = 'none';
        document.getElementById('display_archivos').style.display = 'block';
        document.getElementById('display_amparo').style.display = 'none';
        document.getElementById('display_rag').style.display = 'block';
        document.getElementById('display_obs').style.display = 'block';
        document.getElementById('display_falta_no_grave').style.display = 'block';
        document.getElementById('display_particulares_vinculados').style.display = 'block';

        document.getElementById('hojas_traslado').disabled = false;
        document.getElementById('actor').required = false;
        document.getElementById('demandado').required = false;
        document.getElementById('expediente').required = false;
        document.getElementById('presunto_resp').required = true;
        document.getElementById('autoridad_inv').required = true;
        document.getElementById('autoridad_sust').required = true;
        document.getElementById('tipo_falta').required = true;
        document.getElementById('id_juicio').required = true;
        document.getElementById('tipo_acto').required = false;
        document.getElementById('tipoAmparo').required = false;
        document.getElementById('folio_gene').required = false;
        document.getElementById('observaciones_genera').required = false;
        document.getElementById('fecha_gene').required = false;
        document.getElementById('tipo_recepcion_gene').required = false;
        document.getElementById('suspension_div').style.display = 'none';
        document.getElementById('suspension').required = false;
        document.getElementById('tipo_promocion').required = true;
        document.getElementById('tipo_recepcion').required = true;
        document.getElementById('hojas_escrito').required = true;
        document.getElementById('escaneo_escrito').required = true;
        document.getElementById('display_recurso').style.display = 'none';
        document.getElementById('display_falta_pre').style.display = 'block';
        document.getElementById('display_tipoRecurso').style.display = 'none';
        document.getElementById('medida_cautelar_div').style.display = 'block';
        $('.select2-multiple').select2({
        })
        $("#id_juicio option[value=4]").attr("selected", true);
        $('#id_juicio').select2({
        })



    } else if (value == "GENERALIDAD") {
        document.getElementById('display_generalidad').style.display = 'block';
        document.getElementById('display_tipoAmparo').style.display = 'none';
        document.getElementById('display_nuevo').style.display = 'none';
        document.getElementById('display_archivos').style.display = 'none';
        document.getElementById('display_obs').style.display = 'none';
        document.getElementById('display_amparo').style.display = 'none';
        document.getElementById('display_rag').style.display = 'none';
        document.getElementById('suspension_div').style.display = 'block';
        document.getElementById('suspension').required = true;
        document.getElementById('folio_gene').required = true;
        document.getElementById('hojas_traslado').disabled = false;
        document.getElementById('actor').required = false;
        document.getElementById('demandado').required = false;
        document.getElementById('expediente').required = false;
        document.getElementById('presunto_resp').required = false;
        document.getElementById('autoridad_inv').required = false;
        document.getElementById('autoridad_sust').required = false;
        document.getElementById('tipo_falta').required = false;
        document.getElementById('id_juicio').required = false;
        document.getElementById('tipo_acto').required = false;
        document.getElementById('tipoAmparo').required = false;
        document.getElementById('suspension').required = false;
        document.getElementById('observaciones_genera').required = true;
        document.getElementById('fecha_gene').required = true;
        document.getElementById('tipo_recepcion_gene').required = true;
        document.getElementById('tipo_promocion').required = false;
        document.getElementById('tipo_recepcion').required = false;
        document.getElementById('hojas_escrito').required = false;
        document.getElementById('escaneo_escrito').required = false;
        document.getElementById('display_recurso').style.display = 'none';
        document.getElementById('display_falta_pre').style.display = 'none';
        document.getElementById('display_tipoRecurso').style.display = 'none';
        document.getElementById('etapa').style.display = 'none';
        document.getElementById('display_falta_no_grave').style.display = 'none';
        document.getElementById('etapa').required = false;
        document.getElementById('medida_cautelar_div').style.display = 'none';
        document.getElementById('display_particulares_vinculados').style.display = 'none';

    } else if (value != "") { //SI SON AMPARON O PROMOCIONES ENTRA AQUI
        if (value == "AMPARO") {
            document.getElementById('display_recurso').style.display = 'none';
            document.getElementById('display_tipoAmparo').style.display = 'block';
            document.getElementById('tipoAmparo').required = true;
            document.getElementById('suspension_div').style.display = 'block';
            document.getElementById('suspension').required = true;
            document.getElementById('display_amparo').style.display = 'block';
            document.getElementById('display_falta_pre').style.display = 'none';
            document.getElementById('medida_cautelar_div').style.display = 'none';
            document.getElementById('expediente').required = true;//se cambio a true
        } else if (value == "RECURSO") {
            document.getElementById('display_recurso').style.display = 'none';
            document.getElementById('tipoAmparo').required = false;
            document.getElementById('suspension_div').style.display = 'block';
            document.getElementById('suspension').required = true;
            document.getElementById('display_tipoAmparo').style.display = 'none';
            document.getElementById('display_tipoRecurso').style.display = 'block';
            document.getElementById('display_tipoRecurso').required = true;
            document.getElementById('display_amparo').style.display = 'block';
            document.getElementById('display_falta_pre').style.display = 'none';
            document.getElementById('medida_cautelar_div').style.display = 'none';
            document.getElementById('expediente').required = true;//se cambio a true
        } else if (value == "RECURSO/AMPARO") {
            document.getElementById('display_recurso').style.display = 'block';
            document.getElementById('suspension_div').style.display = 'block';
            document.getElementById('suspension').required = true;
            document.getElementById('display_amparo').style.display = 'none';
            document.getElementById('display_tipoAmparo').style.display = 'block';
            document.getElementById('tipoAmparo').required = true;
            document.getElementById('display_falta_pre').style.display = 'none';
            document.getElementById('display_tipoRecurso').style.display = 'none';
            document.getElementById('medida_cautelar_div').style.display = 'none';
        } else if (value == "RECURSO/PROMOCION") {
            document.getElementById('display_recurso').style.display = 'block';
            document.getElementById('display_amparo').style.display = 'none';
            document.getElementById('display_tipoAmparo').style.display = 'none';
            document.getElementById('tipoAmparo').required = false;
            document.getElementById('suspension_div').style.display = 'block';
            document.getElementById('suspension').required = true;
            document.getElementById('display_falta_pre').style.display = 'none';
            document.getElementById('display_tipoRecurso').style.display = 'none';
            document.getElementById('medida_cautelar_div').style.display = 'none';
        } else {
            document.getElementById('display_falta_pre').style.display = 'none';
            document.getElementById('display_tipoAmparo').style.display = 'none';
            document.getElementById('tipoAmparo').required = false;
            document.getElementById('display_amparo').style.display = 'block';
            document.getElementById('display_recurso').style.display = 'none';
            document.getElementById('display_tipoRecurso').style.display = 'none';
            document.getElementById('medida_cautelar_div').style.display = 'none';

        }
        document.getElementById('display_generalidad').style.display = 'none';
        document.getElementById('tipo_acto').required = false;
        document.getElementById('expediente').value = "";
        document.getElementById('medida_cautelar_div').style.display = 'none';
        /* document.getElementById('display_amparo').style.display = 'none'; */
        document.getElementById('display_archivos').style.display = 'block';
        document.getElementById('display_nuevo').style.display = 'none';
        document.getElementById('display_rag').style.display = 'none';
        document.getElementById('display_obs').style.display = 'none';
        document.getElementById('display_falta_no_grave').style.display = 'none';
        document.getElementById('hojas_traslado').disabled = false;
        document.getElementById('actor').required = false;
        document.getElementById('demandado').required = false;
        document.getElementById('presunto_resp').required = false;
        document.getElementById('autoridad_inv').required = false;
        document.getElementById('autoridad_sust').required = false;
        document.getElementById('tipo_falta').required = false;
        document.getElementById('id_juicio').required = false;
        document.getElementById('folio_gene').required = false;
        document.getElementById('observaciones_genera').required = false;
        document.getElementById('fecha_gene').required = false;
        document.getElementById('tipo_recepcion_gene').required = false;


        document.getElementById('tipo_promocion').required = true;
        document.getElementById('tipo_recepcion').required = true;
        document.getElementById('hojas_escrito').required = true;
        document.getElementById('escaneo_escrito').required = true;
        document.getElementById('display_particulares_vinculados').style.display = 'none';

    }

}

function mostrar_datos_inicio_cargamasiva(value) {
    if (value == "NULIDAD") {

        document.getElementById('display_nuevo').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';
        document.getElementById('display_obs').style.display = 'block';
        document.getElementById('display_rag').style.display = 'none';
        document.getElementById('actor').required = true;
        document.getElementById('demandado').required = true;
        document.getElementById('presunto_resp').required = false;
        document.getElementById('autoridad_inv').required = false;
        document.getElementById('autoridad_sust').required = false;
        document.getElementById('tipo_falta').required = false;
        document.getElementById('id_juicio').required = true;
        document.getElementById('tipo_acto').required = true;
        document.getElementById('suspension').required = true;
        document.getElementById('tipo_promocion').required = true;
        document.getElementById('tipo_recepcion').required = true;
        $('.select2-multiple').select2({
        })

    } else if (value == "RAG") {
        document.getElementById('display_nuevo').style.display = 'none';
        document.getElementById('display_archivos').style.display = 'block';
        document.getElementById('display_rag').style.display = 'block';
        document.getElementById('display_obs').style.display = 'block';
        document.getElementById('actor').required = false;
        document.getElementById('demandado').required = false;
        document.getElementById('presunto_resp').required = true;
        document.getElementById('autoridad_inv').required = true;
        document.getElementById('autoridad_sust').required = true;
        document.getElementById('tipo_falta').required = true;
        document.getElementById('id_juicio').required = true;
        document.getElementById('tipo_acto').required = false;
        document.getElementById('suspension').required = true;
        document.getElementById('tipo_promocion').required = true;
        document.getElementById('tipo_recepcion').required = true;
        $('.select2-multiple').select2({
        })

    }

}

function mostrar_datos_inicio_edit(value) {
    if (value == "NULIDAD" || value == "GENERALIDAD") {
        document.getElementById('display_nuevo').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';
        document.getElementById('display_obs').style.display = 'block';

        document.getElementById('display_rag').style.display = 'none';
        document.getElementById('hojas_traslado').disabled = false;
        document.getElementById('actor_aux').required = true;
        document.getElementById('demandados_aux').required = true;
        document.getElementById('presunto_resp_aux').required = false;
        document.getElementById('autoridad_inv_aux').required = false;
        document.getElementById('autoridad_sust_aux').required = false;
        document.getElementById('tipo_falta').required = false;
        document.getElementById('id_juicio').required = true;
        $('.select2-multiple').select2({
        })

    } else if (value == "RAG") {
        document.getElementById('display_nuevo').style.display = 'none';
        document.getElementById('display_archivos').style.display = 'block';
        document.getElementById('display_rag').style.display = 'block';
        document.getElementById('display_obs').style.display = 'block';
        document.getElementById('hojas_traslado').disabled = false;
        document.getElementById('actor_aux').required = false;
        document.getElementById('demandados_aux').required = false;
        document.getElementById('presunto_resp_aux').required = true;
        document.getElementById('autoridad_inv_aux').required = true;
        document.getElementById('autoridad_sust_aux').required = true;
        document.getElementById('tipo_falta').required = true;
        document.getElementById('id_juicio').required = true;
        $('.select2-multiple').select2({
        })

    }

}

function changeescaneo(value) {
    if (value == "NULIDAD") {
        document.getElementById('escanesc').innerHTML = "Escrito de demanda";

    } else if (value == "RAG") {
        document.getElementById('escanesc').innerHTML = "EPRA";
    } else if (value == "AMPARO" || value == "PROMOCION") {
        document.getElementById('escanesc').innerHTML = "Escaneo escrito";
    }
}

function changehojas(value) {
    if (value == "RAG") {
        document.getElementById('hojas_ecrito').innerHTML = "Fojas del expediente recibido*";

    }
}


//FUNCION PARA INACTIVAR REGISTROS// AUX ES LA RUTA QUE RECIBE
function inactivar(id, aux) {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Se inactivará el registro, y ya no se podra utilizar en registros nuevos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, inactivar!'
    }).then((result) => {
        if (result.isConfirmed) {
            // var route = ruta_global + "/" + aux + "/" + id + "";
            var token = $("#token").val();
            $.ajax({
                url: "/" + aux + "/" + id + "",
                headers: { 'X-CSRF-TOKEN': token },
                type: 'post',
                method: 'DELETE',
                dataType: 'json',
                success: function () {
                    Swal.fire(
                        'Inactivado!',
                        'El registro se ha inactivado.',
                        'success'
                    )
                }
            });

            setTimeout(function () { location.reload() }, 1000);

            //location.reload();
        }
    })
}

//FUNCION PARA BORRAR REGISTROS// AUX ES LA RUTA QUE RECIBE
function borrar(id, aux) {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Se borrara el registro, y ya no se podra recuperar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            // var route = ruta_global + "/" + aux + "/" + id + "";
            var token = $("#token").val();
            $.ajax({
                url: "/" + aux + "/" + id + "",
                type: 'get',
                success: function () {
                    Swal.fire(
                        'Eliminado!',
                        'El registro se ha eliminado correctamente.',
                        'success'
                    )
                }
            });
            setTimeout(function () { location.reload() }, 1000);

            //location.reload();
        }
    })
}


function modal_oficialia(tipo) {

    formulario = document.getElementById('wizard-validation-form');
    if (tipo == "actor") {
        formulario.setAttribute('action', "javascript:modal_actor('actor','actor','directions','actores_arreglo');");
    } else if (tipo == "tercero") {
        formulario.setAttribute('action', "javascript:modal_actor('TERCERO INTERESADO','tercero','directions_tercero','terceros_arreglo');");
    } else if (tipo == "particular") {
        formulario.setAttribute('action', "javascript:modal_actor('Particular','particular','particulares_dir','particulares_arreglo');");
    } else if (tipo == "denunciante") {
        formulario.setAttribute('action', "javascript:modal_actor('Denunciante','denunciante','denunciantes_dir','denunciantes_arreglo');");
    } else if (tipo == "presunto") {
        formulario.setAttribute('action', "javascript:modal_actor('Presunto responsable','presunto_resp','presunto_dirs','presunto_arreglo');");
    } else if (tipo == "demandado") {
        formulario.setAttribute('action', "javascript:modal_actor('demandado','demandado','demandados_table','demandados_arreglo');");
    }
    $('#modal').modal('show'); // abrir
    $('#autoridad').select2({});
}
//MODAL PARA GUARDAR LOS DATOS DE UN ACTOR NUEVO EN LA VISTA DE NUEVOS INGRESOS
function modal_actor(tipo, input, table_aux, array_auxiliar) {
    table = table_aux;
    array_aux = array_auxiliar; //nombre del array
    ruta = "/actoresCrear";
    dataString = $('#wizard-validation-form').serialize(); // carga todos 

    $.ajax({
        type: "POST",
        method: 'post',
        url: ruta,
        data: dataString,
        success: function (data) {

            if (data.valida == 1) {
                Swal.fire(
                    'Atención',
                    "La persona o autoridad que intenta guardar ya se encuentra registrado en el sistema SIT-ZAC, favor de validar los datos",
                    'warning'
                )
                return false;
            } else {

                var x = $('#' + input + '');
                /* var x = $('#' + 'directions' + ''); */
                if (data.persona.tipo == "FISICA") {
                    option = new Option(data.persona.nombre + " " + data.persona.apellido_paterno + " " + data.persona.apellido_materno, data.persona.id, true, true);
                } else if (data.persona.tipo == "MORAL") {
                    option = new Option(data.persona.razon_social, data.persona.id, true, true);
                } else {
                    option = new Option(data.persona.nombre, data.persona.id, true, true);
                }
                if (tipo == "actor") {
                    // $("#actor").val(data.id);
                    $("#modal .close").click();
                    $('.modal.in').modal('hide');
                } else {
                    //$("#tercero").val(data.id);
                    $("#modal .close").click();
                    $('.modal.in').modal('hide');
                }
                //Agregar a la tabla
                //Agregar a la tabla 

                x.append(option);
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data
                    }
                });

                x = document.getElementById(input);
                y = x.options[x.selectedIndex].text;
                z = x.options[x.selectedIndex].value;
                var tabla = document.getElementById(table);
                var row = tabla.insertRow(1);
                row.style.backgroundColor = "white";
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                cell1.innerHTML = '<input type="button" id="eliminar' + z + '" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaOficialia(table,this.parentNode.parentNode.rowIndex); recorre_tabla_directions(table,1,array_aux);">';
                cell2.innerHTML = '<select class="form-control" style="width: 100%" name="' + array_aux + z + '" id="' + array_aux + z + '"data-toggle="select2"><option value="' + z + '"selected>' + y + '</option></select>';
                cell3.innerHTML = '<select data-placeholder="Ingrese representante(s) ..." id="representante' + array_aux + z + '" name="representante' + array_aux + z + '[]" style="width: 100%; text-transform:uppercase;" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase();"  class="form-control" multiple="multiple"></select>';
                cell4.innerHTML = '<select data-placeholder="Ingrese delegado(s) ..." id="delegado' + array_aux + z + '" name="delegado' + array_aux + z + '[]" style="width:100%" class="form-control" multiple="multiple"></select>';
                cell5.innerHTML = '<select class="form-control select2-multiple" data-placeholder="Seleccione una opción ..." multiple="multiple" style="width: 100%" name="abogados' + array_aux + z + '[]" id="abogados' + array_aux + z + '"data-toggle="select2">';
                cell6.innerHTML = '<select id="autorizado' + array_aux + z + '" name="autorizado' + array_aux + z + '[]" style="width: 100%"  class="form-control" multiple="multiple"></select>';
                if (data.direccion.calle != null) {
                    cell7.innerHTML = data.direccion.calle + " " + data.direccion.numero + " " + data.direccion.colonia + " " + data.direccion.municipio + " " + data.direccion.estado_region;
                } else {
                    cell7.innerHTML = 'Sin domicilio registrado';

                }

                $('#representante' + array_aux + z).select2({ tags: true })
                $('#delegado' + array_aux + z).select2({ tags: true })
                //AGREGAMOS LOS ABOGADOS AL INPUT DE LOS ABOGADOS
                select_aux1 = document.getElementById('abogados' + array_aux + z);
                data.abogados.forEach(abogado => {
                    option = document.createElement("option");
                    option.text = abogado.nombre + " " + abogado.apellido_paterno + " " + abogado.apellido_materno + ". N° Cédula: " + abogado.num_cedula;
                    option.value = abogado.id;
                    select_aux1.add(option, select_aux1[0]);
                });//END FOR EACH
                $('#abogados' + array_aux + z).select2({})
                $('#autorizado' + array_aux + z).select2({ tags: true })
                recorre_tabla_representantes(table, 1, array_aux);

                if (tipo == "Presunto responsable") {
                    var1 = "falta_pre";
                    var2 = "faltas_presuntos_arreglo";
                    var tabla = document.getElementById('falta_pre');
                    var row = tabla.insertRow(1);
                    row.style.backgroundColor = "white";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = '<select class="form-control" style="width: 100%" name="presunto_' + z + '" id="presunto_' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                    cell2.innerHTML = '<select onchange="recorre_tabla_general(var1,0,0,var2)"; class="form-control" style="width: 100%" name="presunto_tipo' + z + '" id="presunto_tipo' + z + '"  data-toggle="select2"></select>';
                    traer_tipos_faltas('presunto_tipo' + z);
                    recorre_tabla_general('falta_pre', '0', '0', 'faltas_presuntos_arreglo');
                }


            }
        }
    });


}

//MODAL PARA GUARDAR LOS DATOS DE UN DEMANDADO NUEVO EN LA VISTA DE NUEVOS INGRESOS
function modal_demandado() {

    var dataString = $('#formulario_demandado').serialize(); // carga todos 
    $.ajax({
        type: "POST",
        method: 'post',
        url: "/demandadosCrear",
        data: dataString,
        success: function (data) {
            var x = $('#demandado');
            option = new Option(data.nombre, data.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });
            $("#modal_demandado .close").click();
            $('.modal_demandado.in').modal('hide');
            setTimeout(function () { location.reload() }, 1000);

        }
    });


}


//MODAL PARA GUARDAR LOS DATOS DE UN ABOGADO NUEVO EN LA VISTA DE NUEVOS INGRESOS
function modal_abogado() {
    var dataString = $('#formulario_abogado').serialize(); // carga todos 
    $.ajax({
        type: "POST",
        method: 'post',
        url: "/abogadosCrear",
        data: dataString,
        success: function (data) {

            var x = $('#abogado');
            option = new Option(data.nombre + " " + data.apellido_paterno + " " + data.apellido_materno, data.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });
            $("#modal_abogado .close").click();
            $('.modal_abogado.in').modal('hide');
            setTimeout(function () { location.reload() }, 1000);

        }
    });
}

//Funcion para traer los datos de un expediente
function traerExpediente(value, sr) {
    if (sr == "cr" && value != null) {
        document.getElementById('display_info').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';
    }
    // $('.select2-multiple').val(null).trigger('change');
    if (value != null) {
        //var route = ruta_global + "/traer_expediente/" + value;
        var token = $("#token").val();
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_expediente/" + value,
            data: value,
            success: function (data) {
                //FOR EACH PARA AGREGAR LOS ACTORES AL EXPEDIENTE
                data.actores.forEach(function (actor, index) {
                    var x = $('#actor_aux');
                    if (actor.tipo == "FISICA") {
                        option = new Option(actor.nombre + " " + actor.apellido_paterno + " " + actor.apellido_materno, actor.id, true, true);
                    } else if (actor.tipo == "MORAL") {
                        option = new Option(actor.razon_social, actor.id, true, true);
                    } else {
                        option = new Option(actor.nombre, actor.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: actor
                        }
                    });
                });//END FOREACH ACTORES

                //FOR EACH PARA AGREGAR LOS DEMANDADOS AL EXPEDIENTE SELECCIONADO
                data.demandados.forEach(demandado => {
                    var x = $('#demandados_aux');
                    if (demandado.tipo == "FISICA") {
                        option = new Option(demandado.nombre + " " + demandado.apellido_paterno + " " + demandado.apellido_materno, demandado.id, true, true);
                    } else if (demandado.tipo == "MORAL") {
                        option = new Option(demandado.razon_social, demandado.id, true, true);
                    } else {
                        option = new Option(demandado.nombre, demandado.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: demandado
                        }
                    });
                });//END FOREACH DEMANDADOS





                //FOR EACH PARA AGREGAR LOS Juicios AL EXPEDIENTE SELECCIONADO
                data.juicios.forEach(juicio => {
                    var x = $('#id_juicio_aux');
                    option = new Option(juicio.tipo, juicio.id, true, true);
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: juicio
                        }
                    });
                });//END FOREACH ABOGADOS 

                //FOR EACH PARA AGREGAR LOS TERCEROS AL EXPEDIENTE SELECCIONADO
                data.terceras.forEach(tercera => {
                    var x = $('#terceros_aux');
                    if (tercera.tipo == "FISICA") {
                        option = new Option(tercera.nombre + " " + tercera.apellido_paterno + " " + tercera.apellido_materno, tercera.id, true, true);
                    } else if (tercera.tipo == "MORAL") {
                        option = new Option(tercera.razon_social, tercera.id, true, true);
                    } else {
                        option = new Option(tercera.nombre, tercera.id, true, true);
                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: tercera
                        }
                    });
                });//END FOREACH TERCEROS

                //FOR EACH PARA AGREGAR AUTORIDAD INVESTIGADORA AL EXPEDIENTE SELECCIONADO
                data.autoridad_inv.forEach(autoridad_inv => {
                    var x = $('#autoridad_inv_aux');
                    if (autoridad_inv.tipo == "FISICA") {
                        option = new Option(autoridad_inv.nombre + " " + autoridad_inv.apellido_paterno + " " + autoridad_inv.apellido_materno, autoridad_inv.id, true, true);
                    } else if (autoridad_inv.tipo == "MORAL") {
                        option = new Option(autoridad_inv.razon_social, autoridad_inv.id, true, true);
                    } else {
                        option = new Option(autoridad_inv.nombre, autoridad_inv.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: autoridad_inv
                        }
                    });
                });//END FOREACH AUTORIDAD INVESTIGADORA

                //FOR EACH PARA AGREGAR AUTORIDAD SUSTANCIADORA AL EXPEDIENTE SELECCIONADO
                data.autoridad_sust.forEach(autoridad_sust => {
                    var x = $('#autoridad_sust_aux');
                    if (autoridad_sust.tipo == "FISICA") {
                        option = new Option(autoridad_sust.nombre + " " + autoridad_sust.apellido_paterno + " " + autoridad_sust.apellido_materno, autoridad_sust.id, true, true);
                    } else if (autoridad_sust.tipo == "MORAL") {
                        option = new Option(autoridad_sust.razon_social, autoridad_sust.id, true, true);
                    } else {
                        option = new Option(autoridad_sust.nombre, autoridad_sust.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: autoridad_sust
                        }
                    });
                });//END FOREACH AUTORIDAD INVESTIGADORA

                //FOR EACH PARA AGREGAR Presunto responsable AL EXPEDIENTE SELECCIONADO
                data.presunto_resp.forEach(presunto_resp => {
                    var x = $('#presunto_resp_aux');
                    if (presunto_resp.tipo == "FISICA") {
                        option = new Option(presunto_resp.nombre + " " + presunto_resp.apellido_paterno + " " + presunto_resp.apellido_materno, presunto_resp.id, true, true);
                    } else if (presunto_resp.tipo == "MORAL") {
                        option = new Option(presunto_resp.razon_social, presunto_resp.id, true, true);
                    } else {
                        option = new Option(presunto_resp.nombre, presunto_resp.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: presunto_resp
                        }
                    });
                });//END FOREACH PRESUNTO RESPONSABLE

                //FOR EACH PARA AGREGAR DENUNCIANTE AL EXPEDIENTE SELECCIONADO
                data.denunciante.forEach(denunciante => {
                    var x = $('#denunciante_aux');
                    if (denunciante.tipo == "FISICA") {
                        option = new Option(denunciante.nombre + " " + denunciante.apellido_paterno + " " + denunciante.apellido_materno, denunciante.id, true, true);
                    } else if (denunciante.tipo == "MORAL") {
                        option = new Option(denunciante.razon_social, denunciante.id, true, true);
                    } else {
                        option = new Option(denunciante.nombre, denunciante.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: denunciante
                        }
                    });
                });//END FOREACH DENUNCIANTE RESPONSABLE

                //FOR EACH PARA AGREGAR PARTICULAR AL EXPEDIENTE SELECCIONADO
                data.particular_vinc.forEach(particular_vinc => {
                    var x = $('#particular_aux');
                    if (particular_vinc.tipo == "FISICA") {
                        option = new Option(particular_vinc.nombre + " " + particular_vinc.apellido_paterno + " " + particular_vinc.apellido_materno, particular_vinc.id, true, true);
                    } else if (particular_vinc.tipo == "MORAL") {
                        option = new Option(particular_vinc.razon_social, particular_vinc.id, true, true);
                    } else {
                        option = new Option(particular_vinc.nombre, particular_vinc.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: particular_vinc
                        }
                    });
                });//END FOREACH PARTICULAR RESPONSABLE

                //FOR EACH PARA AGREGAR TRCERO LLAMADO AL EXPEDIENTE SELECCIONADO
                data.terceros_llamado.forEach(tercero_llamado => {
                    var x = $('#tercero_llamado_aux');
                    if (tercero_llamado.tipo == "FISICA") {
                        option = new Option(tercero_llamado.nombre + " " + tercero_llamado.apellido_paterno + " " + tercero_llamado.apellido_materno, tercero_llamado.id, true, true);
                    } else if (tercero_llamado.tipo == "MORAL") {
                        option = new Option(tercero_llamado.razon_social, tercero_llamado.id, true, true);
                    } else {
                        option = new Option(tercero_llamado.nombre, tercero_llamado.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: tercero_llamado
                        }
                    });
                });//END FOREACH PARTICULAR RESPONSABLE

                var x = $('#medida_cautelar');
                option = new Option(data.medida_cautelar.medida_cautelar_text, data.medida_cautelar.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.medida_cautelar
                    }
                });
                if (sr == "detalle" || sr == "cr") {
                    //FOR EACH PARA AGREGAR LOS DATOS AL EXPEDIENTE SELECCIONADOtipo_juicio
                    data.datos.forEach(dato => {
                        fecha = document.getElementById('fecha_aux');
                        option = document.createElement("option");
                        option.value = dato.id;
                        option.text = dato.fecha;
                        fecha.add(option, fecha[0]);
                        $("#fecha_aux").val(dato.id);

                        tipojuicio = document.getElementById('tipo_juicio');
                        option = document.createElement("option");
                        option.text = dato.tipo_juicio;
                        option.value = dato.id;
                        tipojuicio.add(option, tipojuicio[0]);
                        $("#tipo_juicio").val(dato.id);




                        ubicacion = document.getElementById('ubicacion');
                        option = document.createElement("option");
                        option.text = dato.ubicacion;
                        option.value = dato.id;
                        ubicacion.add(option, ubicacion[0]);
                        $("#ubicacion").val(dato.id);

                        propietario = document.getElementById('propietario');
                        option = document.createElement("option");
                        option.text = dato.name + " " + dato.apellido_p + " " + dato.apellido_m + " ";
                        option.value = dato.id;
                        propietario.add(option, propietario[0]);
                        $("#propietario").val(dato.id);


                        tipoPromocion = document.getElementById('tipo_promocion_aux');
                        option = document.createElement("option");
                        option.text = dato.tipo_promocion;
                        option.value = dato.id;
                        tipoPromocion.add(option, tipoPromocion[0]);
                        $("#tipo_promocion_aux").val(dato.id);


                        tipoRecepcion = document.getElementById('tipo_recepcion_aux');
                        option = document.createElement("option");
                        option.text = dato.tipo_recepcion;
                        option.value = dato.id;
                        tipoRecepcion.add(option, tipoRecepcion[0]);
                        $("#tipo_recepcion_aux").val(dato.id);


                        update = document.getElementById('ultima_ac');
                        option = document.createElement("option");
                        option.text = dato.updated_at;
                        option.value = dato.id;
                        update.add(option, update[0]);
                        $("#ultima_ac").val(dato.id);

                        create = document.getElementById('fecha_captura');
                        option = document.createElement("option");
                        option.text = dato.created_at;
                        option.value = dato.id;
                        create.add(option, create[0]);
                        $("#fecha_captura").val(dato.id);

                        user = document.getElementById('modificado');
                        option = document.createElement("option");
                        option.text = dato.captura;
                        option.value = dato.id;
                        user.add(option, user[0]);
                        $("#modificado").val(dato.id);

                        num_exp = document.getElementById('num_expediente');
                        option = document.createElement("option");
                        option.text = dato.num_expediente;
                        option.value = dato.id;
                        num_exp.add(option, num_exp[0]);
                        $("#num_expediente").val(dato.id);

                        tipo = document.getElementById('tipo_aux');
                        option = document.createElement("option");
                        option.text = dato.tipo;
                        option.value = dato.id;
                        tipo.add(option, tipo[0]);
                        $("#tipo_aux").val(dato.id);

                        observaciones = document.getElementById('observaciones_aux');
                        option = document.createElement("option");
                        option.text = dato.observaciones;
                        option.value = dato.id;
                        observaciones.add(option, observaciones[0]);
                        $("#observaciones_aux").val(dato.id);




                    });//END FOREACH TERCEROS


                    //SI ES RAG LE AGREGA EL TIPO DE FALTA
                    if (tipo[0].innerHTML == "RAG") {
                        /*    tipo_falta = document.getElementById('tipo_falta');
                           option = document.createElement("option");
                           option.text = data.tipo_falta['tipo_falta'];
                           option.value = data.tipo_falta['tipo_falta'];
                           tipo_falta.add(option, tipo_falta[0]);
                           $("#tipo_falta").val(data.tipo_falta['tipo_falta']);
    */
                        //FOR EACH PARA AGREGAR Presunto responsable AL EXPEDIENTE SELECCIONADO
                        //console.log(data.tipo_falta);
                        data.tipo_falta.forEach(falta => {
                            var x = $('#tipo_falta');

                            option = new Option(falta.tipo_falta + "-" + falta.tipo, falta.id, true, true);

                            x.append(option).trigger('change');
                            x.trigger({
                                type: 'select2:select',
                                params: {
                                    data: falta
                                }
                            });
                        });//END FOREACH PRESUNTO RESPONSABLE

                    } else if (tipo[0].innerHTML == "NULIDAD") {
                        tipoActo = document.getElementById('tipo_acto_aux');
                        option = document.createElement("option");
                        option.text = data.tipo_acto['tipo_acto'];
                        option.value = data.tipo_acto['tipo_acto'];
                        tipoActo.add(option, tipoActo[0]);
                        $("#tipo_acto_aux").val(data.tipo_acto['tipo_acto']);
                    }

                }


            }
        });


    } else {
        document.getElementById('display_info').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';
    }
}


//FUNCION PARA AGREGAR EL NUMERO DE ANEXOS
function anexos_hojas(value) {
    document.getElementById("anexos_div").innerHTML = "";
    if (value == "SI") {
        value = document.getElementById("hojas_anexo").value;
        if (value > 0) {
            for (index = 1; index <= 1; index++) {
                //aquí instanciamos al componente padre
                var padre = document.getElementById("anexos_div");
                //aquí agregamos el componente de tipo input
                var div = document.createElement("div");
                div.setAttribute("id", 'div' + index);
                div.classList.add('col-lg-4');


                var div2 = document.createElement("div");
                div2.setAttribute("id", 'card' + index);
                div2.classList.add('card-box');

                input = document.createElement("INPUT");
                input.setAttribute("id", 'input' + index);
                input.setAttribute("class", 'dropify');
                input.setAttribute("name", 'input' + index);
                input.setAttribute('type', 'file');
                input.setAttribute('required', 'true');
                input.setAttribute('accept', '.pdf');


                label = document.createElement("Label");
                label.setAttribute('for', 'userName');
                label.innerHTML = "Observaciónes de los anexos";

                span = document.createElement('span');
                span.setAttribute('class', 'text-danger')
                span.innerHTML = "*";


                input2 = document.createElement("input");
                input2.setAttribute("id", 'input2' + index);
                input2.setAttribute("class", 'form-control mt-2 mb-2');
                input2.setAttribute("name", 'input2' + index);
                input2.setAttribute('type', 'text');
                input2.setAttribute('maxlength', '200');
                input2.setAttribute('placeholder', 'Observaciones de los anexos');
                input2.setAttribute('onmousewheel', 'this.blur();');

                // AGREGA UN ETIQUETA H4 CON EL NUMERO DE HOJAS
                h4 = document.createElement("h4");
                h4.setAttribute("id", 'h4' + index);
                h4.innerHTML = value + " anexos escaneados";
                //AGREGA TODOS LOS DIV Y INPUT
                padre.appendChild(div);
                div.appendChild(div2);
                div2.appendChild(h4);
                div2.appendChild(label);
                div2.appendChild(input2);
                div2.appendChild(input);
                $('.dropify').dropify();

                select_aux1 = document.getElementById('select' + index);
                opciones = ['SELECCIONE UNA OPCIÓN', 'SI', 'NO']
                opciones.forEach(element => {
                    option = document.createElement("option");
                    option.text = element;
                    if (element == "SELECCIONE UNA OPCIÓN") {
                        option.value = "";
                    } else {
                        option.value = element;
                    }
                    select_aux1.add(option, select_aux1[0]);
                });//END FOR EACH
            }
        }
    }
}

function anexos_value(value) {
    document.getElementById("anexos_value").innerHTML = "";
    if (value > 0) {
        for (index = 1; index <= 1; index++) {
            //aquí instanciamos al componente padre
            var padre = document.getElementById("anexos_value");
            //aquí agregamos el componente de tipo input
            var div = document.createElement("div");
            div.setAttribute("id", 'div' + index);
            div.classList.add('col-lg-4');


            var div2 = document.createElement("div");
            div2.setAttribute("id", 'card' + index);
            div2.classList.add('card-box');

            input = document.createElement("select");
            input.setAttribute("id", 'select_anexo' + index);
            input.setAttribute("class", 'form-control');
            input.setAttribute("name", 'select_anexo' + index);
            input.setAttribute('required', 'true');
            input.setAttribute('data-toggle', 'select2');
            input.setAttribute('data-placeholder', 'Seleccione una opción ...');
            input.setAttribute('onchange', 'anexos_hojas(this.value);');




            label = document.createElement("Label");
            label.setAttribute('for', 'userName');
            label.innerHTML = "Desea escanear los anexos";

            span = document.createElement('span');
            span.setAttribute('class', 'text-danger')
            span.innerHTML = "*";




            //AGREGA TODOS LOS DIV Y INPUT
            padre.appendChild(div);
            div.appendChild(div2);
            div2.appendChild(label);
            div2.appendChild(input);

            select_aux1 = document.getElementById('select_anexo' + index);
            opciones = ['SELECCIONE UNA OPCIÓN', 'SI', 'NO']
            opciones.forEach(element => {
                option = document.createElement("option");
                option.text = element;
                if (element == "SELECCIONE UNA OPCIÓN") {
                    option.value = "";
                } else {
                    option.value = element;
                }
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    }
}

function valida_contra() {
    aux1 = document.getElementById('password').value;
    aux2 = document.getElementById('password_confirmation').value;
    if (aux1 != aux2) {
        document.getElementById("error_pass").innerHTML = "Las contraseñas no coinciden.";
        document.getElementById("error_pass").value = "1";
        document.getElementById('submit3').disabled = true;
    } else {
        document.getElementById("error_pass").innerHTML = "";
        document.getElementById("error_pass").value = "0";
        document.getElementById('submit3').disabled = false;
    }
}

function valida_email_register() {
    aux1 = document.getElementById('email').value;
    aux2 = document.getElementById('email_confirm').value;
    if (aux1 != aux2) {
        document.getElementById("error_email").innerHTML = "Los emails no coinciden.";
        document.getElementById("error_email").value = "1";
        document.getElementById('submit3').disabled = true;
    } else {
        document.getElementById("error_email").innerHTML = "";
        document.getElementById("error_email").value = "0";
        document.getElementById('submit3').disabled = false;
    }
}



function valida_contrafirma() {
    aux1 = document.getElementById('passfirma').value;
    aux2 = document.getElementById('passfirma_confirmation').value;
    if (aux1 != aux2) {
        document.getElementById("error_passfirma").innerHTML = "Las contraseñas no coinciden.";
        document.getElementById("error_passfirma").value = "1";
        document.getElementById('submit3').disabled = true;
    } else {
        document.getElementById("error_passfirma").innerHTML = "";
        document.getElementById("error_passfirma").value = "0";
        document.getElementById('submit3').disabled = false;
    }
}

function valida_email(sr) {
    var dataString = $('#wizard-validation-form').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_email",
        data: dataString,
        success: function (data) {
            if (data.user) {
                if (sr == data.user.email) {

                    document.getElementById("error_email_modal").innerHTML =
                        "El email que ingreso ya se encuentra registrado en el sistema SIJEL.";
                    document.getElementById("error_email_modal").value = "1";
                    //document.getElementById('submit').disabled = true;

                } else {

                    document.getElementById("error_email_modal").innerHTML = "";
                    document.getElementById("error_email_modal").value = "0";
                    // document.getElementById('submit').disabled = false;
                }

            } else {
                document.getElementById("error_email_modal").innerHTML = "";
                document.getElementById("error_email_modal").value = "0";
                // document.getElementById('submit').disabled = false;
            }


        }
    });

}

function valida_email_form(form, value) {
    var dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_mail_user",
        data: dataString,
        success: function (data) {
            if (data.valida.length > 0) {

                document.getElementById("error_email").innerHTML =
                    "El email que ingreso ya se encuentra registrado en el sistema.";
                document.getElementById('submit1').disabled = true;
            } else {
                document.getElementById("error_email").innerHTML = "";
                document.getElementById('submit1').disabled = false;
            }
        }
    });
}

function valida_cel_form(form, submit) {
    var dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_cel_user",
        data: dataString,
        success: function (data) {
            if (data.valida.length > 0) {
                document.getElementById("error_celular").innerHTML =
                    "El número de celular que ingreso ya se encuentra registrado en el sistema.";
                document.getElementById(submit).disabled = true;
            } else {
                document.getElementById("error_celular").innerHTML = "";
                document.getElementById(submit).disabled = false;
            }
        }
    });
}

function valida_folio_promocion(form, sub) {
    var dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_folio_promocion",
        data: dataString,
        success: function (data) {
            if (data.valida.length > 0) {
                document.getElementById("error_folio").innerHTML =
                    "El folio que ingreso ya se encuentra registrado en el sistema.";
                document.getElementById(sub).disabled = true;
            } else {
                document.getElementById("error_folio").innerHTML = "";
                document.getElementById(sub).disabled = false;
            }
        }
    });
}

function valida_nombreAutoridad(sr) {
    //var aux=false;
    var dataString = $('#formulario_demandado').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_nombreAutoridad",
        data: dataString,
        success: function (data) {
            if (data.autoridad) {
                if (sr != data.autoridad.nombre) {

                    document.getElementById("error_nombre").innerHTML =
                        "El nombre de la autoridad que ingreso ya se encuentra registrado en el sistema SIJEL.";
                    document.getElementById("error_nombre").value = "1";
                    document.getElementById('submit').disabled = true;

                } else {
                    document.getElementById("error_nombre").innerHTML = "";
                    document.getElementById("error_nombre").value = "0";
                    document.getElementById('submit').disabled = false;

                }

            } else {
                document.getElementById("error_nombre").innerHTML = "";
                document.getElementById("error_nombre").value = "0";
                document.getElementById('submit').disabled = false;

            }

        }
    });

}

//FUNCION PARA VALIDAR QUE NO EXISTAN MAS DE 1 FIRMA POR USUARIO
function validaFirma() {
    //var aux=false;
    var dataString = $('#formulario_firma').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/validaFirma",
        data: dataString,
        success: function (data) {
            if (data.usuario) {

                document.getElementById("error_usuario").innerHTML =
                    "El usuario que intenta registrar, ya tiene su firma electronica.";
                document.getElementById("error_usuario").value = "1";
                document.getElementById('submit').disabled = true;

            } else {
                document.getElementById("error_usuario").innerHTML = "";
                document.getElementById("error_usuario").value = "0";
                document.getElementById('submit').disabled = false;

            }

        }
    });

}

//FUNCION PARA VALIDAR LAS SALAS Y LOS MAGISTRADOS
function validaSalaMagistrado(cr) {
    var dataString = $('#formsalamagistrado').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/validaSala/" + cr,
        data: dataString,
        success: function (data) {
            if (data.valida) {
                document.getElementById("error_sala").innerHTML =
                    data.mensaje;
                document.getElementById("error_sala").value = "1";
                document.getElementById('submit').disabled = true;

            } else {
                document.getElementById("error_sala").innerHTML = "";
                document.getElementById("error_sala").value = "0";
                document.getElementById('submit').disabled = false;

            }

        }
    });

}

//MODAL PARA ASIGNAR EL EXPEDIENTE A UN INFERIOR
function modal_asigna_expediente(id) {
    var dataString = $('#emailAbogado').serialize(); // carga todos    
    $.ajax({
        type: "POST",
        method: 'post',
        url: "/asignarExpediente/" + id,
        data: dataString,
        success: function (data) {

            let d = document.getElementById('modal' + id)
            d.close;
            d.style.display = "none"




        }
    });
}



function valida_email_abogado(sr) {
    var dataString = $('#emailAbogado').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_email_abogado",
        data: dataString,
        success: function (data) {
            if (data.user) {
                if (sr != data.user.email) {

                    document.getElementById("error_email").innerHTML = "El email que ingreso ya se encuentra registrado en el sistema SIJEL.";
                    document.getElementById("error_email").value = "1";
                    document.getElementById('submit').disabled = true;

                } else {
                    document.getElementById("error_email").innerHTML = "";
                    document.getElementById("error_email").value = "0";
                    document.getElementById('submit').disabled = false;
                }

            } else {
                document.getElementById("error_email").innerHTML = "";
                document.getElementById("error_email").value = "0";
                document.getElementById('submit').disabled = false;
            }


        }
    });

}






function valida_cedula_abogado(sr) {
    var dataString = $('#cedulaAbogado').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_cedula_abogado",
        data: dataString,
        success: function (data) {
            if (data.user) {
                if (sr != data.user.num_cedula) {

                    document.getElementById("error_num_cedula").innerHTML =
                        "Este número de Cedula ya se encuentra registrado en el sistema SIJEL.";
                    document.getElementById("error_num_cedula").value = "1";
                    document.getElementById('submit').disabled = true;

                } else {
                    document.getElementById("error_num_cedula").innerHTML = "";
                    document.getElementById("error_num_cedula").value = "0";
                    document.getElementById('submit').disabled = false;
                }

            } else {
                document.getElementById("error_num_cedula").innerHTML = "";
                document.getElementById("error_num_cedula").value = "0";
                document.getElementById('submit').disabled = false;
            }


        }
    });

}

//FUNCION PARA VALIDAR EXPEDIENTES//
function validaExpediente(id) {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Una vez validado el expediente, no se podrán modificar sus datos, solo podrá acceder un Administrador!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Validar!'
    }).then((result) => {
        if (result.isConfirmed) {
            // var route = ruta_global + "/validarExpediente/" + id;
            var token = $("#token").val();
            $.ajax({

                url: "/validarExpediente/" + id,
                type: 'post',
                method: 'post',
                dataType: 'json',
                success: function () {
                    Swal.fire(
                        'Validado!',
                        'El registro se ha validado.',
                        'success'
                    )
                }
            });

            //   setTimeout(function(){location.reload()},1000);

            location.reload();
        }
    })
}

function habilita_cedula(value) {
    if (value == "SI") {
        document.getElementById('display_abogado').style.display = 'block';
    } else if (value == "NO") {
        document.getElementById('display_abogado').style.display = 'none';
    }

}



//FUNCION PARA VALIDAR EXPEDIENTES//
function validaExpedienteAuxiliar(id) {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Una vez validado el expediente, no se podrán modificar sus datos, solo podrá acceder un Administrador!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Validar!'
    }).then(function () {
        //var route = ruta_global + "/validarExpediente/" + id;
        var token = $("#token").val();
        $.ajax({

            url: "/validarExpediente/" + id,
            type: 'post',
            method: 'post',
            dataType: 'json',
            success: function () {
                Swal.fire(
                    'Validado!',
                    'El registro se ha validado.',
                    'success'
                )
            }
        });

        //   setTimeout(function(){location.reload()},1000);

        location.reload();
    });

}


//OCULTAR Y MOSTRAR EL INPUT DE PROMOCIONES EN LOS ACUERDOS
function cambia_display_recurso(value) {
    if (value == "SI") {


        document.getElementById('display_recursos').style.display = 'block';
        document.getElementById('recurso').required = true;
        $("#promocion").select2({
            width: '100%'
        });


    } else {
        document.getElementById('display_recursos').style.display = 'none';
        document.getElementById('recurso').required = false;

    }
}

//OCULTAR Y MOSTRAR EL INPUT DE PROMOCIONES EN LOS ACUERDOS
function cambia_display_promocion(value) {

    var check_recu = document.getElementById('radioInline_recurso').checked;


    if (value == "SI" && check_recu == false) {

        document.getElementById('display_promocion').style.display = 'block';
        document.getElementById('promocion').required = true;
        $("#promocion").select2({
            width: '100%'
        });
        document.getElementById('display_promocion_recurso').style.display = 'none';
        document.getElementById('promocion_recurso').required = false;
    } else if (value == "SI" && check_recu == true) {
        document.getElementById('display_promocion_recurso').style.display = 'block';
        document.getElementById('promocion_recurso').required = true;
        $("#promocion_recurso").select2({
            width: '100%'
        });
        document.getElementById('display_promocion').style.display = 'none';
        document.getElementById('promocion').required = false;


    } else if (value == "NO") {
        document.getElementById('display_promocion').style.display = 'none';
        document.getElementById('promocion').required = false;
        document.getElementById('display_promocion_recurso').style.display = 'none';
        document.getElementById('promocion_recurso').required = false;
    }
}

//OCULTAR Y MOSTRAR EL INPUT DE PROMOCIONES EN LOS ACUERDOS
function cambia_display_acuerdo(value) {
    var check_recu = document.getElementById('radioInline_recurso').checked;

    if (value == "SI" && check_recu == false) {
        document.getElementById('display_acuerdo').style.display = 'block';
        document.getElementById('acuerdo').required = true;
        $("#promocion").select2({
            width: '100%'
        });
        document.getElementById('display_acuerdo_recurso').style.display = 'none';
        document.getElementById('acuerdos_recus').required = false;

    } else if (value == "SI" && check_recu == true) {
        document.getElementById('display_acuerdo_recurso').style.display = 'block';
        document.getElementById('acuerdos_recus').required = true;
        $("#acuerdos_recus").select2({
            width: '100%'
        });
        document.getElementById('display_acuerdo').style.display = 'none';
        document.getElementById('acuerdo').required = false;


    } else if (value == "NO") {
        document.getElementById('display_acuerdo').style.display = 'none';
        document.getElementById('acuerdo').required = false;
        document.getElementById('display_acuerdo_recurso').style.display = 'none';
        document.getElementById('acuerdos_recus').required = false;
    }
}

function traer_promociones_recurso(value) {
    //var id_expediente = document.getElementById("id_expediente").value;
    //var route = ruta_global + "/traer_promociones_recurso/" + value;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_promociones_recurso/" + value,
        success: function (data) {
            select_aux1 = document.getElementById('promocion_recurso');
            document.getElementById("promocion_recurso").value = '';
            $("#promocion_recurso").empty();
            $('#promocion_recurso').append(new Option("Seleccione una opción...", ""))
            data.promociones_recurso.forEach(promociones_recurs => {
                option = document.createElement("option");
                option.text = 'Folio:' + '' + promociones_recurs.folio + ', ' + 'Tipo:' + '' + promociones_recurs.tipo;
                option.value = promociones_recurs.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH

        }
    });
}

function traer_promociones_recurso_input(value, input) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_promociones_recurso/" + value,
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.promociones_recurso.forEach(promocion => {
                option = document.createElement("option");
                option.text = promocion.tipo + " Folio: " + promocion.folio;
                option.value = promocion.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH

        }
    });
}



//VALIDAR ACUERDOS
function valida_acuerdo() {

    if (document.getElementById('tipoAcuerdo').value == "") {
        document.getElementById("error_tipo_acuerdo").innerHTML = "Seleccione un tipo de acuerdo.";
        return false;

    } else if (document.getElementById('tipoAcuerdo').value != "") {
        document.getElementById("error_tipo_acuerdo").innerHTML = "";

    } else if (document.getElementById('radioInline').value == "SI") {
        if (document.getElementById('promocion').value == "") {
            document.getElementById("error_promocion").innerHTML = "Seleccione una promocion.";
            return false;
        }
    } else if (document.getElementById('radioInline').value == "NO") {
        document.getElementById("error_promocion").innerHTML = "";
    } else {
        document.getElementById("error_tipo_acuerdo").innerHTML = "";
        document.getElementById("error_promocion").innerHTML = "";
        document.getElementById("error_acuerdo").innerHTML = "";
        return true;

    }


}

function valida_sexo(sr) {

    var us = document.getElementById("sexo").value;

    if (us == "Seleccione una opción") {

        document.getElementById("error_sexo").innerHTML = "Ah olvidado seleccionar el sexo del nuevo abogad@."
        document.getElementById("error_sexo").value = "1";
        document.getElementById('submit').disabled = true;

    } else {
        document.getElementById("error_sexo").innerHTML = "";
        document.getElementById("error_sexo").value = "0";
        document.getElementById('submit').disabled = false;
    }




}




function validar_sala(sr) {
    var dataString = $('#user').serialize(); // carga todos 
    var us = document.getElementById("user").value;
    var sala = document.getElementById("sala").value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/validar_sala",
        data: dataString,
        success: function (data) {


            if (data.num_salas.length != 0) {
                if (data.num_salas.length == 1) {

                    if (us == data.ida.id_user && sala != 4) {
                        Swal.fire(
                            'Atención',
                            "Este usuario ya se encuentra asignado en la sala número " + data.ida.num_sala + ", solo podrá ser asignado en sala de Pleno",
                            'warning'
                        )

                        document.getElementById('boton_submit').style.display = 'none';

                    } else {


                        document.getElementById('boton_submit').style.display = 'block';
                    }

                } else if (data.num_salas.length == 2) {
                    if (us == data.ida.id_user) {
                        Swal.fire(
                            'Atención',
                            "Este usuario ya se encuentra asignado en la sala número " + data.ida.num_sala + " y en sala de Pleno.",
                            'warning'
                        )

                        document.getElementById('boton_submit').style.display = 'none';

                    } else {


                        document.getElementById('boton_submit').style.display = 'block';
                    }
                }

            } else {

                document.getElementById('boton_submit').style.display = 'block';
            }

        }
    });

}
//FUNCION PARA TRAER EL HISTORIAL DE UN EXPEDIENTE
function traerHistorialExpediente(id) {

    // var route = ruta_global + "/traerHistorialExpediente/" + id;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerHistorialExpediente/" + id,
        success: function (data) {


            $('#datatable-buttons').DataTable().clear().destroy();

            //FOR EACH PARA AGREGAR LAS PROMOCIONES AL EXPEDIENTE SELECCIONADO
            data.amparos.forEach(amparo => {

                var tabla = document.getElementById("datatable-buttons");
                var row = tabla.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                cell1.innerHTML = amparo.tipo;
                cell2.innerHTML = amparo.folio;
                cell3.innerHTML = amparo.estado;
                cell4.innerHTML = amparo.created_at;
                cell5.innerHTML = amparo.captura;
                cell6.innerHTML = '<a href= "{{URL::action(AmparosController@show,' + amparo.id + ')}}" class="btn waves-effect waves-light btn-info" role="button"><i class="mdi mdi-eye"></i></a>';

            });//END FOREACH PROMOCIONES
            //FOR EACH PARA AGREGAR LAS PROMOCIONES AL EXPEDIENTE SELECCIONADO
            data.expediente.forEach(exp => {

                var tabla = document.getElementById("datatable-buttons");
                var row = tabla.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                cell1.innerHTML = "Escrito inicial";
                cell2.innerHTML = exp.num_expediente;
                cell3.innerHTML = exp.estado;
                cell4.innerHTML = exp.created_at;
                cell5.innerHTML = exp.captura;
                cell6.innerHTML = '<a href= "{{URL::action(AmparosController@show,' + exp.id + ')}}" class="btn waves-effect waves-light btn-info" role="button"><i class="mdi mdi-eye"></i></a>';

            });//END FOREACH PROMOCIONES
            //MOSTRAR = $('#datatable-buttons').DataTable();


            $('#datatable-buttons').DataTable({
                paging: true,
                search: true,
                scrollY: 300,
            });
        }
    });

}
//limpia modales
function limpia() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidoPaterno").value = "";
    document.getElementById("apellidoMaterno").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("email").value = "";
    document.getElementById("error_emailactor").innerHTML = "";

    document.getElementById("nombre_demandado").value = "";

    document.getElementById("nombreTercera").value = "";
    document.getElementById("apellidoPaternoTercera").value = "";
    document.getElementById("apellidoMaternoTercera").value = "";
    document.getElementById("sexotercera").value = "";
    document.getElementById("emailTercera").value = "";
    document.getElementById("error_emailmod").innerHTML = "";

}

function valida_magistrado() {
    var dataString = $('#sala').serialize(); // carga todos
    var funcions = document.getElementById("funcion").value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_magistrado",
        data: dataString,
        success: function (data) {
            if (data.salas) {
                if (funcions == data.salas.funcion) {
                    document.getElementById("error_sala").innerHTML =
                        "Ya se encuentra registrado un Magistrado en esta sala.";
                    document.getElementById("error_sala").value = "1";
                    document.getElementById('submit').disabled = true;

                } else {
                    document.getElementById("error_sala").innerHTML = "";
                    document.getElementById("error_sala").value = "0";
                    document.getElementById('submit').disabled = false;
                }

            } else {
                document.getElementById("error_sala").innerHTML = "";
                document.getElementById("error_sala").value = "0";
                document.getElementById('submit').disabled = false;
            }


        }

    });

}

function iniciamodal() {
    $("#modal").modal();
}


function iniciamodalAux() {
    total_exp = document.getElementById('total_expedientes_label').innerHTML;
    if (total_exp > 200) {
        document.getElementById('div_pdf').style.display = 'none';

    } else {
        document.getElementById('div_pdf').style.display = 'block';
    }
    $("#modal2").modal();
}
function caracteres(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz.@1234567890-_ ";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }

    if (key == 32) {
        return false;
    }
}

////////////////////////llenar falta no grave/////////////////
function agrega_falta(table, array) {
    var rows = document.getElementById("faltas_no_graves_exp").rows.length;
    var tabla = document.getElementById("faltas_no_graves_exp");
    var row = tabla.insertRow(rows);
    row.style.backgroundColor = "white";
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    tabla_aux = table;
    arreglo = array;
    cell1.innerHTML = '<input type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFalta_no_grave_exp(this.parentNode.parentNode.rowIndex);recorre_tabla_general(tabla_aux, 1, 0,arreglo)">';
    cell2.innerHTML = '<textarea id="falta_no_grave_exp' + rows + '" name="falta_no_grave_exp' + rows + '" class="col-md-12"  type="text"></textarea>';
    //recorre_tabla();
    recorre_tabla_general('faltas_no_graves_exp', 1, 0, 'faltas_no_graves_expedientes');
}

function eliminarFalta_no_grave_exp(value) {
    document.getElementById("faltas_no_graves_exp").deleteRow(value);
}




function llenar_firmante() {

    x = document.getElementById('firmantes');
    y = x.options[x.selectedIndex].text;
    z = x.options[x.selectedIndex].value;
    var rows = document.getElementById("detalles").rows.length;
    if (rows <= 1) {
        var tabla = document.getElementById("detalles");
        var row = tabla.insertRow(rows);
        row.style.backgroundColor = "white";
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = '<input type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaLista(this.parentNode.parentNode.rowIndex);recorre_tabla();">';
        cell2.innerHTML = rows;
        cell3.innerHTML = '<select class="form-control" style="width: 100%" name="tipoIngreso" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
        //recorre_tabla();
    } else {
        var comprueba = document.getElementById(z);
        if (comprueba == null) {
            var tabla = document.getElementById("detalles");
            var row = tabla.insertRow(rows);
            row.style.backgroundColor = "white";
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = '<input type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaLista(this.parentNode.parentNode.rowIndex);recorre_tabla();">';
            cell2.innerHTML = rows;
            cell3.innerHTML = '<select class="form-control" style="width: 100%" name="tipoIngreso" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
            // recorre_tabla();
        } else {
            Swal.fire(
                'Error!',
                'El usuario ingresado ya se ha insertado en las firmas.',
                'warning'
            )

        }

    }




}

function eliminarFilaLista(value) {
    document.getElementById("detalles").deleteRow(value);
}

function recorre_tabla() {
    var table = document.getElementById('detalles');
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = 2, m = table.rows[r].cells.length; c < m; c++) {
            var input = table.rows[r].cells[c].innerHTML;
            limite = "4",
                separador = "id=",
                arregloDeSubCadenas = input.split(separador, limite);
            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
            arreglo.push(arregloDeSubCadenas2[1]);

        }

    }

    document.getElementById("array").value = arreglo;
}

function recorre_tabla_actuarios() {
    var table = document.getElementById('detalles2');
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = 3, m = table.rows[r].cells.length; c < m; c++) {
            var chk = table.rows[r].cells[c - 3].innerHTML;
            limite = "6";
            separador = "id=";
            arregloDeSubCadenas = chk.split(separador, limite);
            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
            if (document.getElementById(arregloDeSubCadenas2[1]).checked == true) {
                var input = table.rows[r].cells[c].innerHTML;
                var input2 = table.rows[r].cells[c + 1].innerHTML;
                var input3 = table.rows[r].cells[c + 2].innerHTML;
                var input4 = table.rows[r].cells[c + 3].innerHTML;
                limite = "6";
                separador = "id=";
                arregloDeSubCadenas = input.split(separador, limite);
                arregloDeSubCadenas_2 = input2.split(separador, limite);
                arregloDeSubCadenas_3 = input3.split(separador, limite);
                arregloDeSubCadenas_4 = input4.split(separador, limite);
                separador2 = '"',
                    arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
                arregloDeSubCadenas2_2 = arregloDeSubCadenas_2[1].split(separador2, limite);
                arregloDeSubCadenas2_3 = arregloDeSubCadenas_3[1].split(separador2, limite);
                arregloDeSubCadenas2_4 = arregloDeSubCadenas_4[1].split(separador2, limite);
                array_aux = arregloDeSubCadenas2[1] + "//" + arregloDeSubCadenas2_2[1] + "//" + arregloDeSubCadenas2_3[1] + "//" + arregloDeSubCadenas2_4[1];

                arreglo.push(array_aux);
                //  c = c + 7;

            }
            c = c + 7;
            //checked_aux=document.getElementById(arregloDeSubCadenas[1]).checked;

        }

    }
    document.getElementById("array2").value = arreglo;
    if (arreglo.length <= 0) {
        Swal.fire({

            icon: 'error',
            title: 'Para poder generar un acuerdo necesitas como mínimo notificar una persona/autoridad',
            showConfirmButton: false,
            timer: 5000
        })
        return false;
    } else {
        valida_envio_firma();
        return false;
    }

}

function recorre_tabla_actuarios_revisado() {
    var table = document.getElementById('detalles2');
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = 3, m = table.rows[r].cells.length; c < m; c++) {
            var chk = table.rows[r].cells[c - 3].innerHTML;
            limite = "6";
            separador = "id=";
            arregloDeSubCadenas = chk.split(separador, limite);
            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
            if (document.getElementById(arregloDeSubCadenas2[1]).checked == true) {
                var input = table.rows[r].cells[c].innerHTML;
                var input2 = table.rows[r].cells[c + 1].innerHTML;
                var input3 = table.rows[r].cells[c + 2].innerHTML;
                var input4 = table.rows[r].cells[c + 3].innerHTML;
                limite = "6";
                separador = "id=";
                arregloDeSubCadenas = input.split(separador, limite);
                arregloDeSubCadenas_2 = input2.split(separador, limite);
                arregloDeSubCadenas_3 = input3.split(separador, limite);
                arregloDeSubCadenas_4 = input4.split(separador, limite);
                separador2 = '"',
                    arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
                arregloDeSubCadenas2_2 = arregloDeSubCadenas_2[1].split(separador2, limite);
                arregloDeSubCadenas2_3 = arregloDeSubCadenas_3[1].split(separador2, limite);
                arregloDeSubCadenas2_4 = arregloDeSubCadenas_4[1].split(separador2, limite);
                array_aux = arregloDeSubCadenas2[1] + "//" + arregloDeSubCadenas2_2[1] + "//" + arregloDeSubCadenas2_3[1] + "//" + arregloDeSubCadenas2_4[1];

                arreglo.push(array_aux);
                //  c = c + 7;

            }
            c = c + 7;
            //checked_aux=document.getElementById(arregloDeSubCadenas[1]).checked;

        }

    }
    document.getElementById("array2").value = arreglo;
    if (arreglo.length <= 0) {
        Swal.fire({

            icon: 'error',
            title: 'Para poder generar un acuerdo necesitas como mínimo notificar una persona/autoridad',
            showConfirmButton: false,
            timer: 5000
        })
        return false;
    } else {
        valida_envio_firma_revisar();
        revisonesAcuerdos();
        return false;
    }
}

function recorre_tabla_actuarios_sentencias() {
    var table = document.getElementById('detalles2');
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = 3, m = table.rows[r].cells.length; c < m; c++) {
            var chk = table.rows[r].cells[c - 1].innerHTML;
            limite = "6";
            separador = "id=";
            arregloDeSubCadenas = chk.split(separador, limite);
            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
            if (document.getElementById(arregloDeSubCadenas2[1]).checked == true) {
                var input = table.rows[r].cells[c].innerHTML;
                var input2 = table.rows[r].cells[c + 1].innerHTML;
                var input3 = table.rows[r].cells[c + 2].innerHTML;

                limite = "6";
                separador = "id=";
                arregloDeSubCadenas = input.split(separador, limite);
                arregloDeSubCadenas_2 = input2.split(separador, limite);
                arregloDeSubCadenas_3 = input3.split(separador, limite);
                arregloDeSubCadenas_4 = input4.split(separador, limite);
                separador2 = '"',
                    arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
                arregloDeSubCadenas2_2 = arregloDeSubCadenas_2[1].split(separador2, limite);
                arregloDeSubCadenas2_3 = arregloDeSubCadenas_3[1].split(separador2, limite);
                arregloDeSubCadenas2_4 = arregloDeSubCadenas_4[1].split(separador2, limite);
                array_aux = arregloDeSubCadenas2[1] + "//" + arregloDeSubCadenas2_2[1] + "//" + arregloDeSubCadenas2_3[1] + "//" + arregloDeSubCadenas2_4[1];

                arreglo.push(array_aux);
                //  c = c + 7;

            }
            c = c + 7;
            //checked_aux=document.getElementById(arregloDeSubCadenas[1]).checked;

        }

    }
    document.getElementById("array2").value = arreglo;
    valida_envio_firma();
    return false;
}


function caracteres(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz.@1234567890-_ ";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }

    if (key == 32) {
        return false;
    }
}

function modal_loading() {

    $("#modal-loading").modal();

}

function traerMagistradoSala(value) {

    //var route = ruta_global + "/traerMagistradoSala/" + value;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerMagistradoSala/" + value,
        success: function (data) {
            if (data.sala.sexo == "FEMENINO") {
                nombre = "MAGISTRADA " + data.sala.name + " " + data.sala.apellido_p + " " + data.sala.apellido_m;
            } else {
                nombre = data.sala.funcion + " " + data.sala.name + " " + data.sala.apellido_p + " " + data.sala.apellido_m;
            }

            document.getElementById('ponente').value = nombre;



        }
    });


}


///////////////traer juicios/////////////////////7
function traerJuicios_totales() {
    var juicio = document.getElementById('tipo_juicio').value;
    var juicioest_tot = document.getElementById('juicioest_tot');
    //var route = ruta_global + "/traerJuiciosTotales/" + juicio;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerJuiciosTotales/" + juicio,
        success: function (data) {
            let juiciocount = data.juicios_tots.length;
            juicioest_tot.value = juiciocount;

            llenarPasterJuicios();
        }
    });


}

function traerJuicios() {
    var juicio = document.getElementById('tipo_juicio').value;
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var sala = document.getElementById('sala').value;
    var juicioest = document.getElementById('juicioest');
    // var route = ruta_global + "/traerJuiciosEstadisticas/" + juicio + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerJuiciosEstadisticas/" + juicio + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let juiciocount = data.juicios.length;
            juicioest.value = juiciocount;
            llenarPasterJuicios();
        }
    });


}

function traerJuiciosfirmados() {
    var juicio = document.getElementById('tipo_juicio').value;
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var sala = document.getElementById('sala').value;
    var firmados = document.getElementById('estado_firmado');
    //var route = ruta_global + "/traerJuiciosFirmados/" + juicio + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerJuiciosFirmados/" + juicio + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let firmadoscount = data.juicios.length;
            firmados.value = firmadoscount;
            llenarPasterJuicios();
        }
    });


}

function traerJuiciosPendientes() {
    var juicio = document.getElementById('tipo_juicio').value;
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var sala = document.getElementById('sala').value;
    var pendientes = document.getElementById('estado_pendiente');
    //var route = ruta_global + "/traerJuiciosPendientes/" + juicio + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerJuiciosPendientes/" + juicio + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let pendientescount = data.juicios.length;
            pendientes.value = pendientescount;
            llenarPasterJuicios();
        }
    });


}

function traerJuiciosRevocadas() {
    var documento = document.getElementById('tipo_juicio').value;
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var sala = document.getElementById('sala').value;
    var revocadas = document.getElementById('estado_revocadas');
    //var route = ruta_global + "/traerJuiciosRevocadas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerJuiciosRevocadas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let revocadasCount = data.juicios.length;
            revocadas.value = revocadasCount;
            llenarPasterJuicios();
        }
    });


}

function llenarPasterJuicios() {
    var num_firmados = parseInt(document.getElementById('estado_firmado').value);
    var num_pendientes = parseInt(document.getElementById('estado_pendiente').value);
    var num_revocadas = parseInt(document.getElementById('estado_revocadas').value);
    data = { series: [num_firmados, num_pendientes, num_revocadas] };
    var sum = function (e, t) { return e + t };
    new Chartist.Pie("#pastel", data, {
        labelInterpolationFnc: function (e) {
            var dat = Math.round(e / data.series.reduce(sum) * 100) + "%";
            return dat;
        }
    });
}
///////////////////////////////////////////////////


///////////////traer documentos/////////////////////7
function traerDocumentos_totales() {
    var documento = document.getElementById('tipoDocumento').value;
    var documentostot_tot = document.getElementById('documentostot_tot');
    //  var route = ruta_global + "/traerDocumentos_totales/" + documento;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerDocumentos_totales/" + documento,
        success: function (data) {
            let documentoCount = data.documentos_tots.length;
            documentostot_tot.value = documentoCount;
            llenarPastelDocumentos();
        }
    });


}

function traerDocumentos() {
    var documento = document.getElementById('tipoDocumento').value;
    var fecha_inicio = document.getElementById('fecha_inicio_doc').value;
    var fecha_fin = document.getElementById('fecha_fin_doc').value;
    var sala = document.getElementById('sala_doc').value;
    var documentostot = document.getElementById('documentostot');
    //var route = ruta_global + "/traerDocumentosEstadisticas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerDocumentosEstadisticas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let documentoCount = data.documentos.length;
            documentostot.value = documentoCount;
            llenarPastelDocumentos();
        }
    });


}

function traerDocumentosfirmados() {
    var documento = document.getElementById('tipoDocumento').value;
    var fecha_inicio = document.getElementById('fecha_inicio_doc').value;
    var fecha_fin = document.getElementById('fecha_fin_doc').value;
    var sala = document.getElementById('sala_doc').value;
    var firmados = document.getElementById('estado_firmado_doc');
    //var route = ruta_global + "/traerDocumentosFirmados/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerDocumentosFirmados/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let firmadosCount = data.documentos.length;
            firmados.value = firmadosCount;
            llenarPastelDocumentos();
        }
    });


}

function traerDocumentosPendientes() {
    var documento = document.getElementById('tipoDocumento').value;
    var fecha_inicio = document.getElementById('fecha_inicio_doc').value;
    var fecha_fin = document.getElementById('fecha_fin_doc').value;
    var sala = document.getElementById('sala_doc').value;
    var pendientes = document.getElementById('estado_pendiente_doc');
    //var route = ruta_global + "/traerDocumentosPendientes/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerDocumentosPendientes/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let pendientesCount = data.documentos.length;
            pendientes.value = pendientesCount;
            llenarPastelDocumentos();
        }
    });


}

function traerDocumentosRevocadas() {
    var documento = document.getElementById('tipoDocumento').value;
    var fecha_inicio = document.getElementById('fecha_inicio_doc').value;
    var fecha_fin = document.getElementById('fecha_fin_doc').value;
    var sala = document.getElementById('sala_doc').value;
    var revocadas = document.getElementById('estado_revocadas_doc');
    //var route = ruta_global + "/traerDocumentosRevocadas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerDocumentosRevocadas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let revocadasCount = data.documentos.length;
            revocadas.value = revocadasCount;
            llenarPastelDocumentos();
        }
    });


}

function llenarPastelDocumentos() {
    var num_firmados_doc = parseInt(document.getElementById('estado_firmado_doc').value);
    var num_pendientes_doc = parseInt(document.getElementById('estado_pendiente_doc').value);
    var num_revocadas_doc = parseInt(document.getElementById('estado_revocadas_doc').value);
    data = { series: [num_firmados_doc, num_pendientes_doc, num_revocadas_doc] };
    var sum = function (e, t) { return e + t };
    new Chartist.Pie("#pastelDocumentos", data, {
        labelInterpolationFnc: function (e) {
            var dat = Math.round(e / data.series.reduce(sum) * 100) + "%";
            return dat;
        }
    });
}
///////////////////////////////////////////////////
///////////////traer expedientes/////////////////////7
function traerexpedientes_totales() {
    var expediente = document.getElementById('tipoExpediente').value;
    var tot_exp_tot = document.getElementById('tot_exp_tot');
    //var route = ruta_global + "/traerExpedientes_totales/" + expediente;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerExpedientes_totales/" + expediente,
        success: function (data) {
            let expedienteCount = data.expedientes_tots.length;
            tot_exp_tot.value = expedienteCount;
            llenarPastelExpedientes();
        }
    });


}

function traerExpedientes() {
    var documento = document.getElementById('tipoExpediente').value;
    var fecha_inicio = document.getElementById('fecha_inicio_exp').value;
    var fecha_fin = document.getElementById('fecha_fin_exp').value;
    var sala = document.getElementById('sala_exp').value;
    var tot_exp = document.getElementById('tot_exp');
    //var route = ruta_global + "/traerExpedientesEstadisticas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerExpedientesEstadisticas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let expedientesCount = data.expedientes.length;
            tot_exp.value = expedientesCount;
            llenarPastelExpedientes();
        }
    });


}

function traerExpedientesfirmados() {
    var documento = document.getElementById('tipoExpediente').value;
    var fecha_inicio = document.getElementById('fecha_inicio_exp').value;
    var fecha_fin = document.getElementById('fecha_fin_exp').value;
    var sala = document.getElementById('sala_exp').value;
    var firmados = document.getElementById('estado_firmado_exp');
    //var route = ruta_global + "/traerExpedientesFirmados/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerExpedientesFirmados/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let firmadosCount = data.expedientes.length;
            firmados.value = firmadosCount;
            llenarPastelExpedientes();

        }
    });


}

function traerExpedientesPendientes() {
    var documento = document.getElementById('tipoExpediente').value;
    var fecha_inicio = document.getElementById('fecha_inicio_exp').value;
    var fecha_fin = document.getElementById('fecha_fin_exp').value;
    var sala = document.getElementById('sala_exp').value;
    var pendientes = document.getElementById('estado_pendiente_exp');
    //var route = ruta_global + "/traerExpedientesPendientes/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerExpedientesPendientes/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let pendientesCount = data.expedientes.length;
            pendientes.value = pendientesCount;
            llenarPastelExpedientes();
        }
    });


}

function traerExpedientesRevocadas() {
    var documento = document.getElementById('tipoExpediente').value;
    var fecha_inicio = document.getElementById('fecha_inicio_exp').value;
    var fecha_fin = document.getElementById('fecha_fin_exp').value;
    var sala = document.getElementById('sala_exp').value;
    var revocadas = document.getElementById('estado_revocadas_exp');
    //var route = ruta_global + "/traerExpedientesRevocadas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerExpedientesRevocadas/" + documento + "/" + fecha_inicio + "/" + fecha_fin + "/" + sala,
        success: function (data) {
            let revocadasCount = data.expedientes.length;
            revocadas.value = revocadasCount;
            llenarPastelExpedientes();
        }
    });


}

function llenarPastelExpedientes() {
    var num_firmados_exp = parseInt(document.getElementById('estado_firmado_exp').value);
    var num_pendientes_exp = parseInt(document.getElementById('estado_pendiente_exp').value);
    var num_revocadas_exp = parseInt(document.getElementById('estado_revocadas_exp').value);
    data = { series: [num_firmados_exp, num_pendientes_exp, num_revocadas_exp] };
    var sum = function (e, t) { return e + t };
    setInterval(function () {
        new Chartist.Pie("#pastelExpedientes", data, {
            labelInterpolationFnc: function (e) {
                var dat = Math.round(e / data.series.reduce(sum) * 100) + "%";

                return dat;
            }
        });
    }, 1000);

}
///////////////traer Salas/////////////////////7

function traerSalas() {
    var sala = document.getElementById('sala_salas').value;
    var fecha_inicio = document.getElementById('fecha_inicio_sala').value;
    var fecha_fin = document.getElementById('fecha_fin_sala').value;
    var tot_sala = document.getElementById('tot_sala');
    //var route = ruta_global + "/traerSalasEstadisticas/" + sala + "/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerSalasEstadisticas/" + sala + "/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            let salasCount = data.salas.length;
            tot_sala.value = salasCount;
            llenarPastelSalas();
        }
    });


}

function traerSalasPendientes() {
    var sala = document.getElementById('sala_salas').value;
    var fecha_inicio = document.getElementById('fecha_inicio_sala').value;
    var fecha_fin = document.getElementById('fecha_fin_sala').value;
    var pendientes = document.getElementById('estado_pendiente_sala');
    //var route = ruta_global + "/traerSalasPendientes/" + sala + "/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerSalasPendientes/" + sala + "/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            let pendientesCount = data.salas.length;
            pendientes.value = pendientesCount;
            llenarPastelSalas();
        }
    });


}

function traerSalasfirmados() {
    var sala = document.getElementById('sala_salas').value;
    var fecha_inicio = document.getElementById('fecha_inicio_sala').value;
    var fecha_fin = document.getElementById('fecha_fin_sala').value;
    var firmados = document.getElementById('estado_firmado_sala');
    //var route = ruta_global + "/traerSalasFirmados/" + sala + "/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerSalasFirmados/" + sala + "/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            let firmadosCount = data.salas.length;
            firmados.value = firmadosCount;

            llenarPastelSalas();
        }
    });


}

function traerSalasRevocadas() {
    var sala = document.getElementById('sala_salas').value;
    var fecha_inicio = document.getElementById('fecha_inicio_sala').value;
    var fecha_fin = document.getElementById('fecha_fin_sala').value;
    var revocadas = document.getElementById('estado_revocadas_sala');
    //var route = ruta_global + "/traerSalasRevocadas/" + sala + "/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerSalasRevocadas/" + sala + "/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            let revocadasCount = data.salas.length;
            revocadas.value = revocadasCount;
            llenarPastelSalas();
        }
    });


}

function llenarPastelSalas() {
    var num_firmados_sala = parseInt(document.getElementById('estado_firmado_sala').value);
    var num_pendientes_sala = parseInt(document.getElementById('estado_pendiente_sala').value);
    var num_revocadas_sala = parseInt(document.getElementById('estado_revocadas_sala').value);
    data = { series: [num_firmados_sala, num_pendientes_sala, num_revocadas_sala] };
    var sum = function (e, t) { return e + t };
    setInterval(function () {
        new Chartist.Pie("#pastelSalas", data, {
            labelInterpolationFnc: function (e) {
                var dat = Math.round(e / data.series.reduce(sum) * 100) + "%";
                return dat;
            }
        });
    }, 1000);

}
///////////////////////////////////////////////////
function traerAsignacionFirmas(value) {
    //var route = ruta_global + "/traerAsignacionFirmas/" + value;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerAsignacionFirmas/" + value,
        success: function (data) {
            document.getElementById('display_revocar').style.display = 'block';

            //AGREGA TODAS LOS DATOS DEL DOCUMENTO
            var x = $('#num_exp');
            option = new Option(data.asignacion.num_expediente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });
            var x = $('#tipo_doc');
            option = new Option(data.asignacion.tipo_documento, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#tipo_exp');
            option = new Option(data.asignacion.tipo_expediente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#tipo_juicio');
            option = new Option(data.asignacion.tipo_juicio, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#propietario');
            option = new Option(data.asignacion.name + " " + data.asignacion.apellido_p + " " + data.asignacion.apellido_m, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#captura');
            option = new Option(data.asignacion.captura, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#created');
            option = new Option(data.asignacion.created_at, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#updated');
            option = new Option(data.asignacion.updated_at, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#ponente');
            option = new Option(data.asignacion.ponente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#proyectista');
            option = new Option(data.asignacion.proyectista, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#folio');
            option = new Option(data.asignacion.num_asignacion, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#clave_alfa');
            option = new Option(data.asignacion.clave_alfanumerica, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#estado');
            option = new Option(data.asignacion.estado, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            document.getElementById('doc').href = '../public/DOCUMENTOSPARAFIRMA/' + data.asignacion.docx;



            $('#datatable').DataTable().clear().destroy();

            //FOR EACH PARA AGREGAR LAS PROMOCIONES AL EXPEDIENTE SELECCIONADO
            data.asignaciones.forEach(asignacion => {

                var tabla = document.getElementById("datatable");
                var row = tabla.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = '<td>' + asignacion.name + " " + asignacion.apellido_p + " " + asignacion.apellido_m + '</td>';
                cell2.innerHTML = '<td>' + asignacion.funcion + '</td>';
                cell3.innerHTML = '<td><span class="badge badge-danger">' + asignacion.estado + '</span></td>';
                cell4.innerHTML = '<td>' + asignacion.created_at + '</td>';

            });//END FOREACH PROMOCIONES



        }
    });

}
///////////////////////Documentos publicos///////////////////
///////////////////////////////////////////////////
function traerAsignacionFirmasDP(value) {
    //var route = ruta_global + "/traerAsignacionFirmas/" + value;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerAsignacionFirmas/" + value,
        success: function (data) {
            document.getElementById('display_revocar').style.display = 'block';

            //AGREGA TODAS LOS DATOS DEL DOCUMENTO
            var x = $('#num_exp_dp');
            option = new Option(data.asignacion.num_expediente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });
            var x = $('#tipo_doc_dp');
            option = new Option(data.asignacion.tipo_documento, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#tipo_exp_dp');
            option = new Option(data.asignacion.tipo_expediente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#tipo_juicio_dp');
            option = new Option(data.asignacion.tipo_juicio, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#propietario_dp');
            option = new Option(data.asignacion.name + " " + data.asignacion.apellido_p + " " + data.asignacion.apellido_m, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#captura_dp');
            option = new Option(data.asignacion.captura, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#created_dp');
            option = new Option(data.asignacion.created_at, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#updated_dp');
            option = new Option(data.asignacion.updated_at, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#ponente_dp');
            option = new Option(data.asignacion.ponente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#proyectista_dp');
            option = new Option(data.asignacion.proyectista, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#folio_dp');
            option = new Option(data.asignacion.num_asignacion, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#clave_alfa_dp');
            option = new Option(data.asignacion.clave_alfanumerica, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#estado_dp');
            option = new Option(data.asignacion.estado, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            document.getElementById('doc_dp').href = '../public/DOCUMENTOSPARAFIRMA/' + data.asignacion.docx;









        }
    });

}

//OCULTAR Y MOSTRAR EL INPUT DE PROMOCIONES EN LOS ACUERDOS
function cambia_display_estadisticas_ofi(value) {
    if (value == "nulidad") {
        document.getElementById('nulidad').style.display = 'block';
        document.getElementById('rag').style.display = 'none';
        document.getElementById('promocion').style.display = 'none';
        document.getElementById('amparo').style.display = 'none';
        document.getElementById('generalidad').style.display = 'none';
    }
}

function traerNul() {
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var tot_nul = document.getElementById('tot_nul');
    //var route = ruta_global + "/traer_exp_nul/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_exp_nul/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            tot_nul.value = data.expedientes_nul;;
        }
    });
}

function traerRag() {
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var tot_rag = document.getElementById('tot_rag');
    //var route = ruta_global + "/traer_exp_rag/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_exp_rag/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            tot_rag.value = data.expedientes_rag;;
        }
    });
}

function traerGen() {
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var tot_gen = document.getElementById('tot_gen');
    //  var route = ruta_global + "/traer_exp_gen/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_exp_gen/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            tot_gen.value = data.expedientes_gen;;
        }
    });
}

function traerAmp() {
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var tot_amp = document.getElementById('tot_amp');
    //var route = ruta_global + "/traer_exp_amp/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_exp_amp/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            tot_amp.value = data.expedientes_amps;
        }
    });
}

function traerProm() {
    var fecha_inicio = document.getElementById('fecha_inicio').value;
    var fecha_fin = document.getElementById('fecha_fin').value;
    var tot_prom = document.getElementById('tot_prom');
    //var route = ruta_global + "/traer_exp_prom/" + fecha_inicio + "/" + fecha_fin;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_exp_prom/" + fecha_inicio + "/" + fecha_fin,
        success: function (data) {
            tot_prom.value = data.expedientes_prom;
        }
    });
}
///////////////////////////////////////////////////
function traerAsignacionFirma(value) {
    //  var route = ruta_global + "/traerAsignacionFirma/" + value;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerAsignacionFirma/" + value,
        success: function (data) {
            document.getElementById('display_revocar').style.display = 'block';
            $('#num_exp').val('');
            $('#tipo_doc').val('');
            $('#tipo_exp').val('');
            $('#tipo_juicio').val('');
            $('#propietario').val('');
            $('#captura').val('');
            $('#created').val('');
            $('#updated').val('');
            $('#ponente').val('');
            $('#proyectista').val('');
            $('#folio').val('');
            $('#clave_alfa').val('');
            $('#estado').val('');
            $("#datatable td").remove();

            //AGREGA TODAS LOS DATOS DEL DOCUMENTO
            var x = $('#num_exp');
            option = new Option(data.asignacion.num_expediente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });
            var x = $('#tipo_doc');
            option = new Option(data.asignacion.tipo_documento, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#tipo_exp');
            option = new Option(data.asignacion.tipo_expediente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#tipo_juicio');
            option = new Option(data.asignacion.tipo_juicio, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#propietario');
            option = new Option(data.asignacion.name + " " + data.asignacion.apellido_p + " " + data.asignacion.apellido_m, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#captura');
            option = new Option(data.asignacion.captura, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#created');
            option = new Option(data.asignacion.created_at, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#updated');
            option = new Option(data.asignacion.updated_at, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#ponente');
            option = new Option(data.asignacion.ponente, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#proyectista');
            option = new Option(data.asignacion.proyectista, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#folio');
            option = new Option(data.asignacion.num_asignacion, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#clave_alfa');
            option = new Option(data.asignacion.clave_alfanumerica, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            var x = $('#estado');
            option = new Option(data.asignacion.estado, data.asignacion.id, true, true);
            x.append(option).trigger('change');
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            document.getElementById('_id').value = data.asignacion.id;

            document.getElementById('doc').href = '../public/DOCUMENTOSPARAFIRMA/' + data.asignacion.docx;



            //$('#datatable').DataTable().clear().destroy();

            //FOR EACH PARA AGREGAR LAS PROMOCIONES AL EXPEDIENTE SELECCIONADO
            data.asignaciones.forEach(asignacion => {

                var tabla = document.getElementById("datatable");
                var row = tabla.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = '<td>' + asignacion.name + " " + asignacion.apellido_p + " " + asignacion.apellido_m + '</td>';
                cell2.innerHTML = '<td>' + asignacion.funcion + '</td>';
                cell3.innerHTML = '<td><span class="badge badge-danger">' + asignacion.estado + '</span></td>';
                cell4.innerHTML = '<td>' + asignacion.created_at + '</td>';

            });//END FOREACH PROMOCIONES



        }
    });

}

function validaPassword(form) {
    var dataString = $('#formulario_pass').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "GET",
        method: 'get',
        url: '/passwordvalida',
        data: dataString,
        success: function (data) {
            if (data.resp == 0) {
                document.getElementById("error_pass2").innerHTML = "La contraseña incorrecta.";
            }
            if (data.resp == 1) {

                document.getElementById("error_pass").innerHTML = "";
                formulario = document.formulario;
                formulario.submit();
                Swal.fire({

                    icon: 'success',
                    title: 'Contraseña correcta, Guardando...',
                    showConfirmButton: false,
                    timer: 5000
                })
                // document.getElementById("wizard-validation-form").submit();
            } else {
                document.getElementById("error_pass").innerHTML = "La contraseña no coincide.";
            }


        }
    });

}

function validaPasswordEliminar(form) {
    var dataString = $('#formulario_pass').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "GET",
        method: 'get',
        url: '/passwordvalida',
        data: dataString,
        success: function (data) {
            if (data.resp == 1) {
                $("#modal_pass .close").click();
                $('.modal_pass.in').modal('hide');
                eliminar_registro();
                // document.getElementById("wizard-validation-form").submit();
            } else {
                Swal.fire(
                    'Lo sentimos!',
                    'La contraseña no coincide.',
                    'error'
                )
                document.getElementById("error_pass").innerHTML = "La contraseña no coincide.";
            }


        }
    });

}



//SE CREO OTRA FUNCION PARA LA RECEPCION DE EXPEDIENTES POR QUE SE DUPLICA EL SUBMIT
function validaPasswordRecepcion(id) {
    var dataString = $('#formulario_pass_rec' + id).serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "GET",
        method: 'get',
        url: '/passwordvalida',
        data: dataString,
        success: function (data) {

            if (data.resp == 1) {
                document.getElementById("error_pass").innerHTML = "";
                document.getElementById("form_enviar" + id).submit();
                //formulario = document.formularioRecepcion+id;
                //  formulario.submit();
                // document.getElementById("wizard-validation-form").submit();
            } else {
                document.getElementById("error_pass").innerHTML = "La contraseña no coincide.";
            }


        }
    });

}

function validaPasswordExcuAcum() {
    var dataString = $('#formulario_pass_axcum').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "GET",
        method: 'get',
        url: '/passwordvalida_excum',
        data: dataString,
        success: function (data) {
            if (data.resp == 1) {
                document.getElementById("error_pass").innerHTML = "";

                document.getElementById("form").submit();
            } else {
                document.getElementById("error_pass").innerHTML = "La contraseña no coincide.";
            }


        }
    });

}

function checa_array() {
    Swal.fire({
        title: '¿Estás seguro de agregar firmante?',
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            llenar_firmante(); recorre_tabla();
        } else {
            return false;
        }
    })
}

function checa_array_faltas() {
    Swal.fire({
        title: '¿Estás seguro de agregar firmante?',
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            llenar_firmante(); recorre_tabla();
        } else {
            return false;
        }
    })
}

function valida_envio_firma() {

    array = document.getElementById("array").value;
    if (array.length <= 0) {
        Swal.fire({
            title: '¡Atención!',
            text: "No se ha seleccionado ningún firmante",
            icon: 'warning',
        });
        return false;
    } else {
        Swal.fire({
            title: '¿Guardar?',
            text: "Confirmar accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, guardar!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Guardando...!',
                    showConfirmButton: false,
                    timer: 5000
                })
                formulario = document.formulario;
                formulario.submit();
            }
        })
        //$("#modal_pass").modal();
        return false;

    }


}

function valida_envio_firma_revisar() {

    Swal.fire({
        title: '¿Guardar?',
        text: "Confirmar accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, guardar!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Guardando...!',
                showConfirmButton: false,
                timer: 5000
            })
            formulario = document.formulario;
            formulario.submit();
        }
    })
    //$("#modal_pass").modal();
    return false;




}

function modal_carga_calendario() {
    $('#modal_carga').modal('show');
    return false;

}

function valida_envio_expediente() {
    $("#modalAsignacion .close").click();
    $('.modalAsignacion.in').modal('hide');
    $("#modal_pass").modal();
    return false;

}

function valida_envio_expediente_acumExp() {
    $("#modalExcusadosAcumulados .close").click();
    $('.modalExcusadosAcumulados.in').modal('hide');
    $('#modalExcusadosAcumulados').modal('hide');
    $("#modal_pass_excuAcum").modal();
    return false;

}

function valida_recepcion_expediente(id) {
    var name = "modalAsignacion" + id;
    $("#" + name + " .close").click();
    $("." + name + ".in").modal('hide');
    $('#modal_passRec' + id).modal();
    return false;

}


function tipo_documento(tipo) {
    if (tipo == "ACUERDO") {
        document.getElementById('display_sentencia').style.display = 'none';
        document.getElementById('display_acuerdo').style.display = 'block';

        document.getElementById('sala').required = false;
        document.getElementById('proyectista').required = false;
        document.getElementById('ponente').required = false;
        document.getElementById('tipoAcuerdo').required = true;
        document.getElementById('actores').required = true;

    } else if (tipo == "SENTENCIA") {
        document.getElementById('display_sentencia').style.display = 'block';
        document.getElementById('display_acuerdo').style.display = 'none';

        document.getElementById('sala').required = true;
        document.getElementById('proyectista').required = true;
        document.getElementById('ponente').required = true;
        document.getElementById('tipoAcuerdo').required = false;
        document.getElementById('actores').required = false;

    }

}

function tabla_historial() {
    var dataString = $('#formulario_pass').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "GET",
        method: 'get',
        url: '/passwordvalida',
        data: dataString,
        success: function (data) {
            if (data.resp == 1) {
                document.getElementById("error_pass").innerHTML = "";
                formulario = document.formulario;
                formulario.submit();
                // document.getElementById("wizard-validation-form").submit();
            } else {
                document.getElementById("error_pass").innerHTML = "La contraseña no coincide.";
            }


        }
    });

}

//FUNCION PARA TRAER LOS USUARIOS DE UNA SALA
function traer_coordinadores(id) {
    var dataString = $('#formulario_pass').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: '/traerCoordinadores/' + id,
        data: dataString,
        success: function (resp) {
            $("#user").empty();

            resp.users.forEach(function (user, index) {
                var x = $('#user');
                option = new Option(user.name + " " + user.apellido_p + " " + user.apellido_m + " - " + user.funcion_sala, user.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: user
                    }
                });
            });//END FOREACH ACTORES
            //AGREGAAMOS LOS USUARIOS DEL ARCHIVO
            resp.users_archivo.forEach(function (user_archivo, index) {
                var x = $('#user');
                option = new Option(user_archivo.name + " " + user_archivo.apellido_p + " " + user_archivo.apellido_m + " - " + user_archivo.funcion, user_archivo.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: user_archivo
                    }
                });
            });//END FOREACH ACTORES
            $("#modalAsignacion").modal();


        }
    });

}

//FUNCION PARA TRAER LOS USUARIOS DE CADA SALA Y ABRIR EL MODAL DE ASIGNACION O REASIGNACION
function traer_users_sala(id) {
    var dataString = $('#formulario_pass').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: '/traerCoordinadores/' + id,
        data: dataString,
        success: function (resp) {
            $('#user' + id).empty();

            resp.users.forEach(function (user, index) {
                var x = $('#user' + id);
                option = new Option(user.name + " " + user.apellido_p + " " + user.apellido_m + " - " + user.funcion, user.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: user
                    }
                });
            });//END FOREACH ACTORES
            $('#modal' + id + " ").modal();


        }
    });

}

function traer_users_sala_reasig(id) {
    var dataString = $('#formulario_pass').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: '/traerCoordinadores_reasig/' + id,
        data: dataString,
        success: function (resp) {
            $('#personal' + id).empty();

            resp.users.forEach(function (user, index) {
                var x = $('#personal' + id);
                option = new Option(user.name + " " + user.apellido_p + " " + user.apellido_m + " - " + user.funcion, user.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: user
                    }
                });
            });//END FOREACH ACTORES
            $('#modal_edit' + id + " ").modal();
        }
    });

}

//FUNCION PARA TRAER LOS USUARIOS DE UNA SALA
function traer_coordinadores_modal_excum(sala) {
    var dataString = $('#formulario_pass').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: '/traerCoordinadores_saladestino/' + sala,
        data: dataString,
        success: function (resp) {
            document.getElementById("user_s").value = '';
            $("#user_s").empty();
            resp.users.forEach(function (user, index) {
                var x = $('#user_s');
                option = new Option(user.name + " " + user.apellido_p + " " + user.apellido_m + " - " + user.funcion_sala, user.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: user
                    }
                });
            });//END FOREACH ACTORES
            $("#modalExcusadosAcumulados").modal();


        }
    });

}

//SE CREA ESTA FUNCION PARA LAS REASIGNACIONES DE EXPEDIENETS
function valida_envio_expediente_aux(id) {
    $('#modal' + id + ' .close').click();
    $('.modal' + id + '.in').modal('hide');
    $("#modal_passRec").modal();
    return false;

}
//FUNCION PARA VALIDAR SI UNA FECHA ES HABIL O INHABIL
function valida_fecha(fecha) {
    var token = $("#token").val();
    var dataString = $('#formulario').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: '/valida_fecha/' + fecha,
        data: dataString,
        success: function (data) {
            if (data.fecha.tipo == "INHABIL") {
                document.getElementById('error_fecha').innerHTML = "El dia seleccionado es Inhabil, por favor seleccione otro";
                document.getElementById('submit').disabled = true;
                Swal.fire(
                    'Lo sentimos!',
                    'El dia seleccionado es Inhabil.',
                    'error'
                )
            } else {
                document.getElementById('error_fecha').innerHTML = "";
                document.getElementById('submit').disabled = false;
            }

        }
    });


}

function tipo_notificacion(aux) {
    sintesis = document.getElementById('sintesis');

    if (aux == "ESTRADOS") {
        // input_email.required = false;
        //input_direccion.required = false;
        // sintesis.required = false;
    } else if (aux == 2) {
        // $('#modalOficio').modal('show'); // abrir
        // input_email.required = false;
        //   input_direccion.required = true;
        // sintesis.required = false;
    } else if (aux = 3) {
        //  input_email.required = true;
        //  input_direccion.required = false;
        //  sintesis.required = true;
    }
    else if (aux = "COMPARECENCIA") {
        //  input_email.required = true;
        // input_direccion.required = false;
        //  sintesis.required = false;
    } else if (aux = "CORREO CERTIFICADO") {
        //  input_email.required = true;
        //  input_direccion.required = false;
        //   sintesis.required = false;
    } else if (aux = "EDICTOS") {
        // input_email.required = true;
        //  input_direccion.required = false;
        //  sintesis.required = false;
    } else if (aux = "LISTA DE BOLETÍN ELECTRÓNICO") {
        //  input_email.required = true;
        // input_direccion.required = false;
        //  sintesis.required = false;
    } else if (aux = "PERSONAL") {
        //  input_email.required = false;
        //  input_direccion.required = true;
        //  sintesis.required = false;
    }

}

function modalcorreo_acuerdos(id, id_persona, id_expediente) {
    email = document.getElementById('modal_email' + id).value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_email_persona/" + email + "/" + id_persona + "/" + id_expediente,
        success: function (data) {
            if (data.user != null) {
                document.getElementById("error_emailactor" + id).innerHTML = "El email que intenta registrar ya se encuentra asignado a este expediente.";
            } else {
                document.getElementById("error_emailactor" + id).innerHTML = "";
                var x = $('#correo_' + id + ' ');
                option = new Option(email, id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: email
                    }
                });
                //$('#correo_' + id).select2({})
                $('#modalEmail' + id + ' .close').click();
                $('.modalEmail' + id + '.in').modal('hide');
            }



        }
    });
}

//modal para las autoridades ligadas al acuerdo/sentencia
function modalcorreo_acuerdos_aut() {
    id_persona = document.getElementById('autoridad_aux_email').value;
    id_expediente = document.getElementById('expediente_aux_email').value;
    email = document.getElementById('email_aut').value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_email_persona/" + email + "/" + id_persona + "/" + id_expediente,
        success: function (data) {
            if (data.user != null) {
                document.getElementById("error_modal_email").innerHTML = "El email que intenta registrar ya se encuentra asignado a este expediente.";
            } else {
                document.getElementById("error_modal_email").innerHTML = "";
                var x = $('#correo_' + id_persona + ' ');
                option = new Option(email, id_persona, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: email
                    }
                });
                $('#correo_' + id_persona).select2({
                })
                $('#modalEmail .close').click();
                $('.modalEmail.in').modal('hide');
                $("#email_aut").empty();
            }
        }
    });
}


function modalcorreo_acuerdos_sent(id, id_persona, id_expediente) {
    email = document.getElementById('modal_email_sent' + id).value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_email_persona/" + email + "/" + id_persona + "/" + id_expediente,
        success: function (data) {
            if (data.user != null) {
                document.getElementById("error_emailactor" + id).innerHTML = "El email que intenta registrar ya se encuentra asignado a este expediente.";
            } else {
                document.getElementById("error_emailactor" + id).innerHTML = "";

                var x = $('#correo_' + id + ' ');
                option = new Option(email, id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: email
                    }
                });
                $('#correo_' + id).select2({
                })
                $('#modalEmailSentencias' + id + ' .close').click();
                $('.modalEmailSentencias' + id + '.in').modal('hide');
            }



        }
    });
}

function traer_acuerdos(fecha) {
    $("#detalles2 td").remove();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_acuerdos/" + fecha,
        success: function (data) {
            if (data.acuerdos.length > 0) {
                data.acuerdos.forEach(acuerdo => {

                    var tabla = document.getElementById("detalles2");
                    var row = tabla.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    cell1.innerHTML = '<td>' + acuerdo.id + '</td>';
                    cell2.innerHTML = '<td>' + acuerdo.num_expediente + '</td>';
                    cell3.innerHTML = '<td>' + acuerdo.tipo + '</td>';
                    if (acuerdo.nombre != null && acuerdo.apellido_paterno != null) {
                        cell4.innerHTML = '<td>' + acuerdo.nombre + " " + acuerdo.apellido_paterno + " " + acuerdo.apellido_materno + '</td>';
                    } else if (acuerdo.razon_social != null) {
                        cell4.innerHTML = '<td>' + acuerdo.razon_social + '</td>';
                    } else {
                        cell4.innerHTML = '<td>' + acuerdo.nombre + '</td>';
                    }

                    cell5.innerHTML = '<td>' + acuerdo.tipo_acuerdo + '</td>';
                    cell6.innerHTML = '<td>' + acuerdo.sintesis + '</td>';
                    document.getElementById('vista').href = '/vista_previa_boletin/' + fecha;
                    document.getElementById('btn-vista').disabled = false;

                });//END FOREACH PROMOCIONES

                //AGREGAMOS LAS SENTENCIAS
                if (data.sentencias.length > 0) {
                    data.sentencias.forEach(sentencia => {

                        var tabla = document.getElementById("detalles2");
                        var row = tabla.insertRow(1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);
                        cell1.innerHTML = '<td>' + sentencia.id + '</td>';
                        cell2.innerHTML = '<td>' + sentencia.num_expediente + '</td>';
                        cell3.innerHTML = '<td>' + sentencia.tipo + '</td>';

                        if (sentencia.nombre != null && sentencia.apellido_paterno) {
                            cell4.innerHTML = '<td>' + sentencia.nombre + " " + sentencia.apellido_paterno + " " + sentencia.apellido_materno + '</td>';
                        } else if (sentencia.razon_social != null) {
                            cell4.innerHTML = '<td>' + sentencia.razon_social + '</td>';
                        } else {
                            cell4.innerHTML = '<td>' + sentencia.nombre + '</td>';
                        }

                        cell5.innerHTML = '<td>' + sentencia.tipo_sentencia + '</td>';
                        cell6.innerHTML = '<td>' + sentencia.sintesis + '</td>';
                        document.getElementById('vista').href = '/vista_previa_boletin/' + fecha;
                        document.getElementById('btn-vista').disabled = false;

                    });//END FOREACH PROMOCIONES
                    document.getElementById('error_fecha').value = 0;
                    document.getElementById('error_fecha').innerHTML = "";

                }

                document.getElementById('error_fecha').value = 0;
                document.getElementById('error_fecha').innerHTML = "";

            } else {
                Swal.fire(
                    'Lo sentimos!',
                    'No se han encontrado acuerdos para este dia.',
                    'error'
                )
                document.getElementById('vista').href = '#';
                document.getElementById('btn-vista').disabled = true;
                document.getElementById('error_fecha').value = 1;
                document.getElementById('error_fecha').innerHTML = "No se han encontrado acuerdos para este dia.";
            }
        }
    });

}

function validaBoletin(fecha) {
    var token = $("#token").val();
    var dataString = $('#formulario').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: '/validaBoletin/' + fecha,
        data: dataString,
        success: function (data) {
            if (data.boletin) {
                document.getElementById('error_fecha').innerHTML = "La fecha que intenta publicar se ecuentra en procceso de firma, por favor seleccione otra.";
                document.getElementById('error_fecha').value = 1;
            } else {
                document.getElementById('error_fecha').innerHTML = "";
                document.getElementById('error_fecha').value = 0;
            }

        }
    });

}

function traer_acuerdos_boletin() {
    $("#detalles td").remove();
    anio = document.getElementById('anio').value;
    mes = document.getElementById('mes').value;
    dia = document.getElementById('dia').value;
    var token = $("#token").val();
    var dataString = $('#formulario').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: '/traer_acuerdos_boletin/' + anio + "/" + mes + "/" + dia,
        data: dataString,
        success: function (data) {
            if (data.boletines) {

                data.boletines.forEach(boletin => {

                    var tabla = document.getElementById("detalles");
                    var row = tabla.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = '<td><a href="BOLETINELECTRONICO/' + boletin.boletin + '" target="_blank" class="btn btn-danger waves-effect waves-light"   role="button" ">  <i class="mdi mdi-file-pdf-outline"> ' + boletin.fecha_publicacion + '.pdf</i></a></td>';
                    cell2.innerHTML = '<td>' + boletin.fecha + '</td>';
                    cell3.innerHTML = '<td><a href="BOLETINELECTRONICO/' + boletin.boletin + '">Descargar</a></td>';
                });//END FOREACH PROMOCIONES
            } else {

                alert('no hay boletines');
            }

        }

    });
}

function traer_cedulas() {
    $("#detalles td").remove();
    fecha = document.getElementById('fecha').value;
    tipo = document.getElementById('tipo').value;
    if (fecha != "" && tipo != "") {
        var token = $("#token").val();
        var dataString = $('#formulario').serialize(); // carga todos 
        $.ajax({
            type: "get",
            method: 'get',
            url: '/traer_cedulas/' + fecha + "/" + tipo,
            data: dataString,
            success: function (data) {
                if (data.acuerdos) {
                    if (data.acuerdos.length > 0) {

                        data.acuerdos.forEach(acuerdo => {

                            var tabla = document.getElementById("detalles");
                            var row = tabla.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                            var cell6 = row.insertCell(5);
                            var cell7 = row.insertCell(6);
                            var cell8 = row.insertCell(7);
                            cell1.innerHTML = '<td>' + acuerdo.id + '</td>';
                            cell2.innerHTML = '<td>' + acuerdo.num_expediente + '</td>';
                            cell3.innerHTML = '<td>' + acuerdo.num_folio + '</td>';
                            cell4.innerHTML = '<td>' + acuerdo.tipo + '</td>';
                            cell5.innerHTML = '<td>' + acuerdo.nombre + " " + acuerdo.apellido_paterno + " " + acuerdo.apellido_materno + " " + acuerdo.razon_social + '</td>';
                            cell6.innerHTML = '<td>' + acuerdo.tipo_acuerdo + '</td>';
                            cell7.innerHTML = '<td>' + acuerdo.tipo_noti + '</td>';
                            cell8.innerHTML = '<td>' + acuerdo.sintesis + '</td>';

                            document.getElementById('total').value = "Mostrando " + data.acuerdos.length + " resultados";
                            document.getElementById('zip').href = "descargar_zip_cedulas/" + fecha + "/" + tipo;
                            document.getElementById('display_descarga').style.display = 'block';
                        });//END FOREACH PROMOCIONES
                    } else {
                        document.getElementById('total').value = "Mostrando " + data.acuerdos.length + " resultados";
                        document.getElementById('display_descarga').style.display = 'none';
                    }

                }
            }

        });

    }
}

function volver_bandeja() {
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('mensaje').style.display = 'none';
}

function traer_notificacion(id) {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('mensaje').style.display = 'block';
    $("#detalles td").remove();
    var dataString = $('#formulario').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: '/traer_notificacion/' + id,
        data: dataString,
        success: function (data) {
            if (data.notificacion) {
                document.getElementById('author' + id).className = "inbox-item-author ";
                document.getElementById('text' + id).className = "inbox-item-text ";
                document.getElementById('date' + id).className = "inbox-item-date ";
                document.getElementById('date' + id).innerHTML = data.notificacion.created_at;
                var tabla = document.getElementById("detalles");

                var row = tabla.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = '<td>Ver registro:<td/>';
                cell2.innerHTML = '<td><a href="' + data.notificacion.ruta + '" target="_blank" class="btn btn-danger waves-effect waves-light"   role="button" ">  <i class="ion ion-md-send">Ver notificación</i></a><hr></td>';




                document.getElementById('nombre_user').innerHTML = "De: " + data.notificacion.name_envia + " " + data.notificacion.user2_apellido_p + " " + data.notificacion.user2_apellido_m + " (" + data.notificacion.email + ")" + "<br>" +
                    "Para: " + data.notificacion.name + " " + data.notificacion.apellido_p + " " + data.notificacion.apellido_m
                    + "<br>" + data.notificacion.created_at;
                if (data.notificacion.img_2 != "" && data.notificacion.img_2 != null) {
                    document.getElementById('img_user').src = "/img/perfiles/" + data.notificacion.img_2;
                } else {
                    document.getElementById('img_user').src = "/img/logo.png";
                }

                document.getElementById('titulo').innerHTML = data.notificacion.tipo;
                document.getElementById("a_elim").href = "javascript:eliminar_not_user(" + id + ");";
                document.getElementById('notificacion').value = id;

                var row = tabla.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = '<td>Mensaje:<td/>';
                cell2.innerHTML = '<td><div id="notificacion">' + data.notificacion.observacion + '<br></div></td>';


                var row = tabla.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = '<td>Estado de la notificación:<td/>';
                if (data.notificacion.estado == "PENDIENTE") {
                    cell2.innerHTML = '<td>No leída</td>';

                } else {
                    cell2.innerHTML = '<td>Leída</td>';
                    $("#notifi" + id).prop("checked", true);
                }
            }

        }

    });
}

function eliminar_not_user(id) {
    Swal.fire({
        /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
        title: '¿Está seguro que desea eliminar la notificación?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            var token = $("#token").val();
            $.ajax({
                type: "get",
                method: 'get',
                url: "/elimina_notificacion_user/" + id,
                success: function (data) {
                    if (data == 1) {
                        Swal.fire(
                            'Eliminada',
                            'La notificación se ha eliminado correctamente.',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error',
                            'No se ha podido eliminar la notificación.',
                            'warning'
                        )
                    }
                }
            });
        }
    })
}

function eliminar_todas_not_user() {
    Swal.fire({
        /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
        title: '¿Está seguro que desea eliminar todas las notificaciones?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/elimina_todas_notificacion_user/",
                success: function (data) {
                    if (data == 1) {
                        Swal.fire(
                            'Eliminada',
                            'Las notificaciones se han eliminado correctamente.',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error',
                            'No se han podido eliminar las notificaciones.',
                            'warning'
                        )
                    }
                }
            });
        }
    })
}

function reenviar_not() {
    $("#modal").modal();
}


function notificacion_no_leida(id) {

    var dataString = $('#formulario').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: '/cambia_estado_notificacion/' + id,
        data: dataString,
        success: function (data) {
            //    console.log(data.not_aux);
            if (data.not_aux) {
                document.getElementById('author' + id).className = "inbox-item-author pendiente";
                document.getElementById('text' + id).className = "inbox-item-text pendiente";
                document.getElementById('date' + id).className = "inbox-item-date pendiente";




            }

        }

    });
}








////////////////////////////////////////////////////////////////////////////////////////OFICIALIA DE PARTES NUEVOS CAMBIOS
function eliminarFilaOficialia(table, value, id, array_aux) {
    document.getElementById(table).deleteRow(value);
    recorre_tabla_representantes(table, 1, array_aux);
    if (table == "presunto_dirs") {
        document.getElementById('falta_pre').deleteRow(value);
    }
}

function eliminarFilaOficialiaId(table, value, id, array_aux) {
    document.getElementById(table.id).deleteRow(value);
    recorre_tabla_representantes(table.id, 1, array_aux.id);
    if (table.id == "presunto_dirs") {
        document.getElementById('falta_pre').deleteRow(value);
    }
}

function traerDireccionesDelegado(tipo, input, table_aux, array_auxiliar, value) {
    // table = "demandados_table";//nombre de la tabla
    if (value != "") {
        table = table_aux;
        array_aux = array_auxiliar; //nombre del array
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traerDirections/" + value,
            success: function (data) {
                if (data.direcciones) {
                    if (data.direcciones.numero == "") {
                        numero = ""
                    } else {
                        numero = data.direcciones.numero;
                    }
                    direccion = data.direcciones.calle + ' No.' + data.direcciones.numero_ext + ' Int. ' + numero + ' Municipio: ' + data.direcciones.municipio + ' Estado: ' + data.direcciones.municipio;
                } else {
                    direccion = "Sin domicilio registrado";
                }
                Swal.fire({
                    /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
                    title: '¿La direccion del ' + tipo + ' seleccionado es correcta?',
                    text: direccion,
                    icon: 'question',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Si`,
                    denyButtonText: `No`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        //Agregar a la tabla

                        x = document.getElementById(input);
                        y = x.options[x.selectedIndex].text;
                        z = x.options[x.selectedIndex].value;
                        var tabla = document.getElementById(table);
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);
                        var cell7 = row.insertCell(6);
                        if (data.direcciones) {
                            if (data.direcciones.numero == "") {
                                numero = ""
                            } else {
                                numero = data.direcciones.numero;
                            }
                            direccion = data.direcciones.calle + ' No.' + data.direcciones.numero_ext + ' Int.' + numero + ' Municipio: ' + data.direcciones.municipio + ' Estado: ' + data.direcciones.municipio;
                        } else {
                            direccion = "Sin domicilio registrado " + '<a type="button" target="blank" class="btn btn-success waves-effect waves-light btn-success btn-sm" href="/crear_direccion/' + data.value + '"role="button"><i class="mdi mdi-plus-box"></i></a>';
                        }
                        cell1.innerHTML = '<input type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaOficialiaId(' + table + ',this.parentNode.parentNode.rowIndex,' + z + ',' + array_aux + ');recorre_tabla_representantes(table,1,array_aux);">';
                        cell2.innerHTML = '<select class="form-control" style="width: 100%" name="' + array_aux + z + '" id="' + array_aux + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                        cell3.innerHTML = '<select data-placeholder="Ingrese representante(s) ..." id="representante' + array_aux + z + '" name="representante' + array_aux + z + '[]" style="width: 100%; text-transform:uppercase;" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase();" class="form-control" multiple="multiple"></select>';
                        cell4.innerHTML = '<select data-placeholder="Ingrese delegado(s) ..." id="delegado' + array_aux + z + '" name="delegado' + array_aux + z + '[]" style="width:100%" class="form-control" multiple="multiple"></select>';
                        cell5.innerHTML = '<select class="form-control select2-multiple" data-placeholder="Seleccione una opción ..." multiple="multiple" style="width: 100%" name="abogados' + array_aux + z + '[]" id="abogados' + array_aux + z + '"data-toggle="select2">';
                        cell6.innerHTML = '<select data-placeholder="Ingrese autorizados ..." id="autorizado' + array_aux + z + '" name="autorizado' + array_aux + z + '[]" style="width: 100%"  class="form-control" multiple="multiple"></select>';

                        cell7.innerHTML = direccion;
                        $('#representante' + array_aux + z).select2({ tags: true })
                        $('#delegado' + array_aux + z).select2({ tags: true })
                        //AGREGAMOS LOS ABOGADOS AL INPUT DE LOS ABOGADOS
                        select_aux1 = document.getElementById('abogados' + array_aux + z);
                        data.abogados.forEach(abogado => {
                            option = document.createElement("option");
                            option.text = abogado.nombre + " " + abogado.apellido_paterno + " " + abogado.apellido_materno + ". N° Cédula: " + abogado.num_cedula;
                            option.value = abogado.id;
                            select_aux1.add(option, select_aux1[0]);
                        });//END FOR EACH
                        $('#abogados' + array_aux + z).select2({})
                        $('#autorizado' + array_aux + z).select2({ tags: true })
                        recorre_tabla_representantes(table, 1, array_aux);

                        if (tipo == "Presunto responsable") {
                            var1 = "falta_pre";
                            var2 = "faltas_presunto";
                            var tabla = document.getElementById('falta_pre');
                            var array_presunto = document.getElementById('faltas_presunto');
                            var row = tabla.insertRow(1);
                            row.style.backgroundColor = "white";
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            cell1.innerHTML = '<select class="form-control" style="width: 100%" name="presunto_' + z + '" id="presunto_' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            /*   cell2.innerHTML = '<select onchange="recorre_tabla_general(var1,0,0,var2)"; class="form-control" style="width: 100%" name="presunto_tipo' + z + '" id="presunto_tipo' + z + '"  data-toggle="select2"></select>'; */
                            cell2.innerHTML = '<select class="form-control select2-multiple"  onchange="recorre_tabla_general(var1,0,0,var2);" data-placeholder="Seleccione una opción ..." multiple="multiple" style="width: 100%" name="presunto_tipo' + z + '[]" id="presunto_tipo' + z + '"data-toggle="select2">';
                            cell3.innerHTML = '<input type="text"  onchange="recorre_tabla_general(var1,0,0,var2);" name="faltas_nograves_presunto_' + z + '"  id="faltas_nograves_presunto_' + z + '" data-role="tagsinput" placeholder="Agregar faltas" >';
                            $('#faltas_nograves_presunto_' + z + '').tagsinput();
                            //traer_tipos_faltas('presunto_tipo' + z);
                            //AGREGAMOS LOS ABOGADOS AL INPUT DE LOS ABOGADOS
                            select_aux1 = document.getElementById('presunto_tipo' + z);
                            data.faltas.forEach(falta => {
                                option = document.createElement("option");
                                option.text = falta.tipo_falta + '-' + falta.tipo;
                                option.value = falta.id;
                                //console.log(falta.tipo);
                                select_aux1.add(option, select_aux1[0]);
                            });//END FOR EACH
                            $('#presunto_tipo' + z).select2({})
                            recorre_tabla_general('falta_pre', '0', '0', 'faltas_presunto');
                        } else if (tipo == "Particular") {
                            var1 = "particulares_vin";
                            var2 = "faltas_particular_arreglo";
                            var tabla = document.getElementById('particulares_vin');
                            var row = tabla.insertRow(1);
                            row.style.backgroundColor = "white";
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            cell1.innerHTML = '<select class="form-control" style="width: 100%" name="particular_vin_' + z + '" id="particular_vin_' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            cell2.innerHTML = '<select class="form-control select2-multiple"  onchange="recorre_tabla_general(var1,0,0,var2);" data-placeholder="Seleccione una opción ..." multiple="multiple" style="width: 100%" name="particular_tipo' + z + '[]" id="particular_tipo' + z + '"data-toggle="select2">';
                            cell3.innerHTML = '<input type="text"  onchange="recorre_tabla_general(var1,0,0,var2);" name="faltas_nograves_particular_' + z + '"  id="faltas_nograves_particular_' + z + '" data-role="tagsinput" placeholder="Agregar faltas" >';
                            $('#faltas_nograves_particular_' + z + '').tagsinput();
                            //traer_tipos_faltas('presunto_tipo' + z);
                            //AGREGAMOS LOS ABOGADOS AL INPUT DE LOS ABOGADOS
                            select_aux1 = document.getElementById('particular_tipo' + z);
                            data.faltas.forEach(falta => {
                                option = document.createElement("option");
                                option.text = falta.tipo_falta + '-' + falta.tipo;
                                option.value = falta.id;
                                //console.log(falta.tipo);
                                select_aux1.add(option, select_aux1[0]);
                            });//END FOR EACH
                            $('#particular_tipo' + z).select2({})
                            recorre_tabla_general('particulares_vin', '0', '0', 'faltas_particular_arreglo');

                        }

                        //Agregar a la tabla
                    } else if (result.isDenied) {
                    }
                })

            }
        });
    }
}

function checa(value) {
    // console.log(value);
    let $select = $(value);

    let selecteds = [];

    // Buscamos los option seleccionados
    $select.children(':selected').each((idx, el) => {
        // Obtenemos los atributos que necesitamos
        selecteds.push({
            value: el.value
        });
    });

    //
    document.getElementById('faltas_presunto').value = selecteds;
}

function recorre_tabla_general(tabla, columna, fin, arreglo_aux) {
    var table = document.getElementById(tabla);
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = columna, m = table.rows[r].cells.length - fin; c < m; c++) {
            var input = table.rows[r].cells[c].innerHTML;
            limite = "50",
                separador = "id=",
                arregloDeSubCadenas = input.split(separador, limite);
            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
            arreglo.push(arregloDeSubCadenas2[1]);
        }
    }
    //console.log(arreglo);
    document.getElementById(arreglo_aux).value = arreglo;
}

function traer_tipos_faltas(input) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_tipos_falta",
        success: function (data) {
            select_aux = document.getElementById(input);
            data.tipos.forEach(tipo => {
                option = document.createElement("option");
                option.text = tipo.tipo_falta;
                option.value = tipo.id;
                select_aux.add(option, select_aux[0]);
            });

        }
    });
}


function recorre_tabla_representantes(tabla, columna, arreglo_aux) {
    var table = document.getElementById(tabla);
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = columna, m = table.rows[r].cells.length - 1; c < m; c++) {
            var input = table.rows[r].cells[c].innerHTML;
            limite = "50",
                separador = "id=",
                arregloDeSubCadenas = input.split(separador, limite);
            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
            arreglo.push(arregloDeSubCadenas2[1]);
        }
    }
    document.getElementById(arreglo_aux).value = arreglo;
}



//////////////////////////////////////////////////////////////
//PRESUNTO edit
////////////////////////////////////////////////////////////////////////////////////////
function traerPresunto_edit(value) {

    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerPresunto/" + value,
        success: function (data) {
            if (data.presunto_dir) {
                if (data.presunto_dir.numero == "") {
                    numero = ""
                } else {
                    numero = data.presunto_dir.numero;
                }

                Swal.fire({
                    /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
                    title: '¿La direccion del Presunto Responsable seleccionado es correcta?',
                    text: data.presunto_dir.calle + ' No.' + data.presunto_dir.numero_ext + ' Int.' + numero + ' Municipio: ' + data.presunto_dir.municipio + ' Estado: ' + data.presunto_dir.municipio,

                    icon: 'question',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Si`,
                    denyButtonText: `No`,
                }).then((result) => {

                    if (result.isConfirmed) {

                        //Agregar a la tabla
                        x = document.getElementById('presunto_resp');
                        y = x.options[x.selectedIndex].text;
                        z = x.options[x.selectedIndex].value;


                        var rows = document.getElementById("presunto_dirs").rows.length;
                        if (rows <= 1) {
                            var tabla = document.getElementById("presunto_dirs");
                            var row = tabla.insertRow(rows);
                            row.style.backgroundColor = "white";
                            var cell1 = row.insertCell(0);


                            cell1.innerHTML = '<select class="form-control" style="width: 100%" name="direction" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            $("#presunto_resp option[value='" + value + "']").remove();
                            recorre_tabla_directions_presunto();
                        } else {
                            var comprueba = document.getElementById(z);
                            if (comprueba == null) {
                                var tabla = document.getElementById("presunto_dirs");
                                var row = tabla.insertRow(rows);
                                row.style.backgroundColor = "white";
                                var cell1 = row.insertCell(0);


                                cell1.innerHTML = '<select class="form-control" style="width: 100%" name="direction" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';

                                $("#presunto_resp option[value='" + value + "']").remove();
                                recorre_tabla_directions_presunto();
                            }

                        }
                        //Agregar a la tabla

                    } else if (result.isDenied) {



                    }
                })
            } else {
                Swal.fire({
                    /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
                    title: '¿La direccion del Presunto Responsable seleccionado es correcta?',
                    text: "Sin domicilio registrado",
                    icon: 'question',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Si`,
                    denyButtonText: `No`,
                }).then((result) => {

                    if (result.isConfirmed) {

                        //Agregar a la tabla
                        x = document.getElementById('presunto_resp');
                        y = x.options[x.selectedIndex].text;
                        z = x.options[x.selectedIndex].value;


                        var rows = document.getElementById("presunto_dirs").rows.length;
                        if (rows <= 1) {
                            var tabla = document.getElementById("presunto_dirs");
                            var row = tabla.insertRow(rows);
                            row.style.backgroundColor = "white";
                            var cell1 = row.insertCell(0);


                            cell1.innerHTML = '<select class="form-control" style="width: 100%" name="direction" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            $("#presunto_resp option[value='" + value + "']").remove();
                            recorre_tabla_directions_presunto();
                        } else {
                            var comprueba = document.getElementById(z);
                            if (comprueba == null) {
                                var tabla = document.getElementById("presunto_dirs");
                                var row = tabla.insertRow(rows);
                                row.style.backgroundColor = "white";
                                var cell1 = row.insertCell(0);


                                cell1.innerHTML = '<select class="form-control" style="width: 100%" name="direction" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';

                                $("#presunto_resp option[value='" + value + "']").remove();
                                recorre_tabla_directions_presunto();
                            }

                        }
                        //Agregar a la tabla

                    } else if (result.isDenied) {



                    }
                })
            }

        }
    });


}

function notificacion_default(id, tipo) {
    chk = document.getElementById(id).checked;
    dataString = $('#formulario').serialize(); // carga todos 
    var token = $("#token").val();
    tipo = document.getElementById(tipo).value;
    if (chk == true && tipo != "") {
        chk = document.getElementById(id).value = "1";
    } else {
        chk = document.getElementById(id).value = "0";
        tipo = 0;
    }

    $.ajax({
        type: "get",
        method: 'get',
        url: "/noti_default/" + id + "/" + tipo + "/" + chk,
        data: dataString,
        success: function (data) {
        }
    });

}
//////////////////////////////////////////////////////////////

function valida_input_repetido(tipo, input, table_aux, array_auxiliar, value) {
    if (tipo == "ACTOR") {
        var cadena = document.getElementById('actores_arreglo').value;
    } else if (tipo == "Demandado") {
        var cadena = document.getElementById('demandados_arreglo').value;
    } else if (tipo == "TERCERO INTERESADO") {
        var cadena = document.getElementById('terceros_arreglo').value;
    } else if (tipo == "Presunto responsable") {
        var cadena = document.getElementById('presunto_arreglo').value;
    } else if (tipo == "Autoridad investigadora") {
        var cadena = document.getElementById('autoridad_inv_arreglo').value;
    } else if (tipo == "Autoridad sustanciadora") {
        var cadena = document.getElementById('autoridad_sus_arreglo').value;
    } else if (tipo == "Denunciante") {
        var cadena = document.getElementById('denunciantes_arreglo').value;
    } else if (tipo == "Particular") {
        var cadena = document.getElementById('particulares_arreglo').value;
    } else if (tipo == "Promovente") {
        var cadena = document.getElementById('promoventes_arreglo').value;
    } else if (tipo == "Tercero_llamado") {
        var cadena = document.getElementById('tercero_llamado_arreglo').value;
    }

    if (tipo == "Promovente") {
        if (cadena.includes(input) == true) {
            Swal.fire({
                icon: 'error',
                title: 'ATENCIÓN',
                text: 'Ya se ha seleccionado este actor anteriormente'
            })
            return false;
        } else {


            llenarPromoventes(input);


        }

        llenarPromoventes(input);
    } else {
        if (cadena.includes(value) == true) {
            Swal.fire({
                icon: 'error',
                title: 'ATENCIÓN',
                text: 'Ya se ha seleccionado este actor anteriormente'
            })
            return false;
        } else {

            traerDireccionesDelegado(tipo, input, table_aux, array_auxiliar, value);



        }
    }


}

function valida_num_expediente() {
    dataString = $('#form_carga').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_num_expediente",
        data: dataString,
        success: function (data) {
            if (data.valida) {
                document.getElementById('error_num_exp').innerHTML = "El número de expediente ingresado, ya existe";
                document.getElementById('error_num_exp').className = "text-danger";
                document.getElementById('submit_button').disabled = true;
            } else {
                document.getElementById('error_num_exp').innerHTML = "Número de expediente válido";
                document.getElementById('error_num_exp').className = "text-success";
                document.getElementById('submit_button').disabled = false;

            }
        }
    });
}

function valida_num_folio_oficialia() {
    dataString = $('#form_carga').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_num_folio_oficialia",
        data: dataString,
        success: function (data) {
            if (data.valida) {
                document.getElementById('error_num_folio').innerHTML = "El número de folio ingresado, ya existe";
                document.getElementById('error_num_folio').className = "text-danger";
                document.getElementById('submit_button').disabled = true;
            } else {
                document.getElementById('error_num_folio').innerHTML = "Número de folio válido";
                document.getElementById('error_num_folio').className = "text-success";
                document.getElementById('submit_button').disabled = false;

            }
        }
    });
}
function valida_num_folio_oficialia_input(input, input_error) {
    var token = $("#token").val();
    num_folio = document.getElementById(input).value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_num_folio_oficialia_input/" + num_folio,
        success: function (data) {
            if (data.valida) {
                //   document.getElementById(input_error).innerHTML = "El número de folio ingresado, ya existe";
                // document.getElementById(input_error).className = "text-danger";
                //document.getElementById('submit_button').disabled = true;
            } else {
                document.getElementById(input_error).innerHTML = "Número de folio válido";
                document.getElementById(input_error).className = "text-success";
                document.getElementById('submit_button').disabled = false;

            }
        }
    });
}

function valida_num_recurso(id, input_error) {
    dataString = $('#form_carga').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        data: dataString,
        url: "/valida_num_recurso/" + id,
        success: function (data) {
            if (data.valida) {
                document.getElementById(input_error).innerHTML = "El número de recurso ingresado, ya existe";
                document.getElementById(input_error).className = "text-danger";
                document.getElementById('submit_button').disabled = true;
            } else {
                document.getElementById(input_error).innerHTML = "Número de recurso válido";
                document.getElementById(input_error).className = "text-success";
                document.getElementById('submit_button').disabled = false;

            }
        }
    });
}

function valida_num_folio_acuerdo_input(input, input_error) {
    var token = $("#token").val();
    num_folio = document.getElementById(input).value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_num_folio_acuerdo_input/" + num_folio,
        success: function (data) {
            if (data.valida) {
                document.getElementById(input_error).innerHTML = "El número de folio ingresado, ya existe";
                document.getElementById(input_error).className = "text-danger";
                document.getElementById('submit_button').disabled = true;
            } else {
                document.getElementById(input_error).innerHTML = "Número de folio válido";
                document.getElementById(input_error).className = "text-success";
                document.getElementById('submit_button').disabled = false;
            }
        }
    });
}

function valida_num_folio_sentencia_input(input, input_error) {
    var token = $("#token").val();
    num_folio = document.getElementById(input).value;
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_num_folio_sentencia_input/" + num_folio,
        success: function (data) {
            if (data.valida) {
                document.getElementById(input_error).innerHTML = "El número de folio ingresado, ya existe";
                document.getElementById(input_error).className = "text-danger";
                document.getElementById('submit_button').disabled = true;
            } else {
                document.getElementById(input_error).innerHTML = "Número de folio válido";
                document.getElementById(input_error).className = "text-success";
                document.getElementById('submit_button').disabled = false;
            }
        }
    });
}

function subir_archivos(value) {
    document.getElementById("div_subir").innerHTML = "";
    files = document.getElementById('archivos').files
    for (var i = 0; i < files.length; i++) {

        var padre = document.getElementById("div_subir");
        //aquí agregamos el componente de tipo input
        var div = document.createElement("div");
        div.setAttribute("id", 'div_principal' + i);
        div.classList.add('col-lg-12');

        var div2 = document.createElement("div");
        div2.setAttribute("id", 'card_principal' + i);
        div2.classList.add('card-box');

        var form_group = document.createElement("div");
        form_group.setAttribute("id", 'form-group_principal' + i);
        form_group.classList.add('form-group');

        var form_group_aux = document.createElement("div");
        form_group_aux.setAttribute("id", 'form-group_aux' + i);
        form_group_aux.classList.add('form-group');


        input = document.createElement("select");
        input.setAttribute("id", 'select' + i);
        input.setAttribute("class", 'form-control select2-multiple');
        input.setAttribute("name", 'select' + i);
        input.setAttribute('required', '');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción...');
        input.setAttribute('onchange', 'cambiar_opcion_archivos(' + i + ');');

        label = document.createElement("Label");
        label.setAttribute('for', 'userName');
        label.innerHTML = "Seleccione el tipo de documento";


        label2 = document.createElement("Label");
        label2.setAttribute('for', 'userName2');
        label2.innerHTML = "Documento " + (i + 1) + ": " + files[i].name;

        span = document.createElement('span');
        span.setAttribute('class', 'text-danger')
        span.innerHTML = "*";



        //AGREGA TODOS LOS DIV Y INPUT
        padre.appendChild(div);
        div.appendChild(div2);
        div2.appendChild(label2);
        div2.appendChild(form_group_aux);
        form_group_aux.appendChild(label);
        form_group_aux.appendChild(input);
        div2.appendChild(form_group);


        //label.appendChild(span);   
        // div.appendChild(div3);        
        $('#select' + i).select2({});

        select_aux = document.getElementById('select' + i);
        var x = $('#select' + i);
        documentos = ['Seleccione una opción...', 'ACUERDO', 'PROMOCION', 'AMPARO', 'SENTENCIA', 'RECURSO', 'PROMOCION DE RECURSO', 'AMPARO DE RECURSO', 'ACUERDO DE RECURSO', 'SENTENCIA DE RECURSO', 'DOCUMENTO', 'DOCUMENTO DEL RECURSO'];
        documentos.forEach(documento => {
            if (documento == "Seleccione una opción...") {
                $('#select' + i).append(new Option(documento, ""))

            } else {
                $('#select' + i).append(new Option(documento, documento))

            }
        });//END FOR EACH      
    }

}
function cambiar_opcion_archivos(value) {
    document.getElementById("form-group_principal" + value).innerHTML = "";
    tipo = document.getElementById('select' + value).value;
    var padre = document.getElementById("form-group_principal" + value);

    var form_group = document.createElement("div");
    form_group.setAttribute("id", 'form-group_2' + value);
    form_group.classList.add('form-group');

    var div = document.createElement("div");
    div.setAttribute("id", 'div' + value);
    div.classList.add('col-lg-12');
    padre.appendChild(div);
    div.appendChild(form_group);

    if (tipo == "ACUERDO") {

        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de acuerdo";

        input = document.createElement("select");
        input.setAttribute("id", 'tipo_acuerdo' + value);
        input.setAttribute("class", 'form-control select2-multiple');
        input.setAttribute("name", 'tipo_acuerdo' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label2 = document.createElement("Label");
        label2.setAttribute('for', 'label');
        label2.innerHTML = "¿Desea relacionarlo a una promoción?";

        pregunta_1 = document.createElement("select");
        pregunta_1.setAttribute("id", 'pregunta_1' + value);
        pregunta_1.setAttribute("class", 'form-control');
        pregunta_1.setAttribute("name", 'pregunta_1' + value);
        pregunta_1.setAttribute('required', 'true');
        pregunta_1.setAttribute('onchange', 'cambiar_opcion_promocion(' + value + ');');
        pregunta_1.setAttribute('data-toggle', 'select2');
        pregunta_1.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label3 = document.createElement("Label");
        label3.setAttribute('for', 'label');
        label3.innerHTML = "Seleccione una o varias promociones";

        promociones = document.createElement("select");
        promociones.setAttribute("id", 'promociones' + value);
        promociones.setAttribute("class", 'form-control select2-multiple');
        promociones.setAttribute("name", 'promociones' + value + '[]');
        promociones.setAttribute('required', 'true');
        promociones.setAttribute('multiple', 'multiple');
        promociones.setAttribute('data-toggle', 'select2');
        promociones.setAttribute('data-placeholder', 'Seleccione una opción ...');
        promociones.setAttribute('style', 'width: 100%');
        promociones.setAttribute('disabled', 'true');

        label4 = document.createElement("Label");
        label4.setAttribute('for', 'label');
        label4.innerHTML = "¿Desea relacionarlo a un acuerdo?";

        pregunta_2 = document.createElement("select");
        pregunta_2.setAttribute("id", 'pregunta_2' + value);
        pregunta_2.setAttribute("class", 'form-control select2-multiple');
        pregunta_2.setAttribute("name", 'pregunta_2' + value);
        pregunta_2.setAttribute('required', 'true');
        pregunta_2.setAttribute('data-toggle', 'select2');
        pregunta_2.setAttribute('data-placeholder', 'Seleccione una opción ...');
        pregunta_2.setAttribute('onchange', 'cambiar_opcion_promocion_acuerdo(' + value + ');');

        label5 = document.createElement("Label");
        label5.setAttribute('for', 'label');
        label5.innerHTML = "Seleccione un acuerdo";

        acuerdo = document.createElement("select");
        acuerdo.setAttribute("id", 'acuerdo' + value);
        acuerdo.setAttribute("class", 'form-control select2-multiple');
        acuerdo.setAttribute("name", 'acuerdo' + value);
        acuerdo.setAttribute('required', 'true');
        acuerdo.setAttribute('disabled', 'true');
        acuerdo.setAttribute('data-toggle', 'select2');
        acuerdo.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label6 = document.createElement("Label");
        label6.setAttribute('for', 'label');
        label6.innerHTML = "Seleccione el usuario que realizó el acuerdo";

        genero = document.createElement("select");
        genero.setAttribute("id", 'genero' + value);
        genero.setAttribute("class", 'form-control select2-multiple');
        genero.setAttribute("name", 'genero' + value);
        genero.setAttribute('required', 'true');
        genero.setAttribute('data-toggle', 'select2');
        genero.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label7 = document.createElement("Label");
        label7.setAttribute('for', 'label');
        label7.innerHTML = "Seleccione el usuario que revisó el acuerdo";

        reviso = document.createElement("select");
        reviso.setAttribute("id", 'reviso' + value);
        reviso.setAttribute("class", 'form-control select2-multiple');
        reviso.setAttribute("name", 'reviso' + value);
        reviso.setAttribute('required', 'true');
        reviso.setAttribute('data-toggle', 'select2');
        reviso.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label8 = document.createElement("Label");
        label8.setAttribute('for', 'label2');
        label8.innerHTML = "Ingrese el número de folio del acuerdo";

        num_folio_acuerdo = document.createElement("input");
        num_folio_acuerdo.setAttribute("id", 'num_folio_acuerdo' + value);
        num_folio_acuerdo.setAttribute("class", 'form-control');
        num_folio_acuerdo.setAttribute("name", 'num_folio_acuerdo' + value);
        num_folio_acuerdo.setAttribute('type', 'number');
        num_folio_acuerdo.setAttribute('required', 'true');
        num_folio_acuerdo.setAttribute('maxlength', '6');
        num_folio_acuerdo.setAttribute('placeholder', 'Ingrese el número de folio del acuerdo ...');
        num_folio_acuerdo.setAttribute('onchange', 'valida_num_folio_acuerdo_input("num_folio_acuerdo' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);




        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label2);
        form_group.appendChild(pregunta_1);

        form_group.appendChild(label3);
        form_group.appendChild(promociones);

        form_group.appendChild(label4);
        form_group.appendChild(pregunta_2);

        form_group.appendChild(label5);
        form_group.appendChild(acuerdo);

        form_group.appendChild(label6);
        form_group.appendChild(genero);

        form_group.appendChild(label7);
        form_group.appendChild(reviso);

        form_group.appendChild(label8);
        form_group.appendChild(num_folio_acuerdo);
        form_group.appendChild(div_error);
        $('#promociones' + value).select2();
        $('#tipo_acuerdo' + value).select2();
        $('#pregunta_1' + value).select2();
        $('#pregunta_2' + value).select2();
        $('#acuerdo' + value).select2();
        $('#genero' + value).select2();
        $('#reviso' + value).select2();



        traer_tipos_acuerdo('tipo_acuerdo' + value);
        agrega_options('pregunta_1' + value);
        agrega_options('pregunta_2' + value);
        traer_usuarios('genero' + value);
        traer_usuarios('reviso' + value);


    } else if (tipo == "PROMOCION") {
        input = document.createElement("select");
        input.setAttribute("id", 'tipo_promo' + value);
        input.setAttribute("class", 'form-control');
        input.setAttribute("name", 'tipo_promo' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de promoción";


        label2 = document.createElement("Label");
        label2.setAttribute('for', 'label2');
        label2.innerHTML = "Ingrese el número de folio de la promoción";

        num_folio = document.createElement("input");
        num_folio.setAttribute("id", 'num_folio' + value);
        num_folio.setAttribute("class", 'form-control');
        num_folio.setAttribute("name", 'num_folio' + value);
        num_folio.setAttribute('type', 'number');
        num_folio.setAttribute('required', 'true');
        num_folio.setAttribute('maxlength', '6');
        num_folio.setAttribute('placeholder', 'Ingrese el número de folio de la promoción ...');
        num_folio.setAttribute('onchange', 'valida_num_folio_oficialia_input("num_folio' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);


        label3 = document.createElement("Label");
        label3.setAttribute('for', 'label3');
        label3.innerHTML = "Número de anexos";

        num_anexos = document.createElement("input");
        num_anexos.setAttribute("id", 'num_anexos' + value);
        num_anexos.setAttribute("class", 'form-control');
        num_anexos.setAttribute("name", 'num_anexos' + value);
        num_anexos.setAttribute('type', 'number');
        num_anexos.setAttribute('required', 'true');
        num_anexos.setAttribute('placeholder', 'Ingrese el número de anexos ...');
        num_anexos.setAttribute('onchange', 'num_anexos_carga(' + value + ',this.value);');

        label4 = document.createElement("Label");
        label4.setAttribute('for', 'label4');
        label4.innerHTML = "Hojas de escrito original";

        hojas_escrito = document.createElement("input");
        hojas_escrito.setAttribute("id", 'hojas_escrito' + value);
        hojas_escrito.setAttribute("class", 'form-control');
        hojas_escrito.setAttribute("name", 'hojas_escrito' + value);
        hojas_escrito.setAttribute('type', 'number');
        hojas_escrito.setAttribute('required', 'true');
        hojas_escrito.setAttribute('placeholder', 'Ingrese el número de hojas de escrito original ...');

        label5 = document.createElement("Label");
        label5.setAttribute('for', 'label5');
        label5.innerHTML = "Traslados";

        traslados = document.createElement("input");
        traslados.setAttribute("id", 'traslados' + value);
        traslados.setAttribute("class", 'form-control');
        traslados.setAttribute("name", 'traslados' + value);
        traslados.setAttribute('type', 'text');
        traslados.setAttribute('required', 'true');
        traslados.setAttribute('placeholder', 'Ingrese el número de traslados ...');

        label6 = document.createElement("Label");
        label6.setAttribute('for', 'label5');
        label6.innerHTML = "Fecha de recepción";

        fecha_recepcion = document.createElement("input");
        fecha_recepcion.setAttribute("id", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute("class", 'form-control');
        fecha_recepcion.setAttribute("name", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute('type', 'date');
        fecha_recepcion.setAttribute('required', 'true');

        label7 = document.createElement("Label");
        label7.setAttribute('for', 'label5');
        label7.innerHTML = "Suspensión";

        suspension = document.createElement("select");
        suspension.setAttribute("id", 'suspension' + value);
        suspension.setAttribute("class", 'form-control');
        suspension.setAttribute("name", 'suspension' + value);
        suspension.setAttribute('required', 'true');
        suspension.setAttribute('data-toggle', 'select2');
        suspension.setAttribute('data-placeholder', 'Seleccione una opción ...');


        label8 = document.createElement("Label");
        label8.setAttribute('for', 'label8');
        label8.innerHTML = "Tipo de recepción";

        recepcion = document.createElement("select");
        recepcion.setAttribute("id", 'recepcion' + value);
        recepcion.setAttribute("class", 'form-control');
        recepcion.setAttribute("name", 'recepcion' + value);
        recepcion.setAttribute('required', 'true');
        recepcion.setAttribute('data-toggle', 'select2');
        recepcion.setAttribute('data-placeholder', 'Seleccione una opción ...');

        span = document.createElement('span');
        span.setAttribute('class', 'text-danger')
        span.innerHTML = "*";



        //AGREGA TODOS LOS DIV Y INPUT     
        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label2);
        label2.appendChild(span);
        form_group.appendChild(num_folio);
        form_group.appendChild(div_error);
        form_group.appendChild(label3);
        label3.appendChild(span);
        form_group.appendChild(num_anexos);
        form_group.appendChild(label4);
        label4.appendChild(span);
        form_group.appendChild(hojas_escrito);

        form_group.appendChild(label5);
        label5.appendChild(span);
        form_group.appendChild(traslados);

        form_group.appendChild(label6);
        label6.appendChild(span);
        form_group.appendChild(fecha_recepcion);

        form_group.appendChild(label7);
        label7.appendChild(span);
        form_group.appendChild(suspension);


        form_group.appendChild(label8);
        label8.appendChild(span);
        form_group.appendChild(recepcion);

        $('#tipo_promo' + value).select2();
        $('#suspension' + value).select2();
        $('#recepcion' + value).select2();

        traer_tipos_promociones('tipo_promo' + value);

        agrega_options('suspension' + value);

        //AGREGA LAS OPCIONES AL 
        options = ['SELECCIONA UNA OPCIÓN', 'BUZON ELECTRONICO', 'OFICIALIA DE PARTES'];
        options.forEach(option_ => {
            if (option_ == "SELECCIONA UNA OPCIÓN") {
                $('#recepcion' + value).append(new Option(option_, ""))
            } else {
                $('#recepcion' + value).append(new Option(option_, option_))
            }
        });//END FOR EACH

    } else if (tipo == "SENTENCIA") {
        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de sentencia";

        input = document.createElement("select");
        input.setAttribute("id", 'tipo_sentencia' + value);
        input.setAttribute("class", 'form-control select2-multiple');
        input.setAttribute("name", 'tipo_sentencia' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_sentido = document.createElement("Label");
        label_sentido.setAttribute('for', 'label');
        label_sentido.innerHTML = "Seleccione sentido de la sentencia";

        input_sentido = document.createElement("select");
        input_sentido.setAttribute("id", 'tipo_sentido' + value);
        input_sentido.setAttribute("class", 'form-control select2-multiple');
        input_sentido.setAttribute("name", 'tipo_sentido' + value);
        input_sentido.setAttribute('required', 'true');
        input_sentido.setAttribute('data-toggle', 'select2');
        input_sentido.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_pregunta_recurso = document.createElement("Label");
        label_pregunta_recurso.setAttribute('for', 'label');
        label_pregunta_recurso.innerHTML = "¿Desea relacionarlo a un recurso?";

        pregunta_recurso = document.createElement("select");
        pregunta_recurso.setAttribute("id", 'pregunta_recurso' + value);
        pregunta_recurso.setAttribute("class", 'form-control select2-multiple');
        pregunta_recurso.setAttribute("name", 'pregunta_recurso' + value);
        pregunta_recurso.setAttribute('required', 'true');
        pregunta_recurso.setAttribute('data-toggle', 'select2');
        pregunta_recurso.setAttribute('data-placeholder', 'Seleccione una opción ...');
        pregunta_recurso.setAttribute('onchange', 'cambiar_opcion_recurso_sentencia(' + value + ');');

        label_recursos = document.createElement("Label");
        label_recursos.setAttribute('for', 'label');
        label_recursos.innerHTML = "Seleccione un recurso";

        recursos = document.createElement("select");
        recursos.setAttribute("id", 'recursos' + value);
        recursos.setAttribute("class", 'form-control select2-multiple');
        recursos.setAttribute("name", 'recursos' + value);
        recursos.setAttribute('required', 'true');
        recursos.setAttribute('disabled', 'true');
        recursos.setAttribute('data-toggle', 'select2');
        recursos.setAttribute('data-placeholder', 'Seleccione una opción ...');


        label_genero = document.createElement("Label");
        label_genero.setAttribute('for', 'label');
        label_genero.innerHTML = "Seleccione el usuario que realizó la sentencia";

        genero = document.createElement("select");
        genero.setAttribute("id", 'genero' + value);
        genero.setAttribute("class", 'form-control select2-multiple');
        genero.setAttribute("name", 'genero' + value);
        genero.setAttribute('required', 'true');
        genero.setAttribute('data-toggle', 'select2');
        genero.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_reviso = document.createElement("Label");
        label_reviso.setAttribute('for', 'label');
        label_reviso.innerHTML = "Seleccione el usuario que revisó la sentencia";

        reviso = document.createElement("select");
        reviso.setAttribute("id", 'reviso' + value);
        reviso.setAttribute("class", 'form-control select2-multiple');
        reviso.setAttribute("name", 'reviso' + value);
        reviso.setAttribute('required', 'true');
        reviso.setAttribute('data-toggle', 'select2');
        reviso.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_folio = document.createElement("Label");
        label_folio.setAttribute('for', 'label2');
        label_folio.innerHTML = "Ingrese el número de folio de la sentencia";

        num_folio_acuerdo = document.createElement("input");
        num_folio_acuerdo.setAttribute("id", 'num_folio_sentecia' + value);
        num_folio_acuerdo.setAttribute("class", 'form-control');
        num_folio_acuerdo.setAttribute("name", 'num_folio_sentecia' + value);
        num_folio_acuerdo.setAttribute('type', 'number');
        num_folio_acuerdo.setAttribute('required', 'true');
        num_folio_acuerdo.setAttribute('maxlength', '6');
        num_folio_acuerdo.setAttribute('placeholder', 'Ingrese el número de folio de la sentencia ...');
        num_folio_acuerdo.setAttribute('onchange', 'valida_num_folio_sentencia_input("num_folio_sentecia' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);




        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label_sentido);
        form_group.appendChild(input_sentido);

        form_group.appendChild(label_pregunta_recurso);
        form_group.appendChild(pregunta_recurso);

        form_group.appendChild(label_recursos);
        form_group.appendChild(recursos);

        form_group.appendChild(label_genero);
        form_group.appendChild(genero);

        form_group.appendChild(label_reviso);
        form_group.appendChild(reviso);

        form_group.appendChild(label_folio);
        form_group.appendChild(num_folio_acuerdo);
        form_group.appendChild(div_error);
        $('#tipo_sentencia' + value).select2();
        $('#tipo_sentido' + value).select2();
        $('#pregunta_recurso' + value).select2();
        $('#recursos' + value).select2();
        $('#acuerdo' + value).select2();
        $('#genero' + value).select2();
        $('#reviso' + value).select2();



        traer_tipos_sentencias('tipo_sentencia' + value);
        traer_tipos_sentido('tipo_sentido' + value);
        agrega_options('pregunta_recurso' + value);
        agrega_options('pregunta_2' + value);
        traer_usuarios('genero' + value);
        traer_usuarios('reviso' + value);

    } else if (tipo == "RECURSO") {

        label1 = document.createElement("Label");
        label1.setAttribute('for', 'label');
        label1.innerHTML = "Ingrese el número de recurso";

        num_recurso = document.createElement("input");
        num_recurso.setAttribute("id", 'num_recurso' + value);
        num_recurso.setAttribute("class", 'form-control');
        num_recurso.setAttribute("name", 'num_recurso' + value);
        num_recurso.setAttribute('required', 'true');
        num_recurso.setAttribute('placeholder', 'Ingrese el número de recurso ...');
        num_recurso.setAttribute('onchange', 'valida_num_recurso(' + value + ',"error_num_rec' + value + '");');

        div_error_rec = document.createElement("div");
        div_error_rec.setAttribute("id", 'error_num_rec' + value);
        div_error_rec.setAttribute("class", 'text-danger');
        div_error_rec.setAttribute("name", 'error_num_rec' + value);

        labeltiporec = document.createElement("Label");
        labeltiporec.setAttribute('for', 'label');
        labeltiporec.innerHTML = "Seleccione el tipo de recurso";

        inputtiporec = document.createElement("select");
        inputtiporec.setAttribute("id", 'tipo_recurso' + value);
        inputtiporec.setAttribute("class", 'form-control');
        inputtiporec.setAttribute("name", 'tipo_recurso' + value);
        inputtiporec.setAttribute('required', 'true');
        inputtiporec.setAttribute('data-toggle', 'select2');
        inputtiporec.setAttribute('data-placeholder', 'Seleccione una opción ...');

        labelpromo = document.createElement("Label");
        labelpromo.setAttribute('for', 'label');
        labelpromo.innerHTML = "Seleccione el(los) promoventes";

        input_promoventes = document.createElement("select");
        input_promoventes.setAttribute("id", 'promoventes' + value);
        input_promoventes.setAttribute("class", 'form-control');
        input_promoventes.setAttribute("name", 'promoventes' + value + "[]");
        input_promoventes.setAttribute('required', 'true');
        input_promoventes.setAttribute('multiple', 'true');
        input_promoventes.setAttribute('data-toggle', 'select2');
        input_promoventes.setAttribute('data-placeholder', 'Seleccione una opción ...');

        labelubicacion = document.createElement("Label");
        labelubicacion.setAttribute('for', 'label');
        labelubicacion.innerHTML = "Ubicación del recurso";

        ubicacion = document.createElement("input");
        ubicacion.setAttribute("id", 'ubicacion_rec' + value);
        ubicacion.setAttribute("class", 'form-control');
        ubicacion.setAttribute("name", 'ubicacion_rec' + value);
        ubicacion.setAttribute('required', 'true');
        ubicacion.setAttribute('placeholder', 'Ingrese la ubicación de recurso ...');


        input = document.createElement("select");
        input.setAttribute("id", 'tipo_promo' + value);
        input.setAttribute("class", 'form-control');
        input.setAttribute("name", 'tipo_promo' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de promoción";


        label2 = document.createElement("Label");
        label2.setAttribute('for', 'label2');
        label2.innerHTML = "Ingrese el número de folio de la promoción";

        num_folio = document.createElement("input");
        num_folio.setAttribute("id", 'num_folio' + value);
        num_folio.setAttribute("class", 'form-control');
        num_folio.setAttribute("name", 'num_folio' + value);
        num_folio.setAttribute('type', 'number');
        num_folio.setAttribute('required', 'true');
        num_folio.setAttribute('maxlength', '6');
        num_folio.setAttribute('placeholder', 'Ingrese el número de folio de la promoción ...');
        num_folio.setAttribute('onchange', 'valida_num_folio_oficialia_input("num_folio' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);


        label3 = document.createElement("Label");
        label3.setAttribute('for', 'label3');
        label3.innerHTML = "Número de anexos";

        num_anexos = document.createElement("input");
        num_anexos.setAttribute("id", 'num_anexos' + value);
        num_anexos.setAttribute("class", 'form-control');
        num_anexos.setAttribute("name", 'num_anexos' + value);
        num_anexos.setAttribute('type', 'number');
        num_anexos.setAttribute('required', 'true');
        num_anexos.setAttribute('placeholder', 'Ingrese el número de anexos ...');
        num_anexos.setAttribute('onchange', 'num_anexos_carga(' + value + ',this.value);');

        label4 = document.createElement("Label");
        label4.setAttribute('for', 'label4');
        label4.innerHTML = "Hojas de escrito original";

        hojas_escrito = document.createElement("input");
        hojas_escrito.setAttribute("id", 'hojas_escrito' + value);
        hojas_escrito.setAttribute("class", 'form-control');
        hojas_escrito.setAttribute("name", 'hojas_escrito' + value);
        hojas_escrito.setAttribute('type', 'number');
        hojas_escrito.setAttribute('required', 'true');
        hojas_escrito.setAttribute('placeholder', 'Ingrese el número de hojas de escrito original ...');

        label5 = document.createElement("Label");
        label5.setAttribute('for', 'label5');
        label5.innerHTML = "Traslados";

        traslados = document.createElement("input");
        traslados.setAttribute("id", 'traslados' + value);
        traslados.setAttribute("class", 'form-control');
        traslados.setAttribute("name", 'traslados' + value);
        traslados.setAttribute('type', 'text');
        traslados.setAttribute('required', 'true');
        traslados.setAttribute('placeholder', 'Ingrese el número de traslados ...');

        label6 = document.createElement("Label");
        label6.setAttribute('for', 'label5');
        label6.innerHTML = "Fecha de recepción";

        fecha_recepcion = document.createElement("input");
        fecha_recepcion.setAttribute("id", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute("class", 'form-control');
        fecha_recepcion.setAttribute("name", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute('type', 'date');
        fecha_recepcion.setAttribute('required', 'true');

        label7 = document.createElement("Label");
        label7.setAttribute('for', 'label5');
        label7.innerHTML = "Suspensión";

        suspension = document.createElement("select");
        suspension.setAttribute("id", 'suspension' + value);
        suspension.setAttribute("class", 'form-control');
        suspension.setAttribute("name", 'suspension' + value);
        suspension.setAttribute('required', 'true');
        suspension.setAttribute('data-toggle', 'select2');
        suspension.setAttribute('data-placeholder', 'Seleccione una opción ...');


        label8 = document.createElement("Label");
        label8.setAttribute('for', 'label8');
        label8.innerHTML = "Tipo de recepción";

        recepcion = document.createElement("select");
        recepcion.setAttribute("id", 'recepcion' + value);
        recepcion.setAttribute("class", 'form-control');
        recepcion.setAttribute("name", 'recepcion' + value);
        recepcion.setAttribute('required', 'true');
        recepcion.setAttribute('data-toggle', 'select2');
        recepcion.setAttribute('data-placeholder', 'Seleccione una opción ...');

        span = document.createElement('span');
        span.setAttribute('class', 'text-danger')
        span.innerHTML = "*";



        //AGREGA TODOS LOS DIV Y INPUT  
        form_group.appendChild(label1);
        form_group.appendChild(num_recurso);
        form_group.appendChild(div_error_rec);

        form_group.appendChild(labeltiporec);
        form_group.appendChild(inputtiporec);

        form_group.appendChild(labelpromo);
        form_group.appendChild(input_promoventes);


        form_group.appendChild(labelubicacion);
        form_group.appendChild(ubicacion);

        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label2);
        label2.appendChild(span);
        form_group.appendChild(num_folio);
        form_group.appendChild(div_error);
        form_group.appendChild(label3);
        label3.appendChild(span);
        form_group.appendChild(num_anexos);
        form_group.appendChild(label4);
        label4.appendChild(span);
        form_group.appendChild(hojas_escrito);

        form_group.appendChild(label5);
        label5.appendChild(span);
        form_group.appendChild(traslados);

        form_group.appendChild(label6);
        label6.appendChild(span);
        form_group.appendChild(fecha_recepcion);

        form_group.appendChild(label7);
        label7.appendChild(span);
        form_group.appendChild(suspension);


        form_group.appendChild(label8);
        label8.appendChild(span);
        form_group.appendChild(recepcion);

        $('#tipo_promo' + value).select2();
        $('#suspension' + value).select2();
        $('#recepcion' + value).select2();
        $('#tipo_recurso' + value).select2();
        $('#promoventes' + value).select2();

        traer_tipos_promociones('tipo_promo' + value);
        traer_tipos_recursos('tipo_recurso' + value);
        traer_personas('promoventes' + value);

        agrega_options('suspension' + value);

        //AGREGA LAS OPCIONES AL 
        options = ['SELECCIONA UNA OPCIÓN', 'BUZON ELECTRONICO', 'OFICIALIA DE PARTES'];
        options.forEach(option_ => {
            if (option_ == "SELECCIONA UNA OPCIÓN") {
                $('#recepcion' + value).append(new Option(option_, ""))
            } else {
                $('#recepcion' + value).append(new Option(option_, option_))
            }
        });//END FOR EACH

    } else if (tipo == "PROMOCION DE RECURSO") {

        labelrecurso = document.createElement("Label");
        labelrecurso.setAttribute('for', 'label');
        labelrecurso.innerHTML = "Seleccione el recurso";

        input_recurso = document.createElement("select");
        input_recurso.setAttribute("id", 'recurso_' + value);
        input_recurso.setAttribute("class", 'form-control');
        input_recurso.setAttribute("name", 'recurso_' + value);
        input_recurso.setAttribute('required', 'true');
        input_recurso.setAttribute('data-toggle', 'select2');
        input_recurso.setAttribute('data-placeholder', 'Seleccione una opción ...');


        input = document.createElement("select");
        input.setAttribute("id", 'tipo_promo' + value);
        input.setAttribute("class", 'form-control');
        input.setAttribute("name", 'tipo_promo' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de promoción";


        label2 = document.createElement("Label");
        label2.setAttribute('for', 'label2');
        label2.innerHTML = "Ingrese el número de folio de la promoción";

        num_folio = document.createElement("input");
        num_folio.setAttribute("id", 'num_folio' + value);
        num_folio.setAttribute("class", 'form-control');
        num_folio.setAttribute("name", 'num_folio' + value);
        num_folio.setAttribute('type', 'number');
        num_folio.setAttribute('required', 'true');
        num_folio.setAttribute('maxlength', '6');
        num_folio.setAttribute('placeholder', 'Ingrese el número de folio de la promoción ...');
        num_folio.setAttribute('onchange', 'valida_num_folio_oficialia_input("num_folio' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);


        label3 = document.createElement("Label");
        label3.setAttribute('for', 'label3');
        label3.innerHTML = "Número de anexos";

        num_anexos = document.createElement("input");
        num_anexos.setAttribute("id", 'num_anexos' + value);
        num_anexos.setAttribute("class", 'form-control');
        num_anexos.setAttribute("name", 'num_anexos' + value);
        num_anexos.setAttribute('type', 'number');
        num_anexos.setAttribute('required', 'true');
        num_anexos.setAttribute('placeholder', 'Ingrese el número de anexos ...');
        num_anexos.setAttribute('onchange', 'num_anexos_carga(' + value + ',this.value);');

        label4 = document.createElement("Label");
        label4.setAttribute('for', 'label4');
        label4.innerHTML = "Hojas de escrito original";

        hojas_escrito = document.createElement("input");
        hojas_escrito.setAttribute("id", 'hojas_escrito' + value);
        hojas_escrito.setAttribute("class", 'form-control');
        hojas_escrito.setAttribute("name", 'hojas_escrito' + value);
        hojas_escrito.setAttribute('type', 'number');
        hojas_escrito.setAttribute('required', 'true');
        hojas_escrito.setAttribute('placeholder', 'Ingrese el número de hojas de escrito original ...');

        label5 = document.createElement("Label");
        label5.setAttribute('for', 'label5');
        label5.innerHTML = "Traslados";

        traslados = document.createElement("input");
        traslados.setAttribute("id", 'traslados' + value);
        traslados.setAttribute("class", 'form-control');
        traslados.setAttribute("name", 'traslados' + value);
        traslados.setAttribute('type', 'text');
        traslados.setAttribute('required', 'true');
        traslados.setAttribute('placeholder', 'Ingrese el número de traslados ...');

        label6 = document.createElement("Label");
        label6.setAttribute('for', 'label5');
        label6.innerHTML = "Fecha de recepción";

        fecha_recepcion = document.createElement("input");
        fecha_recepcion.setAttribute("id", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute("class", 'form-control');
        fecha_recepcion.setAttribute("name", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute('type', 'date');
        fecha_recepcion.setAttribute('required', 'true');

        label7 = document.createElement("Label");
        label7.setAttribute('for', 'label5');
        label7.innerHTML = "Suspensión";

        suspension = document.createElement("select");
        suspension.setAttribute("id", 'suspension' + value);
        suspension.setAttribute("class", 'form-control');
        suspension.setAttribute("name", 'suspension' + value);
        suspension.setAttribute('required', 'true');
        suspension.setAttribute('data-toggle', 'select2');
        suspension.setAttribute('data-placeholder', 'Seleccione una opción ...');


        label8 = document.createElement("Label");
        label8.setAttribute('for', 'label8');
        label8.innerHTML = "Tipo de recepción";

        recepcion = document.createElement("select");
        recepcion.setAttribute("id", 'recepcion' + value);
        recepcion.setAttribute("class", 'form-control');
        recepcion.setAttribute("name", 'recepcion' + value);
        recepcion.setAttribute('required', 'true');
        recepcion.setAttribute('data-toggle', 'select2');
        recepcion.setAttribute('data-placeholder', 'Seleccione una opción ...');

        span = document.createElement('span');
        span.setAttribute('class', 'text-danger')
        span.innerHTML = "*";


        //AGREGA TODOS LOS DIV Y INPUT     

        form_group.appendChild(labelrecurso);
        form_group.appendChild(input_recurso);

        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label2);
        label2.appendChild(span);
        form_group.appendChild(num_folio);
        form_group.appendChild(div_error);
        form_group.appendChild(label3);
        label3.appendChild(span);
        form_group.appendChild(num_anexos);
        form_group.appendChild(label4);
        label4.appendChild(span);
        form_group.appendChild(hojas_escrito);

        form_group.appendChild(label5);
        label5.appendChild(span);
        form_group.appendChild(traslados);

        form_group.appendChild(label6);
        label6.appendChild(span);
        form_group.appendChild(fecha_recepcion);

        form_group.appendChild(label7);
        label7.appendChild(span);
        form_group.appendChild(suspension);


        form_group.appendChild(label8);
        label8.appendChild(span);
        form_group.appendChild(recepcion);

        $('#tipo_promo' + value).select2();
        $('#suspension' + value).select2();
        $('#recepcion' + value).select2();
        $('#recurso_' + value).select2();

        id_exp = document.getElementById('num_expediente').value;
        traer_tipos_promociones('tipo_promo' + value);
        traer_recursos_expediente(id_exp, 'recurso_' + value);

        agrega_options('suspension' + value);

        //AGREGA LAS OPCIONES AL 
        options = ['SELECCIONA UNA OPCIÓN', 'BUZON ELECTRONICO', 'OFICIALIA DE PARTES'];
        options.forEach(option_ => {
            if (option_ == "SELECCIONA UNA OPCIÓN") {
                $('#recepcion' + value).append(new Option(option_, ""))
            } else {
                $('#recepcion' + value).append(new Option(option_, option_))
            }
        });//END FOR EACH

    } else if (tipo == "ACUERDO DE RECURSO") {

        labelrecurso = document.createElement("Label");
        labelrecurso.setAttribute('for', 'label');
        labelrecurso.innerHTML = "Seleccione el recurso";

        input_recurso = document.createElement("select");
        input_recurso.setAttribute("id", 'recurso_' + value);
        input_recurso.setAttribute("class", 'form-control');
        input_recurso.setAttribute("name", 'recurso_' + value);
        input_recurso.setAttribute('required', 'true');
        input_recurso.setAttribute('data-toggle', 'select2');
        input_recurso.setAttribute('data-placeholder', 'Seleccione una opción ...');


        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de acuerdo";

        input = document.createElement("select");
        input.setAttribute("id", 'tipo_acuerdo' + value);
        input.setAttribute("class", 'form-control select2-multiple');
        input.setAttribute("name", 'tipo_acuerdo' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label2 = document.createElement("Label");
        label2.setAttribute('for', 'label');
        label2.innerHTML = "¿Desea relacionarlo a una promoción del recurso?";

        pregunta_1 = document.createElement("select");
        pregunta_1.setAttribute("id", 'pregunta_1' + value);
        pregunta_1.setAttribute("class", 'form-control');
        pregunta_1.setAttribute("name", 'pregunta_1' + value);
        pregunta_1.setAttribute('required', 'true');
        pregunta_1.setAttribute('onchange', 'cambiar_opcion_promocion_recurso(' + value + ');');
        pregunta_1.setAttribute('data-toggle', 'select2');
        pregunta_1.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label3 = document.createElement("Label");
        label3.setAttribute('for', 'label');
        label3.innerHTML = "Seleccione una o varias promociones";

        promociones = document.createElement("select");
        promociones.setAttribute("id", 'promociones' + value);
        promociones.setAttribute("class", 'form-control select2-multiple');
        promociones.setAttribute("name", 'promociones' + value + '[]');
        promociones.setAttribute('required', 'true');
        promociones.setAttribute('multiple', 'multiple');
        promociones.setAttribute('data-toggle', 'select2');
        promociones.setAttribute('data-placeholder', 'Seleccione una opción ...');
        promociones.setAttribute('style', 'width: 100%');
        promociones.setAttribute('disabled', 'true');

        label4 = document.createElement("Label");
        label4.setAttribute('for', 'label');
        label4.innerHTML = "¿Desea relacionarlo a un acuerdo del recurso?";

        pregunta_2 = document.createElement("select");
        pregunta_2.setAttribute("id", 'pregunta_2' + value);
        pregunta_2.setAttribute("class", 'form-control select2-multiple');
        pregunta_2.setAttribute("name", 'pregunta_2' + value);
        pregunta_2.setAttribute('required', 'true');
        pregunta_2.setAttribute('data-toggle', 'select2');
        pregunta_2.setAttribute('data-placeholder', 'Seleccione una opción ...');
        pregunta_2.setAttribute('onchange', 'cambiar_opcion_promocion_acuerdo_recurso(' + value + ');');

        label5 = document.createElement("Label");
        label5.setAttribute('for', 'label');
        label5.innerHTML = "Seleccione un acuerdo";

        acuerdo = document.createElement("select");
        acuerdo.setAttribute("id", 'acuerdo' + value);
        acuerdo.setAttribute("class", 'form-control select2-multiple');
        acuerdo.setAttribute("name", 'acuerdo' + value);
        acuerdo.setAttribute('required', 'true');
        acuerdo.setAttribute('disabled', 'true');
        acuerdo.setAttribute('data-toggle', 'select2');
        acuerdo.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label6 = document.createElement("Label");
        label6.setAttribute('for', 'label');
        label6.innerHTML = "Seleccione el usuario que realizó el acuerdo";

        genero = document.createElement("select");
        genero.setAttribute("id", 'genero' + value);
        genero.setAttribute("class", 'form-control select2-multiple');
        genero.setAttribute("name", 'genero' + value);
        genero.setAttribute('required', 'true');
        genero.setAttribute('data-toggle', 'select2');
        genero.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label7 = document.createElement("Label");
        label7.setAttribute('for', 'label');
        label7.innerHTML = "Seleccione el usuario que revisó el acuerdo";

        reviso = document.createElement("select");
        reviso.setAttribute("id", 'reviso' + value);
        reviso.setAttribute("class", 'form-control select2-multiple');
        reviso.setAttribute("name", 'reviso' + value);
        reviso.setAttribute('required', 'true');
        reviso.setAttribute('data-toggle', 'select2');
        reviso.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label8 = document.createElement("Label");
        label8.setAttribute('for', 'label2');
        label8.innerHTML = "Ingrese el número de folio del acuerdo";

        num_folio_acuerdo = document.createElement("input");
        num_folio_acuerdo.setAttribute("id", 'num_folio_acuerdo' + value);
        num_folio_acuerdo.setAttribute("class", 'form-control');
        num_folio_acuerdo.setAttribute("name", 'num_folio_acuerdo' + value);
        num_folio_acuerdo.setAttribute('type', 'number');
        num_folio_acuerdo.setAttribute('required', 'true');
        num_folio_acuerdo.setAttribute('maxlength', '6');
        num_folio_acuerdo.setAttribute('placeholder', 'Ingrese el número de folio del acuerdo ...');
        num_folio_acuerdo.setAttribute('onchange', 'valida_num_folio_acuerdo_input("num_folio_acuerdo' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);


        form_group.appendChild(labelrecurso);
        form_group.appendChild(input_recurso);

        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label2);
        form_group.appendChild(pregunta_1);

        form_group.appendChild(label3);
        form_group.appendChild(promociones);

        form_group.appendChild(label4);
        form_group.appendChild(pregunta_2);

        form_group.appendChild(label5);
        form_group.appendChild(acuerdo);

        form_group.appendChild(label6);
        form_group.appendChild(genero);

        form_group.appendChild(label7);
        form_group.appendChild(reviso);

        form_group.appendChild(label8);
        form_group.appendChild(num_folio_acuerdo);
        form_group.appendChild(div_error);

        $('#promociones' + value).select2();
        $('#tipo_acuerdo' + value).select2();
        $('#pregunta_1' + value).select2();
        $('#pregunta_2' + value).select2();
        $('#acuerdo' + value).select2();
        $('#genero' + value).select2();
        $('#reviso' + value).select2();
        $('#recurso_' + value).select2();

        id_exp = document.getElementById('num_expediente').value;
        traer_recursos_expediente(id_exp, 'recurso_' + value);
        traer_tipos_acuerdo('tipo_acuerdo' + value);
        agrega_options('pregunta_1' + value);
        agrega_options('pregunta_2' + value);
        traer_usuarios('genero' + value);
        traer_usuarios('reviso' + value);

    } else if (tipo == "SENTENCIA DE RECURSO") {

        labelrecurso = document.createElement("Label");
        labelrecurso.setAttribute('for', 'label');
        labelrecurso.innerHTML = "Seleccione el recurso";

        input_recurso = document.createElement("select");
        input_recurso.setAttribute("id", 'recurso_' + value);
        input_recurso.setAttribute("class", 'form-control');
        input_recurso.setAttribute("name", 'recurso_' + value);
        input_recurso.setAttribute('required', 'true');
        input_recurso.setAttribute('data-toggle', 'select2');
        input_recurso.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de sentencia";

        input = document.createElement("select");
        input.setAttribute("id", 'tipo_sentencia' + value);
        input.setAttribute("class", 'form-control select2-multiple');
        input.setAttribute("name", 'tipo_sentencia' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_sentido = document.createElement("Label");
        label_sentido.setAttribute('for', 'label');
        label_sentido.innerHTML = "Seleccione sentido de la sentencia";

        input_sentido = document.createElement("select");
        input_sentido.setAttribute("id", 'tipo_sentido' + value);
        input_sentido.setAttribute("class", 'form-control select2-multiple');
        input_sentido.setAttribute("name", 'tipo_sentido' + value);
        input_sentido.setAttribute('required', 'true');
        input_sentido.setAttribute('data-toggle', 'select2');
        input_sentido.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_pregunta_recurso = document.createElement("Label");
        label_pregunta_recurso.setAttribute('for', 'label');
        label_pregunta_recurso.innerHTML = "¿Desea relacionarlo a un recurso?";

        pregunta_recurso = document.createElement("select");
        pregunta_recurso.setAttribute("id", 'pregunta_recurso' + value);
        pregunta_recurso.setAttribute("class", 'form-control select2-multiple');
        pregunta_recurso.setAttribute("name", 'pregunta_recurso' + value);
        pregunta_recurso.setAttribute('required', 'true');
        pregunta_recurso.setAttribute('data-toggle', 'select2');
        pregunta_recurso.setAttribute('data-placeholder', 'Seleccione una opción ...');
        pregunta_recurso.setAttribute('onchange', 'cambiar_opcion_recurso_sentencia(' + value + ');');

        label_recursos = document.createElement("Label");
        label_recursos.setAttribute('for', 'label');
        label_recursos.innerHTML = "Seleccione un recurso";

        recursos = document.createElement("select");
        recursos.setAttribute("id", 'recursos' + value);
        recursos.setAttribute("class", 'form-control select2-multiple');
        recursos.setAttribute("name", 'recursos' + value);
        recursos.setAttribute('required', 'true');
        recursos.setAttribute('disabled', 'true');
        recursos.setAttribute('data-toggle', 'select2');
        recursos.setAttribute('data-placeholder', 'Seleccione una opción ...');


        label_genero = document.createElement("Label");
        label_genero.setAttribute('for', 'label');
        label_genero.innerHTML = "Seleccione el usuario que realizó la sentencia";

        genero = document.createElement("select");
        genero.setAttribute("id", 'genero' + value);
        genero.setAttribute("class", 'form-control select2-multiple');
        genero.setAttribute("name", 'genero' + value);
        genero.setAttribute('required', 'true');
        genero.setAttribute('data-toggle', 'select2');
        genero.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_reviso = document.createElement("Label");
        label_reviso.setAttribute('for', 'label');
        label_reviso.innerHTML = "Seleccione el usuario que revisó la sentencia";

        reviso = document.createElement("select");
        reviso.setAttribute("id", 'reviso' + value);
        reviso.setAttribute("class", 'form-control select2-multiple');
        reviso.setAttribute("name", 'reviso' + value);
        reviso.setAttribute('required', 'true');
        reviso.setAttribute('data-toggle', 'select2');
        reviso.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_folio = document.createElement("Label");
        label_folio.setAttribute('for', 'label2');
        label_folio.innerHTML = "Ingrese el número de folio de la sentencia del recurso";

        num_folio_acuerdo = document.createElement("input");
        num_folio_acuerdo.setAttribute("id", 'num_folio_sentecia' + value);
        num_folio_acuerdo.setAttribute("class", 'form-control');
        num_folio_acuerdo.setAttribute("name", 'num_folio_sentecia' + value);
        num_folio_acuerdo.setAttribute('type', 'number');
        num_folio_acuerdo.setAttribute('required', 'true');
        num_folio_acuerdo.setAttribute('maxlength', '6');
        num_folio_acuerdo.setAttribute('placeholder', 'Ingrese el número de folio de la sentencia del recurso...');
        num_folio_acuerdo.setAttribute('onchange', 'valida_num_folio_sentencia_input("num_folio_sentecia' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);



        form_group.appendChild(labelrecurso);
        form_group.appendChild(input_recurso);

        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label_sentido);
        form_group.appendChild(input_sentido);

        form_group.appendChild(label_pregunta_recurso);
        form_group.appendChild(pregunta_recurso);

        form_group.appendChild(label_recursos);
        form_group.appendChild(recursos);

        form_group.appendChild(label_genero);
        form_group.appendChild(genero);

        form_group.appendChild(label_reviso);
        form_group.appendChild(reviso);

        form_group.appendChild(label_folio);
        form_group.appendChild(num_folio_acuerdo);
        form_group.appendChild(div_error);
        $('#tipo_sentencia' + value).select2();
        $('#tipo_sentido' + value).select2();
        $('#pregunta_recurso' + value).select2();
        $('#recursos' + value).select2();
        $('#acuerdo' + value).select2();
        $('#genero' + value).select2();
        $('#reviso' + value).select2();
        $('#recurso_' + value).select2();

        id_exp = document.getElementById('num_expediente').value;
        traer_recursos_expediente(id_exp, 'recurso_' + value);



        traer_tipos_sentencias('tipo_sentencia' + value);
        traer_tipos_sentido('tipo_sentido' + value);
        agrega_options('pregunta_recurso' + value);
        agrega_options('pregunta_2' + value);
        traer_usuarios('genero' + value);
        traer_usuarios('reviso' + value);

    } else if (tipo == "AMPARO" || tipo == "AMPARO DE RECURSO") {

        if (tipo == "AMPARO DE RECURSO") {
            //si el amparo es del recurso
            labelrecurso = document.createElement("Label");
            labelrecurso.setAttribute('for', 'label');
            labelrecurso.innerHTML = "Seleccione el recurso";

            input_recurso = document.createElement("select");
            input_recurso.setAttribute("id", 'recurso_' + value);
            input_recurso.setAttribute("class", 'form-control');
            input_recurso.setAttribute("name", 'recurso_' + value);
            input_recurso.setAttribute('required', 'true');
            input_recurso.setAttribute('data-toggle', 'select2');
            input_recurso.setAttribute('data-placeholder', 'Seleccione una opción ...');
        }


        labelamparo = document.createElement("Label");
        labelamparo.setAttribute('for', 'label');
        labelamparo.innerHTML = "Seleccione el tipo de amparo";

        input_amparo = document.createElement("select");
        input_amparo.setAttribute("id", 'tipo_amparo' + value);
        input_amparo.setAttribute("class", 'form-control');
        input_amparo.setAttribute("name", 'tipo_amparo' + value);
        input_amparo.setAttribute('required', 'true');
        input_amparo.setAttribute('data-toggle', 'select2');
        input_amparo.setAttribute('data-placeholder', 'Seleccione una opción ...');

        input = document.createElement("select");
        input.setAttribute("id", 'tipo_promo' + value);
        input.setAttribute("class", 'form-control');
        input.setAttribute("name", 'tipo_promo' + value);
        input.setAttribute('required', 'true');
        input.setAttribute('data-toggle', 'select2');
        input.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label = document.createElement("Label");
        label.setAttribute('for', 'label');
        label.innerHTML = "Seleccione el tipo de promoción";


        label2 = document.createElement("Label");
        label2.setAttribute('for', 'label2');
        label2.innerHTML = "Ingrese el número de folio del amparo";

        num_folio = document.createElement("input");
        num_folio.setAttribute("id", 'num_folio' + value);
        num_folio.setAttribute("class", 'form-control');
        num_folio.setAttribute("name", 'num_folio' + value);
        num_folio.setAttribute('type', 'number');
        num_folio.setAttribute('required', 'true');
        num_folio.setAttribute('maxlength', '6');
        num_folio.setAttribute('placeholder', 'Ingrese el número de folio del amparo ...');
        num_folio.setAttribute('onchange', 'valida_num_folio_oficialia_input("num_folio' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);


        label3 = document.createElement("Label");
        label3.setAttribute('for', 'label3');
        label3.innerHTML = "Número de anexos";

        num_anexos = document.createElement("input");
        num_anexos.setAttribute("id", 'num_anexos' + value);
        num_anexos.setAttribute("class", 'form-control');
        num_anexos.setAttribute("name", 'num_anexos' + value);
        num_anexos.setAttribute('type', 'number');
        num_anexos.setAttribute('required', 'true');
        num_anexos.setAttribute('placeholder', 'Ingrese el número de anexos ...');
        num_anexos.setAttribute('onchange', 'num_anexos_carga(' + value + ',this.value);');

        label4 = document.createElement("Label");
        label4.setAttribute('for', 'label4');
        label4.innerHTML = "Hojas de escrito original";

        hojas_escrito = document.createElement("input");
        hojas_escrito.setAttribute("id", 'hojas_escrito' + value);
        hojas_escrito.setAttribute("class", 'form-control');
        hojas_escrito.setAttribute("name", 'hojas_escrito' + value);
        hojas_escrito.setAttribute('type', 'number');
        hojas_escrito.setAttribute('required', 'true');
        hojas_escrito.setAttribute('placeholder', 'Ingrese el número de hojas de escrito original ...');

        label5 = document.createElement("Label");
        label5.setAttribute('for', 'label5');
        label5.innerHTML = "Traslados";

        traslados = document.createElement("input");
        traslados.setAttribute("id", 'traslados' + value);
        traslados.setAttribute("class", 'form-control');
        traslados.setAttribute("name", 'traslados' + value);
        traslados.setAttribute('type', 'text');
        traslados.setAttribute('required', 'true');
        traslados.setAttribute('placeholder', 'Ingrese el número de traslados ...');

        label6 = document.createElement("Label");
        label6.setAttribute('for', 'label5');
        label6.innerHTML = "Fecha de recepción";

        fecha_recepcion = document.createElement("input");
        fecha_recepcion.setAttribute("id", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute("class", 'form-control');
        fecha_recepcion.setAttribute("name", 'fecha_recepcion' + value);
        fecha_recepcion.setAttribute('type', 'date');
        fecha_recepcion.setAttribute('required', 'true');

        label7 = document.createElement("Label");
        label7.setAttribute('for', 'label5');
        label7.innerHTML = "Suspensión";

        suspension = document.createElement("select");
        suspension.setAttribute("id", 'suspension' + value);
        suspension.setAttribute("class", 'form-control');
        suspension.setAttribute("name", 'suspension' + value);
        suspension.setAttribute('required', 'true');
        suspension.setAttribute('data-toggle', 'select2');
        suspension.setAttribute('data-placeholder', 'Seleccione una opción ...');


        label8 = document.createElement("Label");
        label8.setAttribute('for', 'label8');
        label8.innerHTML = "Tipo de recepción";

        recepcion = document.createElement("select");
        recepcion.setAttribute("id", 'recepcion' + value);
        recepcion.setAttribute("class", 'form-control');
        recepcion.setAttribute("name", 'recepcion' + value);
        recepcion.setAttribute('required', 'true');
        recepcion.setAttribute('data-toggle', 'select2');
        recepcion.setAttribute('data-placeholder', 'Seleccione una opción ...');

        span = document.createElement('span');
        span.setAttribute('class', 'text-danger')
        span.innerHTML = "*";


        if (tipo == "AMPARO DE RECURSO") {
            form_group.appendChild(labelrecurso);
            form_group.appendChild(input_recurso);

            $('#recurso_' + value).select2();

            id_exp = document.getElementById('num_expediente').value;
            traer_recursos_expediente(id_exp, 'recurso_' + value);
        }

        //AGREGA TODOS LOS DIV Y INPUT     
        form_group.appendChild(labelamparo);
        form_group.appendChild(input_amparo);

        form_group.appendChild(label);
        form_group.appendChild(input);

        form_group.appendChild(label2);
        label2.appendChild(span);
        form_group.appendChild(num_folio);
        form_group.appendChild(div_error);
        form_group.appendChild(label3);
        label3.appendChild(span);
        form_group.appendChild(num_anexos);
        form_group.appendChild(label4);
        label4.appendChild(span);
        form_group.appendChild(hojas_escrito);

        form_group.appendChild(label5);
        label5.appendChild(span);
        form_group.appendChild(traslados);

        form_group.appendChild(label6);
        label6.appendChild(span);
        form_group.appendChild(fecha_recepcion);

        form_group.appendChild(label7);
        label7.appendChild(span);
        form_group.appendChild(suspension);


        form_group.appendChild(label8);
        label8.appendChild(span);
        form_group.appendChild(recepcion);

        $('#tipo_promo' + value).select2();
        $('#suspension' + value).select2();
        $('#recepcion' + value).select2();
        $('#tipo_amparo' + value).select2();


        traer_tipos_promociones('tipo_promo' + value);

        agrega_options('suspension' + value);

        //AGREGA LAS OPCIONES AL 
        options = ['SELECCIONA UNA OPCIÓN', 'BUZON ELECTRONICO', 'OFICIALIA DE PARTES'];
        options.forEach(option_ => {
            if (option_ == "SELECCIONA UNA OPCIÓN") {
                $('#recepcion' + value).append(new Option(option_, ""))
            } else {
                $('#recepcion' + value).append(new Option(option_, option_))
            }
        });//END FOR EACH

        //AGREGAMOS LOS TIPOS DE AMPAROS
        options = ['SELECCIONA UNA OPCIÓN', 'DIRECTO', 'INDIRECTO'];
        options.forEach(option_ => {
            if (option_ == "SELECCIONA UNA OPCIÓN") {
                $('#tipo_amparo' + value).append(new Option(option_, ""))
            } else {
                $('#tipo_amparo' + value).append(new Option(option_, option_))
            }
        });//END FOR EACH

    } else if (tipo == "DOCUMENTO" || tipo == "DOCUMENTO DEL RECURSO") {

        if (tipo == "DOCUMENTO DEL RECURSO") {
            labelrecurso = document.createElement("Label");
            labelrecurso.setAttribute('for', 'label');
            labelrecurso.innerHTML = "Seleccione el recurso";

            input_recurso = document.createElement("select");
            input_recurso.setAttribute("id", 'recurso_' + value);
            input_recurso.setAttribute("class", 'form-control');
            input_recurso.setAttribute("name", 'recurso_' + value);
            input_recurso.setAttribute('required', 'true');
            input_recurso.setAttribute('data-toggle', 'select2');
            input_recurso.setAttribute('data-placeholder', 'Seleccione una opción ...');

        }
        label_doc_firma = document.createElement("Label");
        label_doc_firma.setAttribute('for', 'label');
        label_doc_firma.innerHTML = "Tipo de documento";

        tipo_doc = document.createElement("select");
        tipo_doc.setAttribute("id", 'tipo_documento' + value);
        tipo_doc.setAttribute("class", 'form-control select2-multiple');
        tipo_doc.setAttribute("name", 'tipo_documento' + value);
        tipo_doc.setAttribute('required', 'true');
        tipo_doc.setAttribute('data-toggle', 'select2');
        tipo_doc.setAttribute('data-placeholder', 'Seleccione una opción ...');

        label_folio_referencia = document.createElement("Label");
        label_folio_referencia.setAttribute('for', 'label2');
        label_folio_referencia.innerHTML = "Ingrese el número de folio de referencia";

        num_folio_referencia = document.createElement("input");
        num_folio_referencia.setAttribute("id", 'num_folio_referencia' + value);
        num_folio_referencia.setAttribute("class", 'form-control');
        num_folio_referencia.setAttribute("name", 'num_folio_referencia' + value);
        num_folio_referencia.setAttribute('type', 'number');
        num_folio_referencia.setAttribute('required', 'true');
        num_folio_referencia.setAttribute('placeholder', 'Ingrese el número de folio de referencia ...');
        num_folio_referencia.setAttribute('maxlength', '6');
        num_folio_referencia.setAttribute('onchange', 'valida_num_folio_sentencia_input("num_folio_sentecia' + value + '","error_num_folio' + value + '");');

        div_error = document.createElement("div");
        div_error.setAttribute("id", 'error_num_folio' + value);
        div_error.setAttribute("class", 'text-danger');
        div_error.setAttribute("name", 'error_num_folio' + value);

        label_fecha = document.createElement("Label");
        label_fecha.setAttribute('for', 'label_fecha');
        label_fecha.innerHTML = "Fecha";

        fecha = document.createElement("input");
        fecha.setAttribute("id", 'fecha' + value);
        fecha.setAttribute("class", 'form-control');
        fecha.setAttribute("name", 'fecha' + value);
        fecha.setAttribute('type', 'date');
        fecha.setAttribute('required', 'true');

        label_observaciones = document.createElement("Label");
        label_observaciones.setAttribute('for', 'label5');
        label_observaciones.innerHTML = "Observaciones";

        observaciones = document.createElement("input");
        observaciones.setAttribute("id", 'observaciones' + value);
        observaciones.setAttribute("class", 'form-control');
        observaciones.setAttribute("name", 'observaciones' + value);
        observaciones.setAttribute('type', 'text');
        observaciones.setAttribute('required', 'true');

        if (tipo == "DOCUMENTO DEL RECURSO") {
            form_group.appendChild(labelrecurso);
            form_group.appendChild(input_recurso);

            $('#recurso_' + value).select2();
            id_exp = document.getElementById('num_expediente').value;
            traer_recursos_expediente(id_exp, 'recurso_' + value);
        }

        form_group.appendChild(label_doc_firma);
        form_group.appendChild(tipo_doc);
        form_group.appendChild(label_folio_referencia);
        form_group.appendChild(num_folio_referencia);
        form_group.appendChild(label_fecha);
        form_group.appendChild(fecha);
        form_group.appendChild(label_observaciones);
        form_group.appendChild(observaciones);




        traer_tipos_documentos('tipo_documento' + value);

        $('#tipo_documento' + value).select2();
    }
}


function traer_personas(input) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_personas",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.personas.forEach(persona => {
                option = document.createElement("option");
                if (persona.tipo == "AUTORIDAD" || persona.tipo == "SUB") {
                    option.text = persona.nombre;
                } else if (persona.tipo == "MORAL") {
                    option.text = persona.razon_social;
                } else {
                    option.text = persona.nombre + " " + persona.apellido_paterno + " " + persona.apellido_materno;
                }
                option.value = persona.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });

}

function traer_tipos_recursos(input) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_tipos_recursos",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.recursos.forEach(recurso => {
                option = document.createElement("option");
                option.text = recurso.tipo;
                option.value = recurso.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });

}

function traer_tipos_promociones(input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_tipos_promociones",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.promociones.forEach(promocion => {
                option = document.createElement("option");
                option.text = promocion.tipo_promocion;
                option.value = promocion.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function traer_tipos_acuerdo(input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_tipos_acuerdo",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            data.acuerdos.forEach(acuerdo => {
                option = document.createElement("option");
                option.text = acuerdo.tipo;
                option.value = acuerdo.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function traer_tipos_acuerdo(input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_tipos_acuerdo",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.acuerdos.forEach(acuerdo => {
                option = document.createElement("option");
                option.text = acuerdo.tipo;
                option.value = acuerdo.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function traer_tipos_sentencias(input) {

    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_tipos_sentencias",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.sentencias.forEach(sentencia => {
                option = document.createElement("option");
                option.text = sentencia.tipo_sentencia;
                option.value = sentencia.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function traer_tipos_documentos(input) {

    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/tipo_documento",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.tipos_documentos.forEach(tipo => {
                option = document.createElement("option");
                option.text = tipo.tipo_documento;
                option.value = tipo.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}


function traer_tipos_sentido(input) {

    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_tipos_sentidos",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.sentidos.forEach(sentido => {
                option = document.createElement("option");
                option.text = sentido.tipo_sentido;
                option.value = sentido.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function agrega_options(input) {
    options = ['SELECCIONA UNA OPCIÓN', 'SI', 'NO'];
    options.forEach(option_ => {
        if (option_ == "SELECCIONA UNA OPCIÓN") {
            $('#' + input).append(new Option(option_, ""))
        } else {
            $('#' + input).append(new Option(option_, option_))
        }
    });//END FOR EACH
}

function traer_usuarios(input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_usuarios",
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.users.forEach(user => {
                option = document.createElement("option");
                option.text = user.name + " " + user.apellido_p + " " + user.apellido_m;
                option.value = user.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH           
        }
    });
}

function traer_promociones_expediente(id_expediente, input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_promociones_expediente/" + id_expediente,
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.promociones.forEach(promocion => {
                option = document.createElement("option");
                option.text = promocion.tipo + " Folio: " + promocion.folio;
                option.value = promocion.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function traer_acuerdos_expediente(id_expediente, input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_acuerdos_expediente/" + id_expediente,
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.acuerdos.forEach(acuerdo => {
                option = document.createElement("option");
                option.text = "Acuerdo Folio: " + acuerdo.num_folio;
                option.value = acuerdo.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function traer_recursos_expediente(id_expediente, input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_recursos_expediente/" + id_expediente,
        success: function (data) {
            $("#" + input).empty();
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.recursos.forEach(recurso => {
                option = document.createElement("option");
                option.text = "Recurso: " + recurso.num_recurso + " Folio: " + recurso.num_folio;
                option.value = recurso.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}

function traer_acuerdos_recurso(id_recurso, input) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_acuerdos_recurso/" + id_recurso,
        success: function (data) {
            select_aux1 = document.getElementById(input);
            $('#' + input).append(new Option("Seleccione una opción...", ""))
            data.acuerdos.forEach(acuerdo => {
                option = document.createElement("option");
                option.text = "Acuerdo Folio: " + acuerdo.num_folio;
                option.value = acuerdo.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH
        }
    });
}




function cambiar_opcion_promocion(value) {

    option = document.getElementById('pregunta_1' + value).value;
    id_expediente = document.getElementById('num_expediente').value;
    if (option == "SI") {
        document.getElementById('promociones' + value).disabled = false;
        traer_promociones_expediente(id_expediente, 'promociones' + value);
    } else {
        document.getElementById('promociones' + value).disabled = true;

    }

}

function cambiar_opcion_promocion_recurso(value) {
    option = document.getElementById('pregunta_1' + value).value;
    id_recurso = document.getElementById('recurso_' + value).value;
    if (option == "SI") {
        document.getElementById('promociones' + value).disabled = false;
        traer_promociones_recurso_input(id_recurso, 'promociones' + value)
    } else {
        document.getElementById('promociones' + value).disabled = true;
    }
}

function cambiar_opcion_promocion_acuerdo(value) {
    option = document.getElementById('pregunta_2' + value).value;
    id_expediente = document.getElementById('num_expediente').value;
    if (option == "SI") {
        document.getElementById('acuerdo' + value).disabled = false;
        document.getElementById('acuerdo' + value).required = true;
        traer_acuerdos_expediente(id_expediente, 'acuerdo' + value);

    } else {
        document.getElementById('acuerdo' + value).disabled = true;
        document.getElementById('acuerdo' + value).required = false;
    }
}

function cambiar_opcion_promocion_acuerdo_recurso(value) {
    option = document.getElementById('pregunta_2' + value).value;
    id_recurso = document.getElementById('recurso_' + value).value;
    if (option == "SI") {
        document.getElementById('acuerdo' + value).disabled = false;
        document.getElementById('acuerdo' + value).required = true;
        traer_acuerdos_recurso(id_recurso, 'acuerdo' + value);

    } else {
        document.getElementById('acuerdo' + value).disabled = true;
        document.getElementById('acuerdo' + value).required = false;
    }
}

function cambiar_opcion_recurso_sentencia(value) {
    option = document.getElementById('pregunta_recurso' + value).value;
    id_expediente = document.getElementById('num_expediente').value;
    if (option == "SI") {
        document.getElementById('recursos' + value).disabled = false;
        document.getElementById('recursos' + value).required = true;
        traer_recursos_expediente(id_expediente, 'recursos' + value);

    } else {
        document.getElementById('recursos' + value).disabled = true;
        document.getElementById('recursos' + value).required = false;
    }
}
/* 
function traer_datos_cita(folio){
       var token = $("#token").val();
   $.ajax({
       type: "get",
       method: 'get',
       headers: { 'X-CSRF-TOKEN': token },
       url: "/traer_datos_cita/"+folio,
       success: function (data) {
           select_aux1 = document.getElementById(input);
           $('#'+input).append(new Option("Seleccione una opción...", ""))
           data.acuerdos.forEach(acuerdo => {
               option = document.createElement("option");
               option.text = "Acuerdo Folio: "+ acuerdo.num_folio;
               option.value = acuerdo.id;
               select_aux1.add(option, select_aux1[0]);                
           });//END FOR EACH
       }
   });

}
*/

function traerPromovente(value) {
    //var id_expediente = document.getElementById("id_expediente").value;
    // var route = ruta_global + "/traerPromovente/" + value;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerPromovente/" + value,
        success: function (data) {
            /* 
         
             data.promoventes.forEach(function (promovente, index) {
                 var x = $('#promovente');
                 option = new Option(promovente.nombre, promovente.id, true, true);
                 x.append(option);
                  x.trigger({
                     type: 'select2:select',
                     params: {
                         data: promovente
                     }
                 }); 
             });//END FOREACH ACTORES  */

            select_aux1 = document.getElementById('promovente');
            document.getElementById("promovente").value = '';
            $("#promovente").empty();
            $('#promovente').append(new Option("Seleccione una opción...", ""))
            data.promoventes.forEach(promovente => {
                option = document.createElement("option");
                if (promovente.tipo == "AUTORIDAD") {
                    option.text = promovente.nombre;
                    option.value = promovente.id;

                } else if (promovente.tipo == "MORAL") {
                    option.text = promovente.razon_social;
                    option.value = promovente.id;

                } else {
                    option.text = promovente.nombre + " " + promovente.apellido_paterno + " " + promovente.apellido_materno;
                    option.value = promovente.id;
                }


                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH

        }
    });
}

function llenarPromoventes(value) {
    Swal.fire({
        /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
        title: '¿Agregar este promovente?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            // table = "demandados_table";//nombre de la tabla
            if (value != "") {
                x = document.getElementById('promovente');
                y = x.options[x.selectedIndex].text;
                z = x.options[x.selectedIndex].value;
                var rows = document.getElementById("promoventes").rows.length;

                var tabla = document.getElementById("promoventes");
                var row = tabla.insertRow(rows);
                row.style.backgroundColor = "white";
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);


                cell1.innerHTML = '<input type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarPromo(this.parentNode.parentNode.rowIndex);recorre_tabla_promoventes();">';

                cell2.innerHTML = '<select class="form-control" style="width: 100%" name="promoventex" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                recorre_tabla_promoventes();
            }
        } else {
            return false;
        }
    })
}


function eliminarPromo(value) {
    document.getElementById("promoventes").deleteRow(value);
}


function recorre_tabla_promoventes(y) {
    var table = document.getElementById('promoventes');
    var tabletxt = document.getElementById('promoventes').value;
    var arreglo = [];
    /*  for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
         for (var c = 2, m = table.rows[r].cells.length; c < m; c++) {
             var input = table.rows[r].cells[c].innerHTML;
             arreglo.push(y);
            
         }
 
     } */
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
            var input = table.rows[r].cells[c].innerHTML;
            limite = "4",
                separador = "id=",
                arregloDeSubCadenas = input.split(separador, limite);

            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);

            arreglo.push(arregloDeSubCadenas2[1]);

        }

    }

    document.getElementById("promoventes_arreglo").value = arreglo;
}

function llenarFaltas(value) {
    Swal.fire({
        /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
        title: '¿Agregar falta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Si`,
        CancelButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            // table = "demandados_table";//nombre de la tabla
            if (value != "") {
                x = document.getElementById('tipo_falta');
                y = x.options[x.selectedIndex].text;
                z = x.options[x.selectedIndex].value;
                var rows = document.getElementById("faltas_expediente").rows.length;

                valida = document.getElementById(z);
                if (valida) {
                    //ya se inserto la falta al expediente
                } else {

                    var tabla = document.getElementById("faltas_expediente");
                    var row = tabla.insertRow(rows);
                    row.style.backgroundColor = "white";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);



                    cell1.innerHTML = '<input type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarfalta(this.parentNode.parentNode.rowIndex);recorre_tabla_faltas();">';

                    cell2.innerHTML = '<select class="form-control" style="width: 100%" name="promoventex" id="' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                    // console.log(z);
                    recorre_tabla_faltas();
                }
            }
        } else {
            return false;
        }
    })
}

function eliminarfalta(value) {
    document.getElementById("faltas_expediente").deleteRow(value);
}

function recorre_tabla_faltas(y) {
    var table = document.getElementById('faltas_expediente');
    var tabletxt = document.getElementById('faltas_expediente').value;
    var arreglo = [];
    /*  for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
         for (var c = 2, m = table.rows[r].cells.length; c < m; c++) {
             var input = table.rows[r].cells[c].innerHTML;
             arreglo.push(y);
            
             console.log(arreglo);
         }
 
     } */
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
            var input = table.rows[r].cells[c].innerHTML;
            limite = "2",
                separador = "id=",
                arregloDeSubCadenas = input.split(separador, limite);

            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);

            arreglo.push(arregloDeSubCadenas2[1]);
            // console.log(arreglo);

        }

    }

    document.getElementById("faltas_expedientes").value = arreglo;
}

//Funcion para traer los datos de un expediente
function traerRecurso(value, sr) {

    if (sr == "cr" && value != null) {
        document.getElementById('display_info_recu').style.display = 'block';
        document.getElementById('display_info').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';
    }
    // $('.select2-multiple').val(null).trigger('change');

    if (value != null) {
        //var route = ruta_global + "/traer_recurso/" + value;
        var token = $("#token").val();
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_recurso/" + value,
            data: value,
            success: function (data) {
                //FOR EACH PARA AGREGAR LOS NUMERO DE RECURSO AL EXPEDIENTE SELECCIONADO
                select_aux1 = document.getElementById('num_recurso');
                document.getElementById("num_recurso").value = '';
                $("#num_recurso").empty();

                var x = $('#num_recurso');

                option = new Option(data.datos_recurso.num_recurso, data.datos_recurso.id, true, true);

                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.datos_recurso
                    }
                });


                /*  //FOR EACH PARA AGREGAR promoventes AL EXPEDIENTE SELECCIONADO
                 data.promoventes.forEach(promovente => {
                     var x = $('#promovente_rec');
                     
                         option = new Option(promovente.nombre, promovente.id, true, true);
                     x.append(option).trigger('change');
                     x.trigger({
                         type: 'select2:select',
                         params: {
                             data: promovente
                         }
                     });
                 });//END FOREACH DEMANDADOS */
                select_aux1 = document.getElementById('promovente_rec');
                document.getElementById("promovente_rec").value = '';
                $("#promovente_rec").empty();
                //FOR EACH PARA AGREGAR LOS ACTORES AL EXPEDIENTE SELECCIONADO
                data.promoventes.forEach(function (promovente, index) {
                    var x = $('#promovente_rec');
                    if (promovente.tipo == "FISICA") {
                        option = new Option(promovente.nombre + " " + promovente.apellido_paterno + " " + promovente.apellido_materno, promovente.id, true, true);
                    } else if (promovente.tipo == "MORAL") {
                        option = new Option(promovente.razon_social, promovente.id, true, true);
                    } else {
                        option = new Option(promovente.nombre, promovente.id, true, true);

                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: promovente
                        }
                    });
                });//END FOREACH ACTORES




                select_aux1 = document.getElementById('num_folio_oficialia_rec');
                document.getElementById("num_folio_oficialia_rec").value = '';
                $("#num_folio_oficialia_rec").empty();

                //FOR EACH PARA AGREGAR LOS NUM FOLIO AL EXPEDIENTE SELECCIONADO

                var x = $('#num_folio_oficialia_rec');
                option = new Option(data.datos_recurso.num_folio, data.datos_recurso.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.datos_recurso
                    }
                });

                var x = $('#num_folio_oficialia');
                option = new Option(data.datos_recurso.num_folio, data.datos_recurso.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.datos_recurso
                    }
                });


                //FOR EACH PARA AGREGAR LOS TERCEROS AL EXPEDIENTE SELECCIONADO
                /* data.terceras.forEach(tercera => {
                    var x = $('#terceros_aux');
                    if (tercera.tipo == "FISICA") {
                        option = new Option(tercera.nombre + " " + tercera.apellido_paterno + " " + tercera.apellido_materno, tercera.id, true, true);
                    } else if (tercera.tipo == "MORAL") {
                        option = new Option(tercera.razon_social, tercera.id, true, true);
                    } else {
                        option = new Option(tercera.nombre, tercera.id, true, true);
                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: tercera
                        }
                    });
                });//END FOREACH TERCEROS */
                select_aux1 = document.getElementById('tipo_aux_rec');
                document.getElementById("tipo_aux_rec").value = '';
                $("#tipo_aux_rec").empty();

                var x = $('#tipo_aux_rec');
                option = new Option(data.datos_recurso.tipo_exp, data.datos_recurso.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.datos_recurso
                    }
                });

                select_aux1 = document.getElementById('tipo_recurso');
                document.getElementById("tipo_recurso").value = '';
                $("#tipo_recurso").empty();

                var x = $('#tipo_recurso');
                option = new Option(data.datos_recurso.tipo_recurso, data.datos_recurso.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.datos_recurso
                    }
                });

                select_aux1 = document.getElementById('fecha_aux_rec');
                document.getElementById("fecha_aux_rec").value = '';
                $("#fecha_aux_rec").empty();

                var x = $('#fecha_aux_rec');
                option = new Option(data.datos_recurso.fecha, data.datos_recurso.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.datos_recurso
                    }
                });

                select_aux1 = document.getElementById('observaciones_aux_rec');
                document.getElementById("observaciones_aux_rec").value = '';
                $("#observaciones_aux_rec").empty();


                var x = $('#observaciones_aux_rec');
                option = new Option(data.datos_recurso.observaciones, data.datos_recurso.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.datos_recurso
                    }
                });

                //console.log(data.datos);

                if (sr == "detalle" || sr == "cr") {

                    select_aux1 = document.getElementById('fecha_aux_rec');
                    document.getElementById("fecha_aux_rec").value = '';
                    $("#fecha_aux_rec").empty();
                    //FOR EACH PARA AGREGAR LOS DATOS AL EXPEDIENTE SELECCIONADOtipo_juicio
                    data.datos.forEach(dato => {
                        fecha = document.getElementById('fecha_aux_rec');
                        option = document.createElement("option");
                        option.value = dato.id;
                        option.text = dato.fecha;
                        fecha.add(option, fecha[0]);
                        $("#fecha_aux_rec").val(dato.id);

                        /*  numFolio = document.getElementById('num_folio_oficialia');
                         option = document.createElement("option");
                         option.text = dato.num_folio;
                         option.value = dato.id;
                         numFolio.add(option, numFolio[0]);
                         $("#num_folio_oficialia").val(dato.id); */

                        /*     ubicacion = document.getElementById('ubicacion_rec');
                            option = document.createElement("option");
                            option.text = dato.ubicacion;
                            option.value = dato.id;
                            ubicacion.add(option, ubicacion[0]);
                            $("#ubicacion").val(dato.id); */
                        select_aux1 = document.getElementById('tipo_promocion_aux_rec');
                        document.getElementById("tipo_promocion_aux_rec").value = '';
                        $("#tipo_promocion_aux_rec").empty();

                        tipoPromocion = document.getElementById('tipo_promocion_aux_rec');
                        option = document.createElement("option");
                        option.text = dato.tipo_promocion;
                        option.value = dato.id;
                        tipoPromocion.add(option, tipoPromocion[0]);
                        $("#tipo_promocion_aux_rec").val(dato.id);

                        select_aux1 = document.getElementById('tipo_recepcion_aux_rec');
                        document.getElementById("tipo_recepcion_aux_rec").value = '';
                        $("#tipo_recepcion_aux_rec").empty();

                        tipoRecepcion = document.getElementById('tipo_recepcion_aux_rec');
                        option = document.createElement("option");
                        option.text = dato.tipo_recepcion;
                        option.value = dato.id;
                        tipoRecepcion.add(option, tipoRecepcion[0]);
                        $("#tipo_recepcion_aux_rec").val(dato.id);

                        select_aux1 = document.getElementById('ultima_ac_rec');
                        document.getElementById("ultima_ac_rec").value = '';
                        $("#ultima_ac_rec").empty();

                        update = document.getElementById('ultima_ac_rec');
                        option = document.createElement("option");
                        option.text = dato.updated_at;
                        option.value = dato.id;
                        update.add(option, update[0]);
                        $("#ultima_ac_rec").val(dato.id);

                        select_aux1 = document.getElementById('fecha_captura_rec');
                        document.getElementById("fecha_captura_rec").value = '';
                        $("#fecha_captura_rec").empty();

                        create = document.getElementById('fecha_captura_rec');
                        option = document.createElement("option");
                        option.text = dato.created_at;
                        option.value = dato.id;
                        create.add(option, create[0]);
                        $("#fecha_captura_rec").val(dato.id);
                        //console.log(dato.captura);

                        select_aux1 = document.getElementById('modificado_rec');
                        document.getElementById("modificado_rec").value = '';
                        $("#modificado_rec").empty();

                        user = document.getElementById('modificado_rec');
                        option = document.createElement("option");
                        option.text = dato.captura;
                        option.value = dato.id;
                        user.add(option, user[0]);
                        $("#modificado_rec").val(dato.id);



                        /*  tipo = document.getElementById('tipo_aux');
                         option = document.createElement("option");
                         option.text = dato.tipo;
                         option.value = dato.id;
                         tipo.add(option, tipo[0]);
                         $("#tipo_aux").val(dato.id); */

                        /*  observaciones = document.getElementById('observaciones_aux');
                         option = document.createElement("option");
                         option.text = data.datos_recurso.observaciones;
                         option.value = data.datos_recurso.id;
                         observaciones.add(option, observaciones[0]);
                         $("#observaciones_aux").val(dato.id);
  */



                    });//END FOREACH TERCEROS






                }


            }
        });


    } else {
        document.getElementById('display_info').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';
    }
}


function cancelar_cita(id) {
    Swal.fire({
        /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
        title: '¿Está seguro que desea cancelar su cita?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            var token = $("#token").val();
            $.ajax({
                type: "get",
                method: 'get',
                url: "/cancelar_cita/" + id,
                success: function (data) {
                    if (data.cita.estado == "CANCELADA") {
                        Swal.fire(
                            'Cancelada',
                            'Su cita se ha cancelado correctamente.',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error',
                            'No se ha podido cancelar la cita.',
                            'warning'
                        )
                    }
                }
            });
        }
    })
}

function cancelar_cita_publica(folio) {
    Swal.fire({
        /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
        title: '¿Está seguro que desea cancelar su cita?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/cancelar_cita_publica/" + folio,
                success: function (data) {
                    if (data.cita) {
                        Swal.fire(
                            'Cancelada',
                            'Su cita se ha cancelado correctamente.',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error',
                            'No se ha podido cancelar la cita.',
                            'warning'
                        )
                    }
                }
            });
        }
    })
}

function traer_datos_cita(id) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_datos_cita/" + id,
        success: function (data) {
            if (data.cita) {
                $('#num_folio').empty();
                $('#fecha').empty();
                $('#hora').empty();
                $('#nombre_persona').empty();
                $('#tipo_tramite').empty();
                $('#num_exp').empty();



                var x = $('#num_folio');
                option = new Option(data.cita['folio'], data.cita['folio'], true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.cita
                    }
                });
                var x = $('#fecha');
                option = new Option(data.cita['fecha'], data.cita['fecha'], true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.cita
                    }
                });

                var x = $('#hora');
                option = new Option(data.cita['hora'], data.cita['hora'], true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.cita
                    }
                });

                var x = $('#nombre_persona');
                option = new Option(data.cita['name'] + " " + data.cita['apellido_p'] + " " + data.cita['apellido_m'] + data.cita['razon_social'], data.cita['tipo_persona'], true, true);

                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.cita
                    }
                });
                var x = $('#tipo_tramite');
                option = new Option(data.cita['tipo_cita'], data.cita['id_tramite'], true, true);

                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: data.cita
                    }
                });
                if (data.cita['num_expediente'] != "") {
                    document.getElementById('display_expediente').style.display = 'block';

                    var x = $('#num_exp');
                    option = new Option(data.cita['num_expediente'], data.cita['num_expediente'], true, true);

                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: data.cita
                        }
                    });


                } else {
                    document.getElementById('display_expediente').style.display = 'none';
                }
                $('#num_folio').select2({});
                $('#fecha').select2({});
                $('#hora').select2({});
                $('#nombre_persona').select2({});
                $('#tipo_tramite').select2({});
                $('#num_exp').select2({});
                //si el usuario solciito firma electronica

            }
            if (data.domicilio) {
                document.getElementById('calle').value = data.domicilio['calle'];
                document.getElementById('numero').value = data.domicilio['numero'];
                document.getElementById('numero_ext').value = data.domicilio['numero_ext'];
                document.getElementById('colonia').value = data.domicilio['colonia'];
                document.getElementById('municipio').value = data.domicilio['municipio'];
                document.getElementById('estado_region').value = data.domicilio['estado_region'];
                document.getElementById('codigo_postal').value = data.domicilio['codigo_postal'];
                document.getElementById('entre_calles').value = data.domicilio['entre_calles'];
                document.getElementById('referencia').value = data.domicilio['referencia'];



            }
            document.getElementById("padre").innerHTML = "";
            //aquí instanciamos al componente padre
            var padre = document.getElementById("padre");
            data.documentos.forEach(documento => {
                //aquí agregamos el componente de tipo input
                var div = document.createElement("div");
                div.setAttribute("id", 'div' + documento.id);
                div.classList.add('col-lg-12');


                var div2 = document.createElement("div");
                div2.setAttribute("id", 'card' + documento.id);
                div2.classList.add('card-box');

                label = document.createElement("Label");
                label.setAttribute('for', 'userName');
                label.innerHTML = "Documento: " + documento.tipo;

                input = document.createElement("INPUT");
                input.setAttribute("id", 'input' + documento.id);
                input.setAttribute("class", 'dropify');
                input.setAttribute("name", 'input' + documento.id);
                input.setAttribute('type', 'file');
                input.setAttribute('accept', '.pdf');
                input.setAttribute('data-default-file', documento.doc);
                input.setAttribute('value', documento.doc);
                input.classList.add('dropify');

                a = document.createElement("a");
                a.setAttribute("target", '_blank');
                a.setAttribute("class", 'button-list');
                a.setAttribute("href", '/CITAS/DOCUMENTOS/' + documento.doc);


                button = document.createElement("button");
                button.setAttribute("type", 'button');
                button.setAttribute("class", 'btn btn-danger waves-effect waves-light');
                button.setAttribute("innerHTML", 'Ver documento');
                button.textContent = 'Ver documento';




                padre.appendChild(div);
                div.appendChild(div2);
                div2.appendChild(label);
                div2.appendChild(input);
                div2.appendChild(a);
                a.appendChild(button);
                $('#input' + documento.id).dropify();

            });
        }
    });

}

function cambia_documentacion(value) {
    if (value == "SI") {
        document.getElementById('display_firma').style.display = 'block';
        document.getElementById('display_incorrecta').style.display = 'none';
        document.getElementById('display_domicilio').style.display = 'block';
        document.getElementById('password').required = true;
        document.getElementById('password_confirmation').required = true;
        document.getElementById('calle').required = true;
        document.getElementById('numero').required = true;
        document.getElementById('numero_ext').required = true;
        document.getElementById('colonia').required = true;
        document.getElementById('municipio').required = true;
        document.getElementById('estado_region').required = true;
        document.getElementById('codigo_postal').required = true;


    } else {
        document.getElementById('display_incorrecta').style.display = 'block';
        document.getElementById('display_firma').style.display = 'none';
        document.getElementById('display_domicilio').style.display = 'none';
        document.getElementById('password').required = false;
        document.getElementById('password_confirmation').required = false;
        document.getElementById('calle').required = false;
        document.getElementById('numero').required = false;
        document.getElementById('numero_ext').required = false;
        document.getElementById('colonia').required = false;
        document.getElementById('municipio').required = false;
        document.getElementById('estado_region').required = false;
        document.getElementById('codigo_postal').required = false;
    }

}

function valida_check() {
    x = document.getElementById('nuevo').checked;
    if (x == true) {
        document.getElementById('persona').disabled = true;
        document.getElementById('persona').required = false;
        document.getElementById('nuevo').value = "SI";
    } else {
        document.getElementById('persona').disabled = false;
        document.getElementById('persona').required = true;
        document.getElementById('nuevo').value = "NO";
    }
}

function mostrar_datos_persona(value) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traerDirections/" + value,
        success: function (data) {
            if (data.direcciones) {

                if (data.direcciones.numero == "") {
                    numero = ""
                } else {
                    numero = data.direcciones.numero;
                }

                direccion = data.direcciones.calle + ' No.' + data.direcciones.numero_ext + ' Int.' + numero + ' Municipio: ' + data.direcciones.municipio + ' Estado: ' + data.direcciones.municipio;
            } else {
                direccion = "Sin domicilio registrado";
            }
            Swal.fire({
                /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
                title: '¿La direccion del ' + tipo + ' seleccionado es correcta?',
                text: direccion,
                icon: 'question',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`,
            });
        }
    });
}


//////////////////////////*********JUICIO EN LINEA */
function mostrar_datos_inicio_linea(value) {
    if (value == "NULIDAD") {
        document.getElementById('display_nuevo').style.display = 'block';
        document.getElementById('display_obs').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';

        document.getElementById('display_rag').style.display = 'none';
        document.getElementById('display_falta_pre').style.display = 'none';


        document.getElementById('tipo_falta').required = false;
        document.getElementById('id_juicio').required = true;
        document.getElementById('tipo_acto').required = true;

        document.getElementById('tipo_promocion').required = true;
        document.getElementById('hojas_escrito').required = true;
        document.getElementById('escaneo_escrito').required = true;

        $('.select2-multiple').select2({
        })

    } else if (value == "RAG") {
        alert('No puede ingresar RAG');
        return false;
        document.getElementById('display_nuevo').style.display = 'none';
        document.getElementById('display_obs').style.display = 'block';
        document.getElementById('display_archivos').style.display = 'block';

        document.getElementById('display_rag').style.display = 'block';
        document.getElementById('display_falta_pre').style.display = 'block';


        document.getElementById('tipo_falta').required = true;
        document.getElementById('id_juicio').required = true;
        document.getElementById('tipo_acto').required = false;

        document.getElementById('tipo_promocion').required = true;
        document.getElementById('hojas_escrito').required = true;
        document.getElementById('escaneo_escrito').required = true;

        $('.select2-multiple').select2({
        })

    }

}


function valida_input_repetido_linea(tipo, input, table_aux, array_auxiliar, value) {
    if (tipo == "ACTOR") {
        var cadena = document.getElementById('actores_arreglo').value;
    } else if (tipo == "Demandado") {
        var cadena = document.getElementById('demandados_arreglo').value;
    } else if (tipo == "TERCERO INTERESADO") {
        var cadena = document.getElementById('terceros_arreglo').value;
    } else if (tipo == "Presunto responsable") {
        var cadena = document.getElementById('presunto_arreglo').value;
    } else if (tipo == "Autoridad investigadora") {
        var cadena = document.getElementById('autoridad_inv_arreglo').value;
    } else if (tipo == "Autoridad sustanciadora") {
        var cadena = document.getElementById('autoridad_sus_arreglo').value;
    } else if (tipo == "Denunciante") {
        var cadena = document.getElementById('denunciantes_arreglo').value;
    } else if (tipo == "Particular") {
        var cadena = document.getElementById('particulares_arreglo').value;
    }

    if (cadena.includes(value) == true) {
        Swal.fire({
            icon: 'error',
            title: 'ATENCIÓN',
            text: 'Ya se ha seleccionado este registro anteriormente'
        })
        return false;
    } else {
        traerDireccionesDelegado_linea(tipo, input, table_aux, array_auxiliar, value);
    }



}

function traerDireccionesDelegado_linea(tipo, input, table_aux, array_auxiliar, value) {
    // table = "demandados_table";//nombre de la tabla
    if (value != "") {
        table = table_aux;
        array_aux = array_auxiliar; //nombre del array
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traerDirections/" + value,
            success: function (data) {
                if (data.direcciones) {
                    if (data.direcciones.numero == "") {
                        numero = ""
                    } else {
                        numero = data.direcciones.numero;
                    }

                    direccion = data.direcciones.calle + ' No.' + data.direcciones.numero_ext + ' Int.' + numero + ' Municipio: ' + data.direcciones.municipio + ' Estado: ' + data.direcciones.municipio;
                } else {
                    direccion = "Sin domicilio registrado";
                }
                Swal.fire({
                    /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
                    title: '¿Está seguro de agregar al ' + tipo + ' seleccionado en la demanda?',
                    text: '',
                    icon: 'question',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Si`,
                    denyButtonText: `No`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        //Agregar a la tabla

                        x = document.getElementById(input);
                        y = x.options[x.selectedIndex].text;
                        z = x.options[x.selectedIndex].value;
                        var tabla = document.getElementById(table);
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";

                        if (data.direcciones) {
                            if (data.direcciones.numero == "") {
                                numero = ""
                            } else {
                                numero = data.direcciones.numero;
                            }

                            direccion = data.direcciones.calle + ' No.' + data.direcciones.numero_ext + ' Int.' + numero + ' Municipio: ' + data.direcciones.municipio + ' Estado: ' + data.direcciones.municipio;
                        } else {
                            direccion = "Sin domicilio registrado " + '<a type="button" target="blank" class="btn btn-success waves-effect waves-light btn-success btn-sm" href="/crear_direccion/' + data.value + '"role="button"><i class="mdi mdi-plus-box"></i></a>';
                        }
                        if (tipo == "ACTOR" || tipo == "Denunciante") {
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                            var cell6 = row.insertCell(5);
                            cell1.innerHTML = '<input id="delete_' + array_aux + z + '" type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaOficialia(table,this.parentNode.parentNode.rowIndex,' + z + ');recorre_tabla_general(table_aux,1,0,array_aux);">';
                            cell2.innerHTML = '<select class="form-control" style="width: 100%" name="' + array_aux + z + '" id="' + array_aux + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            cell3.innerHTML = '<select data-placeholder="Ingrese representante(s) ..." id="representante' + array_aux + z + '" name="representante' + array_aux + z + '[]" style="width: 100%; text-transform:uppercase;" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase();" class="form-control" multiple="multiple"></select>';
                            cell4.innerHTML = '<select data-placeholder="Ingrese delegado(s) ..." id="delegado' + array_aux + z + '" name="delegado' + array_aux + z + '[]" style="width:100%" class="form-control" multiple="multiple"></select>';
                            cell5.innerHTML = '<select class="form-control select2-multiple" data-placeholder="Seleccione una opción ..." multiple="multiple" style="width: 100%" name="abogados' + array_aux + z + '[]" id="abogados' + array_aux + z + '"data-toggle="select2">';
                            cell6.innerHTML = '<select data-placeholder="Ingrese autorizados ..." id="autorizado' + array_aux + z + '" name="autorizado' + array_aux + z + '[]" style="width: 100%"  class="form-control" multiple="multiple"></select>';

                            $('#representante' + array_aux + z).select2({ tags: true })
                            $('#delegado' + array_aux + z).select2({ tags: true })
                            //AGREGAMOS LOS ABOGADOS AL INPUT DE LOS ABOGADOS
                            select_aux1 = document.getElementById('abogados' + array_aux + z);
                            data.abogados.forEach(abogado => {
                                option = document.createElement("option");
                                option.text = "N° registro: " + abogado.num_registro_cedula;
                                option.value = abogado.id;
                                select_aux1.add(option, select_aux1[0]);
                            });//END FOR EACH
                            $('#abogados' + array_aux + z).select2({})
                            $('#autorizado' + array_aux + z).select2({ tags: true })

                        } else {
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = '<input  id="delete_' + array_aux + z + '" type="button" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaOficialia(table,this.parentNode.parentNode.rowIndex,' + z + ');recorre_tabla_general(table,1,0,array_aux);">';
                            cell2.innerHTML = '<select class="form-control" style="width: 100%" name="' + array_aux + z + '" id="' + array_aux + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            // cell3.innerHTML = '<select readonly data-placeholder="Ingrese representante(s) ..." id="representante' + array_aux + z + '" name="representante' + array_aux + z + '[]" style="width: 100%"  class="form-control" multiple="multiple"></select>';
                            //cell4.innerHTML = '<select readonly data-placeholder="Ingrese delegado(s) ..." id="delegado' + array_aux + z + '" name="delegado' + array_aux + z + '[]" style="width:100%" class="form-control" multiple="multiple"></select>';
                            //cell5.innerHTML = '<select readonly class="form-control select2-multiple" data-placeholder="Seleccione una opción ..." multiple="multiple" style="width: 100%" name="abogados' + array_aux + z + '[]" id="abogados' + array_aux + z + '"data-toggle="select2">';
                            //cell6.innerHTML = '<select readonly data-placeholder="Ingrese autorizados ..." id="autorizado' + array_aux + z + '" name="autorizado' + array_aux + z + '[]" style="width: 100%"  class="form-control" multiple="multiple"></select>';

                        }


                        recorre_tabla_general(table, 1, 0, array_aux);

                        if (tipo == "Presunto responsable") {
                            var1 = "falta_pre";
                            var2 = "faltas_presuntos_arreglo";
                            var tabla = document.getElementById('falta_pre');
                            var row = tabla.insertRow(1);
                            row.style.backgroundColor = "white";
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = '<select class="form-control" style="width: 100%" name="presunto_' + z + '" id="presunto_' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            cell2.innerHTML = '<select onchange="recorre_tabla_general(var1,0,0,var2)"; class="form-control" style="width: 100%" name="presunto_tipo' + z + '" id="presunto_tipo' + z + '"  data-toggle="select2"></select>';
                            traer_tipos_faltas('presunto_tipo' + z);
                            recorre_tabla_general('falta_pre', '0', '0', 'faltas_presuntos_arreglo');
                        } else if (tipo == "Particular") {
                            var1 = "particulares_vin";
                            var2 = "faltas_particular_arreglo";
                            var tabla = document.getElementById('particulares_vin');
                            var row = tabla.insertRow(1);
                            row.style.backgroundColor = "white";
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = '<select class="form-control" style="width: 100%" name="particular_vin_' + z + '" id="particular_vin_' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                            cell2.innerHTML = '<select onchange="recorre_tabla_general(var1,0,0,var2)"; class="form-control" style="width: 100%" name="particular_vin_' + z + '" id="particular_vin_' + z + '"  data-toggle="select2"></select>';
                            traer_tipos_faltas('particular_vin_' + z);
                            recorre_tabla_general('particulares_vin', '0', '0', 'faltas_particular_arreglo');

                        }

                        //Agregar a la tabla
                    } else if (result.isDenied) {
                    }
                })

            }
        });
    }
}


//FUNCION PARA AGREGAR EL NUMERO DE ANEXOS
function anexos_hojas_linea(value) {
    document.getElementById("anexos_div").innerHTML = "";
    if (value > 0) {
        for (index = 1; index <= value; index++) {
            //aquí instanciamos al componente padre
            var padre = document.getElementById("anexos_div");
            //aquí agregamos el componente de tipo input
            var div = document.createElement("div");
            div.setAttribute("id", 'div' + index);
            div.classList.add('col-lg-4');


            var div2 = document.createElement("div");
            div2.setAttribute("id", 'card' + index);
            div2.classList.add('card-box');

            input = document.createElement("INPUT");
            input.setAttribute("id", 'input' + index);
            input.setAttribute("class", 'dropify');
            input.setAttribute("name", 'input' + index);
            input.setAttribute('type', 'file');
            input.setAttribute('required', 'true');
            input.setAttribute('accept', '.pdf');
            input.setAttribute('data-max-file-size', '50M');
            //AGREGA EL INPUT 2 CON EL TIPO
            select = document.createElement("select");
            select.setAttribute("id", 'select' + index);
            select.setAttribute("class", 'form-control mt-2 mb-2');
            select.setAttribute("data-toggle", 'select2');
            select.setAttribute("name", 'select' + index);
            select.setAttribute('required', 'true');
            select.setAttribute('data-placeholder', 'Seleccione una opción ...');

            //AGREGA EL INPUT 2 CON EL TIPO
            select = document.createElement("select");
            select.setAttribute("id", 'select' + index);
            select.setAttribute("class", 'form-control mt-2 mb-2');
            select.setAttribute("data-toggle", 'select2');
            select.setAttribute("name", 'select' + index);
            select.setAttribute('required', 'true');
            select.setAttribute('data-placeholder', 'Seleccione una opción ...');
            //AGREGA EL INPUT 2 CON LA FORMA
            select2 = document.createElement("select");
            select2.setAttribute("id", 'select2' + index);
            select2.setAttribute("class", 'form-control mt-2 mb-2');
            select2.setAttribute("data-toggle", 'select2');
            select2.setAttribute("name", 'select2' + index);
            select2.setAttribute('required', 'true');

            label = document.createElement("Label");
            label.setAttribute('for', 'userName');
            label.innerHTML = "Hojas del anexo";

            span = document.createElement('span');
            span.setAttribute('class', 'text-danger')
            span.innerHTML = "*";


            input2 = document.createElement("input");
            input2.setAttribute("id", 'input2' + index);
            input2.setAttribute("class", 'form-control mt-2 mb-2');
            input2.setAttribute("name", 'input2' + index);
            input2.setAttribute('required', 'true');
            input2.setAttribute('type', 'number');
            input2.setAttribute('min', '1');
            input2.setAttribute('max', '999');
            input2.setAttribute('placeholder', 'Hojas del anexo (numérico)');
            input2.setAttribute('onmousewheel', 'this.blur();');

            // AGREGA UN ETIQUETA H4 CON EL NUMERO DE HOJAS
            h4 = document.createElement("h4");
            h4.setAttribute("id", 'h4' + index);
            h4.innerHTML = "Anexo n°" + index;
            //AGREGA TODOS LOS DIV Y INPUT
            padre.appendChild(div);
            div.appendChild(div2);
            div2.appendChild(h4);
            div2.appendChild(select);
            div2.appendChild(select2);
            div2.appendChild(label);
            label.appendChild(span);
            div2.appendChild(input2);
            div2.appendChild(input);
            $('.dropify').dropify();

            select_aux1 = document.getElementById('select' + index);
            opciones = ['SELECCIONE UNA OPCIÓN', 'ACTA DE NACIMIENTO', 'CURP', 'IFE', 'PASAPORTE MEXICANO', 'CÉDULA PROFESIONAL', 'TITULO PROFESIONAL', 'CARTILLA DEL SERVICIO MILITAR', 'INAPAM', 'CREDENCIAL IMSS', 'CREDENCIAL ISSSTE', 'LICENCIA DE CONDUCIR', 'CARTA DE NATURALIZACIÓN', 'OTRO']
            opciones.forEach(element => {
                option = document.createElement("option");
                option.text = element;
                if (element == "SELECCIONE UNA OPCIÓN") {
                    option.value = "";
                } else {
                    option.value = element;
                }
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH

            select_aux2 = document.getElementById('select2' + index);
            opciones = ['SELECCIONE UNA OPCIÓN', 'ORIGINAL', 'COPIA CERTIFICADA', 'COPIA SIMPLE']
            opciones.forEach(element => {
                option = document.createElement("option");
                option.text = element;
                if (element == "SELECCIONE UNA OPCIÓN") {
                    option.value = "";
                } else {
                    option.value = element;
                }
                select_aux2.add(option, select_aux2[0]);
            });//END FOR EACH



        }


    }

}


function modal_oficialia_linea(tipo) {
    formulario = document.getElementById('basic-form');
    if (tipo == "actor") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('actor','actor','directions','actores_arreglo');");
    } else if (tipo == "tercero") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('TERCERO INTERESADO','tercero','directions_tercero','terceros_arreglo');");
    } else if (tipo == "particular") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('Particular','particular','particulares_dir','particulares_arreglo');");
    } else if (tipo == "denunciante") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('Denunciante','denunciante','denunciantes_dir','denunciantes_arreglo');");
    } else if (tipo == "presunto") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('Presunto responsable','presunto_resp','presunto_dirs','presunto_arreglo');");
    } else if (tipo == "demandado") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('demandado','demandado','demandados_table','demandados_arreglo');");
    } else if (tipo == "autoridad_sus") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('Autoridad sustanciadora','autoridad_sust','autoridad_sus_table','autoridad_sus_arreglo');");
    } else if (tipo == "autoridad_inv") {
        formulario.setAttribute('action', "javascript:modal_actor_linea('Autoridad investigadora','autoridad_inv','autoridad_inv_table','autoridad_inv_arreglo');");
    }
    $('#modal').modal('show'); // abrir
    $('#autoridad').select2({});

}

//MODAL PARA GUARDAR LOS DATOS DE UN ACTOR NUEVO EN LA VISTA DE NUEVOS INGRESOS
function modal_actor_linea(tipo, input, table_aux, array_auxiliar) {
    tipoP = document.getElementById('tipoPersona').value;
    if (tipoP == null || tipoP == "") {
        document.getElementById('error_tipo').innerHTML = "El tipo de persona es obligatorio";
        return false;
    } else {
        document.getElementById('error_tipo').innerHTML = "";
        if (tipoP == "SUB") {
            nombre = document.getElementById('nombre_aut_sub').value;
            aut = document.getElementById('autoridad').value;
            if (nombre == null || nombre == "") {
                document.getElementById('error_aut_sub').innerHTML = "El nombre de la autoridad es obligatorio";
                return false;
            } else {
                document.getElementById('error_aut_sub').innerHTML = "";
            }

            if (aut == null || aut == "") {
                document.getElementById('error_aut_sub_lig').innerHTML = "La autoridad a la que pertenece es obligatoria";
                return false;
            } else {
                document.getElementById('error_aut_sub_lig').innerHTML = "";
            }

        } else if (tipoP == "FISICA") {

            nombre = document.getElementById('nombre').value;
            apellidoPaterno = document.getElementById('apellidoPaterno').value;
            sexo = document.getElementById('sexo').value;
            if (nombre == null || nombre == "") {
                document.getElementById('error_nombre').innerHTML = "El nombre es obligatorio";
                return false;
            } else {
                document.getElementById('error_nombre').innerHTML = "";
            }

            if (apellidoPaterno == null || apellidoPaterno == "") {
                document.getElementById('error_apellido_p').innerHTML = "El apellido es obligatorio";
                return false;
            } else {
                document.getElementById('error_apellido_p').innerHTML = "";
            }

            if (sexo == null || sexo == "") {
                document.getElementById('error_sexo').innerHTML = "El sexo es obligatorio";
                return false;
            } else {
                document.getElementById('error_sexo').innerHTML = "";
            }

        } else {
            razonSocial = document.getElementById('razonSocial').value;

            if (razonSocial == null || razonSocial == "") {
                document.getElementById('error_razon').innerHTML = "La razón social es obligatoria";
                return false;
            } else {
                document.getElementById('error_razon').innerHTML = "";
            }
            //moral
        }
    }
    table = table_aux;
    array_aux = array_auxiliar; //nombre del array
    ruta = "/actoresCrearLinea";
    dataString = $('#basic-form').serialize(); // carga todos 

    $.ajax({
        type: "POST",
        method: 'post',
        url: ruta,
        data: dataString,
        success: function (data) {

            var x = $('#' + input + '');
            /* var x = $('#' + 'directions' + ''); */
            if (data.persona.tipo == "FISICA") {
                option = new Option(data.persona.nombre + " " + data.persona.apellido_paterno + " " + data.persona.apellido_materno, data.persona.id, true, true);
            } else if (data.persona.tipo == "MORAL") {
                option = new Option(data.persona.razon_social, data.persona.id, true, true);
            } else {
                option = new Option(data.persona.nombre, data.persona.id, true, true);
            }
            if (tipo == "actor") {
                // $("#actor").val(data.id);
                $("#modal .close").click();
                $('.modal.in').modal('hide');
            } else {
                //$("#tercero").val(data.id);
                $("#modal .close").click();
                $('.modal.in').modal('hide');
            }
            //Agregar a la tabla
            //Agregar a la tabla 

            x.append(option);
            x.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });

            x = document.getElementById(input);
            y = x.options[x.selectedIndex].text;
            z = x.options[x.selectedIndex].value;
            var tabla = document.getElementById(table);
            var row = tabla.insertRow(1);
            row.style.backgroundColor = "white";
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            if (tipo == "actor" || tipo == "Denunciante") {
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
            }

            cell1.innerHTML = '<input type="button" id="eliminar' + z + '" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaOficialia(table,this.parentNode.parentNode.rowIndex); recorre_tabla_directions(table,1,array_aux);">';
            cell2.innerHTML = '<select class="form-control" style="width: 100%" name="' + array_aux + z + '" id="' + array_aux + z + '"data-toggle="select2"><option value="' + z + '"selected>' + y + '</option></select>';
            if (tipo == "actor" || tipo == "Denunciante") {
                cell3.innerHTML = '<select data-placeholder="Ingrese representante(s) ..." id="representante' + array_aux + z + '" name="representante' + array_aux + z + '[]" style="width: 100%; text-transform:uppercase;" onKeyup="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase();" class="form-control" multiple="multiple"></select>';
                cell4.innerHTML = '<select data-placeholder="Ingrese delegado(s) ..." id="delegado' + array_aux + z + '" name="delegado' + array_aux + z + '[]" style="width:100%" class="form-control" multiple="multiple"></select>';
                cell5.innerHTML = '<select class="form-control select2-multiple" data-placeholder="Seleccione una opción ..." multiple="multiple" style="width: 100%" name="abogados' + array_aux + z + '[]" id="abogados' + array_aux + z + '"data-toggle="select2">';
                cell6.innerHTML = '<select id="autorizado' + array_aux + z + '" name="autorizado' + array_aux + z + '[]" style="width: 100%"  class="form-control" multiple="multiple"></select>';


                $('#representante' + array_aux + z).select2({ tags: true })
                $('#delegado' + array_aux + z).select2({ tags: true })
                //AGREGAMOS LOS ABOGADOS AL INPUT DE LOS ABOGADOS
                select_aux1 = document.getElementById('abogados' + array_aux + z);
                data.abogados.forEach(abogado => {
                    option = document.createElement("option");
                    option.text = abogado.nombre + " " + abogado.apellido_paterno + " " + abogado.apellido_materno + ". N° Cédula: " + abogado.num_cedula;
                    option.value = abogado.id;
                    select_aux1.add(option, select_aux1[0]);
                });//END FOR EACH
                $('#abogados' + array_aux + z).select2({})
                $('#autorizado' + array_aux + z).select2({ tags: true })
                //recorre_tabla_representantes(table, 1, array_aux);
            }
            recorre_tabla_general(table, '1', '0', array_aux);

            if (tipo == "Presunto responsable") {
                var1 = "falta_pre";
                var2 = "faltas_presuntos_arreglo";
                var tabla = document.getElementById('falta_pre');
                var row = tabla.insertRow(1);
                row.style.backgroundColor = "white";
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = '<select class="form-control" style="width: 100%" name="presunto_' + z + '" id="presunto_' + z + '"  data-toggle="select2"> <option value="' + z + '" selected>' + y + '</option></select>';
                cell2.innerHTML = '<select onchange="recorre_tabla_general(var1,0,0,var2)"; class="form-control" style="width: 100%" name="presunto_tipo' + z + '" id="presunto_tipo' + z + '"  data-toggle="select2"></select>';
                traer_tipos_faltas('presunto_tipo' + z);
                recorre_tabla_general('falta_pre', '0', '0', 'faltas_presuntos_arreglo');
            }


        }
    });
}

function mostrar_datos_linea(id) {

    $.ajax({
        type: "get",
        method: 'get',
        url: "/mostrar_expediente_linea/" + id,
        success: function (data) {
            $("#documentacion td").remove();
            $("#actores td").remove();
            $('#recibe').empty();

            if (data.actores) {
                data.actores.forEach(actor => {
                    var tabla = document.getElementById('actores');
                    var row = tabla.insertRow(1);
                    if (actor.estado == "POR_VALIDAR") {
                        row.style.backgroundColor = "#FF8181";
                    } else {
                        row.style.backgroundColor = "#AFFFA7";
                    }

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    if (actor.estado == "POR_VALIDAR") {
                        cell1.innerHTML = "REGISTRO CREADO POR EL USUARIO";
                    } else {
                        cell1.innerHTML = "REGISTRO VALIDADO";
                    }
                    cell2.innerHTML = actor.tipo_persona_juicio;
                    if (actor.tipo == "MORAL") {
                        cell3.innerHTML = "PERSONA " + actor.tipo + ": " + actor.razon_social;
                    } else if (actor.tipo == "AUTORIDAD") {
                        cell3.innerHTML = actor.tipo + ": " + actor.nombre;
                    } else {
                        cell3.innerHTML = actor.tipo + ": " + actor.nombre + " " + actor.apellido_paterno + " " + actor.apellido_materno;
                    }
                    if (actor.estado == "POR_VALIDAR") {
                        cell4.innerHTML = '<td>Ligar con registro existente<input checked="false" onchange="cambia_liga(' + actor.id + ');" id="checkboxpersona_' + actor.id + '"  type="checkbox"/></td>';
                        cell5.innerHTML = '<select disabled class="form-control select2-multiple" onchange="aut_ligadas(' + actor.id + ');" required style="width: 100%" name="aut_' + actor.id + '" id="aut_' + actor.id + '" data-toggle="select2" data-placeholder="Seleccione una opción ..."><option value="">Seleccione una opción ...</option></select>';
                        document.getElementById("checkboxpersona_" + actor.id).checked = false;
                        select_aux1 = document.getElementById("aut_" + actor.id);
                        data.personas.forEach(persona => {

                            option = document.createElement("option");
                            if (persona.tipo == "FISICA") {
                                option.text = persona.nombre + " " + persona.apellido_paterno + " " + persona.apellido_materno;
                            } else if (persona.tipo == "AUTORIDAD") {
                                option.text = persona.nombre;
                            } else if (persona.tipo == "MORAL") {
                                option.text = persona.razon_social;
                            } else {
                                option.text = persona.nombre;
                            }
                            option.value = persona.id;
                            select_aux1.add(option, select_aux1[0]);
                        });//END FOR EACH                
                        $('#aut_' + actor.id).addClass('form-control select2-multiple');
                        $('#aut_' + actor.id).select2({});

                    } else {
                        cell4.innerHTML = "✔";
                        cell5.innerHTML = "✔";
                    }



                });

            }
            if (data.autorizados) {
                data.autorizados.forEach(autorizado => {
                    var tabla = document.getElementById('autorizados');
                    var row = tabla.insertRow(1);
                    row.style.backgroundColor = "white";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = autorizado.funcion;
                    cell2.innerHTML = autorizado.nombre;
                    cell3.innerHTML = autorizado.nombre_persona + " " + autorizado.apellido_paterno + " " + autorizado.apellido_materno + " " + autorizado.razon_social;

                });

            }
            if (data.autorizados.length > 0 || data.abogados.length > 0) {
                document.getElementById('display_autorizados').style.display = 'block';
            } else {
                document.getElementById('display_autorizados').style.display = 'none';
            }

            if (data.abogados) {
                data.abogados.forEach(abogado => {
                    var tabla = document.getElementById('autorizados');
                    var row = tabla.insertRow(1);
                    row.style.backgroundColor = "white";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = abogado.funcion;
                    cell2.innerHTML = abogado.nombre_abogado + " " + abogado.abogado_apellido_paterno + " " + abogado.abogado_apellido_materno;
                    cell3.innerHTML = abogado.nombre_persona + " " + abogado.apellido_paterno + " " + abogado.apellido_materno + " " + abogado.razon_social;

                });

            }


            if (data.faltas_presuntos.length > 0) {
                document.getElementById('display_faltas').style.display = 'block';
                data.faltas_presuntos.forEach(falta => {
                    var tabla = document.getElementById('presuntos');
                    var row = tabla.insertRow(1);
                    row.style.backgroundColor = "white";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = falta.nombre + " " + falta.apellido_paterno + " " + falta.apellido_materno + " " + falta.razon_social;
                    cell2.innerHTML = falta.tipo_falta;

                });

            } else {
                document.getElementById('display_faltas').style.display = 'none';
            }

            if (data.anexos) {
                data.anexos.forEach(anexo => {
                    var tabla = document.getElementById('documentacion');
                    var row = tabla.insertRow(1);
                    row.style.backgroundColor = "white";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    cell1.innerHTML = anexo.tipo;
                    cell2.innerHTML = anexo.forma;
                    cell3.innerHTML = anexo.num_hojas;
                    cell4.innerHTML = '<a href="/OFICIALIA/archivos/amparos_promociones/' + anexo.escaneo_anexos + '" target="blank" class="btn btn-danger waves-effect waves-light btn-sm" role="button"><i class="fas fa-file-pdf"></i></a';


                });

            }

            if (data.promocion) {
                var tabla = document.getElementById('documentacion');
                var row = tabla.insertRow(1);
                row.style.backgroundColor = "white";
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = "ESCRITO INICIAL DE DEMANDA";
                cell2.innerHTML = "ORIGINAL";
                cell3.innerHTML = data.promocion.hojas_escrito;
                cell4.innerHTML = '<a href="/OFICIALIA/archivos/amparos_promociones/' + data.promocion.escaneo_escrito + '" target="blank" class="btn btn-danger waves-effect waves-light btn-sm" role="button"><i class="fas fa-file-pdf"></i></a';
            }


            select_aux1 = document.getElementById('recibe');
            data.users_sala.forEach(user => {
                option = document.createElement("option");
                option.text = user.funcion_sala + " " + user.name + " " + user.apellido_p + " " + user.apellido_m;
                option.value = user.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH

            if (data.datos.tipo == "NULIDAD") {
                document.getElementById('display_acto').style.display = 'block';
                select_aux1 = document.getElementById('tipo_acto');
                data.tipos_actos.forEach(tipo_acto => {
                    option = document.createElement("option");
                    option.text = tipo_acto.tipo_acto;
                    option.value = tipo_acto.id;
                    select_aux1.add(option, select_aux1[0]);

                });//END FOR EACH
                $("#tipo_acto option[value=" + data.datos.id_acto + "]").attr("selected", true);
            } else if (data.datos.tipo == "RAG") {
                document.getElementById('display_falta').style.display = 'block';
                select_aux1 = document.getElementById('tipo_falta');
                data.tipos_faltas.forEach(tipo_falta => {
                    option = document.createElement("option");
                    option.text = tipo_falta.tipo_falta;
                    option.value = tipo_falta.id;
                    select_aux1.add(option, select_aux1[0]);

                });//END FOR EACH
                $("#tipo_falta option[value=" + data.datos.id_falta + "]").attr("selected", true);

            }





        }
    });
}

function guardando_exp_linea() {
    $("#modal-loading").modal();
    formulario = document.getElementById('wizard-validation-form');
    expediente = document.getElementById('expediente').value;
    formulario.setAttribute('action', '/validar_expediente/' + expediente);
    document.getElementById("wizard-validation-form").submit();
}

function mostrar_datos_promociones_linea(value) {
    if (value == "AMPARO" || value == "PROMOCION") {

        document.getElementById('display_amparo').style.display = 'block';
        document.getElementById('display_Recurso').style.display = 'none';
        document.getElementById('expediente').required = true;
    } else if (value == "RECURSO") {
        document.getElementById('display_amparo').style.display = 'block';
        document.getElementById('display_tipoRecurso').style.display = 'block';
        document.getElementById('display_Recurso').style.display = 'none';
        document.getElementById('expediente').required = true;

    } else if (value == "RECURSO/AMPARO" || value == "RECURSO/PROMOCION") {

        document.getElementById('display_Recurso').style.display = 'block';
        document.getElementById('display_tipoRecurso').style.display = 'none';
        document.getElementById('display_amparo').style.display = 'none';
    }
    /* document.getElementById('display_amparo').style.display = 'none'; */
    document.getElementById('display_archivos').style.display = 'block';
    document.getElementById('tipo_promocion').required = true;
    document.getElementById('hojas_escrito').required = true;
    document.getElementById('escaneo_escrito').required = true;
}

function valida_num_expediente_linea(form, tipo) {
    dataString = $('#' + form).serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_num_expediente_linea/" + tipo,
        data: dataString,
        success: function (data) {
            if (data.expediente) {
                if (tipo == "RECURSO") {
                    document.getElementById('error_num_rec').innerHTML = "El número de recurso ingresado es válido";
                    document.getElementById('error_num_rec').className = "text-success";
                } else {
                    document.getElementById('error_num_exp').innerHTML = "El número de expediente ingresado es válido";
                    document.getElementById('error_num_exp').className = "text-success";
                }
                document.getElementById('val').value = "Expediente válido";
                document.getElementById('val').className = "text-success";

            } else {

                if (tipo == "RECURSO") {
                    document.getElementById('error_num_rec').innerHTML = "El número de expediente ingresado no es válido, favor de verificarlo";
                    document.getElementById('error_num_rec').className = "text-danger";
                } else {
                    document.getElementById('error_num_exp').innerHTML = "El número de expediente ingresado no es válido, favor de verificarlo";
                    document.getElementById('error_num_exp').className = "text-danger";
                }
                //document.getElementById('btn').disabled = true;
                document.getElementById('val').value = null;




            }
        }
    });

}

function mostrar_promo_linea(value) {
    limite = "2",
        separador = "_",
        arregloDeSubCadenas = value.split(separador, limite);
    tipo = arregloDeSubCadenas[0];
    id = arregloDeSubCadenas[1];
    if (tipo != null) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/mostrar_promocion_linea/" + tipo + "/" + id,
            success: function (data) {
                if (data.datos) {
                    $("#documentacion td").remove();
                    $("#promoventes td").remove();
                    $("#promoventes_arreglo").empty();
                    $('#num_recurso').empty();
                    $('#promovente').empty();
                    $('#tipo_recurso').empty();

                    //FOR EACH PARA AGREGAR LOS DATOS AL EXPEDIENTE SELECCIONADOtipo_juicio

                    select_aux1 = document.getElementById('tipo_promocion_aux');
                    data.tipos_promocion.forEach(tipo_promocion => {
                        option = document.createElement("option");
                        option.text = tipo_promocion.tipo_promocion;
                        option.value = tipo_promocion.id;
                        select_aux1.add(option, select_aux1[0]);

                    });//END FOR EACH
                    $("#tipo_promocion_aux option[value=" + data.datos.id_promocion + "]").attr("selected", true);

                    tipo_promocion = document.getElementById('tipo_promocion');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.tipo_promocion;
                    tipo_promocion.add(option, tipo_promocion[0]);
                    $("#tipo_promocion").val(data.datos.id);

                    tipo_aux = document.getElementById('tipo_aux');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.tipo;
                    tipo_aux.add(option, tipo_aux[0]);
                    $("#tipo_aux").val(data.datos.id);

                    num_expediente = document.getElementById('num_expediente');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.num_expediente;
                    num_expediente.add(option, num_expediente[0]);
                    $("#num_expediente").val(data.datos.id);

                    fecha_aux = document.getElementById('fecha_aux');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.created_at;
                    fecha_aux.add(option, fecha_aux[0]);
                    $("#fecha_aux").val(data.datos.id);

                    ubicacion = document.getElementById('ubicacion');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.ubicacion;
                    ubicacion.add(option, ubicacion[0]);
                    $("#ubicacion").val(data.datos.id);

                    ultima_ac = document.getElementById('ultima_ac');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.updated_at;
                    ultima_ac.add(option, ultima_ac[0]);
                    $("#ultima_ac").val(data.datos.id);

                    modificado = document.getElementById('modificado');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.captura;
                    modificado.add(option, modificado[0]);
                    $("#modificado").val(data.datos.id);

                    observaciones_aux = document.getElementById('observaciones_aux');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.observaciones;
                    observaciones_aux.add(option, observaciones_aux[0]);
                    $("#observaciones_aux").val(data.datos.id);


                }
                if (tipo == "PROMOCION") {
                    document.getElementById('tipo_promo_aux').required = true;

                    document.getElementById('display_tipo_promo').style.display = 'block';
                    document.getElementById('display_recurso').style.display = 'none';

                    if (data.datos) {
                        var tabla = document.getElementById('documentacion');
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        cell1.innerHTML = "ESCRITO";
                        cell2.innerHTML = "ORIGINAL";
                        cell3.innerHTML = data.datos.hojas_escrito;
                        cell4.innerHTML = '<a target="_blank" href="/OFICIALIA/archivos/amparos_promociones/' + data.datos.escaneo_escrito + '" target="_blank" class="btn btn-danger waves-effect waves-light btn-sm" role="button"><i class="fas fa-file-pdf"></i></a';
                    }


                } else if (tipo == "RECURSO") {
                    document.getElementById('tipo_promo_aux').required = false;
                    document.getElementById('display_tipo_promo').style.display = 'none';
                    document.getElementById('display_recurso').style.display = 'block';
                    select_aux1 = document.getElementById('tipo_recurso_aux');
                    data.tipo_recursos.forEach(recurso => {
                        option = document.createElement("option");
                        option.text = recurso.tipo;
                        option.value = recurso.id;
                        select_aux1.add(option, select_aux1[0]);

                    });//END FOR EACH 
                    $("#tipo_recurso_aux option[value=" + data.datos.id_recurso + "]").attr("selected", true);

                    select_aux1 = document.getElementById('promovente');
                    data.personas.forEach(persona => {
                        option = document.createElement("option");
                        if (persona == "MORAL") {
                            option.text = persona.razon_social;
                        } else if (persona.tipo == "AUTORIDAD") {
                            option.text = persona.nombre;
                        } else {
                            option.text = persona.nombre + " " + persona.apellido_paterno + " " + persona.apellido_materno;
                        }
                        option.value = persona.id;
                        select_aux1.add(option, select_aux1[0]);

                    });//END FOR EACH onchange="valida_input_repetido('Promovente',this.value);"
                    select_aux1.setAttribute('onchange', "valida_input_repetido('Promovente',this.value);");

                    num_recurso = document.getElementById('num_recurso');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.num_recurso;
                    num_recurso.add(option, num_recurso[0]);
                    $("#num_recurso").val(data.datos.id);

                    tipo_recurso = document.getElementById('tipo_recurso');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.tipo_recurso;
                    tipo_recurso.add(option, tipo_recurso[0]);
                    $("#tipo_recurso").val(data.datos.id);

                    if (data.amparos_recursos) {

                        var tabla = document.getElementById('documentacion');
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        cell1.innerHTML = "ESCRITO";
                        cell2.innerHTML = "ORIGINAL";
                        cell3.innerHTML = data.amparos_recursos.hojas_escrito;
                        cell4.innerHTML = '<a target="_blank" href="/OFICIALIA/archivos/amparos_promociones/' + data.amparos_recursos.escaneo_escrito + '" target="blank" class="btn btn-danger waves-effect waves-light btn-sm" role="button"><i class="fas fa-file-pdf"></i></a';

                    }


                } else if (tipo == "PROMOCIONREC") {
                    document.getElementById('tipo_promo_aux').required = true;
                    document.getElementById('display_tipo_promo').style.display = 'block';
                    document.getElementById('display_recurso').style.display = 'none';
                    num_recurso = document.getElementById('num_recurso');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.num_recurso;
                    num_recurso.add(option, num_recurso[0]);
                    $("#num_recurso").val(data.datos.id);

                    tipo_recurso = document.getElementById('tipo_recurso');
                    option = document.createElement("option");
                    option.value = data.datos.id;
                    option.text = data.datos.tipo_recurso;
                    tipo_recurso.add(option, tipo_recurso[0]);
                    $("#tipo_recurso").val(data.datos.id);

                    if (data.datos) {
                        var tabla = document.getElementById('documentacion');
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        cell1.innerHTML = "ESCRITO";
                        cell2.innerHTML = "ORIGINAL";
                        cell3.innerHTML = data.datos.hojas_escrito;
                        cell4.innerHTML = '<a target="_blank" href="/OFICIALIA/archivos/amparos_promociones/' + data.datos.escaneo_escrito + '" target="blank" class="btn btn-danger waves-effect waves-light btn-sm" role="button"><i class="fas fa-file-pdf"></i></a';
                    }


                }

                if (data.anexos) {
                    data.anexos.forEach(anexo => {
                        var tabla = document.getElementById('documentacion');
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        cell1.innerHTML = anexo.tipo;
                        cell2.innerHTML = anexo.forma;
                        cell3.innerHTML = anexo.num_hojas;
                        cell4.innerHTML = '<a target="_blank" href="/OFICIALIA/archivos/amparos_promociones/' + anexo.escaneo_anexos + '" target="blank" class="btn btn-danger waves-effect waves-light btn-sm" role="button"><i class="fas fa-file-pdf"></i></a';


                    });

                }


            }
        });
    }

}

function disabled_noti(value) {
    limite = "6",
        separador = "_",
        arregloDeSubCadenas = value.split(separador, limite);
    tipo_per = arregloDeSubCadenas[1];
    persona_id = arregloDeSubCadenas[2];
    if (document.getElementById(value).checked == true) {
        document.getElementById('persona_' + tipo_per + "_" + persona_id).required = true;
        document.getElementById('tipo_not_' + tipo_per + "_" + persona_id).required = true;
        //document.getElementById('dias_' + tipo_per + "_" + persona_id).required = true;
        //document.getElementById('fecha_' + tipo_per + "_" + persona_id).required = true;
        //document.getElementById('correo_' + tipo_per + "_" + persona_id).required = true;
        //document.getElementById('direccion_' + tipo_per + "_" + persona_id).required = true;

        document.getElementById('persona_' + tipo_per + "_" + persona_id).disabled = false;
        document.getElementById('tipo_not_' + tipo_per + "_" + persona_id).disabled = false;
        document.getElementById('dias_' + tipo_per + "_" + persona_id).disabled = false;
        document.getElementById('fecha_' + tipo_per + "_" + persona_id).disabled = false;
        document.getElementById('correo_' + tipo_per + "_" + persona_id).disabled = false;
        document.getElementById('direccion_' + tipo_per + "_" + persona_id).disabled = false;


    } else {
        document.getElementById('persona_' + tipo_per + "_" + persona_id).required = false;
        document.getElementById('tipo_not_' + tipo_per + "_" + persona_id).required = false;
        document.getElementById('dias_' + tipo_per + "_" + persona_id).required = false;
        document.getElementById('fecha_' + tipo_per + "_" + persona_id).required = false;
        document.getElementById('correo_' + tipo_per + "_" + persona_id).required = false;
        document.getElementById('direccion_' + tipo_per + "_" + persona_id).required = false;

        document.getElementById('persona_' + tipo_per + "_" + persona_id).disabled = true;
        document.getElementById('tipo_not_' + tipo_per + "_" + persona_id).disabled = true;
        document.getElementById('dias_' + tipo_per + "_" + persona_id).disabled = true;
        document.getElementById('fecha_' + tipo_per + "_" + persona_id).disabled = true;
        document.getElementById('correo_' + tipo_per + "_" + persona_id).disabled = true;
        document.getElementById('direccion_' + tipo_per + "_" + persona_id).disabled = true;

    }
}

function eliminar_dir1(id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/eliminar_direccion_/" + id,
        success: function (data) {
            if (data.res == 1) {
                Swal.fire(
                    'Eliminado!',
                    'La dirección se ha eliminado correctamente.',
                    'success'
                )
                setTimeout(function () { location.reload() }, 1000);
            } else {
                Swal.fire(
                    'Error!',
                    'No se ha podido eliminado correctamente.',
                    'error'
                )
            }
        }
    });

}

function eliminar_dir2(id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/eliminar_direccion_representante_/" + id,
        success: function (data) {
            if (data.res == 1) {
                Swal.fire(
                    'Eliminado!',
                    'La dirección se ha eliminado correctamente.',
                    'success'
                )
                setTimeout(function () { location.reload() }, 1000);
            } else {
                Swal.fire(
                    'Error!',
                    'No se ha podido eliminado correctamente.',
                    'error'
                )
            }
        }
    });

}

function modal_direcciones_detalles_exp(form, ruta, id, id_expediente) {
    dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        data: dataString,
        url: "/" + ruta + "/" + id + "/" + id_expediente,
        success: function (direccion) {
            if (direccion) {

                Swal.fire(
                    'Guardada!',
                    'La dirección se ha guardado correctamente.',
                    'success'
                )

                window.location.href = window.location.href;
                window.location.reload();
                location.reload();


            } else {
                Swal.fire(
                    'Error!',
                    'No se ha podido actualizar la dirección.',
                    'error'
                )
            }
        }
    });
    return false;

}

function modal_direcciones(form, ruta, id, id_expediente, tipo) {
    dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        data: dataString,
        url: "/" + ruta + "/" + id + "/" + id_expediente,
        success: function (direccion) {
            if (direccion) {
                Swal.fire(
                    'Guardada!',
                    'La dirección se ha guardado correctamente.',
                    'success'
                )

                if (direccion.numero == "") {
                    numero = ""
                } else {
                    numero = direccion.numero;
                }



                var x = $('#direccion_' + tipo + "_" + id);
                option = new Option(direccion.id, direccion.calle + ' ' + numero + ' ' + direccion.numero_ext + ' ' + direccion.colonia + ' ' + direccion.municipio, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: direccion
                    }
                });
                x.tagsinput('destroy');
                x.tagsinput();


                //x.tagsinput('add', direccion.calle + ' ' + numero + ' ' + direccion.numero_ext + ' ' + direccion.colonia + ' ' + direccion.municipio, direccion.id);

                $('#modal_direc' + id + '_' + id_expediente).click();
                $('#modal_direc' + id + '_' + id_expediente).modal('hide');
                // $('#buton_direccion_' + id).hide();
                $('#span_direc_' + id).removeClass('badge badge-danger')
                $('#span_direc_' + id).addClass('badge badge-success')
                $('#span_direc_' + id).text('Dirección actualizada')
                //setTimeout(function () { location.reload() }, 1000);
            } else {
                Swal.fire(
                    'Error!',
                    'No se ha podido actualizar la dirección.',
                    'error'
                )
            }
        }
    });
    return false;

}


function modal_direcciones_modal(form, ruta) {
    id = document.getElementById('autoridad_aux').value;
    id_expediente = document.getElementById('expediente_aux').value;
    tipo = document.getElementById('tipo_aux').value;

    dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        data: dataString,
        url: "/" + ruta + "/" + id + "/" + id_expediente,
        success: function (direccion) {
            //  console.log(direccion);
            if (direccion) {
                Swal.fire(
                    'Guardada!',
                    'La dirección se ha guardado correctamente.',
                    'success'
                )
                if (direccion.numero == "") {
                    numero = ""
                } else {
                    numero = direccion.numero;
                }

                var x = $('#direccion_' + tipo + "_" + id);
                option = new Option(direccion.id, direccion.calle + ' ' + numero + ' ' + direccion.numero_ext + ' ' + direccion.colonia + ' ' + direccion.municipio, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: direccion
                    }
                });
                x.tagsinput('destroy');
                x.tagsinput();

                $('#modal_direccion').click();
                $('#modal_direccion').modal('hide');
                //$('#buton_direccion_' + id).hide();
                $('#span_direc_' + id).removeClass('badge badge-danger')
                $('#span_direc_' + id).addClass('badge badge-success')
                $('#span_direc_' + id).text('Dirección actualizada')

            } else {
                Swal.fire(
                    'Error!',
                    'No se ha podido actualizar la dirección.',
                    'error'
                )
            }
        }
    });
    return false;

}


function modal_direcciones_sent(form, ruta, id, id_expediente) {
    dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        data: dataString,
        url: "/" + ruta + "/" + id + "/" + id_expediente,
        success: function (data) {
            if (data.direccion) {
                Swal.fire(
                    'Guardada!',
                    'La dirección se ha guardado correctamente.',
                    'success'
                )
                if (direccion.numero == "") {
                    numero = ""
                } else {
                    numero = direccion.numero;
                }
                // setTimeout(function () { location.reload() }, 1000);
                /* var x = $('#correo_' + id + ' '); */
                var x = $('#direccion_' + id);
                option = new Option(direccion.calle + ' ' + numero + ' ' + direccion.numero_ext + ' ' + direccion.colonia + ' ' + direccion.municipio, id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: direccion
                    }
                });
                /* $('#correo_' + id).select2({
                }) */

                $('#direccion_' + id).select2({
                });

                $('#modal_sent' + id + '_' + id_expediente).click();
                $('#modal_sent' + id + '_' + id_expediente).modal('hide');
                $('#buton_direccion_' + id).hide();
                $('#span_direc_' + id).removeClass('badge badge-danger');
                $('#span_direc_' + id).addClass('badge badge-success');
                $('#span_direc_' + id).text('Dirección actualizada');
            } else {
                Swal.fire(
                    'Error!',
                    'No se ha podido actualizar la dirección.',
                    'error'
                )
            }
        }
    });
    return false;

}

function num_anexos_carga(index, value) {
    padre = document.getElementById('form-group_2' + index);
    input_aux = document.getElementById('input_anexos' + index);
    if (input_aux) {
        $('#input_anexos' + index).remove();
        $('#h4anexos' + index).remove();
    }

    if (value > 0) {
        Swal.fire({
            title: 'Desea escanear los anexos?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                h4 = document.createElement("h4");
                h4.setAttribute("id", 'h4anexos' + index);
                h4.innerHTML = value + " anexos escaneados";

                input = document.createElement("INPUT");
                input.setAttribute("id", 'input_anexos' + index);
                input.setAttribute("class", 'dropify');
                input.setAttribute("name", 'input_anexos' + index);
                input.setAttribute('type', 'file');
                input.setAttribute('required', 'true');
                input.setAttribute('accept', '.pdf');

                padre.appendChild(h4);
                padre.appendChild(input);
                $('#input_anexos' + index).dropify();
            }
        })

    } else {
        $('#input_anexos' + index).remove();
        $('#h4anexos' + index).remove();
    }

}


function elimina_archivo(archivo) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "elimina_archivo/" + archivo,
        success: function (data) {
        }
    });
}

function modal_persona(ruta, form, id) {
    dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        data: dataString,
        url: "/" + ruta + "/" + id,
        success: function (data) {
            if (data.persona) {
                Swal.fire(
                    'Guardada!',
                    'El registro se ha guardado correctamente.',
                    'success'
                )
                setTimeout(function () { location.reload() }, 1000);
            } else {
                Swal.fire(
                    'Error!',
                    'No se ha podido actualizar el registro.',
                    'error'
                )
            }
        }
    });
    return false;
}

function cambia_display_modal(value) {

    if (value == "ABOGADO") {
        document.getElementById('display_representante').style.display = 'none';
        document.getElementById('display_abogados').style.display = 'block';
    } else {
        document.getElementById('display_representante').style.display = 'block';
        document.getElementById('display_abogados').style.display = 'none';
    }
}

function fechas_radio() {
    chk = document.getElementById('customCheck1').checked;


    if (chk == true) {
        document.getElementById('fecha_inicio').disabled = false;
        document.getElementById('fecha_fin').disabled = false;
        document.getElementById('fecha_inicio').required = true;
        document.getElementById('fecha_fin').required = true;
    } else {
        document.getElementById('fecha_inicio').disabled = true;
        document.getElementById('fecha_fin').disabled = true;
        document.getElementById('fecha_inicio').value = "";
        document.getElementById('fecha_fin').value = "";
        document.getElementById('fecha_inicio').required = false;
        document.getElementById('fecha_fin').required = false;

    }
}

function radio_est() {
    chk = document.getElementById('customCheck1').checked;
    year = document.getElementById('year').value;
    tipo_user = document.getElementById('tipo_user').value;
    valida = document.getElementById('valida').value;

    if (chk == true) {
        document.getElementById('fecha_inicio').disabled = false;
        document.getElementById('fecha_fin').disabled = false;
    } else {
        document.getElementById('fecha_inicio').disabled = true;
        document.getElementById('fecha_fin').disabled = true;
        document.getElementById('fecha_inicio').value = "";
        document.getElementById('fecha_fin').value = "";

        $("#exp_por_etapa").empty();
        $("#expedientes_persona").empty();
        $("#recepcion_expedientes").empty();
        $("#tipo_recepcion").empty();
        //$("#padre").empty();
        $("#datatable td").remove();
        $("#acuerdos").empty();
        $("#acuerdos_usuario").empty();
        $("#tipos_Acuerdos").empty();
        $("#promociones").empty();
        $("#tipos_promociones").empty();
        $("#sentencias").empty();
        $("#tipos_senetencias").empty();
        $("#tipos_actos").empty();
        $("#tipos_falta").empty();
        $("#padre2").empty();
        $("#aut_mas").empty();
        $("#tipos_ac_rec").empty();
        $("#sentencias_usuario").empty();
        $("#tipos_sen_rec").empty();
        $("#recep_recu").empty();
        $("#tipo_recep_recu").empty();
        $("#tipos_recursos").empty();
        $("#exp_acumulados").empty();
        $("#rec_acumulados").empty();
        $("#firmas_emitidas").empty();
        $("#tipos_firmas").empty();
        $("#firmas_usuarios").empty();
        $("#not_actuarios").empty();
        $("#actuarios").empty();
        $("#tipos_noti").empty();
        $("#sentido_sentencias").empty();
        $("#tipo_exp").empty();
        $("#archivo").empty();



        setTimeout(function () {

            if (tipo_user == "TRIBUNAL") {
                cambiar_datos(0, 0, year);
                grafica_dona_json(0, 0, 'expedientes_etapa_json', 'exp_por_etapa', year);
                grafica_barras_json(0, 0, 'expedientes_por_usuarios_json', 'expedientes_persona', year);
                grafica_lineal_json(0, 0, 'recepcion_expedientes_char_json', 'recepcion_expedientes', year);
                grafica_dona_json(0, 0, 'tipo_recepcion_char_json', 'tipo_recepcion', year);
                grafica_dona_json(0, 0, 'expedientes_tipo_json', 'tipo_exp', year);
                // tablas_estadisticas(0, 0, 'autoridades_mas_demandas', 'datatable');
                grafica_area_json(0, 0, 'acuerdos_elaborados_char_json', 'acuerdos');
                grafica_barras_json(0, 0, 'usuarios_acuerdos_json', 'acuerdos_usuario', year);
                grafica_dona_json(0, 0, 'tipos_acuerdos_json', 'tipos_Acuerdos', year);
                grafica_area_json(0, 0, 'recepcion_promociones_char_json', 'promociones', year);
                grafica_dona_json(0, 0, 'tipos_promociones_char_json', 'tipos_promociones', year);
                grafica_area_json(0, 0, 'setencias_elaboradas_char_json', 'sentencias', year);
                grafica_dona_json(0, 0, 'tipos_sentencia_char_json', 'tipos_senetencias', year);
                grafica_dona_json(0, 0, 'actos_exp_char_json', 'tipos_actos', year);
                grafica_dona_json(0, 0, 'faltas_exp_char_json', 'tipos_falta', year);
                //actos_faltas_char(0, 0, 'actos_faltas_char', 'padre');
                grafica_dona_json(0, 0, 'autoridades_mas_demandas_json', 'aut_mas', year);
                grafica_dona_json(0, 0, 'tipos_acuerdos_rec_json', 'tipos_ac_rec', year);
                grafica_dona_json(0, 0, 'usuarios_sentencias_json', 'sentencias_usuario', year);
                grafica_dona_json(0, 0, 'tipos_sentencias_rec_json', 'tipos_sen_rec', year);
                grafica_lineal_json(0, 0, 'recepcion_recursos_json', 'recep_recu', year);
                grafica_dona_json(0, 0, 'tipos_recep_rec_json', 'tipo_recep_recu', year);
                grafica_dona_json(0, 0, 'tipos_recursos_json', 'tipos_recursos', year);
                grafica_area_json(0, 0, 'firmas_emitidas_json', 'firmas_emitidas', year);
                grafica_dona_json(0, 0, 'tipos_firmas_json', 'tipos_firmas', year);
                grafica_barras_json(0, 0, 'usuarios_firmas_json', 'firmas_usuarios', year);

                grafica_barras_json(0, 0, 'promociones_acordadas_json', 'promo_aco', year);
                grafica_barras_json(0, 0, 'tipo_promocion_rec_tradicional', 'tipo_promo_rec', year);
                grafica_lineal_json(0, 0, 'expedientes_acumulados_json', 'exp_acumulados', year);
                grafica_lineal_json(0, 0, 'recursos_acumulados_json', 'rec_acumulados', year);
                grafica_lineal_json(0, 0, 'notificaciones_actuarios_json', 'not_actuarios', year);
                grafica_barras_json(0, 0, 'notificaciones_por_actuarios_json', 'actuarios', year);
                grafica_dona_json(0, 0, 'tipos_notificacion_json', 'tipos_noti', year);
                grafica_barras_json(0, 0, 'tipos_sentido_sent_json', 'sentido_sentencias', year);
                grafica_area_json(0, 0, 'ingreso_archivo', 'archivo', year);
            }

        }, 1000);
    }

}

function grafica_dona(inicio, fin, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                data = [];
                date.forEach(element => {
                    if (element.length > 0) {
                        texto = element[0].nombre;
                        valor = element.length;
                        array = { 'label': texto, 'value': valor };
                        data.push(array);
                    }

                });
                //    console.log(data);
                //  console.log(array);
                new Morris.Donut({
                    element: id,
                    colors: ["#3db9dc", "#1bb99a", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)'],
                    data,
                });
            }
        }
    });
}

function grafica_dona_json(inicio, fin, ruta, id, year) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin + "/" + year,
        success: function (date) {
            if (date.datos) {
                data = [];
                date.datos.forEach(element => {

                    texto = element.nombre;
                    valor = element.total;
                    array = { 'label': texto, 'value': valor };
                    data.push(array);


                });
                new Morris.Donut({
                    element: id,
                    colors: ["#3db9dc", "#1bb99a", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)'],
                    data,
                });
            }
        }
    });
}


function grafica_barras(inicio, fin, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                data = [];
                date.forEach(element => {
                    if (element.length > 0) {
                        texto = element[0].name + " " + element[0].apellido_p;
                        valor = element.length;
                        array = { 'y': texto, 'a': valor };
                        data.push(array);
                    }
                });
                var $arrColors = ['#34495E', '#26B99A', '#666', '#3498DB', "#3db9dc", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', "#3db9dc", "#1bb99a", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', "#3db9dc", "#1bb99a", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', '#FF0000', '#800000', '#808000'];
                new Morris.Bar({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Número de registros'],
                    barColors: function (row, series, type) {
                        return $arrColors[row.x];
                    },
                });
            }
        }
    });
}

function grafica_barras_json(inicio, fin, ruta, id, year) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin + "/" + year,
        success: function (date) {
            if (date.datos) {
                data = [];
                date.datos.forEach(element => {
                    texto = element.nombre;
                    valor = element.total;
                    array = { 'y': texto, 'a': valor };
                    data.push(array);
                });
                var $arrColors = ['#34495E', '#26B99A', '#666', '#3498DB', "#3db9dc", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', "#3db9dc", "#1bb99a", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', "#3db9dc", "#1bb99a", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', '#FF0000', '#800000', '#808000'];
                new Morris.Bar({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Número de registros'],
                    barColors: function (row, series, type) {
                        return $arrColors[row.x];
                    },
                });
            }
        }
    });
}


function grafica_lineal(inicio, fin, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                data = [];
                date.forEach(element => {
                    if (element.length > 0) {
                        texto = element[0].fecha;
                        valor = element.length;
                        array = { 'y': texto, 'a': valor };
                        data.push(array);
                    }

                });
                new Morris.Line({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Número de expedientes'],
                });
            }
        }
    });
}

function grafica_lineal_json(inicio, fin, ruta, id, year) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin + "/" + year,
        success: function (date) {
            if (date.datos) {
                data = [];
                date.datos.forEach(element => {
                    texto = element.nombre;
                    valor = element.total;
                    array = { 'y': texto, 'a': valor };
                    data.push(array);

                });
                new Morris.Line({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Número de registros'],
                });
   
            }
        }
    });
}

function grafica_lineal_json_doble(inicio, fin, ruta, id, year) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin + "/" + year,
        success: function (date) {
            if (date.datos) {
                data = [];
                data2 = [];
             

                date.datos.forEach(element => {
                    texto = element.nombre;
                    valor = element.total;
                    array = { 'y': texto, 'a': valor };
                    data.push(array);

                });

                date.datos2.forEach(element => {                
                    texto = element.nombre;
                    valor = element.total;
                    array = { 'y': texto, 'b': valor };
                    data.push(array);

                });
                        
                  new Morris.Line({
                    element: id,
                    data:data,
                    xkey: 'y',
                    ykeys: ['a','b'],
                    labels: ['Número de registros','Número de registros'],
                    lineColors:['gray','red'],
                    hideHover: 'auto',
                    behaveLikeLine: true,
                    resize: true,
                });

   
            }
        }
    });
}



function grafica_dona_etapas(inicio, fin, id_expediente, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin + "/" + id_expediente,
        success: function (date) {
            if (date) {
                data = [];
                date.forEach(element => {

                    texto = element.nombre;
                    valor = element.dias;
                    array = { 'label': texto, 'value': valor };
                    data.push(array);


                });


                new Morris.Donut({
                    element: id,
                    colors: ["#3db9dc", "#1bb99a", "#ebeff2", '#ff00ff', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)'],
                    data,
                });
            }
        }
    });
}


function grafica_lineal_etapas(inicio, fin, id_expediente, ruta, id) {

    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin + "/" + id_expediente,
        success: function (date) {
            if (date) {
                data = [];
                date.forEach(element => {


                    texto = element.fecha;
                    valor = element.dias + " " + element.nombre;
                    etapa = element.nombre;

                    array = { 'y': texto, 'a': valor, 'z': etapa };
                    data.push(array);

                });
                new Morris.Line({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['días'],
                });
            }
        }
    });
}



function tablas_estadisticas(inicio, fin, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                var tabla = document.getElementById("datatable");
                date.forEach(element => {
                    if (element.length > 0) {
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        if (element[0].tipo == "AUTORIDAD") {
                            cell1.innerHTML = '<td id="element[0].id" class="text-muted">' + element[0].nombre + '</td>';
                        } else if (element[0].tipo == "SUB") {
                            cell1.innerHTML = '<td id="element[0].id" class="text-muted">SUBAUTORIDADES DE: ' + element[0].nombre_aut + '</td>';
                        } else if (element[0].tipo == "FISICA") {
                            cell1.innerHTML = '<td id="element[0].id" class="text-muted">' + element[0].nombre + " " + element[0].apellido_paterno + " " + element[0].apellido_materno + '</td>';
                        } else if (element[0].tipo == "MORAL") {
                            cell1.innerHTML = '<td id="element[0].id" class="text-muted">' + element[0].razon_social + '</td>';
                        }
                        cell2.innerHTML = '<td>' + element.length + '</td>';
                        if (element[0].tipo == "SUB") {
                            cell3.innerHTML = ' <td><a  target="blank" href="/personas/' + element[0].id_aut + '" class="btn waves-effect waves-light btn-info" role="button"><i class="mdi mdi-eye"></i></a></td>';

                        } else {
                            cell3.innerHTML = '<td> <a target="blank" href="/personas/' + element[0].id + '" class="btn waves-effect waves-light btn-info" role="button"><i class="mdi mdi-eye"></i></a></td>';

                        }
                    }
                });
            }
        }
    });
}

function aut_mas_demandas(inicio, fin, ruta, aux) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                date.forEach(element => {
                    if (element.length > 0) {
                        var padre = document.getElementById(aux)
                        //aquí agregamos el componente de tipo input
                        var a = document.createElement("a");
                        a.setAttribute("target", 'inbox-item');
                        a.setAttribute("href", '/personas/' + element[0].id);

                        var inbox = document.createElement("div");
                        inbox.setAttribute("class", 'inbox-item');
                        var div = document.createElement("div");
                        div.setAttribute("class", 'inbox-item-img');

                        var img = document.createElement("img");
                        img.setAttribute("class", 'rounded-circle');
                        img.setAttribute("src", '/img/logo_tja.png');
                        img.setAttribute('alt', '');

                        var p = document.createElement("p");
                        p.setAttribute("class", 'inbox-item-author');
                        if (element[0].tipo == "AUTORIDAD") {
                            p.innerHTML = element[0].nombre;
                        } else if (element[0].tipo == "SUB") {
                            p.innerHTML = "Subautoridad de: " + element[0].nombre_aut;
                        } else if (element[0].tipo == "FISICA") {
                            p.innerHTML = element[0].nombre + " " + element[0].apellido_paterno + " " + element[0].apellido_materno;
                        } else if (element[0].tipo == "MORAL") {
                            p.innerHTML = element[0].razon_social;
                        }

                        var p2 = document.createElement("p");
                        p2.setAttribute("class", 'inbox-item-text');
                        if (element[0].tipo == "SUB") {
                            p2.innerHTML = element[0].nombre + '. Total de demandas: ' + element.length;
                        } else {
                            p2.innerHTML = 'Total de demandas: ' + element.length;
                        }
                        //AGREGA TODOS LOS DIV Y INPUT
                        padre.appendChild(a);
                        a.appendChild(inbox);
                        inbox.appendChild(div);
                        div.appendChild(img);
                        inbox.appendChild(p);
                        inbox.appendChild(p2);

                    }




                });



            }
        }
    });
}


function grafica_area(inicio, fin, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                data = [];
                date.forEach(element => {
                    if (element.length > 0) {
                        texto = element[0].created_at;
                        valor = element.length;
                        array = { 'y': texto, 'a': valor };
                        data.push(array);
                    }

                });
                new Morris.Area({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Número de registros'],
                });
            }
        }
    });
}

function grafica_area_json(inicio, fin, ruta, id, year) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin + "/" + year,
        success: function (date) {
            if (date.datos) {
                data = [];
                date.datos.forEach(element => {
                    texto = element.nombre;
                    valor = element.total;
                    array = { 'y': texto, 'a': valor };
                    data.push(array);

                });
                new Morris.Area({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Número de registros'],
                });
            }
        }
    });
}


function expedientes_tipos(inicio, fin, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                data = [];
                date.forEach(element => {
                    if (element.length > 0) {
                        texto = element[0].created_at;
                        valor = element.length;
                        array = { 'y': texto, 'a': valor };
                        data.push(array);
                    }

                });
                new Morris.Area({
                    element: id,
                    data,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Número de registros'],
                });
            }
        }
    });
}

function actos_faltas_char(inicio, fin, ruta, aux) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                date.forEach(element => {
                    if (element.length > 0) {

                        var padre = document.getElementById(aux)
                        //aquí agregamos el componente de tipo input
                        var a = document.createElement("a");
                        var inbox = document.createElement("div");
                        inbox.setAttribute("class", 'inbox-item');
                        var div = document.createElement("div");
                        div.setAttribute("class", 'inbox-item-img');

                        var img = document.createElement("img");
                        img.setAttribute("class", 'rounded-circle');
                        img.setAttribute("src", '/img/martillo.png');
                        img.setAttribute('alt', '');

                        var p = document.createElement("p");
                        p.setAttribute("class", 'inbox-item-author');
                        p.innerHTML = element[0].nombre;
                        var p2 = document.createElement("p");
                        p2.setAttribute("class", 'inbox-item-text');
                        p2.innerHTML = 'Total de registros: ' + element.length;
                        //AGREGA TODOS LOS DIV Y INPUT
                        padre.appendChild(a);
                        a.appendChild(inbox);
                        inbox.appendChild(div);
                        div.appendChild(img);
                        inbox.appendChild(p);
                        inbox.appendChild(p2);
                    }




                });



            }
        }
    });
}

function cambiar_fecha_loby() {
    fecha_inicio = document.getElementById('fecha_inicio').value;
    fecha_fin = document.getElementById('fecha_fin').value;
    tipo_user = document.getElementById('tipo_user').value;
    valida = document.getElementById('valida').value;
    year = document.getElementById('year').value;


    if (fecha_inicio <= fecha_fin && fecha_inicio != null && fecha_fin != null) {
        $("#exp_por_etapa").empty();
        $("#expedientes_persona").empty();
        $("#recepcion_expedientes").empty();
        $("#tipo_recepcion").empty();
        //$("#padre").empty();
        $("#datatable td").remove();
        $("#acuerdos").empty();
        $("#acuerdos_usuario").empty();
        $("#tipos_Acuerdos").empty();
        $("#promociones").empty();
        $("#tipos_promociones").empty();
        $("#sentencias").empty();
        $("#tipos_senetencias").empty();
        $("#tipos_actos").empty();
        $("#tipos_falta").empty();
        $("#padre2").empty();
        $("#aut_mas").empty();
        $("#tipos_ac_rec").empty();
        $("#sentencias_usuario").empty();
        $("#tipos_sen_rec").empty();
        $("#recep_recu").empty();
        $("#tipo_recep_recu").empty();
        $("#tipos_recursos").empty();
        $("#promo_aco").empty();
        $("#tipo_promo_rec").empty();
        $("#promo_aco").empty();
        $("#tipo_promo_rec").empty();
        $("#exp_acumulados").empty();
        $("#rec_acumulados").empty();
        $("#firmas_emitidas").empty();
        $("#tipos_firmas").empty();
        $("#firmas_usuarios").empty();
        $("#not_actuarios").empty();
        $("#actuarios").empty();
        $("#tipos_noti").empty();
        $("#sentido_sentencias").empty();
        $("#tipo_exp").empty();
        $("#archivo").empty();

        // $("#etapas").empty(); 
        setTimeout(function () {


            if (tipo_user == "TRIBUNAL") {
                cambiar_datos(fecha_inicio, fecha_fin, year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'expedientes_etapa_json', 'exp_por_etapa', year);
                grafica_barras_json(fecha_inicio, fecha_fin, 'expedientes_por_usuarios_json', 'expedientes_persona', year);
                grafica_lineal_json(fecha_inicio, fecha_fin, 'recepcion_expedientes_char_json', 'recepcion_expedientes', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipo_recepcion_char_json', 'tipo_recepcion', year);
                grafica_dona_json(0, 0, 'expedientes_tipo_json', 'tipo_exp', year);
                // tablas_estadisticas(0, 0, 'autoridades_mas_demandas', 'datatable');
                grafica_area_json(fecha_inicio, fecha_fin, 'acuerdos_elaborados_char_json', 'acuerdos', year);
                grafica_barras_json(fecha_inicio, fecha_fin, 'usuarios_acuerdos_json', 'acuerdos_usuario', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_acuerdos_json', 'tipos_Acuerdos', year);
                grafica_area_json(fecha_inicio, fecha_fin, 'recepcion_promociones_char_json', 'promociones', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_promociones_char_json', 'tipos_promociones', year);
                grafica_area_json(fecha_inicio, fecha_fin, 'setencias_elaboradas_char_json', 'sentencias', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_sentencia_char_json', 'tipos_senetencias', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'actos_exp_char_json', 'tipos_actos', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'faltas_exp_char_json', 'tipos_falta', year);
                //actos_faltas_char(0, 0, 'actos_faltas_char', 'padre');
                grafica_dona_json(fecha_inicio, fecha_fin, 'autoridades_mas_demandas_json', 'aut_mas', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_acuerdos_rec_json', 'tipos_ac_rec', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'usuarios_sentencias_json', 'sentencias_usuario', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_sentencias_rec_json', 'tipos_sen_rec', year);
                grafica_lineal_json(fecha_inicio, fecha_fin, 'recepcion_recursos_json', 'recep_recu', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_recep_rec_json', 'tipo_recep_recu', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_recursos_json', 'tipos_recursos', year);
                grafica_lineal_json(fecha_inicio, fecha_fin, 'expedientes_acumulados_json', 'exp_acumulados', year);
                grafica_lineal_json(fecha_inicio, fecha_fin, 'recursos_acumulados_json', 'rec_acumulados', year);
                grafica_area_json(fecha_inicio, fecha_fin, 'firmas_emitidas_json', 'firmas_emitidas', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_firmas_json', 'tipos_firmas', year);
                grafica_barras_json(fecha_inicio, fecha_fin, 'usuarios_firmas_json', 'firmas_usuarios', year);
                grafica_lineal_json(fecha_inicio, fecha_fin, 'notificaciones_actuarios_json', 'not_actuarios', year);
                grafica_barras_json(fecha_inicio, fecha_fin, 'notificaciones_por_actuarios_json', 'actuarios', year);
                grafica_dona_json(fecha_inicio, fecha_fin, 'tipos_notificacion_json', 'tipos_noti', year);

                grafica_barras_json(fecha_inicio, fecha_fin, 'promociones_acordadas_json', 'promo_aco', year);
                grafica_barras_json(fecha_inicio, fecha_fin, 'tipo_promocion_rec_tradicional', 'tipo_promo_rec', year);
                grafica_barras_json(fecha_inicio, fecha_fin, 'tipos_sentido_sent_json', 'sentido_sentencias', year);
                grafica_area_json(fecha_inicio, fecha_fin, 'ingreso_archivo', 'archivo', year);

                // grafica_barras_json(0, 0, 'promociones_acordadas_json', 'promo_aco', year);
                // grafica_barras_json(0, 0, 'tipo_promocion_rec_tradicional', 'tipo_promo_rec', year);


            }
        }, 1000);

    } else {

    }

}

function cabezeras_graficos(inicio, fin, ruta, id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/" + ruta + "/" + inicio + "/" + fin,
        success: function (date) {
            if (date) {
                date.forEach(element => {
                    if (element.length > 0) {

                        var padre = document.getElementById("etapas");
                        //aquí agregamos el componente de tipo input

                        var div = document.createElement("div");
                        div.setAttribute("class", 'col-md-6 col-xl-3');

                        var div2 = document.createElement("div");
                        div2.setAttribute("class", 'card-box tilebox-one');

                        var i = document.createElement("i");
                        i.setAttribute("class", 'icon-layers float-right m-0 h2 text-muted');

                        var h6 = document.createElement("h6");
                        h6.setAttribute("class", 'text-muted text-uppercase mt-0');
                        h6.innerHTML = element[0].nombre;

                        var h3 = document.createElement("h3");
                        h3.setAttribute("class", 'my-3');
                        h3.setAttribute("data-plugin", 'counterup');
                        h3.innerHTML = element.length;

                        //AGREGA TODOS LOS DIV Y INPUT
                        padre.appendChild(div);
                        div.appendChild(div2);
                        div2.appendChild(i);
                        div2.appendChild(h6);
                        div2.appendChild(h3);
                    }
                });
            }
        }
    });
}




function valida_dato(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/valida_dato/" + dato + "/fondo/fondo",
            success: function (date) {
                if (date.valida.length <= 0) {
                    document.getElementById("error").innerHTML = "";
                    document.getElementById('submit3').disabled = false;
                } else {
                    document.getElementById("error").innerHTML = "El nombre o clave del fondo ya existe.";
                    document.getElementById('submit3').disabled = true;
                }
            }
        });
    }

}

function valida_dato_seccion(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/valida_dato/" + dato + "/seccion/seccion",
            success: function (date) {
                if (date.valida.length <= 0) {
                    document.getElementById("error").innerHTML = "";
                    document.getElementById('submit3').disabled = false;
                } else {
                    document.getElementById("error").innerHTML = "El nombre o clave de la sección ya existe.";
                    document.getElementById('submit3').disabled = true;
                }
            }
        });
    }

}

function valida_dato_serie(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/valida_dato/" + dato + "/serie/serie",
            success: function (date) {
                if (date.valida.length <= 0) {
                    document.getElementById("error").innerHTML = "";
                    document.getElementById('submit3').disabled = false;
                } else {
                    document.getElementById("error").innerHTML = "El nombre o clave de la serie ya existe.";
                    document.getElementById('submit3').disabled = true;
                }
            }
        });
    }

}

function traer_secciones(fondo) {
    $("#seccion").empty();
    $("#serie").empty();
    if (fondo) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_secciones/" + fondo,
            success: function (date) {
                selected = document.getElementById('seccion');
                $('#seccion').append(new Option("Seleccione una opción...", ""))
                date.secciones.forEach(seccion => {
                    option = document.createElement("option");
                    option.text = seccion.seccion;
                    option.value = seccion.id;
                    selected.add(option, selected[0]);
                });//END FOR EACH

            }
        });
    }

}

function traer_series(seccion) {
    if (seccion) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_series/" + seccion,
            success: function (date) {
                $("#serie").empty();
                selected = document.getElementById('serie');
                $('#serie').append(new Option("Seleccione una opción...", ""))
                date.series.forEach(serie => {
                    option = document.createElement("option");
                    option.text = serie.serie;
                    option.value = serie.id;
                    selected.add(option, selected[0]);
                });//END FOR EACH

            }
        });
    }

}


function nombre_caja(length, type) {
    switch (type) {
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    var caja = "";
    for (i = 0; i < length; i++) {
        if (type == 'rand') {
            caja += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        } else {
            caja += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    document.getElementById('caja').value = "TJA-ARCHIVO-CAJA-" + caja;
    valida_dato_caja("TJA-ARCHIVO-CAJA-" + caja);
    //return pass;
}

function traer_estantes(archivo) {
    if (archivo) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_estantes/" + archivo,
            success: function (date) {
                $("#estante").empty();
                selected = document.getElementById('estante');
                $('#estante').append(new Option("Seleccione una opción...", ""))
                date.estantes.forEach(estante => {
                    option = document.createElement("option");
                    option.text = estante.estante;
                    option.value = estante.id;
                    selected.add(option, selected[0]);
                });//END FOR EACH

            }
        });
    }

}

function traer_cajas_archivo(archivo) {
    if (archivo) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_cajas_archivo/" + archivo,
            success: function (date) {
                //console.log(date);
                $("#caja").empty();
                selected = document.getElementById('caja');
                $('#caja').append(new Option("Seleccione una opción...", ""))
                date.cajas.forEach(caja => {
                    option = document.createElement("option");
                    option.text = caja.caja;
                    option.value = caja.id;
                    selected.add(option, selected[0]);
                });//END FOR EACH

            }
        });
    }

}

function traer_cajas_estante(archivo) {
    if (archivo) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_cajas_estante/" + archivo,
            success: function (date) {
                $("#caja").empty();
                selected = document.getElementById('caja');
                $('#caja').append(new Option("Seleccione una opción...", ""))
                date.cajas.forEach(caja => {
                    option = document.createElement("option");
                    option.text = caja.caja;
                    option.value = caja.id;
                    selected.add(option, selected[0]);
                });//END FOR EACH

            }
        });
    }

}



function valida_dato_archivo(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/valida_dato/" + dato + "/archivo_fisico/archivo",
            success: function (date) {
                if (date.valida.length <= 0) {
                    document.getElementById("error").innerHTML = "";
                    document.getElementById('submit3').disabled = false;
                } else {
                    document.getElementById("error").innerHTML = "El nombre o clave del archivo ya existe.";
                    document.getElementById('submit3').disabled = true;
                }
            }
        });
    }

}

function valida_dato_estante(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/valida_dato/" + dato + "/estante/estante",
            success: function (date) {
                if (date.valida.length <= 0) {
                    document.getElementById("error").innerHTML = "";
                    document.getElementById('submit3').disabled = false;
                } else {
                    document.getElementById("error").innerHTML = "El nombre o clave del estante ya existe.";
                    document.getElementById('submit3').disabled = true;
                }
            }
        });
    }

}

function valida_dato_caja(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/valida_dato/" + dato + "/caja/caja",
            success: function (date) {
                if (date.valida.length <= 0) {
                    document.getElementById("error").innerHTML = "";
                    document.getElementById('submit3').disabled = false;
                } else {
                    document.getElementById("error").innerHTML = "El nombre o clave de la caja ya existe.";
                    document.getElementById('submit3').disabled = true;
                }
            }
        });
    }

}


function traer_datos_archivo(archivo) {
    if (archivo) {
        limite = "3",
            separador = "-",
            arregloDeSubCadenas = archivo.split(separador, limite);
        archivo = arregloDeSubCadenas[2];
        tipo = arregloDeSubCadenas[1];
        if (archivo && tipo) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/traer_datos_archivo/" + archivo + "/" + tipo,
                success: function (date) {
                    $("#fondo").empty();
                    $("#seccion").empty();
                    $("#serie").empty();
                    $("#archivo").empty();
                    $("#estante").empty();
                    $("#caja").empty();
                    if (tipo == "ARCHIVO" || tipo == "archivo") {
                        //SI ES UN EXPEDIENTE
                        if (date.archivo) {
                            selected = document.getElementById('fondo');
                            option = document.createElement("option");
                            option.text = date.archivo.fondo;
                            option.value = date.archivo.id;
                            selected.add(option, selected[0]);
                            //seccion
                            selected = document.getElementById('seccion');
                            option = document.createElement("option");
                            option.text = date.archivo.seccion;
                            option.value = date.archivo.id;
                            selected.add(option, selected[0]);
                            //serie
                            selected = document.getElementById('serie');
                            option = document.createElement("option");
                            option.text = date.archivo.serie;
                            option.value = date.archivo.id;
                            selected.add(option, selected[0]);
                            //archivo
                            selected = document.getElementById('archivo');
                            option = document.createElement("option");
                            option.text = date.archivo.archivo;
                            option.value = date.archivo.id;
                            selected.add(option, selected[0]);
                            //archivo
                            document.getElementById('fondo').disabled = true;
                            document.getElementById('seccion').disabled = true;
                            document.getElementById('serie').disabled = true;
                            document.getElementById('archivo').disabled = true;



                        }
                        if (date.estante) {
                            //estante
                            selected = document.getElementById('estante');
                            option = document.createElement("option");
                            option.text = date.estante.estante;
                            option.value = date.estante.id;
                            selected.add(option, selected[0]);
                            document.getElementById('estante').disabled = true;
                        }
                        if (date.caja) {
                            //estante
                            selected = document.getElementById('caja');
                            option = document.createElement("option");
                            option.text = date.caja.caja;
                            option.value = date.caja.id;
                            selected.add(option, selected[0]);
                            document.getElementById('caja').disabled = true;

                        }

                        if (!date.caja && !date.estante && !date.archivo) {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se encontró ningún expediente',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            document.getElementById('error_exp').innerHTML = "Expediente no encontrado";
                            document.getElementById('error_exp').className = "text-danger";
                            document.getElementById('submit3').disabled = true;
                            setTimeout(function () { document.getElementById("expediente").value = ""; document.getElementById("expediente").select(); }, 2000);
                        } else {
                            var comprueba = document.getElementById('eliminar' + date.archivo.id);
                            if (comprueba == null) {
                                Swal.fire({

                                    icon: 'success',
                                    title: 'Expediente encontrado ' + date.archivo.num_expediente,
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                document.getElementById('expediente').value = date.archivo.num_expediente;
                                document.getElementById('archivo_exp').value = date.archivo.id;
                                document.getElementById('error_exp').innerHTML = "Expediente válido";
                                document.getElementById('error_exp').className = "text-success";
                                document.getElementById('tipo_mov').value = date.tipo;
                                //AGREGAMOS EL EXPEDIENTE AL ARCHIVO}
                                var tabla = document.getElementById('detalles');
                                var row = tabla.insertRow(1);
                                row.style.backgroundColor = "white";
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);

                                cell1.innerHTML = '<input type="button" id="eliminar' + date.archivo.id + '" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaLista(this.parentNode.parentNode.rowIndex);recorre_tabla_representantes(' + "detalles" + ',1,' + "array" + ');">';
                                cell2.innerHTML = '<select class="form-control" required style="width: 100%" name="archivo_mov' + date.archivo.id + '" id="archivo_mov' + date.archivo.id + '" data-toggle="select2" ><option value="EXPEDIENTE" selected>EXPEDIENTE</option> </select>';
                                cell3.innerHTML = '<select class="form-control" required style="width: 100%" name="exp_tipo' + date.archivo.id + '" id="exp_tipo' + date.archivo.id + '" data-toggle="select2" ><option value="' + date.tipo + '" selected>' + date.tipo + '</option> </select>';
                                cell4.innerHTML = '<select class="form-control" required style="width: 100%" name="caja_' + date.archivo.id + '" id="caja_' + date.archivo.id + '" data-toggle="select2" data-placeholder="Seleccione una opción ..."><option value="' + date.archivo.id + '" selected>' + date.archivo.num_expediente + '</option> </select>';


                                // setTimeout(function () { document.getElementById("gafete").focus(); }, 2000);
                                setTimeout(function () { document.getElementById("expediente").value = ""; document.getElementById("expediente").select(); }, 2000);

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'El expediente escaneado ya se ha insertado en la tabla',
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                document.getElementById('error_exp').innerHTML = "";
                                setTimeout(function () { document.getElementById("expediente").value = ""; document.getElementById("expediente").select(); }, 2000);

                            }
                        }
                    } else if (tipo == "cajas" || tipo == "CAJAS") {
                        //SI ES UNA CAJA
                        if (date.estante) {
                            //estante
                            selected = document.getElementById('estante');
                            option = document.createElement("option");
                            option.text = date.estante.estante;
                            option.value = date.estante.id;
                            selected.add(option, selected[0]);
                            document.getElementById('estante').disabled = true;
                        }
                        if (date.caja) {
                            //estante
                            selected = document.getElementById('caja');
                            option = document.createElement("option");
                            option.text = date.caja.caja;
                            option.value = date.caja.id;
                            selected.add(option, selected[0]);
                            document.getElementById('caja').disabled = true;

                        }

                        if (date.archivo) {
                            //estante
                            selected = document.getElementById('archivo');
                            option = document.createElement("option");
                            option.text = date.archivo.archivo;
                            option.value = date.archivo.id;
                            selected.add(option, selected[0]);
                            document.getElementById('archivo').disabled = true;

                        }

                        if (!date.caja && !date.archivo) {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se encontró ningúna caja',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            document.getElementById('error_exp').innerHTML = "Caja no encontrada";
                            document.getElementById('error_exp').className = "text-danger";
                            document.getElementById('submit3').disabled = true;
                            setTimeout(function () { document.getElementById("expediente").value = ""; document.getElementById("expediente").select(); }, 2000);
                        } else {
                            var comprueba = document.getElementById('eliminar_caja' + date.caja.id);
                            if (comprueba == null) {
                                Swal.fire({

                                    icon: 'success',
                                    title: 'Caja encontrada ' + date.caja.caja,
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                document.getElementById('expediente').value = date.caja.caja;
                                document.getElementById('archivo_exp').value = date.caja.id;
                                document.getElementById('error_exp').innerHTML = "Caja valida";
                                document.getElementById('error_exp').className = "text-success";
                                document.getElementById('tipo_mov').value = date.tipo;
                                //AGREGAMOS EL EXPEDIENTE AL ARCHIVO}
                                var tabla = document.getElementById('detalles');
                                var row = tabla.insertRow(1);
                                row.style.backgroundColor = "white";
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);
                                cell1.innerHTML = '<input type="button" id="eliminar_caja' + date.caja.id + '" class="btn waves-effect btn-secondary" value="Eliminar"  onClick="eliminarFilaLista(this.parentNode.parentNode.rowIndex);recorre_tabla_representantes(' + "detalles" + ',1,' + "array" + ');">';
                                cell2.innerHTML = '<select class="form-control" required style="width: 100%" name="caja_mov' + date.caja.id + '" id="caja_mov' + date.caja.id + '" data-toggle="select2" ><option value="CAJA" selected>CAJA</option> </select>';
                                cell3.innerHTML = '<select class="form-control" required style="width: 100%" name="caja_tipo' + date.caja.id + '" id="caja_tipo' + date.caja.id + '" data-toggle="select2" ><option value="' + date.tipo + '" selected>' + date.tipo + '</option> </select>';
                                cell4.innerHTML = '<select class="form-control" required style="width: 100%" name="caja_' + date.caja.id + '" id="caja_' + date.caja.id + '" data-toggle="select2" data-placeholder="Seleccione una opción ..."><option value="' + date.caja.id + '" selected>' + date.caja.caja + '</option> </select>';

                                //  setTimeout(function () { document.getElementById("gafete").focus(); }, 2000);
                                setTimeout(function () { document.getElementById("expediente").value = ""; document.getElementById("expediente").select(); }, 2000);


                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'La caja escaneada ya se ha insertado en la tabla.',
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                document.getElementById('error_exp').innerHTML = "";
                                setTimeout(function () { document.getElementById("expediente").value = ""; document.getElementById("expediente").select(); }, 2000);
                            }
                        }

                    }

                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'QR no válido',
                showConfirmButton: false,
                timer: 2000
            })
            document.getElementById('error_exp').innerHTML = "QR no válido";
            document.getElementById('error_exp').className = "text-danger";
            setTimeout(function () { document.getElementById("expediente").value = ""; document.getElementById("expediente").select(); }, 1000);
        }
    }
    //document.getElementById("expediente").focus();

}


function traer_datos_gafete(value) {
    if (value) {
        limite = "3",
            separador = "???",
            arregloDeSubCadenas = value.split(separador, limite);
        id = arregloDeSubCadenas[0];
        pass = arregloDeSubCadenas[1];
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_datos_qr/" + id + "/" + pass,
            success: function (date) {
                if (date.x == "1") {
                    document.getElementById('error_qr').innerHTML = "QR válido";
                    document.getElementById('error_qr').className = "text-success";
                    document.getElementById('usuario').value = date.user.name + " " + date.user.apellido_p + " " + date.user.apellido_m;
                    document.getElementById('user').value = date.user.id;
                    document.getElementById('submit3').disabled = false;

                } else {
                    document.getElementById('error_qr').innerHTML = "QR no válido";
                    document.getElementById('error_qr').className = "text-danger";
                    document.getElementById('submit3').disabled = true;
                    setTimeout(function () { document.getElementById("gafete").value = ""; document.getElementById("gafete").select(); }, 2000);
                }

            }
        });
    }

}

function eliminar_anexo_not(id, value) {
    if (id) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/eliminar_doc_noti/" + id,
            success: function (date) {
                document.getElementById("documentos").deleteRow(value);
            }
        });
    }
}

function eliminar_ofi_noti(id, value) {
    Swal.fire({
        /*  title: '¿La direccion del Actor seleccionado es correcta?'+ data.direcciones.calle, */
        title: '¿Está seguro de agregar de eliminar el oficio de notificación?',
        text: '',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("oficios").deleteRow(value);
            if (id) {
                $.ajax({
                    type: "get",
                    method: 'get',
                    url: "/eliminar_oficio/" + id,
                    success: function (date) {
                    }
                });
            }
        } else if (result.isDenied) {
        }
    })
}


function agregar_anexo(form, id, value) {
    if (value) {
        dataString = $('#' + form).serialize(); // carga todos 
        $.ajax({
            type: "get",
            method: 'get',
            data: dataString,
            url: "/agregar_doc_noti/" + id,
            success: function (date) {
                var tabla = document.getElementById('documentos');
                var row = tabla.insertRow(1);
                row.style.backgroundColor = "white";
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = '<td> <a href="' + date.anexo.ruta + '" class="btn waves-effect waves-light btn-info btn-sm" role="button" target="_blank"><i class="mdi mdi-eye"></i>' + date.anexo.ruta + '</a></td>';
                cell2.innerHTML = '<td><input type="hidden" name="_token" value="{{ csrf_token() }}" id="token"><a class="btn waves-effect waves-light btn-warning" onclick="eliminar_anexo_not(' + date.anexo.id + ',this.parentNode.parentNode.rowIndex)"; style="margin-right: 10px;" role="button"><i class="mdi mdi-delete"></i></a></td>  ';
                // console.log(date);
            }
        });
    }

}
function agregar_anexo_aux(input, id, value) {
    if (value) {
        dataString = $('#' + input).serialize(); // carga todos 
        $.ajax({
            type: "get",
            method: 'get',
            data: dataString,
            url: "/agregar_doc_noti/" + id,
            success: function (date) {
                var tabla = document.getElementById('documentos');
                var row = tabla.insertRow(1);
                row.style.backgroundColor = "white";
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = '<td> <a href="' + date.anexo.ruta + '" class="btn waves-effect waves-light btn-info btn-sm" role="button" target="_blank"><i class="mdi mdi-eye"></i>' + date.anexo.ruta + '</a></td>';
                cell2.innerHTML = '<td><input type="hidden" name="_token" value="{{ csrf_token() }}" id="token"><a class="btn waves-effect waves-light btn-warning" onclick="eliminar_anexo_not(' + date.anexo.id + ',this.parentNode.parentNode.rowIndex)"; style="margin-right: 10px;" role="button"><i class="mdi mdi-delete"></i></a></td>  ';
                // console.log(date);
            }
        });
    }

}

function agregar_anexo_sentencia(form, id, value) {
    if (value) {
        dataString = $('#' + form).serialize(); // carga todos 
        $.ajax({
            type: "get",
            method: 'get',
            data: dataString,
            url: "/agregar_doc_noti_sentencia/" + id,
            success: function (date) {
                var tabla = document.getElementById('documentos');
                var row = tabla.insertRow(1);
                row.style.backgroundColor = "white";
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = '<td> <a href="' + date.anexo.ruta + '" class="btn waves-effect waves-light btn-info btn-sm" role="button" target="_blank"><i class="mdi mdi-eye"></i>' + date.anexo.ruta + '</a></td>';
                cell2.innerHTML = '<td><input type="hidden" name="_token" value="{{ csrf_token() }}" id="token"><a class="btn waves-effect waves-light btn-warning" onclick="eliminar_anexo_not(' + date.anexo.id + ',this.parentNode.parentNode.rowIndex)"; style="margin-right: 10px;" role="button"><i class="mdi mdi-delete"></i></a></td>  ';
                // console.log(date);
            }
        });
    }

}


function guardar_noti_oficio() {
    var formData = new FormData(document.getElementById('modalnotiOficio'));
    actuarios = document.getElementById('personas_oficios').value;
    oficio = document.getElementById('oficio_pdf').value;

    if (actuarios != "" && oficio != "") {
        $.ajax({
            type: "POST",
            url: "/subirOficioAjax",
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {
                if (data.oficios.length > 0) {
                    data.oficios.forEach(element => {
                        var tabla = document.getElementById('oficios');
                        var row = tabla.insertRow(1);
                        row.style.backgroundColor = "white";
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        cell1.innerHTML = '<td>' + element.nombre + '</td>';
                        cell2.innerHTML = '<a class="btn btn-danger waves-effect waves-light" target="_blank" role="button" href="/public/DOCUMENTOSPARAFIRMA/' + element.oficio + '"><i class="fas fa-file-pdf"></i></a></a>';
                        cell3.innerHTML = '<a class="btn waves-effect waves-light btn-warning" onclick="eliminar_ofi_noti(' + element.id + ',this.parentNode.parentNode.rowIndex)"; style="margin-right: 10px;" role="button"><i class="mdi mdi-delete"></i></a>';

                    });

                    $("#modalOficio .close").click();
                    $('.modalOficio.in').modal('hide');

                } else {
                    Swal.fire(
                        'Error!',
                        'No se ha guardado la notificación por oficio',
                        'error'
                    );
                }
                //
            }
        });
    } else {
        Swal.fire(
            'Error!',
            'Favor de llenar todos los campos',
            'error'
        );

    }




}

function actualiza_noti(id) {
    $.ajax({
        type: "get",
        method: 'get',
        url: "/notificaciones_actualiza/" + id,
        success: function (notificaciones) {
            $("#notis").load('principal');

        }
    });
}

function activa_notificacion() {
    Swal.fire({
        title: '¿Activar notificaciónes por WhatsApp?',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, activar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var token = $("#token").val();
            $.ajax({
                url: "/activa_notificacion",
                type: 'get',
                method: 'get',
                success: function (date) {
                    Swal.fire(
                        'Activado!',
                        'Recibirá notificaciones por WhatsApp',
                        'success'
                    )
                    setTimeout(function () { location.reload() }, 1000);
                }
            });

        } else if (result.isDenied) {
            $("#activar_whats").prop("checked", false);
            $("#activar_whats").attr('checked', false);
        }
    })

}




function desactiva_notificacion() {
    Swal.fire({
        title: '¿Desactivar notificaciónes por WhatsApp?',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, desactivar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var token = $("#token").val();
            $.ajax({
                url: "/desactiva_notificacion",
                type: 'get',
                method: 'get',
                success: function (date) {
                    Swal.fire(
                        'Desactivado!',
                        'Dejara de recibir notificaciones por WhatsApp',
                        'success'
                    )
                    setTimeout(function () { location.reload() }, 1000);
                }
            });
        } else if (result.isDenied) {
            $("#desactivar_whats").removeAttr('checked', true);
            $("#desactivar_whats").removeProp("checked", true);
            setTimeout(function () { location.reload() }, 1000);
        }
    })

}


/*
function traer_documentos(dato) {
    //console.log(dato);
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_documentos/" + dato,
            success: function (date) {
                $("#registros").empty();
                $('#registros').append(new Option("Seleccione una opción...", ""))
                date.datos.forEach(function (registro, index) {
                    var x = $('#registros');
                    if (dato == "EXPEDIENTE") {
                        option = new Option(registro.num_expediente, registro.id, true, true);
                    } else if (dato == "ACUERDO") {
                        option = new Option(registro.num_expediente + " " + registro.num_folio, registro.id, true, true);
                    } else if (dato == "SENTENCIA") {
                        option = new Option(registro.num_expediente + " " + registro.num_folio, registro.id, true, true);
                    } else if (dato == "DOCUMENTO") {
                        option = new Option(registro.folio_referencia, registro.id, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_EXPEDIENTE") {
                        option = new Option(registro.tipo + " " + registro.folio, registro.id, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_RECURSO") {
                        option = new Option(registro.tipo + " " + registro.folio, registro.id, true, true);
                    } else if (dato == "RECURSO") {
                        option = new Option(registro.num_recurso, registro.id, true, true);
                    } else if (dato == "NOTIFICACION") {
                        option = new Option(registro.id, registro.id, true, true);
                    } else if (dato == "FIRMA_ELECTRONICA") {
                        option = new Option(registro.clave_alfanumerica, registro.id, true, true);
                    } else if (dato == "BOLETIN ELECTRONICO") {
                        option = new Option(registro.fecha, registro.id, true, true);
                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: registro.id
                        }
                    });
                });//END FOREACH ACTORES
            }
        });
    }
}
*/


function traer_documentos(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_documentos/" + dato,
            success: function (date) {
                $("#registros").empty();
                date.datos.forEach(function (registro, index) {
                    var x = $('#registros');
                    if (dato == "EXPEDIENTE") {
                        option = new Option("Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "ACUERDO") {
                        option = new Option("Folio: " + registro.num_folio + ", Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "SENTENCIA") {
                        option = new Option("Folio: " + registro.num_folio + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "DOCUMENTO") {
                        option = new Option(registro.folio_referencia, registro.id_documento, true, true);
                    } else if (dato == "DOCUMENTOS_EXPEDIENTE") {
                        option = new Option("Folio: " + registro.folio + ", Tipo de documento:" + registro.tipo_documento + ", Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_EXPEDIENTE") {
                        option = new Option(registro.tipo + ". " + "Folio: " + registro.folio + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_RECURSO") {
                        option = new Option('N° Recurso: ' + registro.num_recurso + ". Tipo: " + registro.tipo + ". Folio: " + registro.folio + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "RECURSO") {
                        option = new Option('N° Recurso: ' + registro.num_recurso + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "NOTIFICACION") {
                        if (registro.tipo_per == "FISICA") {
                            nombre_aut = registro.nombre + " " + registro.apellido_paterno + " " + registro.apellido_materno
                        } else if (registro.tipo_per == "MORAL") {
                            nombre_aut = registro.razon_social;
                        } else {
                            nombre_aut = registro.nombre;
                        }
                        option = new Option("N° Notificación: " + registro.id + ". Tipo: " + registro.tipo + ". Fecha de notificación: " + registro.fecha_notificacion + ". Notificado: " + nombre_aut, registro.id, true, true);
                    } else if (dato == "FIRMA_ELECTRONICA") {
                        option = new Option(registro.clave_alfanumerica, registro.id, true, true);
                    } else if (dato == "BOLETIN ELECTRONICO") {
                        option = new Option(registro.fecha, registro.id, true, true);
                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: registro.id
                        }
                    });
                });//END FOREACH ACTORES

            }
        });
    }
}

function traer_documentos_busqueda(dato, busqueda) {
    dato = document.getElementById('archivo').value;
    busqueda = document.getElementById('busqueda').value;
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_documentos_busqueda/" + dato + '/' + busqueda,
            success: function (date) {
                $("#registros").empty();
                date.datos.forEach(function (registro, index) {
                    var x = $('#registros');
                    if (dato == "EXPEDIENTE") {
                        option = new Option("Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "ACUERDO") {
                        option = new Option("Folio: " + registro.num_folio + ", Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "SENTENCIA") {
                        option = new Option("Folio: " + registro.num_folio + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "DOCUMENTO") {
                        option = new Option(registro.folio_referencia, registro.id_documento, true, true);
                    } else if (dato == "DOCUMENTOS_EXPEDIENTE") {
                        option = new Option("Folio: " + registro.folio + ", Tipo de documento:" + registro.tipo_documento + ", Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_EXPEDIENTE") {
                        option = new Option(registro.tipo + ". " + "Folio: " + registro.folio + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_RECURSO") {
                        option = new Option('N° Recurso: ' + registro.num_recurso + ". Tipo: " + registro.tipo + ". Folio: " + registro.folio + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "RECURSO") {
                        option = new Option('N° Recurso: ' + registro.num_recurso + ". Número de Expediente: " + registro.num_expediente, registro.id, true, true);
                    } else if (dato == "NOTIFICACION") {
                        if (registro.tipo_per == "FISICA") {
                            nombre_aut = registro.nombre + " " + registro.apellido_paterno + " " + registro.apellido_materno
                        } else if (registro.tipo_per == "MORAL") {
                            nombre_aut = registro.razon_social;
                        } else {
                            nombre_aut = registro.nombre;
                        }
                        option = new Option("N° Notificación: " + registro.id + ". Tipo: " + registro.tipo + ". Fecha de notificación: " + registro.fecha_notificacion + ". Notificado: " + nombre_aut, registro.id, true, true);
                    } else if (dato == "FIRMA_ELECTRONICA") {
                        option = new Option(registro.clave_alfanumerica, registro.id, true, true);
                    } else if (dato == "BOLETIN ELECTRONICO") {
                        option = new Option(registro.fecha, registro.id, true, true);
                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: registro.id
                        }
                    });
                });//END FOREACH ACTORES

            }
        });
    }
}

function traer_documentos_folio(dato) {
    if (dato) {
        $.ajax({
            type: "get",
            method: 'get',
            url: "/traer_documentos/" + dato,
            success: function (date) {
                $("#registros").empty();
                date.datos.forEach(function (registro, index) {
                    var x = $('#registros');
                    if (dato == "EXPEDIENTE") {
                        option = new Option(registro.num_expediente, registro.id, true, true);
                    } else if (dato == "ACUERDO") {
                        option = new Option(registro.num_folio, registro.id, true, true);
                    } else if (dato == "SENTENCIA") {
                        option = new Option(registro.num_folio, registro.id, true, true);
                    } else if (dato == "DOCUMENTO") {
                        option = new Option(registro.folio_referencia, registro.id_documento, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_EXPEDIENTE") {
                        option = new Option(registro.folio, registro.id, true, true);
                    } else if (dato == "PROMOCIONES_AMPAROS_RECURSO") {
                        option = new Option(registro.folio, registro.id, true, true);
                    } else if (dato == "RECURSO") {
                        option = new Option(registro.num_recurso, registro.id, true, true);
                    }
                    x.append(option).trigger('change');
                    x.trigger({
                        type: 'select2:select',
                        params: {
                            data: registro.id
                        }
                    });
                });//END FOREACH ACTORES

            }
        });
    }
}

function eliminar_registro() {
    tipo = document.getElementById('archivo').value;
    id = document.getElementById('registros').value;
    if (tipo != "" && id != "") {
        Swal.fire({
            title: '¿Está seguro de eliminar este registro?, ya no se podra recuperar',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            denyButtonText: '#d33',
            confirmButtonText: 'Si, eliminar!',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $("#modal-loading").modal();
                $.ajax({
                    type: "get",
                    method: 'get',
                    url: "/traer_documentos_registro/" + tipo + "/" + id,
                    success: function (date) {
                        Swal.fire(
                            'Eliminado!',
                            'Registro eliminado corrrectamente',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    }
                });
            } else if (result.isDenied) {
                setTimeout(function () { location.reload() }, 1000);
            }
        })
    } else {
        Swal.fire(
            'Error!',
            'Seleccione un registro para poder eliminar',
            'error'
        )
    }
}


function recorre_tabla_agrega_valores(tabla, columna, arreglo_aux) {
    var table = document.getElementById(tabla);
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = columna, m = table.rows[r].cells.length; c < m; c++) {
            var input = table.rows[r].cells[c].innerHTML;
            limite = "50",
                separador = "id=",
                arregloDeSubCadenas = input.split(separador, limite);
            separador2 = '"',
                arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
            valor = document.getElementById(arregloDeSubCadenas2[1]).value;
            arreglo.push(valor);
        }
    }
    document.getElementById(arreglo_aux).value = arreglo;
    // console.log(arreglo);
}

function inbox_leidos(id) {

    var token = $("#token").val();
    $.ajax({

        url: "/marcar_notificaciones_leidas/" + id,
        headers: { 'X-CSRF-TOKEN': token },
        type: 'get',
        method: 'get',
        dataType: 'json',
        success: function () {
            Swal.fire(
                'Activado!',
                'Se han marcado todas las notificaciones como leídas',
                'success'
            )


            setTimeout(function () { location.reload() }, 1000);
        }
    });




}

function modal_suscripcion() {

    document.getElementById('modal_suscripcion').classList.add('is-visible');

}



function mostrar_form_suscrip() {

    document.getElementById('form_suscrip').style.display = "block"

}

function set_value_boletin() {
    document.getElementById('boletin').value = "SI"

}

function set_value_list_acuerdos() {
    document.getElementById('list_acuerdos').value = "SI"

}

function mostrar_modal_sus() {
    $("#modal_suscripcion").modal("show");
}

function cerrar_modal_sus() {
    $("#modal_suscripcion").modal("hide");
}

function suscripcion() {
    var dataString = $('#form_suscrip').serialize(); // carga todos 

    $.ajax({

        type: "POST",
        method: 'post',
        url: "/crear_suscripcion",
        data: dataString,
        success: function (suscripcions) {
            //  console.log(suscripcions);
            Swal.fire(
                'Exíto',
                'Suscripción correcta',
                'success'
            );

            setTimeout(function () { location.reload() }, 1000);
        }
    });


}

function sus_eliminar() {
    //var dataString = $('#form_suscrip').serialize(); // carga todos 
    var token = $("#token").val();
    let email = document.getElementById("email").value;
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type: "get",
        method: 'get',
        url: "/eliminar_sus/" + email,

        success: function (email_sus) {
            if (email_sus == "SI") {
                Swal.fire(
                    'Éxito',
                    'Se ha eliminado su suscripción',
                    'success'
                );
            } else {
                Swal.fire(
                    'Error',
                    'No se ha encontrado el correo indicado, verifique su correo o escribalo correctamente',
                    'warning'
                );
            }


            setTimeout(function () { location.reload() }, 5000);
        }
    });


}

function persona_notificar_modal() {
    $('#modal_nuevo_notificado').modal('show'); // abrir
}

function modal_oficio() {
    $('#modalOficio').modal('show'); // abrir
    $('#oficio_pdf').dropify();
    $('#personas_oficios').select2({});
}

function guardar_persona_not(id) {
    var dataString = $('#modal_notificacion ').serialize(); // carga todos 
    $.ajax({
        type: "get",
        method: 'get',
        url: "/guardar_autoridades_notificar/" + id,
        data: dataString,
        success: function (date) {
            table = "detalles2";
            var tabla = document.getElementById(table);
            var row = tabla.insertRow(1);
            row.style.backgroundColor = "white";
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            var cell8 = row.insertCell(7);
            var cell9 = row.insertCell(8);
            var cell10 = row.insertCell(9);

            cell1.innerHTML = ' <th><input disabled checked="true" id="checkboxpersona_' + date.persona.tipo + '_' + date.persona.id + '"  onclick="disabled_noti(' + "checkboxpersona_" + date.persona.tipo + '_' + date.persona.id + '")";  type="checkbox"></th>';
            cell2.innerHTML = ' <th scope="row">' + date.tipo_persona + '</th>';
            cell3.innerHTML = ' <th scope="row">' + date.persona.tipo + '</th>';
            cell4.innerHTML = '<td><select class="form-control" style="width: 100%" name="persona_' + date.persona.tipo + '_' + date.persona.id + '" id="persona_' + date.persona.tipo + '_' + date.persona.id + '" style="width: 100%" data-toggle="select2">  <option value="' + date.persona.id + '" selected>' + date.persona.nombre + '</option> </select> </td>';
            cell5.innerHTML = '<td><select class="form-control" style="width: 100%" name="tipo_not_' + date.persona.tipo + '_' + date.persona.id + '" id="tipo_not_' + date.persona.tipo + '_' + date.persona.id + '" required data-placeholder="Seleccione una opción ..."> <option value="">Seleccione una opción</option></select></td>';
            cell6.innerHTML = '<td> <input type="number" name="dias_' + date.persona.tipo + '_' + date.persona.id + '" parsley-trigger="change" min="0" max="354" value="15" required placeholder="Ingrese el tiempo de contestación en número de días" class="form-control" id="dias_' + date.persona.tipo + '_' + date.persona.id + '"> </td>';
            cell7.innerHTML = ' <td> <input type="date" name="fecha_' + date.persona.tipo + '_' + date.persona.id + '" parsley-trigger="change" onchange="valida_fecha(this.value);"  placeholder="Ingrese el tiempo de contestación en número de días" class="form-control"  id="fecha_' + date.persona.tipo + '_' + date.persona.id + '"> <div class="text-danger" id="error_fecha" name="error_fecha"></div></td>';
            tipo = date.persona.tipo;
            id_per = date.persona.id;
            form = "wizard-validation-form";
            form_aux = tipo + "," + id_per + "," + id + "," + form;
            tipo_aux = "" + tipo;
            id_exp = "" + id;


            cell8.innerHTML = '<th> <span class="badge badge-danger">No se encontraron correos registrados</span> <select onchange="cambia_correos_per_exp(form_aux);" name="correo_' + date.persona.tipo + '_' + date.persona.id + '" id="correo_' + date.persona.tipo + '_' + date.persona.id + '" style="width: 100%" multiple data-role="tagsinput"></select></th>';
            cell9.innerHTML = '<td> <span class="badge badge-danger">No se encontraron direcciones registradas</span> <select  onchange="cambia_dir_per_exp(form_aux);" name="direccion_' + date.persona.tipo + '_' + date.persona.id + '" id="direccion_' + date.persona.tipo + '_' + date.persona.id + '" style="width: 100%" multiple data-role="tagsinput"></select></td>';
            cell10.innerHTML = '<td>  <button type="button" class="btn btn-success waves-effect waves-light btn-success btn-sm" onclick="modal_aux(id_per,id_exp,tipo_aux);""> <i class="mdi mdi-plus-box"></i></button>      </td>';

            var x = $('#correo_' + date.persona.tipo + '_' + date.persona.id);
            var y = $('#direccion_' + date.persona.tipo + '_' + date.persona.id);
            x.tagsinput('destroy');
            x.tagsinput();
            y.tagsinput('destroy');
            y.tagsinput();

            //AGREGAMOS LOS TIPOS DE NOTIFICACION
            select_aux1 = document.getElementById('tipo_not_' + date.persona.tipo + '_' + date.persona.id);
            date.tipos_notificacion.forEach(notificacion => {
                option = document.createElement("option");
                option.text = notificacion.tipo;
                option.value = notificacion.id;
                select_aux1.add(option, select_aux1[0]);
            });//END FOR EACH



            $("#modal_nuevo_notificado .close").click();
            $('.modal_nuevo_notificado.in').modal('hide');
        }
    });
}

function agregar_per_notificar() {
    table = "detalles2";
    x = document.getElementById('autoridad_aux');
    nombre = x.options[x.selectedIndex].text;
    id_persona = x.options[x.selectedIndex].value;

    valida = document.getElementById('persona_' + id_persona);
    if (valida) {
        Swal.fire(
            'Error!',
            'Ya se ha insertado a la persona/autoridad',
            'error'
        );
    } else {
        tipo = document.getElementById('incorpora').value; 4

        var tabla = document.getElementById('detalles2');
        var row = tabla.insertRow(1);
        row.style.backgroundColor = "white";
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        cell1.innerHTML = ' <th><input checked="true" id="checkboxpersona_' + id_persona + '"  onclick="disabled_noti(' + "checkboxpersona_" + id_persona + '_' + id_persona + '")";  type="checkbox"></th>';
        cell2.innerHTML = ' <th scope="row"> <select class="form-control" style="width: 100%" name="tipo' + id_persona + '" id="tipo' + id_persona + '" style="width: 100%" data-toggle="select2">  <option value="' + tipo + '" selected>' + tipo + '</option> </select></th>';
        cell3.innerHTML = '<td><select class="form-control" style="width: 100%" name="persona_' + id_persona + '" id="persona_' + id_persona + '" style="width: 100%" data-toggle="select2">  <option value="' + id_persona + '" selected>' + nombre + '</option> </select> </td>';
        cell4.innerHTML = '<td><select class="form-control" style="width: 100%" name="tipo_not_' + id_persona + '" id="tipo_not_' + id_persona + '" required data-placeholder="Seleccione una opción ..."> <option value="">Seleccione una opción</option></select></td>';
        cell5.innerHTML = '<td> <input type="number" name="dias_' + id_persona + '" parsley-trigger="change" min="1" max="354" value="15" required placeholder="Ingrese el tiempo de contestación en número de días" class="form-control" id="dias_' + id_persona + '"> </td>';
        cell6.innerHTML = ' <td> <input type="date" name="fecha_' + id_persona + '" parsley-trigger="change" onchange="valida_fecha(this.value);" required placeholder="Ingrese el tiempo de contestación en número de días" class="form-control"  id="fecha_' + id_persona + '"> <div class="text-danger" id="error_fecha" name="error_fecha"></div></td>';
        cell7.innerHTML = '<th> <select class="form-control"   name="correo_' + id_persona + '[]" id="correo_' + id_persona + '" style="width: 100%" multiple="multiple" > </select></th>';
        cell8.innerHTML = '<td><button type="button"  id="btn_email" class="btn btn-success waves-effect waves-light btn-success btn-sm" onclick="modalEmail(' + id_persona + ');""> <i class="mdi mdi-plus-box"></i></button> </td>';
        cell9.innerHTML = '<td>  <select class="form-control" name="direccion_' + id_persona + '[]" id="direccion_' + id_persona + '" style="width: 100%" multiple="multiple" data-toggle="select2"></select></td>';
        cell10.innerHTML = '<td>  <button type="button" id="btn_dir" class="btn btn-success waves-effect waves-light btn-success btn-sm" onclick="modalDireccion(' + id_persona + ');""> <i class="mdi mdi-plus-box"></i></button>      </td>';

        $('#correo_' + id_persona).select2({ tags: true })
        $('#direccion_' + id_persona).select2({ tags: true })
        //AGREGAMOS LOS TIPOS DE NOTIFICACION
        select_aux1 = document.getElementById('tipo_not_' + id_persona);
        $.ajax({
            type: "get",
            url: '/traer_tipos_notificaciones',
            success: function (date) {
                date.notificaciones.forEach(notificacion => {
                    option = document.createElement("option");
                    option.text = notificacion.tipo;
                    option.value = notificacion.id;
                    select_aux1.add(option, select_aux1[0]);
                });//END FOR EACH
            }
        });

        /*
      
    
        */


        $("#modal_nuevo_notificado .close").click();
        $('.modal_nuevo_notificado.in').modal('hide');

    }
}

function agregar_correo__not() {
    email = document.getElementById('email').value;
    id = document.getElementById('persona').value;

    var newOption = new Option(email, email, true, true);
    // Append it to the select
    $('#correo_' + id).append(newOption).trigger('change');

    $("#correo_" + id + " option[value='0']").attr("selected", true);
    $("#modalEmail .close").click();
    $('.modalEmail.in').modal('hide');



}

function agregar_direccion__not() {
    calle = document.getElementById('calle').value;
    numero_ext = document.getElementById('numero_ext').value;
    numero_int = document.getElementById('numero').value;
    colonia = document.getElementById('colonia').value;
    municipio = document.getElementById('municipio').value;
    estado = document.getElementById('estado_region').value;
    codigo_p = document.getElementById('codigo_postal').value;
    entre_calles = document.getElementById('entre_calles').value;
    referencias = document.getElementById('referencia').value;
    domicilio = "Calle% " + calle + "% número% " + numero_ext + "%, int% " + numero_int + "%, Colonia% " + colonia + "%, Municipio% " + municipio + "%, Estado% " + estado + "%. CP% " + codigo_p + "%. Entre Calles% " + entre_calles + "%Referencias% " + referencias;
    id = document.getElementById('persona').value;

    var newOption = new Option(domicilio, domicilio, true, true);
    // Append it to the select
    $('#direccion_' + id).append(newOption).trigger('change');

    $("#direccion_" + id + " option[value='0']").attr("selected", true);
    $("#modal_direccion .close").click();
    $('.modal_direccion.in').modal('hide');



}

function contactos() {
    var dataString = $('#formulario_contacto').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({

        type: "POST",
        method: 'post',
        url: "/generar_mensaje",
        data: dataString,
        success: function (mensaje) {
            // console.log(mensaje);
            Swal.fire(
                'Éxito',
                'Gracias por dejar tu mensaje, pronto nos pondremos con contacto',
                'success'
            );

            // setTimeout(function () { location.reload() }, 1000);
        }
    });


}



function marcar_leido(value) {
    Swal.fire({
        title: '¿Marcar mensaje como leído?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var token = $("#token").val();
            $.ajax({

                url: "/marcar_leido/" + value,
                headers: { 'X-CSRF-TOKEN': token },
                type: 'post',
                method: 'put',
                dataType: 'json',
                success: function () {
                    Swal.fire(
                        'Éxito!',
                        'Se ha marcado este mensaje como "LEÍDO"',
                        'success'
                    )
                    setTimeout(function () { location.reload() }, 1000);
                }
            });

        } else if (result.isDenied) {

        }
    })

}

//////excusados/acumulados////////////////
function traersalasExcus(value) {
    sala = document.getElementById('sala').value;
    var id_expediente = document.getElementById("id_expediente").value;
    //var route = ruta_global + "/traersalasExcus/" + value + "/" + id_expediente;
    var route = "/traersalasExcus/" + value + "/" + id_expediente;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        headers: { 'X-CSRF-TOKEN': token },
        method: 'get',
        url: route,
        success: function (data) {
            $("#sala_destino").empty();
            data.sala.forEach(function (sala, index) {
                var x = $('#sala_destino');
                option = new Option(sala.num_sala, sala.id, true, true);
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: sala
                    }
                });
            });//END FOREACH ACTORES

        }
    });


    if (value == "EXCUSAR" && sala == "III") {
        document.getElementById('display_user_exp').style.display = "none";
        document.getElementById('display_expediente').style.display = "none";
        document.getElementById('user_s').required = true;
        document.getElementById('display_mag_exp').style.display = "block";
        document.getElementById('user_s').required = true;
        document.getElementById('expediente_acomula').required = false;

    } else if (value == "ACUMULAR") {
        document.getElementById('user_s').required = false;
        document.getElementById('display_expediente').style.display = "block";
        document.getElementById('display_user_exp').style.display = "none";
        document.getElementById('display_mag_exp').style.display = "none";
        document.getElementById('expediente_acomula').required = true;

    } else if (value == "EXCUSAR" && sala != "III") {
        document.getElementById('display_user_exp').style.display = "block";
        document.getElementById('display_expediente').style.display = "none";
        document.getElementById('display_mag_exp').style.display = "none";
        document.getElementById('user_s').required = false;
        document.getElementById('expediente_acomula').required = false;
    }
}


function valorsaladestinocheck(value) {
    //   console.log(value);
}

function asignar_id_expediente(value) {
    document.getElementById('id_expediente').value = value;
}

function traer_sala_origen() {
    var id_expediente = document.getElementById("id_expediente").value;
    //var route = ruta_global + "/traer_sala_origen/" + id_expediente;
    var route = "/traer_sala_origen/" + id_expediente;
    var token = $("#token").val();
    $.ajax({
        type: "get",
        headers: { 'X-CSRF-TOKEN': token },
        method: 'get',
        url: route,
        success: function (data) {
            $("#sala_origen").empty();
            document.getElementById('sala_origen').value = data.sale.num_sala;


        }
    });

}

function muestra_acuerdos(value) {

    if (value == "EXCUSAR") {
        document.getElementById('mostrar_acuerdos').style.display = "block"
        document.getElementById('buton_Acuerdo').style.display = "block"
    } else {
        document.getElementById('mostrar_acuerdos').style.display = "none"
        document.getElementById('buton_Acuerdo').style.display = "none"
    }


}

function ExcusarAcumular() {
    var id_expediente = document.getElementById("id_expediente").value;
    var dataString = $('#form').serialize(); // carga todos 
    var token = $("#token").val();
    $.ajax({

        type: "POST",
        method: 'post',
        url: "/ExcusarAcumular/" + id_expediente,
        data: dataString,
        success: function (mensaje) {
            // console.log(mensaje);
            Swal.fire(
                'Éxito',
                'Se ha llevado acabo la acción con éxito',
                'success'
            );
            setTimeout(function () { window.location.href = "/ver_expediente/" + id_expediente; }, 1000);
        }
    });



}

function submit_axcusAcum() {
    let fmr = document.getElementById("form");
    const submitFormFunction = Object.getPrototypeOf(fmr).submit;
    submitFormFunction.call(fmr);
    Swal.fire(
        'Éxito',
        'Se ha mandado el mensaje a los administradores',
        'success'
    );
}

function documento_analiza() {
    Swal.fire({

        icon: 'success',
        title: 'Analizando',
        showConfirmButton: false,
        timer: 5000
    })
    return true;
}

//MODALES PARA LAS AUTORIDADES LIGADAS AL ACUERDO
function modal_aux(id, id_exp, tipo) {

    document.getElementById('expediente_aux').value = id_exp;
    document.getElementById('autoridad_aux').value = id;
    document.getElementById('tipo_aux').value = tipo;

    $('#modal_direccion').modal('show'); // abrir

}

function modal_aux_email(id, id_exp) {
    document.getElementById('expediente_aux_email').value = id_exp;
    document.getElementById('autoridad_aux_email').value = id;

    $('#modalEmail').modal('show'); // abrir

}
//////////////////////////////////////////
////////Elimina Calendario//////////
function eliminaCalendario(año) {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Se borrará el calendario seleccionado del registro!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            //console.log(año);
            // var route = ruta_global + "/" + aux + "/" + id + "";
            var token = $("#token").val();
            $.ajax({
                type: "get",
                method: 'get',
                url: "/elimina_anio/" + año,
                success: function () {
                    Swal.fire(
                        'Éxito',
                        'Se ha eliminado',
                        'success'
                    );
                    setTimeout(function () { location.reload() }, 1000);
                }
            });
            // setTimeout(function () { location.reload() }, 1000);

            //location.reload();
        }
    })
}

function subir_archivo(form, ruta, id) {
    var dataString = $('#' + form).serialize(); // carga todos 
    $.ajax({
        type: "POST",
        method: 'post',
        url: "/" + ruta + "/" + id,
        data: dataString,
        success: function (data) {
            Swal.fire(
                'Guardado!',
                'Se ha guardado correctamente el archivo',
                'success'
            );
            setTimeout(function () { window.location.href }, 1000);
        }
    });
}
////////////////////////////////////
function muestra_devolucion(value) {
    var token = $("#token").val();
    $.ajax({
        type: "get",
        method: 'get',
        url: "/traer_devolucion/" + value,
        success: function (data) {

            if (data.devolucion == "DEVOLUCIÓN") {
                document.getElementById('display_devolucion').style.display = 'block';
            } else if (data.devolucion != "DEVOLUCIÓN") {
                document.getElementById('display_devolucion').style.display = 'none';
            }
        }
    });
}

////////////////////////////////////
function valida_reclasificacion() {
    if (document.getElementById('customCheck1').checked == true) {
        document.getElementById('reclasificacion').value = 'SI'
    } else {
        document.getElementById('reclasificacion').value = 'NO'
    }

}

function valida_checkbox() {

    if (document.getElementById('reclasificacion').value == 'SI') {
        document.getElementById('customCheck1').checked = true;
    } else if (document.getElementById('reclasificacion').value == 'NO') {
        document.getElementById('customCheck1').checked = false;
    }

}


function comprimir_pdf() {
    var dataString = $('#form_firmar').serialize(); // carga todos 
    $.ajax({
        type: "post",
        url: "/subir_archivo",
        data: dataString,
        success: function (data) {
            Swal.fire(
                'Guardado!',
                'Se ha subido correctamente el archivo',
                'success'
            );
        }
    });
}
////////////////////////////////////
function valida_autoridad(value) {
    var dataString = $('#modal_notificacion').serialize(); // carga todos    
    $.ajax({
        type: "get",
        method: 'get',
        url: "/valida_autoridad/" + value,
        data: dataString,
        success: function (data) {
            //console.log(data.personas);
            if (data.personas) {
                inc = data.personas.tipo;
            } else {
                inc = "";
            }
            var autoridad = document.getElementById('autoridad_aux').value;
            valida = document.getElementById('persona_' + inc + '_' + autoridad);

            if (data.personas != null && valida != null) {
                $("#modal_nuevo_notificado .close").click();
                $('.modal_nuevo_notificado.in').modal('hide');
                document.getElementById('submit2').disabled = true;
                Swal.fire(
                    'Alerta!',
                    'Esta autoridad o persona ya se encuentra en este expediente',
                    'warning'
                );
            } else if (data.personas == null) {
                document.getElementById('submit2').disabled = false;
            } else {
                document.getElementById('submit2').disabled = false;
            }
        }
    });

}


function agregar_documento() {

    var inputs = $('input[id^=archivo]');
    var count = inputs.length + 1;

    if (count >= 10) {
        alert('El número maximo para unir archivos es de 9');
    } else {
        document.getElementById('numero').value = count;
        var padre = document.getElementById("card_padre");
        //aquí agregamos el componente de tipo input
        var div = document.createElement("div");
        div.setAttribute("name", 'card');
        div.classList.add('card-box');

        var h4 = document.createElement("div");
        h4.classList.add('card-box');
        h4.innerHTML = "Documento" + count;

        input = document.createElement("INPUT");
        input.setAttribute("id", 'archivo');
        input.setAttribute("class", 'dropify');
        input.setAttribute("name", 'archivo' + count);
        input.setAttribute('type', 'file');
        input.setAttribute('required', 'true');
        input.setAttribute('accept', '.pdf');

        //AGREGA TODOS LOS DIV Y INPUT
        padre.appendChild(div);
        div.appendChild(h4);
        div.appendChild(input);
        $('.dropify').dropify();

    }



}

function cambia_display_falta_no_grave_exp(value) {
    if (value == "SI") {
        document.getElementById('display_falta_no_grave_exp').style.display = 'block';
        //document.getElementById('fatas_nograves_exp').required = true;

    } else {
        document.getElementById('display_falta_no_grave_exp').style.display = 'none';
        //  document.getElementById('fatas_nograves_exp').required = false;

    }

}

function cambiar_notifcacion(value) {

    $.ajax({
        type: "get",
        url: "/traer_doc_notificar/" + value,
        success: function (data) {
            $('#doc').empty();
            //FOR EACH PARA AGREGAR LOS ACTORES AL EXPEDIENTE
            data.datos.forEach(function (dato, index) {
                var x = $('#doc');
                if (value == "ACUERDO") {
                    option = new Option("Folio: " + dato.num_folio + ". Expediente: " + dato.num_expediente, dato.id, true, true);
                } else if (value == "SENTENCIA") {
                    option = new Option("Folio: " + dato.num_folio + ". Expediente: " + dato.num_expediente, dato.id, true, true);
                } else {
                    option = new Option("Folio: " + dato.num_asignacion + ". Expediente: " + dato.num_expediente, dato.id, true, true);
                }
                x.append(option).trigger('change');
                x.trigger({
                    type: 'select2:select',
                    params: {
                        data: dato
                    }
                });
            });//END FOREACH ACTORES
        }
    });
}

function mostrar_medida_cautelar(value) {
    var check_recu = document.getElementById('medida_cau').checked;

    if (check_recu == false) {
        document.getElementById('text_medida_cautelar_div').style.display = 'none';
        document.getElementById('medida_cautelar_text').required = false;
        document.getElementById('medida_cautelar').value = "NO"
    } else if (check_recu == true) {
        document.getElementById('text_medida_cautelar_div').style.display = "block";
        document.getElementById('medida_cautelar_text').required = false;
        document.getElementById('medida_cautelar').value = "SI"

    }

}

function vista_previa(form) {
    CKEDITOR.instances['acuerdo'].updateElement();
    var formData2 = new FormData(document.getElementById(form));
    $.ajax({
        type: 'post',
        method: 'post',
        url: '/vista_previa',
        data: formData2,
        dataType: "html",
        cache: false,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            window.open('/SALAS/acuerdos/tmp.pdf', '_blank');
        }
    });

}

function vista_previa_version_publica(form) {
    CKEDITOR.instances['acuerdo'].updateElement();
    var formData2 = new FormData(document.getElementById(form));
    $.ajax({
        type: 'post',
        method: 'post',
        url: '/vista_previa_version',
        data: formData2,
        dataType: "html",
        cache: false,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            window.open('/VERSIONPUBLICA/V7jkl87FGFMqxlk8GJHGHJG76786G9iGbGSñpj9464_GV7jkl87FGFMqxlk8GJHGHJG76786G9iGbGSñpj9464_G.pdf', '_blank');
        }
    });

}

function vista_previa_sentencias(form) {
    CKEDITOR.instances['acuerdo'].updateElement();
    var formData2 = new FormData(document.getElementById(form));
    $.ajax({
        type: 'post',
        method: 'post',
        url: '/vista_previa_sentencia',
        data: formData2,
        dataType: "html",
        cache: false,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            window.open('/SALAS/sentencias/tmp.pdf', '_blank');
        }
    });

}

function vista_previa_update_sentencia(form) {
    CKEDITOR.instances['sentencia'].updateElement();
    var formData2 = new FormData(document.getElementById(form));
    $.ajax({
        type: 'post',
        method: 'post',
        url: '/vista_previa_sentenciatext',
        data: formData2,
        dataType: "html",
        cache: false,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            window.open('/SALAS/sentencias/tmp.pdf', '_blank');
        }
    });
}

function vista_previa_name(form) {
    CKEDITOR.instances['acuerdo'].updateElement();
    document.getElementById('metodo').value = "POST";
    var formData2 = new FormData(document.getElementById(form));
    $.ajax({
        type: 'post',
        method: 'post',
        url: '/vista_previa',
        data: formData2,
        dataType: "html",
        cache: false,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            document.getElementById('metodo').value = "PUT";
            window.open('/SALAS/acuerdos/tmp.pdf', '_blank');
        }
    });
}

function asigna_folio(id) {
    //seleccionamos el texto
    aux = $('select[id=registros] option:selected').text();
    document.getElementById('num_folio_oficialia').value = aux;

}


function removeSpecials(str, txt) {
    var lower = str.toLowerCase();
    var upper = str.toUpperCase();

    var res = "";
    for (var i = 0; i < lower.length; ++i) {
        if (lower[i] != upper[i] || lower[i].trim() === '')
            res += str[i];
    }
    document.getElementById(txt).value = res;
}

function mostrar_tipo_sen(value) {
    if (value == "ACUERDO") {
        document.getElementById('display_sentencia').style.display = 'none';
        document.getElementById('display_acuerdo').style.display = 'block';
        document.getElementById('tipo_acuerdo').required = true;
        document.getElementById('tipo_sentencia').required = false;
    } else {
        document.getElementById('display_sentencia').style.display = 'block';
        document.getElementById('display_acuerdo').style.display = 'none';
        document.getElementById('tipo_acuerdo').required = false;
        document.getElementById('tipo_sentencia').required = true;

    }
}

//ya no se utiliza
/*
function cambiar_machote(tipo, id, editor) {
    if (id != "") {
        $.ajax({
            type: 'get',
            method: 'get',
            url: '/traer_machote/' + tipo + "/" + id,
            success: function (data) {
                CKEDITOR.instances[editor].setData(data.machote.machote_text)
            }
        });
    }

}
*/
function cambia_check_promocion(value) {
    if (value == "SI") {
        document.getElementById('display_promocion').style.display = 'block';
        document.getElementById('promocion').required = true;
        $("#promocion").select2({
            width: '100%'
        });
    } else if (value == "NO") {
        document.getElementById('display_promocion').style.display = 'none';
        document.getElementById('promocion').required = false;

    }
}

//OCULTAR Y MOSTRAR EL INPUT DE PROMOCIONES EN LOS ACUERDOS
function cambia_check_acuerdo(value) {
    if (value == "SI") {
        document.getElementById('display_acuerdo').style.display = 'block';
        document.getElementById('acuerdos').required = true;
        $("#acuerdos").select2({
            width: '100%'
        });


    } else if (value == "NO") {
        document.getElementById('display_acuerdo').style.display = 'none';
        document.getElementById('acuerdos').required = false;

    }
}


function limpiar_color_tabla(nombre) {
    var table = document.getElementById(nombre);
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        for (var c = 2, m = table.rows[r].cells.length; c < m; c++) {
            cell = document.getElementById("detalles").rows[r].cells[c];
            cell.style.backgroundColor = "white";
        }

    }
}

function cambia_correos_per_exp(value) {
    limite = "4",
        separador = ",",
        arregloDeSubCadenas = value.split(separador, limite);
    form = "" + arregloDeSubCadenas[3];

    correos = [];
    var selectObject = document.getElementById('correo_' + arregloDeSubCadenas[0] + "_" + arregloDeSubCadenas[1]);
    for (var i = 0; i < selectObject.options.length; i++) {
        if (selectObject.options[i].selected == true) {
            correos.push(selectObject.options[i].value);
        }
    }
    var formData = new FormData(document.getElementById(form));
    formData.append('emails', correos);
    //formData.append("email", document.getElementById('correo_'+arregloDeSubCadenas[0]+"_"+arregloDeSubCadenas[1]).value);
    $.ajax({
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        url: '/actualizar_per_expediente/' + arregloDeSubCadenas[2] + "/" + arregloDeSubCadenas[1] + "/" + arregloDeSubCadenas[0],
        data: formData,
        success: function (data) {

        }
    });

}

function cambia_dir_per_exp(value) {
    limite = "20",
        separador = ",",
        arregloDeSubCadenas = value.split(separador, limite);
    form = "" + arregloDeSubCadenas[3];

    direcciones = [];
    var selectObject = document.getElementById('direccion_' + arregloDeSubCadenas[0] + "_" + arregloDeSubCadenas[1]);
    for (var i = 0; i < selectObject.options.length; i++) {
        if (selectObject.options[i].selected == true) {
            direcciones.push(selectObject.options[i].text);
        }
    }




    var formData = new FormData(document.getElementById(form));
    formData.append('direcciones', direcciones);
    //formData.append("email", document.getElementById('correo_'+arregloDeSubCadenas[0]+"_"+arregloDeSubCadenas[1]).value);
    $.ajax({
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        url: '/actualizar_dir_per_exp/' + arregloDeSubCadenas[2] + "/" + arregloDeSubCadenas[1] + "/" + arregloDeSubCadenas[0],
        data: formData,
        success: function (data) {
            if (data.direcciones.length > 0) {
                $('#span_direc_' + arregloDeSubCadenas[1]).removeClass('badge badge-danger');
                $('#span_direc_' + arregloDeSubCadenas[1]).addClass('badge badge-success');
                $('#span_direc_' + arregloDeSubCadenas[1]).text(data.direcciones.length + " direcciones registradas");
            } else {
                $('#span_direc_' + arregloDeSubCadenas[1]).removeClass('badge badge-success');
                $('#span_direc_' + arregloDeSubCadenas[1]).addClass('badge badge-danger');
                $('#span_direc_' + arregloDeSubCadenas[1]).text("No hay direcciones registradas");
            }
        }
    });

}

function guardar_firmas() {
    var table = document.getElementById('datatable2');
    var arreglo = [];
    for (var r = 1, n = table.rows.length - 1; r <= n; r++) {
        var chk = table.rows[r].cells[0].innerHTML;
        limite = "20";
        separador = "id=";
        arregloDeSubCadenas = chk.split(separador, limite);
        separador2 = '"',
            arregloDeSubCadenas2 = arregloDeSubCadenas[1].split(separador2, limite);
        if (document.getElementById(arregloDeSubCadenas2[1]).checked == true) {
            arreglo.push(document.getElementById(arregloDeSubCadenas2[1]).value);
        }
    }
    document.getElementById('firmas').value = arreglo
    document.getElementById('total').innerHTML = "Total de documentos seleccionados " + arreglo.length;
}

function valida_firmas() {
    val = document.getElementById('firmas').value;
    val = val.length;
    if (val <= 0) {
        Swal.fire(
            'Error!',
            'No ha seleccionado ningún documento para firma.',
            'error'
        );
        return false;
    } else {
        $("#modal-loading").modal();
        return true;
    }
}

function traer_datos_usuario(id) {
    $.ajax({
        type: 'get',
        url: '/traer_datos_usuario/' + id,
        success: function (data) {
            if (data.user) {
                document.getElementById('email').value = data.user.email;
                document.getElementById('telefono').value = data.user.celular;
            }
        }
    });

}

function elimina_sentencia(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar la sentencia?, ya no se podra recuperar',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, eliminar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/eliminar_sentencia/" + id,
                success: function (date) {
                    console.log(date);
                    if (date == 1) {
                        Swal.fire(
                            'Eliminado!',
                            'Sentencia eliminada corrrectamente',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error!',
                            'No se ha podido eliminar la sentencia, favor de validar que no existan firmas electrónicas aplicadas',
                            'danger'
                        )
                    }

                }
            });
        }
    })
}

function elimina_acuerdo(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar el acuerdo del expediente?, ya no se podra recuperar',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, eliminar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/eliminar_acuerdo/" + id,
                success: function (date) {
                    console.log(date);
                    if (date == 1) {
                        Swal.fire(
                            'Eliminado!',
                            'Acuerdo eliminado corrrectamente',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error!',
                            'No se ha podido eliminar el acuerdo, favor de validar que cuente con los permsios de Administrador',
                            'danger'
                        )
                    }

                }
            });
        }
    })
}

function elimina_recurso(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar el recurso del expediente?, ya no se podra recuperar',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, eliminar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/eliminar_recurso/" + id,
                success: function (date) {
                    console.log(date);
                    if (date == 1) {
                        Swal.fire(
                            'Eliminado!',
                            'Recurso eliminado corrrectamente',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error!',
                            'No se ha podido eliminar el recurso',
                            'danger'
                        )
                    }

                }
            });
        }
    })
}

function elimina_notifiacion(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar la notificación?, ya no se podra recuperar',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, eliminar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/eliminar_notificacion/" + id,
                success: function (date) {
                    console.log(date);
                    if (date == 1) {
                        Swal.fire(
                            'Eliminado!',
                            'Notificación eliminada corrrectamente',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 1000);
                    } else {
                        Swal.fire(
                            'Error!',
                            'No se ha podido eliminar la notificación',
                            'danger'
                        )
                    }

                }
            });
        }
    })

}

function elimina_promocion(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar la promoción?, ya no se podra recuperar',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, eliminar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/eliminar_promocion/" + id,
                success: function (date) {
                    console.log(date);
                    if (date == 1) {
                        Swal.fire(
                            'Eliminada!',
                            'Promoción eliminada corrrectamente',
                            'success'
                        )
                        setTimeout(function () { window.location.href = "/amparos_promociones"; }, 1000);
                    } else {
                        Swal.fire(
                            'Error!',
                            'No se ha podido eliminar la promoción, favor de validar que cuente con los permsios de Administrador',
                            'danger'
                        )
                    }

                }
            });
        }
    })
}

function elimina_promocion_rec(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar la promoción?, ya no se podra recuperar',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, eliminar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/eliminar_promocion_rec/" + id,
                success: function (date) {
                    console.log(date);
                    if (date == 1) {
                        Swal.fire(
                            'Eliminada!',
                            'Promoción eliminada corrrectamente',
                            'success'
                        )
                        setTimeout(function () { window.location.href = "/amparos_promociones_recursos"; }, 1000);
                    } else {
                        Swal.fire(
                            'Error!',
                            'No se ha podido eliminar la promoción, favor de validar que cuente con los permsios de Administrador',
                            'danger'
                        )
                    }

                }
            });
        }
    })
}


function libro_gobierno() {
    document.getElementById('texto').innerHTML = "Generando libro de gobierno electrónico";
    //$("#modal").modal();
    inicio = document.getElementById('fecha_inicio').value;
    fin = document.getElementById('fecha_fin').value;
    year = document.getElementById('year').value;
    if (inicio == "" && fin == "") {
        inicio = 0;
        fin = 0;
    }

    /*
    $.ajax({
        type: "get",
        url: '/libro_gobierno/' + inicio+'/'+fin+'/'+year,
        success: function (data) {       
            window.open("/"+data, '_blank');
            $("#modal").modal("hide");
        }
    });
    */
    //$("#modal").modal("hide");
    $("#modal2 .close").click();
    $('.modal2.in').modal('hide');

    window.open("/libro_gobierno/" + inicio + "/" + fin + "/" + year, '_blank');

}

function libro_gobiernoExcel() {
    document.getElementById('texto').innerHTML = "Generando libro de gobierno electrónico";
    //$("#modal").modal();
    inicio = document.getElementById('fecha_inicio').value;
    fin = document.getElementById('fecha_fin').value;
    year = document.getElementById('year').value;
    if (inicio == "" && fin == "") {
        inicio = 0;
        fin = 0;
    }

    /*
    $.ajax({
        type: "get",
        url: '/libro_gobierno/' + inicio+'/'+fin+'/'+year,
        success: function (data) {       
            window.open("/"+data, '_blank');
            $("#modal").modal("hide");
        }
    });
    */
    //$("#modal").modal("hide");
    $("#modal2 .close").click();
    $('.modal2.in').modal('hide');
    window.open("/libro_gobierno_excel/" + inicio + "/" + fin + "/" + year, '_blank');

}


function reiniciar_serv() {
    Swal.fire({
        title: '¿Está seguro de desea reinciar el servidor Apache Http?',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        denyButtonText: '#d33',
        confirmButtonText: 'Si, reinciar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "get",
                method: 'get',
                url: "/reiniciar_apache/",
                success: function (date) {
                    let timerInterval
                    Swal.fire({
                        title: 'Reiniciando!',
                        html: 'Se cerrará la ventana en <b></b> milisegundos.',
                        timer: 190000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                            setTimeout(function () { window.location.href = "/"; }, 1000);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })


                }
            });
        }
    })

}

function validar_persona() {

}


function total_archivos() {
    files = document.getElementById('archivos').files
    document.getElementById('total').innerHTML = "    Total de archivos subidos: " + files.length;
}

function revisonesAcuerdos() {
    option = document.getElementById('correcto').value;
    if (option == "ACUERDO_CON_CORRECCIONES") {
        document.getElementById('observaciones').required == true;
        if (document.getElementById('observaciones').value == "" || document.getElementById('observaciones').value == null) {
            document.getElementById('error_revison').innerHTML = "Favor de ingresar las correciones del acuerdo";
            Swal.fire(
                'Error',
                'Favor de ingresar las correciones del acuerdo.',
                'error'
            )
            return false;
        }
    } else {
        document.getElementById('observaciones').required == false;
        document.getElementById('error_revison').innerHTML = "";
        return true;
    }

}