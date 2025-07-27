// A $( document ).ready() block.
$(document).ready(function() {
	
	
    //menu lateral
	  $(".menu_lateral button.active").addClass("open");
	  $(".menu_lateral button.active").next().toggleClass("open");
	
	
    $(".menu_lateral .item").click(function(){

        if($(this).next().hasClass("sub_menu")){
            $(this).toggleClass("open");
            $(this).next().toggleClass("open");
        }
        
    });
	
	
	//accesibilidad
	$(".font_up").click(function(){
		 
			$(".articulo p").each(function(){
					var size = parseInt($(this).css("font-size"));
				  if(!$(this).hasClass("h1") && !$(this).hasClass("h2") && !$(this).hasClass("h3") && !$(this).hasClass("h4") && !$(this).hasClass("h5")){
						if(size < 24){
							$(this).css("font-size", size + 2 + "px");
						}
					}
			});
		
	});
	
	$(".font_down").click(function(){
		 
			$(".articulo p").each(function(){
					var size = parseInt($(this).css("font-size"));
					if(!$(this).hasClass("h1") && !$(this).hasClass("h2") && !$(this).hasClass("h3") && !$(this).hasClass("h4") && !$(this).hasClass("h5")){
							if(size > 18){
								$(this).css("font-size", size - 2 + "px");
							}
					}
			});
		
	});

});


/*funcion agregar a la barra superior*/
window.onscroll = function() {
    if( window.scrollY > 100){
        $(".contenedor_barra_superior").addClass("active");
    }else{
        $(".contenedor_barra_superior").removeClass("active");
        
    }
};


/*open form*/
function openform() {
	
	 		/*Registramos el myOffcanvas*/
    	var myOffcanvas = document.getElementById('offcanvasSolicitudAsesoria');
			var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
	
			bsOffcanvas.show();
	
			$('#offcanvasSolicitudAsesoria input[name="page"]').val(document.URL);
}



/*open form doc*/
function openformdoc(name,file) {
	
	 		/*Registramos el myOffcanvas*/
    	var myOffcanvas = document.getElementById('offcanvasEnvioDocumento');
			var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
	
			bsOffcanvas.show();
	
	    $('#offcanvasEnvioDocumento .nombre_de_guia').html(name);
	    $('#offcanvasEnvioDocumento .boton_descarga_documento').attr('href', file);
	    $('#offcanvasEnvioDocumento input[name="documento"]').val(name);
	    $('#offcanvasEnvioDocumento input[name="asunto"]').val("solicitud documentación");
}



function ver_termino_condiciones(){
$('#modal_tyc').modal('show');
}













