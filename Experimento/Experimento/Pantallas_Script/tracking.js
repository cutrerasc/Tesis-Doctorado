document.addEventListener("DOMContentLoaded", () => {
  // Recuperar historial previo
  let clicks = JSON.parse(localStorage.getItem("registro_clicks") || "[]");

  // Definir inicio global del experimento si no existe
  if (!localStorage.getItem("inicio_experimento")) {
    localStorage.setItem("inicio_experimento", Date.now());
  }
  const inicioExperimento = parseInt(localStorage.getItem("inicio_experimento"), 10);

  // Recuperar último clic global
  let ultimoClickTimestamp = localStorage.getItem("ultimo_click")
    ? parseInt(localStorage.getItem("ultimo_click"), 10)
    : null;

  // Escuchar TODOS los clics relevantes
  document.addEventListener("click", (event) => {
    let target = event.target;

    while (target && target !== document) {
      if (
        target.dataset.id ||
        target.classList.contains("tarjeta") ||
        target.classList.contains("acordeon-item") ||
        target.classList.contains("popup") ||
        target.tagName.toLowerCase() === "button"
      ) {
        const botonID = target.dataset.id || target.innerText.trim().replace(/\s+/g, " ");
        const ahora = Date.now();

        // Calcular tiempos globales
        const tiempoISO = new Date(ahora).toISOString();
        const segsDesdeInicio = ((ahora - inicioExperimento) / 1000).toFixed(2);
        const segsDesdeUltimoClick = ultimoClickTimestamp
          ? ((ahora - ultimoClickTimestamp) / 1000).toFixed(2)
          : null;

        const pagina = window.location.pathname.split("/").pop();

        // Guardar registro
        clicks.push({
          boton: botonID,
          tiempo: tiempoISO,
          pagina: pagina,
          segs_desde_inicio: segsDesdeInicio,
          segs_desde_click_anterior: segsDesdeUltimoClick
        });

        // Actualizar último clic global
        ultimoClickTimestamp = ahora;
        localStorage.setItem("ultimo_click", ahora);

        // Guardar historial
        localStorage.setItem("registro_clicks", JSON.stringify(clicks));

        console.log(`✅ Click: ${botonID} | Total: ${segsDesdeInicio}s | Desde último: ${segsDesdeUltimoClick || "N/A"}s`);

        break;
      }
      target = target.parentElement;
    }
  });
});
