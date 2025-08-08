function toggleAcordeon(elemento) {
  const contenido = elemento.nextElementSibling;
  const yaVisible = contenido.style.display === "block";
  document.querySelectorAll('.acordeon-contenido').forEach(div => div.style.display = 'none');
  if (!yaVisible) contenido.style.display = "block";
}

function abrirPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = "block";

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      cerrarPopup(id);
      document.removeEventListener('keydown', escHandler);
    }
  });

  popup.addEventListener('click', function outsideClick(e) {
    const contenido = popup.querySelector('.popup-contenido');
    if (!contenido.contains(e.target)) {
      cerrarPopup(id);
      popup.removeEventListener('click', outsideClick);
    }
  });
}

function cerrarPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = "none";
}
