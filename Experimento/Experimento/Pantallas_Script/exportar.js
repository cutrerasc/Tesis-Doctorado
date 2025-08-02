document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("exportarCSV");

  boton.addEventListener("click", () => {
    const claves = [
      // Consentimiento
      "consentimiento",

      // Perfilamiento
      "gender", "gender_text", "age",
      "estadoCivil", "hijos", "ahorros", "ingresos",
      "acompanamiento", "conocimiento", "comodidad",
      "beneficiarios", "scomp",

      // PANAS
      "emo_1", "emo_2", "emo_3", "emo_4", "emo_5",
      "emo_6", "emo_7", "emo_8", "emo_9", "emo_10",

      // Preguntas comunes
      "comun1", "comun2",

      // Preguntas por perfil (todas las posibles)
      "SBpreg1", "SBpreg2", "SBpreg3", "SBpreg4", "SBpreg5",
      "SBpreg6", "SBpreg7", "SBpreg8", "SBpreg9", "SBpreg10",

      "Bpreg1", "Bpreg2", "Bpreg3", "Bpreg4", "Bpreg5",
      "Bpreg6", "Bpreg7", "Bpreg8", "Bpreg9", "Bpreg10",

      "Spreg1", "Spreg2", "Spreg3", "Spreg4", "Spreg5",
      "Spreg6", "Spreg7", "Spreg8", "Spreg9", "Spreg10",

      "preg1", "preg2", "preg3", "preg4", "preg5",
      "preg6", "preg7", "preg8", "preg9", "preg10",

      // Puntaje de conocimiento
      "score_inicial"
    ];

    const datos = {};
    claves.forEach(k => {
      datos[k] = localStorage.getItem(k) ?? "";
    });

    const encabezados = claves.join(",") + "\n";
    const fila = claves.map(k => datos[k]).join(",") + "\n";

    const contenidoCSV = encabezados + fila;

    const blob = new Blob([contenidoCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.setAttribute("href", url);
    enlace.setAttribute("download", "respuestas_usuario.csv");
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  });
});
