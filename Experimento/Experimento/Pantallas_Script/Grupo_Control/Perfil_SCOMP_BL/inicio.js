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
