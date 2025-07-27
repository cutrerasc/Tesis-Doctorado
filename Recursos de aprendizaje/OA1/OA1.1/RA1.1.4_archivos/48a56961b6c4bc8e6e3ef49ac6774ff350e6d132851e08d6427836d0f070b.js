$(document).ready(function() {
	
	//guardamos el id del modal
	var id_recomendacion = "001";
	
	/*creamos el modal*/
	var myModal = new bootstrap.Modal(document.getElementById("recomendacion_articulo"), {});
  //console.log(sessionStorage.getItem("recomendacion_articulo"));
	
	
	//Si existe una variable recomendacion_articulo y esta es distinta al id actual
	if(localStorage.getItem("recomendacion_articulo") != id_recomendacion){

			//mostramos el modal despues de unos segundos
		  //setTimeout(function() { myModal.show(); }, 5000);

		 //Registramos el en local storage el modal actual
		 //localStorage.setItem("recomendacion_articulo",id_recomendacion);
	}
  
});