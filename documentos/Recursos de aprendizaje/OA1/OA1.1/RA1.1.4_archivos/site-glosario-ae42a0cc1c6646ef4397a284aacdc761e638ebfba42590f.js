// Funcion para mostrar un concepto del glosario en un modal

/*creamos las variables del canvas*/
var myOffcanvas;
var bsOffcanvas;


$(document).ready(function() {
	
	/*si se hace click en un elemento .glosario*/
	$(".glosario").click(function(){
		//Se ajecuta la visualizacion del concepto (id)
  	glosario($(this).attr('id'));
	});
	
	//si se hace clic en solicitar asesoria
	$("#offcanvasGlosario .solicitar_asesoria").click(function(){
		
		//ceramos el Offcanvas 
		bsOffcanvas.hide();
		
		//mostramos el formulario
  	openform();
		
	});
	
});


/*funcion mostrar glosario*/
function glosario(code) {
	
	var titulo;
	var descripcion;

  switch(code) {
		case "g001":
			titulo = "Lorem ipsum";
			descripcion = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et est non ante lobortis molestie quis quis ex. Aenean bibendum risus nec lectus ornare maximus.";
			break;
		case "g002":
			titulo = "Lorem ipsum";
			descripcion = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et est non ante lobortis molestie quis quis ex. Aenean bibendum risus nec lectus ornare maximus.";
			break;
		default:
    // code block
	}
	
	
	//agregamos la informacion al modal
	$("#offcanvasGlosario .titulo").html(titulo);
	$("#offcanvasGlosario .descripcion").html(descripcion);
	
	
	/*Registramos el myOffcanvas*/
  myOffcanvas = document.getElementById('offcanvasGlosario');
	bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
	
	//mostramoe el offcanvas en pantalla
	bsOffcanvas.show();
	
}




