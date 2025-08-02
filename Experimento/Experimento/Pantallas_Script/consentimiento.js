document.addEventListener("DOMContentLoaded", () => {
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
});