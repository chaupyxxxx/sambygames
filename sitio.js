// Moshblaster · web. Todo lo que se mueve en la pagina y la lista de espera.

// ------------------------------------------------------------------ blasters
const CALIDAD = {
  INICIAL: ["#9fe6ff", "#3b7bff"],
  "COMÚN": ["#e2e6f0", "#7d86a3"],
  RARO: ["#6ff0ff", "#1f8fe0"],
  "ÉPICO": ["#c49bff", "#6a2fe0"],
  LEGENDARIO: ["#ffe45c", "#ff8a00"],
  ULTRA: ["#ff9be6", "#e0168f"],
};
const BLASTERS = [
  ["vekta", "BIP", "INICIAL", "ASESINO", "Dispara pastillas eléctricas y entra en sobrecarga."],
  ["nyra", "COPO", "COMÚN", "CONTROL", "Mago de hielo: varazo helado y lluvia de estalactitas."],
  ["vela", "VELA", "COMÚN", "SOPORTE", "Un farol que rueda dejando cera y planta velitas que curan."],
  ["gota", "GOTA", "COMÚN", "SOPORTE", "Lanza frascos que curan a los suyos y olas que empujan."],
  ["kiwi", "KIWI", "COMÚN", "ASESINO", "Bumerán de ida y vuelta y una bandada de pájaros."],
  ["chuf", "CHUF", "COMÚN", "DESTRUCTOR", "Una tetera que se calienta en cada disparo y suelta vapor."],
  ["blok", "ARMI", "COMÚN", "TANQUE", "Armadillo boxeador: tres puñetazos y escudo de piedra."],
  ["maya", "MAYA", "RARO", "CONTROL", "Sirena de pompas que se quedan flotando como minas."],
  ["kira", "KIRA", "RARO", "DESTRUCTOR", "DJ que lanza discos que van y vuelven."],
  ["nubo", "NUBO", "RARO", "CONTROL", "Una nube que siembra orbes y los hace estallar."],
  ["mixa", "MIXA", "RARO", "CONTROL", "Ajolote químico: fuego rojo, explosión azul y una bota que salta."],
  ["cuerno", "RINO", "RARO", "TANQUE", "Escudero que embiste y hace temblar el suelo."],
  ["zeph", "ZAS", "ÉPICO", "ASESINO", "Tres tajos, un shuriken y un salto relámpago."],
  ["mimi", "MIMI", "ÉPICO", "CONTROL", "Una fantasma que atraviesa paredes y asusta a todos."],
  ["dracu", "DRACU", "ÉPICO", "ASESINO", "Vampiro que se traga orbes para correr más."],
  ["centi", "CENTI", "ÉPICO", "ASESINO", "Ciempiés con lanza y una estampida de patas."],
  ["trebo", "TEBRO", "ÉPICO", "SOPORTE", "Serpiente de la suerte: envenena a unos y cura a otros."],
  ["hiedra", "HIEDRA", "LEGENDARIO", "CONTROL", "Planta carnívora que enreda y se traga a quien pilla."],
  ["glitch", "GLITCH", "LEGENDARIO", "DESTRUCTOR", "Bicho de píxeles que rebobina el tiempo."],
  ["zenit", "ZENIT", "LEGENDARIO", "DESTRUCTOR", "El rey sol: lanza solar y un sol naciente."],
  ["koi", "KOI", "LEGENDARIO", "SOPORTE", "Carpa monje con un pez que cura a su equipo."],
  ["nocta", "FALENA", "LEGENDARIO", "CONTROL", "Polilla de luz que encierra a sus presas en capullos."],
  ["eco", "ECO", "ULTRA", "ASESINO", "Su eco repite cada disparo desde otro ángulo."],
  ["alba", "SOLI", "ULTRA", "SOPORTE", "Sacerdotisa del sol: con ella nadie del equipo cae."],
  ["wuki", "WUKI", "ULTRA", "CONTROL", "Mono de kung-fu con puños de chi y clones de pelo."],
  ["octa", "OCTA", "ULTRA", "DESTRUCTOR", "Pulpo director con un metrónomo gigante."],
  ["borea", "BOREA", "ULTRA", "TANQUE", "Osa polar: bola de nieve, iglú y un glaciar entero."],
];

