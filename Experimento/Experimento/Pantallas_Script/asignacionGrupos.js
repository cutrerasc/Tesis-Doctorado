document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("continuarAsignacion");

  btn.addEventListener("click", () => {
    const scomp = localStorage.getItem("scomp") || "0";
    const beneficiarios = localStorage.getItem("beneficiarios") || "0";

    // Determinar perfil
    let perfil = "D";
    if (scomp === "1" && beneficiarios === "1") perfil = "A";
    else if (scomp === "0" && beneficiarios === "1") perfil = "B";
    else if (scomp === "1" && beneficiarios === "0") perfil = "C";
    // perfil D es el caso por defecto: SCOMP = 0 y Beneficiarios = 0

    // Guardar perfil
    localStorage.setItem("perfil_usuario", perfil);

    // Asignar grupo aleatorio
    const grupo = Math.random() < 0.5 ? "control" : "tratamiento";
    localStorage.setItem("grupo_asignado", grupo);

    // Debug en consola
    console.log("Perfil asignado:", perfil);
    console.log("Grupo asignado:", grupo);

    // Redirección a pantalla correspondiente
    if (grupo === "control" && perfil === "A") {
      window.location.href = "./Grupo_Control/Perfil_SCOMP_BL/Inicio.html";
    } else {
      window.location.href = "contenido_tratamiento.html";
    }
  });
});
