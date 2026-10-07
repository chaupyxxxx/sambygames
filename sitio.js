// Lo unico que hay que rellenar antes de publicar la web. Todo lo que en las
// paginas lleva data-dato="..." se escribe con esto.
const DATOS = {
  responsable: "[NOMBRE O ESTUDIO]",
  correo: "[CORREO DE CONTACTO]",
  pais: "[PAIS]",
  // La direccion de la ficha en Google Play cuando exista. Vacia = "muy pronto".
  googlePlay: "",
};

document.querySelectorAll("[data-dato]").forEach((el) => {
  const valor = DATOS[el.dataset.dato];
  if (!valor) return;
  el.textContent = valor;
  if (el.tagName === "A" && el.dataset.dato === "correo" && valor.includes("@")) el.href = "mailto:" + valor;
});

document.querySelectorAll("[data-play]").forEach((el) => {
  if (!DATOS.googlePlay) return;
  el.href = DATOS.googlePlay;
  el.classList.remove("apagado");
  el.textContent = "Consiguelo en Google Play";
});

// Las capturas se abren en grande.
const visor = document.querySelector("dialog.visor");
if (visor) {
  const grande = visor.querySelector("img");
  document.querySelectorAll("button.captura").forEach((boton) => {
    boton.addEventListener("click", () => {
      const img = boton.querySelector("img");
      grande.src = img.src;
      grande.alt = img.alt;
      visor.showModal();
    });
  });
  visor.addEventListener("click", () => visor.close());
}
