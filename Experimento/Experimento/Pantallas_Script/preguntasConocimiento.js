document.addEventListener("DOMContentLoaded", () => {
  const scomp = localStorage.getItem("scomp") || "0";
  const beneficiarios = localStorage.getItem("beneficiarios") || "0";

  console.log("scomp:", scomp);
  console.log("beneficiarios:", beneficiarios);

  // Mostrar formulario correspondiente
  let formularioID = "";
  if (scomp === "1" && beneficiarios === "1") formularioID = "form_A";
  else if (scomp === "0" && beneficiarios === "1") formularioID = "form_B";
  else if (scomp === "1" && beneficiarios === "0") formularioID = "form_C";
  else formularioID = "form_D";

  const formComun = document.getElementById("form_comun");
  const formContainer = document.getElementById(formularioID);
  if (formContainer) {
    formContainer.style.display = "block";
  } else {
    console.error("No se encontró el formulario a mostrar:", formularioID);
  }

  const continuarBtn = document.querySelector(".continueButton");

  continuarBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const formComunElement = document.getElementById("PreguntasConocimientoComunes");
    const visibleDiv = Array.from(document.querySelectorAll(".formulario"))
      .find(div => getComputedStyle(div).display === "block");

    const visibleForm = visibleDiv?.querySelector("form");

    if (!formComunElement || !visibleForm) {
      alert("No se encontraron ambos formularios.");
      return;
    }

    if (!formComunElement.checkValidity() || !visibleForm.checkValidity()) {
      formComunElement.reportValidity();
      visibleForm.reportValidity();
      return;
    }

    // Captura respuestas
    const respuestas = {};

    // 🟢 Comunes
    const comunes = formComunElement.querySelectorAll("input[type='radio']:checked");
    comunes.forEach(input => {
      respuestas[input.name] = input.value;
    });

    // 🔵 Específicas
    const especificas = visibleForm.querySelectorAll("input[type='radio']:checked");
    especificas.forEach(input => {
      respuestas[input.name] = input.value;
    });

    // Guarda en localStorage
    for (const [clave, valor] of Object.entries(respuestas)) {
      localStorage.setItem(clave, valor);
    }

    // Cálculo del puntaje
    let score = 0;
    for (const [clave, valor] of Object.entries(respuestas)) {
      if (valor === "1") score += 1;
    }
    localStorage.setItem("score_inicial", score.toString());

    console.log("Respuestas conocimiento:", respuestas);
    console.log("SCORE inicial:", score);

    // Redirigir
    window.location.href = "PANAS.html";
  });
});