// Quien tiene la cara mas abajo en su foto (orejas, cabeza alta).
const ALTO = { zeph: -30, octa: -26, nocta: -20, borea: -18 };

const escena = document.querySelector(".escena");
const roster = document.querySelector(".roster");
if (escena && roster) {
  const img = escena.querySelector(".escena-img");
  const nombre = escena.querySelector(".ficha-nombre");
  const calidad = escena.querySelector(".ficha-calidad");
  const tipo = escena.querySelector(".ficha-tipo");
  const frase = escena.querySelector(".ficha-frase");
  const botones = [];
  let actual = -1, auto = true, cambio = 0;

  const elige = (i) => {
    if (i === actual) return;
    actual = i;
    const [id, n, q, t, f] = BLASTERS[i];
    const [c1, c2] = CALIDAD[q];
    escena.style.setProperty("--c1", c1);
    escena.style.setProperty("--c2", c2);
    botones.forEach((b, k) => b.setAttribute("aria-current", k === i ? "true" : "false"));
    img.classList.add("cambia");
    clearTimeout(cambio);
    cambio = setTimeout(() => {
      img.src = "img/b/" + id + ".webp";
      img.alt = n;
      nombre.textContent = n; calidad.textContent = q; tipo.textContent = t; frase.textContent = f;
      img.onload = () => img.classList.remove("cambia");
      if (img.complete) img.classList.remove("cambia");
    }, 180);
  };

  BLASTERS.forEach(([id, n, q], i) => {
    const b = document.createElement("button");
    b.className = "cara"; b.type = "button"; b.setAttribute("role", "listitem");
    b.style.setProperty("--c1", CALIDAD[q][0]); b.style.setProperty("--c2", CALIDAD[q][1]);
    if (ALTO[id]) b.style.setProperty("--alto", ALTO[id] + "%");
    b.innerHTML = '<img src="img/b/' + id + '.webp" alt="" loading="lazy" width="900" height="1100"><span>' + n + "</span>";
    b.addEventListener("click", () => { auto = false; elige(i); });
    b.addEventListener("mouseenter", () => { if (matchMedia("(hover: hover)").matches) { auto = false; elige(i); } });
    roster.appendChild(b); botones.push(b);
  });
  elige(0);
  // Va rotando solo hasta que alguien toca uno.
  const orden = [22, 14, 8, 24, 17, 26, 12, 9, 19, 5, 23, 15, 0];
  let paso = 0;
  setInterval(() => {
    if (!auto || document.hidden) return;
    paso = (paso + 1) % orden.length;
    elige(orden[paso]);
  }, 2600);
  // Las fotos grandes, a la cache antes de que se pidan.
  setTimeout(() => BLASTERS.forEach(([id]) => { const p = new Image(); p.src = "img/b/" + id + ".webp"; }), 2500);
}

// ------------------------------------------------------------------ portada
const chispas = document.querySelector(".chispas");
if (chispas) {
  for (let i = 0; i < 26; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    const t = 6 + Math.random() * 12;
    s.style.width = s.style.height = t + "px";
    s.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
    s.style.animationDuration = (2 + Math.random() * 3).toFixed(2) + "s";
    chispas.appendChild(s);
  }
}
const heroe = document.querySelector(".portada-heroe");
if (heroe && matchMedia("(hover: hover)").matches) {
  const capas = [...heroe.querySelectorAll(".heroe")];
  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    capas.forEach((c, k) => { const f = [26, 14, 10][k] || 10; c.style.transform = "translate(" + (x * f).toFixed(1) + "px," + (y * f).toFixed(1) + "px)"; });
  });
}

