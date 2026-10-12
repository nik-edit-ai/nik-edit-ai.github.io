(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ---------- Какой кейс открыт: case.html?id=gta ---------- */
  const CASES = WORKS.filter(w => w.pub && w.case); // только вышедшие работы с разбором
  const id = new URLSearchParams(location.search).get("id");
  const w = CASES.find(x => x.id === id);
  if (!w) { location.replace("index.html#works"); return; }
  const c = w.case;

  document.title = `${w.title} · как сделано · nik.edit.ai`;
  $('meta[name="description"]').content = `${w.line} Разбор по шагам и промпт.`;
  $('meta[property="og:title"]').content = `${w.title} · как сделано`;

  $("#caseTag").textContent = w.tag;
  $("#caseTitle").textContent = w.title.replace(/ (\S{1,3})$/, " $1"); // «GTA 6»: короткое слово не остаётся одно на строке
  $("#caseLine").textContent = w.line;
  $("#caseTask").textContent = w.task;
  $("#caseTools").textContent = w.tools;

  /* ---------- Шов реальность / AI ---------- */
  $("#seamReal").src = `media/${w.id}-real.jpg`;
  $("#seamAi").src = `media/${w.id}-ai.jpg`;
  $("#seamReal").alt = `${c.real}: исходный кадр`;
  $("#seamAi").alt = `${c.ai}: тот же кадр после нейросети`;
  $("#seamTagL").textContent = c.real;
  $("#seamTagR").textContent = c.ai;
  $("#seamCap").textContent = c.seam;

  const seam = $("#seam"), range = $("#seamRange");
  const setPos = v => seam.style.setProperty("--pos", v + "%");
  range.addEventListener("input", () => { setPos(range.value); seam.dataset.touched = 1; });
  if (!reduced) {
    const t0 = performance.now();
    (function breathe(now) {
      if (seam.dataset.touched) return;
      const v = 50 + Math.sin((now - t0) / 1400) * 18;
      setPos(v); range.value = v;
      requestAnimationFrame(breathe);
    })(t0);
  }

  /* ---------- Шаги ---------- */
  const tagFor = i => i === 0 ? ["tag-real", "реальность"] : i === c.steps.length - 1 ? ["tag-edit", "монтаж"] : ["tag-ai", "AI"];
  $("#caseSteps").innerHTML = c.steps.map(([h, p], i) => {
    const [cls, label] = tagFor(i);
    return `<li class="step"><span class="step-n">${String(i + 1).padStart(2, "0")}</span><h3>${h}</h3><p>${p}</p><span class="step-tag ${cls}">${label}</span></li>`;
  }).join("");

  /* ---------- Промпты с кнопкой «скопировать» ---------- */
  const promptBox = (el, title, text) => {
    el.innerHTML = `<div class="prompt-head"><span>${esc(title)}</span><button class="prompt-copy" type="button">Скопировать</button></div><pre>${esc(text)}</pre>`;
    const btn = $(".prompt-copy", el);
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "Скопировано";
        setTimeout(() => btn.textContent = "Скопировать", 1600);
      }).catch(() => {});
    });
  };
  promptBox($("#prompt1"), c.promptTitle, c.prompt);
  if (c.prompt2) promptBox($("#prompt2"), c.prompt2Title, c.prompt2);
  else $("#prompt2wrap").remove();

  /* ---------- Ролик ---------- */
  $("#caseVideo").className = "case-video " + w.o;
  $("#caseVideo").innerHTML = `<video src="media/${w.id}.mp4" poster="media/${w.id}.jpg" controls playsinline preload="metadata"></video>`;

  /* ---------- Другие кейсы ---------- */
  const others = CASES.filter(x => x.id !== w.id);
  if (!others.length) $("#more").remove();
  else $("#caseMore").innerHTML = others.map(o => `
    <a class="case-link" href="case.html?id=${o.id}">
      <img src="media/${o.id}.jpg" alt="" loading="lazy">
      <span class="tag tag-ai">${o.tag}</span>
      <h3>${o.title}</h3>
      <span class="link">Как сделано →</span>
    </a>`).join("");
})();
