document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("botonContinuar");
  const mensaje = document.getElementById("mensajeAviso");
  const totalItems = 10;

  function verificarRespuestas() {
    let respondidas = 0;
    for (let i = 1; i <= totalItems; i++) {
      if (document.querySelector(`input[name="emo_${i}"]:checked`)) {
        respondidas++;
      }
    }

    boton.disabled = respondidas !== totalItems;
    mensaje.textContent = (respondidas !== totalItems)
      ? "Por favor, responda todas las afirmaciones antes de continuar."
      : "";
  }

  document.querySelectorAll(".emocion").forEach((radio) => {
    radio.addEventListener("change", verificarRespuestas);
  });

  boton.addEventListener("click", (e) => {
    e.preventDefault();

    const respuestasIncompletas = [];
    for (let i = 1; i <= totalItems; i++) {
      const respuesta = document.querySelector(`input[name="emo_${i}"]:checked`);
      if (!respuesta) respuestasIncompletas.push(i);
      else localStorage.setItem(`emo_${i}`, respuesta.value);
    }

    if (respuestasIncompletas.length > 0) {
      alert("Debe responder todas las emociones antes de continuar.");
      return;
    }

    console.log("Respuestas PANAS guardadas");
    window.location.href = "../Pantallas_HTML/asignacionGrupo.html";
  });
});