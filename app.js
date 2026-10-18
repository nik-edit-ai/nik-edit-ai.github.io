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

  /* ---------- Шов реальность / AI: одно видео «бок о бок», режем по шву на canvas ---------- */
  const seam = $("#seam"), range = $("#seamRange");
  const sv = $("#seamVideo"), cv = $("#seamCanvas"), cx = cv.getContext("2d");
  const poster = new Image();
  poster.src = "media/hero-nmp.jpg";
  let pos = 50;
  const HW = 480, HH = 854;                 // размер одной половины в видео
  function drawSeam() {
    const src = sv.readyState >= 2 ? sv : (poster.complete && poster.naturalWidth ? poster : null);
    if (!src) return;
    const x = Math.round(HW * pos / 100);
    cx.drawImage(src, 0, 0, x, HH, 0, 0, x, HH);                  // реальность слева от шва
    cx.drawImage(src, HW + x, 0, HW - x, HH, x, 0, HW - x, HH);   // генерация справа от шва
  }
  const setPos = v => { pos = +v; seam.style.setProperty("--pos", v + "%"); drawSeam(); };
  range.addEventListener("input", () => { setPos(range.value); seam.dataset.touched = 1; });
  poster.onload = drawSeam;
  (function loop() { if (!sv.paused || sv.readyState >= 2) drawSeam(); requestAnimationFrame(loop); })();
  if (reduced) sv.pause();
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

  /* ---------- Работы: разделы по тому, что заказывают ---------- */
  // Порядок разделов = порядок на странице; работа попадает в раздел по приоритету PRIORITY
  const GROUPS = [
    { id: "air", name: "AI × Реальность",
      line: "Мой формат: реальный кадр с телефона, а нейросеть дорисовывает то, что камера снять не может." },
    { id: "ai", name: "Полностью AI",
      line: "Всё сгенерировано: герои, места и свет. Ролик держится на сценарии, ритме и звуке." },
    { id: "edit", name: "Монтаж",
      line: "Говорящие головы, клипы и атмосферные ролики из готовых исходников: титры, цвет, звук." },
    { id: "ads", name: "Реклама для бизнеса",
      line: "Ролики для товаров, брендов и ЖК: сценарий, генерации, звук и мастер под площадку, от Reels до эфира." },
    { id: "learn", name: "Обучение",
      line: "Уроки по нейросетям для новичков, 14-15 роликов в месяц для онлайн-платформы. Полные уроки - в Telegram." },
  ];
  const LIVE = WORKS.filter(w => w.pub); // только то, что уже вышло в соцсетях
  const PRIORITY = ["ads", "learn", "air", "ai", "edit"];   // реклама важнее остального: Спиннер (ads+ai) - в рекламу
  const groupOf = w => PRIORITY.find(id => w.cat.includes(id)) || "ai";
  const plural = n => n % 10 === 1 && n % 100 !== 11 ? "работа"
    : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "работы" : "работ";

  const card = w => `
    <article class="wk ${w.o}" tabindex="0" role="button" data-id="${w.id}" aria-label="${w.title}. ${w.tag}. ${w.dur}">
      <div class="wk-media">
        <img src="media/${w.id}.jpg" alt="" loading="lazy">
        <video muted loop playsinline preload="none" data-src="media/${w.id}-loop.mp4"></video>
        <span class="wk-dur">${w.dur}</span>
        ${w.case ? `<span class="wk-badge">Как сделано</span>` : ""}
        <span class="wk-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
      </div>
      <div class="wk-info">
        <span class="wk-tag">${w.tag}</span>
        <h4>${w.title}</h4>
        <p>${w.line}</p>
        ${w.case ? `<a class="wk-case" href="case.html?id=${w.id}">Разбор и промпт →</a>` : ""}
      </div>
    </article>`;

  const groupsEl = $("#groups"), catsEl = $("#cats");
  const live = GROUPS.map(g => ({ ...g, items: LIVE.filter(w => groupOf(w) === g.id) })).filter(g => g.items.length);
  catsEl.innerHTML = live.map(g =>
    `<a class="cat" href="#g-${g.id}">${g.name}<span>${g.items.length}</span></a>`).join("");
  groupsEl.innerHTML = live.map((g, i) => `
    <div class="group" id="g-${g.id}">
      <div class="group-head">
        <span class="group-n">${String(i + 1).padStart(2, "0")}</span>
        <div class="group-title">
          <h3>${g.name} <small>${g.items.length} ${plural(g.items.length)}</small></h3>
          <p>${g.line}</p>
        </div>
        <div class="group-arrows">
          <button class="arr" data-dir="-1" aria-label="Назад"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
          <button class="arr" data-dir="1" aria-label="Вперёд"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
        </div>
      </div>
      <div class="rail">${g.items.map(card).join("")}</div>
    </div>`).join("");

  // Стрелки ленты: прячем, если всё и так помещается; гасим на краях
  $$(".group").forEach(gr => {
    const rail = $(".rail", gr), arrows = $$(".arr", gr);
    const upd = () => {
      const over = rail.scrollWidth > rail.clientWidth + 4;
      $(".group-arrows", gr).hidden = !over;
      arrows[0].disabled = rail.scrollLeft < 4;
      arrows[1].disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 4;
    };
    arrows.forEach(a => a.addEventListener("click", () =>
      rail.scrollBy({ left: +a.dataset.dir * rail.clientWidth * 0.8, behavior: reduced ? "auto" : "smooth" })));
    rail.addEventListener("scroll", upd, { passive: true });
    new ResizeObserver(upd).observe(rail);
    upd();
  });

  const startLoop = el => {
    const v = $("video", el);
    if (!v.src) v.src = v.dataset.src;
    v.play().then(() => el.classList.add("playing")).catch(() => {});
  };
  const stopLoop = el => { const v = $("video", el); v.pause(); el.classList.remove("playing"); };

  $$(".wk").forEach(el => {
    el.addEventListener("click", e => { if (!e.target.closest(".wk-case")) openPlayer(el.dataset.id); });
    el.addEventListener("keydown", e => { if (e.target !== el) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlayer(el.dataset.id); } });
    if (canHover) {
      el.addEventListener("mouseenter", () => startLoop(el));
      el.addEventListener("mouseleave", () => stopLoop(el));
    }
  });
  // На телефоне петля играет у карточки, которая в центре экрана
  if (!canHover && !reduced) {
    const center = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? startLoop(e.target) : stopLoop(e.target)),
      { rootMargin: "-35% -20% -35% -20%" });
    $$(".wk").forEach(c => center.observe(c));
  }
  // Разделы мягко проявляются при прокрутке
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), { threshold: .15 });
  $$(".group").forEach(g => io.observe(g));

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
    $$(".wk.playing").forEach(stopLoop);
    dlg.className = "player " + w.o;
    media.className = "player-media " + w.o;
    media.innerHTML = `<video src="media/${w.id}.mp4" poster="media/${w.id}.jpg" controls autoplay playsinline></video>`;
    const rows = [["Задача", w.task], ["Что сделал", w.did], ["Инструменты", w.tools]]
      .filter(r => r[1]).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    // у уроков - кнопка на пост с полным уроком в Telegram (если ссылки ещё нет - на канал)
    const tg = w.cat && w.cat.includes("learn")
      ? `<a class="btn player-tg" href="${w.tg || "https://t.me/nik_edit_ai"}" target="_blank" rel="noopener">Смотреть полный урок в Telegram →</a>`
      : "";
    // у кейсов с разбором - кнопка на страницу «как сделано»
    const howto = w.case ? `<a class="btn player-case" href="case.html?id=${w.id}">Как сделано и промпт →</a>` : "";
    info.innerHTML = `<span class="tag tag-real">${w.tag}</span><h3>${w.title}</h3>${tg}${howto}${rows ? `<dl>${rows}</dl>` : `<p>${w.line}</p>`}`;
    dlg.showModal();
  }
  function closePlayer() { const v = $("video", media); if (v) v.pause(); media.innerHTML = ""; dlg.close(); }
  $("#playerClose").addEventListener("click", closePlayer);
  dlg.addEventListener("click", e => { if (e.target === dlg) closePlayer(); });
  dlg.addEventListener("cancel", e => { e.preventDefault(); closePlayer(); });
  $$("[data-play]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openPlayer(b.dataset.play); }));
})();
