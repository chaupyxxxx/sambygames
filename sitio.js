// Lo unico que hay que rellenar antes de publicar la web. Todo lo que en las
// paginas lleva data-dato="..." se escribe con esto.
const DATOS = {
  responsable: "Samby Games",
  correo: "sambygames@gmail.com",
  pais: "España",
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

// Las secciones entran al asomar. Sin IntersectionObserver se ven sin mas.
const porEntrar = document.querySelectorAll(".entra");
if ("IntersectionObserver" in window) {
  const ojo = new IntersectionObserver((vistos) => {
    vistos.forEach((v) => { if (v.isIntersecting) { v.target.classList.add("visto"); ojo.unobserve(v.target); } });
  }, { threshold: 0.12 });
  porEntrar.forEach((el) => ojo.observe(el));
} else porEntrar.forEach((el) => el.classList.add("visto"));
