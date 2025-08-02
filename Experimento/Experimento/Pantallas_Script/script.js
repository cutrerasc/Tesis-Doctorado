document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  console.log("Ruta cargada:", path);

  // Página: index.html
  if (path.includes("index.html") || path.endsWith("/")) {
    const form = document.getElementById("ConsentimientoInformado");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const consentChecked = document.getElementById("checkbox").checked;
      if (consentChecked) {
        localStorage.setItem("consentimiento", "aceptado");
        window.location.href = "perfilamiento.html";
      } else {
        alert("Debe aceptar el consentimiento para continuar.");
      }
    });
  }

  // Página: perfilamiento.html
  if (path.includes("perfilamiento.html")) {
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

      const hijos = document.querySelector('input[name="hijos"]:checked')?.value || "0";
      const estadoCivil = document.querySelector('input[name="estadoCivil"]:checked')?.value || "0";
      const ahorros = document.querySelector('input[name="ahorros"]:checked')?.value || "0";
      const ingresos = document.querySelector('input[name="nivelIngreso"]:checked')?.value || "0";

      ds.set("hijos", hijos);
      ds.set("estadoCivil", estadoCivil);
      ds.set("ahorros", ahorros);
      ds.set("ingresos", ingresos);

      const beneficiarios = (hijos === "1" || estadoCivil === "1") ? "1" : "0";
      const scomp = (ahorros === "1" && parseInt(ingresos) >= 3) ? "1" : "0";

      ds.set("beneficiarios", beneficiarios);
      ds.set("scomp", scomp);

      console.log("hijos:", hijos);
      console.log("conyuge:", estadoCivil);
      console.log("beneficiarios:", beneficiarios);
      console.log("ahorros:", ahorros);
      console.log("ingresos:", ingresos);
      console.log("SCOMP:", scomp);

      window.location.href = "preguntasConocimiento.html";
    });
  }

  // Página: preguntasConocimiento.html
if (path.includes("preguntasConocimiento.html")) {
  const scomp = localStorage.getItem("scomp") || "0";
  const beneficiarios = localStorage.getItem("beneficiarios") || "0";

  console.log("scomp:", scomp);
  console.log("beneficiarios:", beneficiarios);

  let formularioID = "";

  if (scomp === "1" && beneficiarios === "1") formularioID = "form_A";
  else if (scomp === "0" && beneficiarios === "1") formularioID = "form_B";
  else if (scomp === "1" && beneficiarios === "0") formularioID = "form_C";
  else formularioID = "form_D";

  const formContainer = document.getElementById(formularioID);
  if (formContainer) {
    formContainer.style.display = "block";
  } else {
    console.error("No se encontró el formulario a mostrar:", formularioID);
  }

  // ✅ Botón único que valida solo el formulario visible
  const continuarBtn = document.querySelector(".continueButton");

  continuarBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Detectar el div visible
    const visibleDiv = Array.from(document.querySelectorAll(".formulario"))
      .find(div => getComputedStyle(div).display === "block");

    if (!visibleDiv) {
      alert("No se detectó ningún formulario visible.");
      return;
    }

    // Obtener el formulario dentro del div visible
    const visibleForm = visibleDiv.querySelector("form");

    if (!visibleForm) {
      alert("No se encontró el formulario dentro del div visible.");
      return;
    }

    // Validar el formulario
    if (!visibleForm.checkValidity()) {
      visibleForm.reportValidity();
      return;
    }

    console.log("Formulario validado correctamente");

    // Ir a la siguiente pantalla
    window.location.href = "video_emocion.html";
  });
}// Página: preguntasConocimiento.html
if (path.includes("preguntasConocimiento.html")) {
  const scomp = localStorage.getItem("scomp") || "0";
  const beneficiarios = localStorage.getItem("beneficiarios") || "0";

  console.log("scomp:", scomp);
  console.log("beneficiarios:", beneficiarios);

  let formularioID = "";

  if (scomp === "1" && beneficiarios === "1") formularioID = "form_A";
  else if (scomp === "0" && beneficiarios === "1") formularioID = "form_B";
  else if (scomp === "1" && beneficiarios === "0") formularioID = "form_C";
  else formularioID = "form_D";

  const formContainer = document.getElementById(formularioID);
  if (formContainer) {
    formContainer.style.display = "block";
  } else {
    console.error("No se encontró el formulario a mostrar:", formularioID);
  }

  // ✅ Botón único que valida solo el formulario visible
  const continuarBtn = document.querySelector(".continueButton");

  continuarBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Detectar el div visible
    const visibleDiv = Array.from(document.querySelectorAll(".formulario"))
      .find(div => getComputedStyle(div).display === "block");

    if (!visibleDiv) {
      alert("No se detectó ningún formulario visible.");
      return;
    }

    // Obtener el formulario dentro del div visible
    const visibleForm = visibleDiv.querySelector("form");

    if (!visibleForm) {
      alert("No se encontró el formulario dentro del div visible.");
      return;
    }

    // Validar el formulario
    if (!visibleForm.checkValidity()) {
      visibleForm.reportValidity();
      return;
    }

    console.log("Formulario validado correctamente");

    // Ir a la siguiente pantalla
    window.location.href = "video_emocion.html";
  });
}
});
