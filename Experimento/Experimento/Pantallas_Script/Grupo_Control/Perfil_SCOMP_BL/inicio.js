// Abre el popup con el ID indicado
function abrirPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'block';

  // Escuchar tecla Escape para cerrar
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      cerrarPopup(id);
      document.removeEventListener('keydown', escapeHandler); // limpieza
    }
  });

  // Cerrar si se hace clic fuera del contenido del popup
  popup.addEventListener('click', function outsideClickHandler(e) {
    const contenido = popup.querySelector('.popup-contenido');
    if (!contenido.contains(e.target)) {
      cerrarPopup(id);
      popup.removeEventListener('click', outsideClickHandler); // limpieza
    }
  });
}

// Cierra el popup con el ID indicado
function cerrarPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'none';
}
