// ✅ Función para guardar múltiples valores en localStorage
function guardarRespuestasEnLocalStorage(objetoRespuestas) {
  for (const clave in objetoRespuestas) {
    if (objetoRespuestas.hasOwnProperty(clave)) {
      localStorage.setItem(clave, objetoRespuestas[clave]);
    }
  }
}

// ✅ Función para obtener múltiples claves desde localStorage
function obtenerRespuestasDeLocalStorage(claves) {
  const resultado = {};
  claves.forEach(clave => {
    resultado[clave] = localStorage.getItem(clave);
  });
  return resultado;
}

// ✅ Valida si todos los campos tipo radio fueron respondidos
function radiosCompletos(prefix, total) {
  for (let i = 1; i <= total; i++) {
    if (!document.querySelector(`input[name="${prefix}_${i}"]:checked`)) {
      return false;
    }
  }
  return true;
}

// ✅ Muestra u oculta un mensaje de validación
function mostrarMensaje(elementId, texto = "", color = "red") {
  const mensaje = document.getElementById(elementId);
  if (mensaje) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
  }
}