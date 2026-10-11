(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;

  /* ---------- Таймкод прокрутки: страница = таймлайн ---------- */
  const tc = $("#tc"), ruler = $("#ruler");
  const TOTAL_SEC = 3 * 60; // вся страница = трёхминутный ролик
  const pad = n => String(n).padStart(2, "0");
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    const t = p * TOTAL_SEC, f = Math.floor((t % 1) * 25);
    tc.textContent = `00:${pad(Math.floor(t / 60))}:${pad(Math.floor(t % 60))}:${pad(f)}`;
    ruler.style.width = (p * 100) + "%";
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Шов реальность / AI ---------- */
  const seam = $("#seam"), range = $("#seamRange");
  const setPos = v => seam.style.setProperty("--pos", v + "%");
  range.addEventListener("input", () => { setPos(range.value); seam.dataset.touched = 1; });
  // Лёгкое «дыхание» шва, пока посетитель его не тронул
  if (!reduced) {
    const t0 = performance.now();
    (function breathe(now) {
      if (seam.dataset.touched) return;
      const v = 50 + Math.sin((now - t0) / 1400) * 18;
      setPos(v); range.value = v;
      requestAnimationFrame(breathe);
    })(t0);
  }

  /* ---------- Сетка работ ---------- */
  const grid = $("#grid");
  const card = w => `
    <article class="card ${w.o}" tabindex="0" role="button" data-id="${w.id}" data-cat="${w.cat.join(" ")}"
      aria-label="${w.title}. ${w.tag}. ${w.dur}">
      <img src="media/${w.id}.jpg" alt="" loading="lazy">
      <video muted loop playsinline preload="none" data-src="media/${w.id}-loop.mp4"></video>
      <div class="card-top"><span class="tag ${w.cat.includes("air") || w.cat.includes("learn") ? "tag-ai" : w.cat.includes("edit") ? "tag-edit" : "tag-real"}">${w.tag}</span><span class="card-dur">${w.dur}</span></div>
      <div class="card-body"><h3>${w.title}</h3><p>${w.line}</p></div>
    </article>`;
  const LIVE = WORKS.filter(w => w.pub); // только то, что уже вышло в соцсетях
  grid.innerHTML = LIVE.map(card).join("") + `
    <a class="card card-cta" href="https://t.me/NikEditAi" target="_blank" rel="noopener">
      <span class="tag tag-ai">Следующий ролик</span>
      <div><h3>Здесь может быть ваш ролик</h3><p>Расскажите задачу, покажу раскадровку.</p></div>
      <span class="btn">Написать в Telegram</span>
    </a>`;

  const startLoop = el => {
    const v = $("video", el);
    if (!v.src) v.src = v.dataset.src;
    v.play().then(() => el.classList.add("playing")).catch(() => {});
  };
  const stopLoop = el => { const v = $("video", el); v.pause(); el.classList.remove("playing"); };

  $$(".card:not(.card-cta)").forEach(el => {
    el.addEventListener("click", () => openPlayer(el.dataset.id));
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlayer(el.dataset.id); } });
    if (canHover) {
      el.addEventListener("mouseenter", () => startLoop(el));
      el.addEventListener("mouseleave", () => stopLoop(el));
    }
  });

  // Появление карточек и петли на тач-экранах, когда карточка в центре экрана
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); }
  }), { threshold: .12 });
  $$(".card").forEach(c => io.observe(c));
  if (!canHover && !reduced) {
    const center = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? startLoop(e.target) : stopLoop(e.target)),
      { rootMargin: "-35% 0px -35% 0px" });
    $$(".card:not(.card-cta)").forEach(c => center.observe(c));
  }

  // Карточка-приглашение добивает последний ряд до полной ширины
  const cta = $(".card-cta");
  function fitCta() {
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const used = $$(".card:not(.card-cta):not(.hidden)").reduce((n, c) => n + (c.classList.contains("h") ? Math.min(2, cols) : 1), 0);
    const span = cols - (used % cols) || cols;
    cta.style.gridColumn = `span ${span}`;
    cta.classList.toggle("tall", span === 1);
  }
  fitCta();
  addEventListener("resize", fitCta);
  new ResizeObserver(fitCta).observe(grid); // ловит и поворот экрана, и смену ширины без события resize

  // Фильтры: пустые категории прячем
  $$(".chip").forEach(ch => {
    const f = ch.dataset.filter;
    if (f !== "all" && !LIVE.some(w => w.cat.includes(f))) ch.hidden = true;
  });
  $$(".chip").forEach(ch => ch.addEventListener("click", () => {
    $$(".chip").forEach(c => { c.classList.toggle("is-on", c === ch); c.setAttribute("aria-selected", c === ch); });
    const f = ch.dataset.filter;
    $$(".card").forEach(c => c.classList.toggle("hidden", f !== "all" && !(c.dataset.cat || "").split(" ").includes(f)));
  }));

  /* ---------- Таймлайн подхода: плейхед едет по прокрутке ---------- */
  const tl = $("#tl"), head = $("#tlHead");
  new IntersectionObserver(es => es.forEach(e => e.isIntersecting && tl.classList.add("in")), { threshold: .4 }).observe(tl);
  function moveHead() {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (innerHeight * .7)));
    const left = 56, width = r.width - left - 16;
    head.style.left = (left + width * p) + "px";
  }
  addEventListener("scroll", moveHead, { passive: true });
  addEventListener("resize", moveHead);
  moveHead();

  /* ---------- Плеер ---------- */
  const dlg = $("#player"), media = $("#playerMedia"), info = $("#playerInfo");
  function openPlayer(id) {
    const w = WORKS.find(x => x.id === id) || EXTRA[id];
    if (!w) return;
    $$(".card.playing").forEach(stopLoop);
    dlg.className = "player " + w.o;
    media.className = "player-media " + w.o;
    media.innerHTML = `<video src="media/${w.id}.mp4" poster="media/${w.id}.jpg" controls autoplay playsinline></video>`;
    const rows = [["Задача", w.task], ["Что сделал", w.did], ["Инструменты", w.tools]]
      .filter(r => r[1]).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    // у уроков - кнопка на пост с полным уроком в Telegram (если ссылки ещё нет - на канал)
    const tg = w.cat && w.cat.includes("learn")
      ? `<a class="btn player-tg" href="${w.tg || "https://t.me/nik_edit_ai"}" target="_blank" rel="noopener">Смотреть полный урок в Telegram →</a>`
      : "";
    info.innerHTML = `<span class="tag tag-real">${w.tag}</span><h3>${w.title}</h3>${tg}${rows ? `<dl>${rows}</dl>` : `<p>${w.line}</p>`}`;
    dlg.showModal();
  }
  function closePlayer() { const v = $("video", media); if (v) v.pause(); media.innerHTML = ""; dlg.close(); }
  $("#playerClose").addEventListener("click", closePlayer);
  dlg.addEventListener("click", e => { if (e.target === dlg) closePlayer(); });
  dlg.addEventListener("cancel", e => { e.preventDefault(); closePlayer(); });
  $$("[data-play]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openPlayer(b.dataset.play); }));
})();
