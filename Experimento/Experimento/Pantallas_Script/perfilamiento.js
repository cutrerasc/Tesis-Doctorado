document.addEventListener("DOMContentLoaded", () => {
  const ds = {
    set: (clave, valor) => localStorage.setItem(clave, valor),
    get: (clave) => localStorage.getItem(clave),
  };

  const boton = document.getElementById("continuar");
  const descripcionGenero = document.getElementById("description");
  const otroRadio = document.getElementById("gender_4");

  document.querySelectorAll("input[name='gender']").forEach((input) => {
    input.addEventListener("change", () => {
      if (otroRadio.checked) {
        descripcionGenero.disabled = false;
        descripcionGenero.required = true;
      } else {
        descripcionGenero.value = "";
        descripcionGenero.disabled = true;
        descripcionGenero.required = false;
      }
    });
  });

  boton.addEventListener("click", () => {
    const form = document.getElementById("PreguntasPerfilamiento");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Captura todas las respuestas
    const respuestas = {
      hijos: document.querySelector('input[name="hijos"]:checked')?.value || "0",
      estadoCivil: document.querySelector('input[name="estadoCivil"]:checked')?.value || "0",
      ahorros: document.querySelector('input[name="ahorros"]:checked')?.value || "0",
      ingresos: document.querySelector('input[name="nivelIngreso"]:checked')?.value || "0",
      gender: document.querySelector('input[name="gender"]:checked')?.value || "",
      gender_text: document.getElementById("description")?.value || "",
      age: document.querySelector('input[name="age"]:checked')?.value || "",
      acompanamiento: document.querySelector('input[name="acompañamiento"]:checked')?.value || "",
      conocimiento: document.querySelector('input[name="conocimiento"]:checked')?.value || "",
      comodidad: document.querySelector('input[name="comodidad"]:checked')?.value || ""
    };

    // Deriva perfil
    respuestas.beneficiarios = (respuestas.hijos === "1" || respuestas.estadoCivil === "1") ? "1" : "0";
    respuestas.scomp = (respuestas.ahorros === "1" && parseInt(respuestas.ingresos) >= 3) ? "1" : "0";

    // Guarda todo en localStorage
    guardarRespuestasEnLocalStorage(respuestas);

    // Debug (opcional)
    console.log("Perfilamiento:", respuestas);

    // Avanza
    window.location.href = "preguntasConocimiento.html";
  });
});
