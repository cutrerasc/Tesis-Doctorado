// Abre el popup con el ID indicado
function abrirPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';

  // ESC: cerrar popup
  function escListener(e) {
    if (e.key === 'Escape') {
      cerrarPopup(id);
    }
  }
  popup._escListener = escListener;
  document.addEventListener('keydown', escListener);

  // Click fuera del contenido: cerrar popup
  function outsideClickListener(e) {
    const contenido = popup.querySelector('.popup-contenido');
    if (!contenido.contains(e.target)) {
      cerrarPopup(id);
    }
  }
  popup._outsideClickListener = outsideClickListener;
  popup.addEventListener('click', outsideClickListener);
}

// Cierra el popup con el ID indicado
function cerrarPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'none';

  // Limpia el listener de Escape
  if (popup._escListener) {
    document.removeEventListener('keydown', popup._escListener);
    popup._escListener = null;
  }

  // Limpia el listener de clic fuera
  if (popup._outsideClickListener) {
    popup.removeEventListener('click', popup._outsideClickListener);
    popup._outsideClickListener = null;
  }
}

// Abre un contenido específico desde un menú
function abrirConcepto(rutaHtml) {
  const iframe = document.getElementById('iframeContenido');
  iframe.src = rutaHtml;
  abrirPopup('popupContenidoConcepto');
}

document.addEventListener("DOMContentLoaded", () => {
  const btnContinuar = document.getElementById("continuarBtn");

  if (btnContinuar) {
    const TIEMPO_MINIMO = 10000; // 5 minutos en milisegundos
    const claveTiempo = "inicio_pagina_perfilA";

    // Siempre reinicia el contador al entrar
    let inicioPagina = Date.now();
    localStorage.setItem(claveTiempo, inicioPagina);

    const intervalo = setInterval(() => {
      const ahora = Date.now();
      const transcurrido = ahora - inicioPagina;
      const restante = TIEMPO_MINIMO - transcurrido;

      if (restante > 0) {
        const minutos = Math.floor(restante / 60000);
        const segundos = Math.floor((restante % 60000) / 1000);
        btnContinuar.textContent = `Continuar (${minutos}:${segundos.toString().padStart(2, "0")})`;
      } else {
        btnContinuar.disabled = false;
        btnContinuar.textContent = "Continuar";
        clearInterval(intervalo);
      }
    }, 1000);

    btnContinuar.addEventListener("click", () => {
      window.location.href = "../../../Pantallas_HTML/exportar.html";
    });
  }
    // 🔹 Ocultar tarjeta de beneficiarios si es perfil SCOMP=1 y beneficiarios=0
  const scomp = localStorage.getItem("scomp") || "0";
  const beneficiarios = localStorage.getItem("beneficiarios") || "0";

  if (scomp === "1" && beneficiarios === "0") {
    const tarjetaBenef = document.querySelector('[data-id="Tarjeta:Beneficiarios"]');
    if (tarjetaBenef) tarjetaBenef.style.display = "none";

    const popupBenef = document.getElementById("popupMenuBeneficiarios");
    if (popupBenef) popupBenef.remove();
  }
});