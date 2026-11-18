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

// La lista de espera: el correo va al servidor del juego, que lo guarda y manda el enlace.
// En el ordenador (servir.ps1) habla con el servidor de prueba (wrangler dev).
const SERVIDOR = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  ? "http://127.0.0.1:8787" : "https://moshblaster.moshblaster-server.workers.dev";
const lista = document.getElementById("lista");
if (lista) {
  const aviso = lista.querySelector(".aviso");
  const boton = lista.querySelector("button");
  const decir = (texto, bien) => { aviso.textContent = texto; aviso.className = "aviso " + (bien ? "bien" : "mal"); };
  lista.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = lista.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) { decir("Ese correo no parece bien escrito.", false); lista.email.focus(); return; }
    boton.disabled = true;
    boton.textContent = "Enviando...";
    try {
      const r = await fetch(SERVIDOR + "/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name: lista.name.value.trim(), web: lista.web.value }),
      });
      const d = await r.json().catch(() => ({}));
      if (d.ok && d.already) decir("Ya estabas en la lista con ese correo. ¡Pronto tendrás acceso!", true);
      else if (d.ok) { decir("¡Hecho! Te hemos mandado un correo con el enlace. En unos días deberías tener acceso, aunque puede tardar un poco. Mira también en spam.", true); lista.reset(); }
      else if (d.error === "email") decir("Ese correo no parece bien escrito.", false);
      else if (d.error === "limit") decir("Ya se han apuntado varios correos desde aquí hoy. Prueba mañana.", false);
      else decir("No se ha podido enviar. Prueba otra vez en un rato.", false);
    } catch {
      decir("No hay conexión con el servidor. Prueba otra vez en un rato.", false);
    }
    boton.disabled = false;
    boton.textContent = "Quiero jugar";
  });
}

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
