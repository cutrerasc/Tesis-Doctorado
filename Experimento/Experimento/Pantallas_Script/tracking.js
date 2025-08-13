document.addEventListener("DOMContentLoaded", () => {
  // Encontrar siempre el MAIN aunque estemos en iframes anidados
  let mainWindow = window;
  while (mainWindow.parent !== mainWindow) {
    mainWindow = mainWindow.parent;
  }

  // MAIN: Definir inicio global
  if (window === mainWindow) {
    if (!localStorage.getItem("inicio_experimento")) {
      localStorage.setItem("inicio_experimento", Date.now());
    }
  }

  const inicioExperimento = parseInt(
    mainWindow.localStorage.getItem("inicio_experimento") || Date.now(),
    10
  );

  const registrarClick = (botonID) => {
    const ahora = Date.now();
    const tiempoISO = new Date(ahora).toISOString();
    const pagina = window.location.pathname.split("/").pop();

    let ultimoClickTimestamp = parseInt(mainWindow.localStorage.getItem("ultimo_click") || ahora, 10);

    const segsDesdeInicio = ((ahora - inicioExperimento) / 1000).toFixed(2);
    const segsDesdeUltimoClick = ultimoClickTimestamp
      ? ((ahora - ultimoClickTimestamp) / 1000).toFixed(2)
      : "";

    // Enviar al MAIN si no estamos en él
    if (window !== mainWindow) {
      mainWindow.postMessage({
        type: "registro_click",
        data: {
          boton: botonID,
          tiempo: tiempoISO,
          pagina: `${pagina} (IFRAME)`,
          segs_desde_inicio: segsDesdeInicio,
          segs_desde_click_anterior: segsDesdeUltimoClick
        }
      }, "*");
    } else {
      guardarEnLocalStorage({
        boton: botonID,
        tiempo: tiempoISO,
        pagina: `${pagina} (MAIN)`,
        segs_desde_inicio: segsDesdeInicio,
        segs_desde_click_anterior: segsDesdeUltimoClick
      });
    }

    mainWindow.localStorage.setItem("ultimo_click", ahora);
  };

  const guardarEnLocalStorage = (registro) => {
    let clicks = JSON.parse(localStorage.getItem("registro_clicks") || "[]");
    clicks.push(registro);
    localStorage.setItem("registro_clicks", JSON.stringify(clicks));
    console.log(`✅ Click registrado: ${registro.boton} | Página: ${registro.pagina}`);
  };

  if (window === mainWindow) {
    window.addEventListener("message", (event) => {
      if (event.data?.type === "registro_click") {
        guardarEnLocalStorage(event.data.data);
      }
    });
  }

  // Detectar clicks en data-id o botones
  document.addEventListener("click", (event) => {
    let target = event.target;
    while (target && target !== document) {
      if (target.dataset.id || target.tagName.toLowerCase() === "button") {
        const botonID = target.dataset.id || target.innerText.trim().replace(/\s+/g, " ");
        registrarClick(botonID);
        break;
      }
      target = target.parentElement;
    }
  });
});
