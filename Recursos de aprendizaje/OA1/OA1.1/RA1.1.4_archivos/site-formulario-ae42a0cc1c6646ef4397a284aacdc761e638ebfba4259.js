$(document).ready(function() {


	
    /*funciones para comprobacion formulario*/
    $(".enviar_form_solicitud_doc").click(function(){
									
        //capturamos el formulario (elemento del DOM) a gestionar
        var form = $(this).closest(".formulario");
     
			
        //Si el formulario se verifica correctamente...
        if(verify_form(form)){
                //desplegamos el cargando
                $(form).addClass("state_1");
					
                //ejecutamos el envío(formulario, id del producto, requerimiento) ...
                enviar_formulario_solicitud_doc(form);
					
        }
        //return false;
    });
	
	
	
	
	
	
	
	 /*funciones para comprobacion formulario*/
    $(".enviar_form_solicitud_asesoria").click(function(){
 				
									
        //capturamos el formulario (elemento del DOM) a gestionar
        var form = $(this).closest(".formulario");

        //Si el formulario se verifica correctamente...
        if(verify_form(form)){
                
                //desplegamos el cargando
                $(form).addClass("state_1");
								$(form).find(".banner").addClass("d-none");
								$(form).find(".titulo").addClass("d-none");
					
                //ejecutamos el envío(formulario, id del producto, requerimiento) ...
                enviar_formulario_solicitud_asesoria(form);
					
        }
        //return false;
    });
	
	
	
	
	
});





//Funcion comprobar campos
function verify_form(form){

    //conservamos cuantos inputs hay en el form
    var numItems = $(form).find(':required').length;
    //conservamos los campos con errores
    var field_error = [];
    //conservamos la cantidad de campos comprobados
    var correct_field = 0;



    //recorremos cada input
    for(var i = 0; i < numItems; i++){

        var campo = $(form).find(":required").eq(i);

        //si el input es requerido
        if(campo.prop('required')){

            //capturamos el type y el valor del input
            var type = campo.attr('type');
            var value = campo.val();

            //verificamos con una funcion
            if(verify_input(type,value,campo)){
                //si la verificacion No es exitosa...
                campo.removeClass("is-invalid").addClass("is-valid");
                //restamos un elemento de campos incorrectos
                correct_field +=1;

            }else{
                //si la verificacion es exitosa...
                campo.addClass("is-invalid").removeClass("is-valid");
                //agregamos el error en la lista de errores
                field_error[i] = campo.attr('placeholder')+":" + value + ",";
            }
        }
    }



    //Si no tenemos campos que comprobar...
    if(numItems == correct_field){
        //respondemnos con un true
        return true;
    }else{
        //de lo contrario...
        //registramos el error en ga4
        //gtag('event', 'error_form_field', {'fields': field_error.join("")});
        //devolvemos un false
        return false;
    }

}




//Funcion comprobar input
function verify_input(type,value,campo){

    //conservamos la regla en una variable
    var regla;

        //segun el tipo de campo asignamos una regla
        switch(type) {
            case "text":
                regla = /^[a-zA-ZÀ-ÿ´()-]+[a-zA-ZÀ-ÿ´ ()-]*$/;
                break;
            case "email":
                regla = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
            break;
            case "rut":
                regla = /^[0-9]{7,8}-[0-9kK]{1}$/;
                break;
            case "fono":
                regla = /^\d{8,11}$/;
                break;
            case "number":
                regla = /^[1-9]{1}[0-9]{0,1}$/;
                break;
            case "freefield":
                regla = /^[a-zA-ZA-ZÀ-ÿ´'0-9@\-\/\:+_.#7 ]+$/;
                break;
            case "checkbox":
                if(campo.is(":checked")){
                    return true;
                }else{
                    return false;
                }
            default:
            // code block
        }
        /*verificamos si el campo consultado cumple la regla*/
        if(!regla.test(value)){
            //si no la cumple...
            return false;
        }else{
            //si la cumple..
            return true;
        }
   
}



/*Funcion envio formulario solicitud de documentacion*/
function enviar_formulario_solicitud_doc(form){
	
				    //capturamos la pieza 
            pieza = form.find("[name='pieza']").val();
	
            return $.ajax({
                type: "POST",
                url: 'https://app-3QNGQUTN4Q.marketingautomation.services/webforms/receivePostback/MzawMDE3NDe1BAA/a96c0993-f422-41c1-a7d4-9ce485521c20/jsonp/?'+form.serialize(),
                contentType: "application/json",
                dataType: 'jsonp'
            })
            .always(function(data) {
                
                var status = JSON.parse(JSON.stringify(data), true)["status"];

                if(status == "200"){

                    //registramos envio en tag manager
                    dataLayer.push({'event': 'exito_solicitud_documentacion','pieza': pieza});
                    fbq('trackCustom', 'exito_solicitud_documentacion');
									
                    //Desplegamos la informacion al usuario
                    $(form).removeClass("state_1");
										$(form).addClass("state_2");
									
									  $('#offcanvasEnvioDocumento .titulo').addClass("d-none");
									  $('#offcanvasEnvioDocumento .contenedor_banner').addClass("d-none");
									
	
                    //Informamos en consola
                    console.log("status: "+ status);
                }else{
                    //Informamos en consola
                    console.log("status: "+ status);
                }  
            });

}




/*Funcion envio formulario solicitud de documentacion*/
function enviar_formulario_solicitud_asesoria(form){
	
				    //capturamos la pieza 
            pieza = form.find("[name='pieza']").val();
	
   				  console.log("enviado");
            return $.ajax({
                type: "POST",
							
                url: 'https://app-3QNGQUTN4Q.marketingautomation.services/webforms/receivePostback/MzawMDE3NDe1BAA/21564c45-d40a-4ec0-b01c-a30e2bd20c19/jsonp/?'+form.serialize(),
                contentType: "application/json",
                dataType: 'jsonp'
            })
            .always(function(data) {
                
                var status = JSON.parse(JSON.stringify(data), true)["status"];

                if(status == "200"){

                    //registramos envio en tag manager
                    dataLayer.push({'event': 'exito_solicitud_asesoria','pieza': pieza});
                    fbq('trackCustom', 'exito_solicitud_asesoria');
									
                    //Desplegamos la informacion al usuario
										$(form).removeClass("state_1");
										$(form).addClass("state_2");
									
	
                    //Informamos en consola
                    console.log("status: "+ status);
                }else{
                    //Informamos en consola
                    console.log("status: "+ status);
                }  
            });

}