const barra = document.querySelector(".barra");
const pintaBarra = () => barra && barra.classList.toggle("solida", scrollY > 40);
addEventListener("scroll", pintaBarra, { passive: true });
pintaBarra();

// ------------------------------------------------------------------ entradas, vídeos y cifras
const cuenta = (el) => {
  const fin = +el.dataset.cuenta; const t0 = performance.now();
  const pinta = (t) => { const k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(pinta); };
  requestAnimationFrame(pinta);
};
if ("IntersectionObserver" in window) {
  const ojo = new IntersectionObserver((vistos) => {
    vistos.forEach((v) => {
      if (!v.isIntersecting) return;
      v.target.classList.add("visto");
      v.target.querySelectorAll("[data-cuenta]").forEach(cuenta);
      ojo.unobserve(v.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".entra").forEach((el, i) => { el.style.transitionDelay = ((i % 3) * 0.08) + "s"; ojo.observe(el); });

  const cine = new IntersectionObserver((vistos) => {
    vistos.forEach((v) => {
      const vid = v.target;
      if (v.isIntersecting) {
        if (!vid.src && vid.dataset.src) vid.src = vid.dataset.src;
        vid.play().catch(() => {});
      } else vid.pause();
    });
  }, { threshold: 0.35 });
  document.querySelectorAll("video[data-src]").forEach((v) => cine.observe(v));
} else {
  document.querySelectorAll(".entra").forEach((el) => el.classList.add("visto"));
  document.querySelectorAll("video[data-src]").forEach((v) => { v.src = v.dataset.src; v.autoplay = true; });
}

// ------------------------------------------------------------------ tráiler
const dialogo = document.querySelector("dialog.cine");
if (dialogo) {
  const vid = dialogo.querySelector("video");
  const fuente = vid.querySelector("source");
  document.querySelectorAll("[data-trailer]").forEach((b) => b.addEventListener("click", () => {
    if (!fuente.src) { fuente.src = fuente.dataset.src; vid.load(); }
    dialogo.showModal();
    vid.currentTime = 0;
    vid.play().catch(() => {});
  }));
  const cierra = () => { vid.pause(); dialogo.close(); };
  dialogo.querySelector(".cerrar").addEventListener("click", cierra);
  dialogo.addEventListener("click", (e) => { if (e.target === dialogo) cierra(); });
  dialogo.addEventListener("close", () => vid.pause());
}

// ------------------------------------------------------------------ confeti
const lienzo = document.querySelector("canvas.confeti");
const confeti = () => {
  if (!lienzo || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const g = lienzo.getContext("2d");
  lienzo.width = innerWidth * devicePixelRatio; lienzo.height = innerHeight * devicePixelRatio;
  const colores = ["#ffd23f", "#ff4fc8", "#38e1ff", "#6dffa0", "#ff5d6c", "#ffffff"];
  const trozos = Array.from({ length: 170 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.55,
    vx: (Math.random() - 0.5) * 22, vy: -Math.random() * 22 - 8,
    r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
    w: 8 + Math.random() * 8, h: 5 + Math.random() * 6, c: colores[(Math.random() * colores.length) | 0],
  }));
  const t0 = performance.now();
  const paso = (t) => {
    g.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    g.clearRect(0, 0, innerWidth, innerHeight);
    trozos.forEach((p) => {
      p.vy += 0.6; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore();
    });
    if (t - t0 < 3200) requestAnimationFrame(paso); else g.clearRect(0, 0, innerWidth, innerHeight);
  };
  requestAnimationFrame(paso);
};

// ------------------------------------------------------------------ lista de espera
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
      else if (d.ok) { decir("¡Hecho! Te hemos mandado un correo con el enlace. En unos días deberías tener acceso, aunque puede tardar un poco. Mira también en spam.", true); lista.reset(); confeti(); }
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
