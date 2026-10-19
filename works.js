// Работы на сайте. Порядок в массиве = порядок в сетке.
// cat: air - AI × Реальность, ads - реклама, ai - полностью AI, edit - монтаж, learn - обучение (уроки)
// tg: ссылка на пост с полным уроком в Telegram (только у уроков) - в плеере появляется кнопка
// o: v - вертикаль 9:16, h - горизонталь 16:9
// case: страница «как сделано» (case.html?id=...). Нужны media/<id>-real.jpg и media/<id>-ai.jpg 900x1600.
// pub: дата выхода в соцсетях. На сайте показываются ТОЛЬКО работы с pub.
// Вышел ролик -> впиши дату, и он появится. Пока pub нет, работа скрыта.
window.WORKS = [
  {
    id: "nemoya", o: "v", cat: ["air"], dur: "0:36",
    pub: "17.10.2026",
    tag: "AI × Реальность №06",
    title: "Не моя проблема",
    line: "Вокруг падают метеориты и горит мост, а я сижу у залива с пивом и ничего не спасаю.",
    task: "Эпизод рубрики: в новостях каждый день конец света, а хочется хотя бы один вечер просто посидеть у воды.",
    did: "Снял на пирсе у ЗСД, я и мои движения настоящие. Маски по небу выглядели как аппликация, поэтому каждый кусок прогнал через Seedance Edit: я остаюсь собой, а мир вокруг горит, метеоры летят в одну сторону. Мост и бутылку в финале генерировал отдельно. 17 генераций, 8 версий монтажа, звук, музыка и цвет - в DaVinci Resolve.",
    tools: "Seedance · DaVinci Resolve"
  },
  {
    id: "srochno", o: "v", cat: ["air"], dur: "0:23",
    pub: "16.10.2026",
    tag: "AI × Реальность №05",
    title: "Срочно, к утру",
    line: "Вечером прилетает «нужно срочно внести правку», и к утру я уже киборг на последних процентах заряда.",
    task: "Эпизод рубрики про правку, которая всегда «срочно». «Клиент» в переписке - жена, сообщения настоящие.",
    did: "Снимал всё сам дома. Из своего кадра за ноутом в Nano Banana сделал киборга: тёмная кожа и светящийся шов, лицо своё. Превращение и «разрядился» - две генерации в Seedance по первому и последнему кадру, поэтому склеек почти не видно. Таймлайн в кадре настоящий, часы перерисовал на 07:40, глитчи, звук и музыка - на монтаже.",
    tools: "Nano Banana · Seedance · DaVinci Resolve"
  },
  {
    id: "ctrlz", o: "v", cat: ["air"], dur: "0:32",
    pub: "10.10.2026",
    tag: "AI × Реальность №04",
    title: "Если бы в жизни был Ctrl+Z",
    line: "Смахнул кружку со стола, кофе застыл в воздухе, а потом всё отмоталось назад.",
    task: "Эпизод рубрики: кнопка из монтажки, которую хочется забрать в жизнь.",
    did: "Снял дома на iPhone, кадр с летящей кружкой ушёл в генерацию: кофе выплёскивается, время стоит, камера облетает. Одна генерация работает дважды, вперёд и задом наперёд. Замедление, перемотка, звук и музыка - на монтаже, таймлайн в кадре настоящий.",
    tools: "iPhone · Seedance · DaVinci Resolve",
    case: {
      real: "Реальность · iPhone", ai: "AI · стоп-кадр",
      seam: "Тяни шов. Слева реальный кадр, где кружка только сорвалась со стола, справа тот же момент в генерации: кофе выплёскивается и сейчас застынет.",
      steps: [
        ["Съёмка", "Снял дома на iPhone в 60 кадров сбоку, как смахиваю кружку со стола. Отдельно крупный план лица и макро клавиш Ctrl+Z."],
        ["Первый кадр", "Взял из дубля кадр, где кружка уже сорвалась и висит в воздухе. Это единственная картинка для генерации. Лица в кадре нет, поэтому плыть нечему."],
        ["Анимация", "В Seedance одна генерация на 8 секунд: кофе выплёскивается, время замирает, камера облетает застывшие капли, как в bullet time."],
        ["Монтаж", "Одна генерация работает дважды: вперёд и задом наперёд с эффектом перемотки. Реальный кадр тоже пустил реверсом, и кружка «запрыгивает» обратно на стол. Таймлайн в кадре настоящий, звук и музыка - в DaVinci Resolve."]
      ],
      promptTitle: "Видео, Seedance · одна картинка (@image1 - первый кадр), 9:16, 720p, 8 сек",
      prompt: `@image1 - the exact first frame of the video: start exactly from @image1 with the same framing, light, colors, the man's white T-shirt and hand, the desk and the black mug tipping off the edge of the desk.
Format: 9:16 vertical.
Visual style: realistic, photographic, the warm evening lamp light and the color grade of @image1. The man's face stays out of frame.
[0:00-0:01] The black mug keeps tipping off the edge of the desk and hot black coffee splashes out of it in a wide arc.
[0:01-0:01.5] Time freezes completely: the mug, the coffee splash and every droplet hang motionless in mid-air, the man's hand is frozen mid-swing.
[0:01.5-0:08] Bullet time: the camera slowly and smoothly orbits around the frozen mug and the coffee splash, about 90 degrees, revealing the frozen droplets from the side, warm lamp light glints in the coffee drops. Only the camera moves, everything else stays perfectly still. Constant camera speed.
Realistic liquid, stable shapes, no morphing, realistic hand with five fingers, no text.`
    }
  },
  {
    id: "gta", o: "v", cat: ["air"], dur: "0:20",
    pub: "26.09.2026",
    tag: "AI × Реальность №01",
    title: "Питер становится GTA 6",
    line: "Обычная прогулка по питерскому двору, и тот же проход уже в неоне Vice City.",
    task: "Показать, как реальный кадр с телефона превращается в игровой мир без потери движения и героя.",
    did: "Съёмка на iPhone, стиль-кадр из реального кадра, анимация генерации от него же, монтаж со шторкой, звук.",
    tools: "iPhone · Nano Banana · Seedance · Kling · DaVinci Resolve",
    case: {
      real: "Реальность · iPhone", ai: "AI · Vice City",
      seam: "Тяни шов. Слева двор в Питере, снятый на iPhone, справа тот же кадр после нейросети: дома, машины и я на тех же местах.",
      steps: [
        ["Съёмка", "Снял на iPhone со штатива, как иду от камеры по питерскому двору. Главное снимать себя со спины, тогда лицо в генерации не плывёт вообще."],
        ["Стиль-кадр", "В Nano Banana Pro из обычного кадра двора сделал кадр в стиле Vice City: неон, пальмы, закат. Дома, машины и героя попросил оставить на своих местах, иначе шов не сойдётся."],
        ["Анимация", "Стиль-кадр и своё видео загрузил в Seedance, чтобы он повторил моё движение, но уже в игре. Kling два раза запорол: сначала развернул меня лицом, потом выдал горизонталку."],
        ["Монтаж", "В DaVinci Resolve склеил реальный проход и игровой шторкой, добавил звук и музыку."]
      ],
      promptTitle: "Кадр, Nano Banana Pro",
      prompt: `Turn this street photo into a Grand Theft Auto VI Vice City game frame: add pink and cyan neon signs on the building walls, tall palm trees along the sidewalk and a pink-orange sunset sky, with the neon reflected in the wet asphalt and puddles. Keep the buildings, parked cars and the walking man in exactly the same places, and keep his hoodie and trousers light grey.`,
      prompt2Title: "Видео, Seedance · 9:16, 720p, 10 сек, @video1 - своё видео, @image1 - кадр из Nano Banana",
      prompt2: `@video1 - exact camera and motion reference: a static vertical shot of a city street, a man in a light grey hoodie and light grey trousers walks away from the camera down the street, seen only from behind. Copy the camera position, framing, the man's path, walking speed and timing from @video1 exactly.
@image1 - exact style and environment reference and the starting frame: the same street as Grand Theft Auto VI Vice City - pink-orange sunset sky, palm trees, glowing pink and cyan neon signs including the neon palm tree and the PALM SPRINGS MOTEL sign, neon reflections in the wet asphalt and puddles, parked cars on both sides.
[0:00-0:10] Static camera, no camera movement, vertical 9:16. The scene matches @image1 from the first frame. The man walks away from the camera exactly like in @video1, his back to the camera the whole time, his face is never visible, he never turns around. Neon signs glow and flicker softly, reflections shimmer in the puddles, palm leaves sway in a light warm wind. Buildings and cars stay solid and do not morph. Game-engine realism, Vice City color grade, 4K cinematic.`
    }
  },
  {
    id: "sofi", o: "h", cat: ["ads"], dur: "0:30", wide: true,
    pub: "19.09.2026",
    tag: "ТВ-реклама",
    title: "Резиденция «Софи»",
    line: "30-секундный ТВ-ролик к старту продаж ЖК: девушка, для которой не действует гравитация.",
    task: "ТВ-ролик для ГК «ЮгСтройИнвест» по брифу продакшна FRIENDS VIDEO (конкурсное задание школы KHS).",
    did: "Концепция «Притяжение», генерации героини и пролётов над литерами, апскейл в 4K, грейд, фирменный эндкард, звук. Два мастера: −14 LUFS для веба и −23 LUFS по EBU R128 для эфира.",
    tools: "Nano Banana · Seedance · Topaz · DaVinci Resolve"
  },
  {
    id: "vizitka", o: "v", cat: ["air"], dur: "1:13",
    pub: "18.09.2026",
    tag: "Визитка",
    title: "Кто я",
    line: "Бармен, Человек-паук или монтажёр? Живая съёмка, которая перетекает в комикс.",
    task: "Рассказать о себе так, чтобы досмотрели до конца.",
    did: "Съёмка дома у монитора, комикс-вставки и переход в рисованный мир, финал на набережной: реальный кадр уходит в анимацию.",
    tools: "iPhone · нейросети · DaVinci Resolve"
  },
  {
    id: "montazher87", o: "v", cat: ["air"], dur: "0:25",
    pub: "29.09.2026",
    tag: "AI × Реальность №02",
    title: "Как бы я монтировал в 1987-м",
    line: "Та же комната, тот же ракурс, только на 39 лет раньше: два видика, кассета и карандаш.",
    task: "Эпизод рубрики: реальная монтажная сегодня против монтажной 80-х.",
    did: "Начало и конец сняты на iPhone, 1987-й собран нейросетью с сохранением ракурса, VHS-фактура, монтаж и звук.",
    tools: "iPhone · Nano Banana · Seedance · DaVinci Resolve",
    case: {
      real: "Реальность · 2026", ai: "AI · 1987",
      seam: "Тяни шов. Слева моя монтажная сегодня, справа та же комната в 1987-м: ракурс, свет и я сам не тронуты, поменялось только время.",
      steps: [
        ["Съёмка", "Снял себя за монтажом на iPhone: два ноутбука, на стене большой экран с таймлайном. Начало и конец ролика остались реальными."],
        ["Кадр 1987-го", "В Nano Banana Pro взял свой настоящий кадр и попросил поменять только комнату: ковёр на стену, телек, видики вместо ноутбуков. Загружал ровно одну картинку. Когда давал ещё карточку персонажа, нейросеть рисовала вообще другого мужика."],
        ["Анимация", "Кадр 1987-го и карточку персонажа загрузил в Seedance и расписал по секундам: кассета, перемотка карандашом, REC на втором видике, подмигивание в камеру."],
        ["Монтаж", "VHS-фактуру, дату в углу и звук видика сделал в DaVinci Resolve. Поэтому в промпте прямо написано: без текста на экране."]
      ],
      promptTitle: "Кадр, Nano Banana Pro · одна картинка, 9:16",
      prompt: `Edit this photo: keep the man exactly as he is - same face, head, hair, beard, expression, pose, black clothes and position - and keep the same camera angle, framing and lens. Change only the surroundings into a small Leningrad apartment in 1987: the big TV on the wall becomes a boxy wood-panel Soviet CRT television with a glowing picture, the shelves become patterned wallpaper with a red oriental carpet hanging on the wall, and the two laptops in the foreground become two stacked silver-black VHS video recorders with a few VHS cassettes on the desk. Warm tungsten lamp light, realistic photo, the man stays photographically identical to the original.`,
      prompt2Title: "Видео, Seedance · 9:16, 720p, 12 сек, @image1 - кадр из Nano Banana, @image2 - карточка персонажа",
      prompt2: `@image1 - the exact first frame of the video: start exactly from @image1 with the same framing, room, light and man.
@image2 - strict identity reference for the man: use @image2 as strict identity reference, same face, age, haircut, beard, earring and neck tattoo as the man in @image1. Preserve exact likeness throughout. No beautification.
Format: 9:16 vertical.
Visual style: realistic home video of 1987 filmed with a handheld camcorder - small natural shake, warm tungsten light, natural skin texture, the face always sharp and readable. The VHS look is added later in editing.
Location: the small 1987 Leningrad apartment from @image1 at night: patterned wallpaper, wall carpet, boxy CRT television, two stacked VHS recorders and a pile of cassettes on the desk. The man wears the same black clothes as in @image1 in all shots.
[0:00-0:03] Start exactly from @image1. The man presses the big chunky piano-key buttons of the upper VHS recorder, a cassette pops out, he swaps it for another cassette from the pile and pushes it in with a satisfied nod. The CRT picture flickers.
[0:03-0:06] Cut - close-up: he holds a VHS cassette and rewinds the tape by spinning a pencil inserted in one reel, concentrated, with a slight grin.
[0:06-0:09] Cut - close-up of the two stacked recorders: his index finger presses PLAY on the upper recorder and REC on the lower one, a small red REC lamp lights up. Cut - the CRT picture rolls with tracking lines and jumps to a new scene.
[0:09-0:12] Cut - back to the framing of @image1: he leans toward the camera, looks straight into the lens, smiles, winks and gives a thumbs-up. Hold the last second still.
Same person in all shots. Stable face throughout. No morphing. No deformation. No ghosting. Realistic hands with five fingers. Realistic physics. No text and no date stamp on screen.`
    }
  },
  {
    id: "monster", o: "v", cat: ["air"], dur: "0:15",
    pub: "02.10.2026",
    tag: "AI × Реальность №03",
    title: "Монстр из телевизора",
    line: "Монтировал до ночи и не заметил, кто вылез из телевизора за спиной.",
    task: "Хоррор-завязка с добрым финалом: реальная комната и нейросетевой гость.",
    did: "Съёмка себя и комнаты, генерация монстра в реальном пространстве, сборка напряжения на монтаже и звуке.",
    tools: "iPhone · Nano Banana · Seedance · DaVinci Resolve",
    case: {
      real: "Реальность · iPhone", ai: "AI · монстр",
      seam: "Тяни шов. Слева реальный дубль, справа тот же момент после нейросети: монстр вылез из телевизора и монтирует за меня.",
      steps: [
        ["Съёмка", "Один дубль на iPhone со штатива: сижу за ноутбуком, за спиной телевизор с цветокоррекцией. Жесты играл под будущего монстра: откидываюсь, тру лоб, поднимаю руку, чтобы он дал мне пять."],
        ["Монстр", "В Nano Banana Pro сделал карточку монстра на белом фоне: чёрная шерсть, рога, длинные когти, янтарные глаза. По ней нейросеть держит его внешность весь ролик."],
        ["Анимация", "В Seedance весь дубль одной генерацией: моё видео как референс движения, карточка монстра и мой кадр для лица. Расписал по секундам: телевизор глючит, из экрана лезет лапа, монстр крадётся за спиной, а вместо нападения садится монтировать и даёт пять."],
        ["Монтаж", "В DaVinci Resolve вернул себя из оригинала через Magic Mask поверх генерации, чтобы лицо осталось настоящим. Там, где монстр перед рукой, вычел его из маски. Напряжение докрутил звуком."]
      ],
      promptTitle: "Карточка монстра, Nano Banana Pro · текст в картинку, 9:16",
      prompt: `One creepy creature crawling out of darkness, the size of a ten-year-old child: thin hunched body covered in matted charcoal-black shaggy fur, very long thin arms with long dark claws, a narrow head with two short twisted horns, big glowing amber eyes and a wide grin with small sharp teeth. Full body, three-quarter view, plain white background, realistic dark-fantasy look like a horror movie creature, soft studio light.`,
      prompt2Title: "Видео, Seedance · 9:16, 720p, 15 сек, @video1 - свой дубль, @image1 - карточка монстра, @image2 - свой кадр из дубля",
      prompt2: `@video1 - base video reference for the exact room, framing, static camera, timing and every movement of the man. Replicate @video1 shot for shot: same framing, same static camera, same man, same gestures at the same moments. Do not change the man or the room.
@image1 - strict character reference for a creepy shaggy charcoal-black creature with long clawed arms, twisted horns, glowing amber eyes and a wide sharp-toothed grin. Preserve his exact look throughout.
@image2 - identity reference for the man: short hair, short beard, cream t-shirt, tattoo on the arm. Same person in all frames. Stable face throughout.
Location: a dark room, the man sits at a laptop in the foreground, a big glowing TV with a color grading program hangs on the wall behind him.
[0:00-0:03] Replicate @video1 exactly. The man works at the laptop. Calm, quiet, nothing unusual.
[0:03-0:06] Horror build-up: the TV screen behind the man flickers, glitches and dims, cold blue light pulses in the room. A long thin arm with dark claws slowly pushes out of the TV screen as if through water.
[0:06-0:09] The creature from @image1 slowly crawls out of the screen, creeps down behind the man and raises its claws over his shoulder, glowing eyes fixed on him. Tense, dangerous, like a horror movie. The man does not notice and keeps working as in @video1.
[0:09-0:10] Twist: the man leans back exactly as in @video1, and instead of attacking, the creature reaches past him to the laptop.
[0:10-0:12] Calm: the creature rises up on its hind legs, sits on the laptop lid and taps it busily with its claws, editing the video. The room light turns warm and soft again, the TV stops glitching. The man rubs his forehead as in @video1.
[0:12-0:13] The man raises his hand up and to the side exactly as in @video1; the creature jumps up and gives him a high five, claw to palm, and grins happily.
[0:13-0:15] The creature waves, jumps up and dives back into the TV screen, the screen ripples and closes. The man calmly looks at the camera as in @video1.
The creature is the only addition to @video1: no other people, no text, no extra objects.
Technical: static camera, same framing as @video1, realistic contact shadows of the creature, cinematic horror lighting that turns warm after the twist. No deformation. No flickering of the man. No ghosting. Stable face throughout. Realistic physics.`
    }
  },
  {
    id: "spinner", o: "v", cat: ["ads", "ai"], dur: "0:46",
    pub: "23.09.2026",
    tag: "Реклама товара",
    title: "Спиннер",
    line: "Реклама без единого живого человека: актёр, квартира и свет - нейросеть.",
    task: "Показать, что рекламу товара можно собрать без съёмочной площадки.",
    did: "Сценарий «мозг завис → пара оборотов → снова в фокусе», генерации, монтаж, титры и звук.",
    tools: "нейросети · DaVinci Resolve"
  },
  {
    id: "talking", o: "h", cat: ["edit"], dur: "0:51",
    pub: "06.10.2026",
    tag: "Монтаж",
    title: "Говорящая голова для Славы Хохлова",
    line: "Промо «присоединяйся к нам»: удержать внимание на монологе.",
    task: "Монтаж спикера на курсе KHS. Спикер - руководитель видеопродакшна и автор канала на 500 тысяч.",
    did: "Титры в ритме речи, акценты на главных словах, картинка-в-картинке и вставки, которые двигают мысль.",
    tools: "DaVinci Resolve"
  },
  {
    id: "tri", o: "h", cat: ["ai"], dur: "0:24",
    pub: "11.10.2026",
    tag: "Тестовое KHS",
    title: "Три секунды",
    line: "Сталкер возвращается в квартиру, которой больше нет, и на три секунды попадает в мир, где ничего не случилось.",
    task: "Тестовое в игровую студию на стажировке KHS. Задание - одна фраза: человек возвращается в место, которого больше нет. 15-30 секунд, всё генеративно.",
    did: "Сталкер - я, по своей карточке персонажа. Живую и мёртвую комнату сделал из одной картинки, они совпали почти пиксель в пиксель, и запись другого мира ложится ровно поверх. Голограмму собрал сам: вырезал людей, увёл в сепию, добавил строки и сбои сигнала. Звук руками: дозиметр обрывается на падении противогаза, и ровно там входит музыка. Это третья версия, пересобрал по замечаниям куратора.",
    tools: "Nano Banana Pro · Seedance 2.5 · Topaz · Suno · DaVinci Resolve"
  },
  {
    id: "pyatnica", o: "v", cat: ["ai"], dur: "0:14",
    pub: "08.10.2026",
    tag: "Полностью AI",
    title: "Пятница. Правки закрыты",
    line: "Захожу в двери и выдаю танец. Танцует, правда, нейросеть, я так не умею.",
    task: "Пятничный ролик на тренде Spider Dance: в прошлую пятницу монтировал до ночи, в эту все правки закрыты.",
    did: "Танец сгенерирован по моей карточке, эффекты под бит докручены на монтаже.",
    tools: "Seedance · DaVinci Resolve"
  },
  {
    id: "metro", o: "v", cat: ["ai"], dur: "0:15",
    pub: "22.09.2026",
    tag: "Полностью AI",
    title: "Телефон на двери вагона",
    line: "Прилепил телефон к вагону и побежал за поездом. Ничего этого не было.",
    task: "Проверить, поверит ли зритель в «съёмку», которой не было.",
    did: "Весь ролик сгенерирован: я, станция, поезд и забег. Монтаж, звук и финальная подводка.",
    tools: "нейросети · DaVinci Resolve"
  },
  {
    id: "documentary", o: "v", cat: ["ai"], dur: "1:11",
    pub: "21.09.2026",
    tag: "Тру-крайм",
    title: "Голосовые",
    line: "Документалка, для которой не включили ни одной камеры.",
    task: "Короткий тру-крайм в стиле YouTube-расследований: голосовые сообщения и исчезновения.",
    did: "Все герои, квартиры и ночной город - генерации. Напряжение держится на монтаже: паузы, тишина, звук, сине-оранжевый цвет.",
    tools: "нейросети · DaVinci Resolve"
  },
  {
    id: "clip", o: "h", cat: ["edit"], dur: "1:03",
    pub: "07.10.2026",
    tag: "Клип",
    title: "Winter 2025",
    line: "Чёрно-белый ночной город, человек в маске-черепе и дрифт.",
    task: "Клип на курсе KHS: собрать разные кадры в одну историю.",
    did: "Каждая склейка в бит, ч/б грейд, который делает из разных кадров один мир.",
    tools: "DaVinci Resolve"
  },
  {
    id: "story", o: "h", cat: ["edit"], dur: "0:42",
    pub: "13.10.2026",
    tag: "Атмосфера",
    title: "Новая история",
    line: "Лампа, стакан, таймлайн на экране и тёплый свет.",
    task: "Атмосферный ролик на курсе KHS.",
    did: "Медленные планы, титры, которые читаются как мысли вслух, тёплый цвет.",
    tools: "DaVinci Resolve"
  },
  {
    id: "pravki", o: "v", cat: ["ai"], dur: "0:20",
    pub: "27.09.2026",
    tag: "Юмор",
    title: "Монтажёр против правок",
    line: "Правка №7, «а можно побыстрее» и «логотип побольше». Отбился от всех.",
    task: "Ролик для своих, для каждого монтажёра, который получал правки.",
    did: "Сгенерированная драка в вагоне метро, подписи-стикеры на врагах, счётчик отбитых правок, штамп «СДАНО».",
    tools: "нейросети · DaVinci Resolve"
  },
  {
    id: "lesson01", o: "v", cat: ["learn"], dur: "0:30",
    pub: "18.10.2026",
    tg: "https://t.me/nik_edit_ai/50",
    tag: "Урок 01",
    title: "Как примерить на себя тату",
    line: "Нейросеть рисует татуху прямо на фото: с нуля, по эскизу и даже перебивку старой.",
    task: "Обучающие ролики по нейросетям для новичков.",
    did: "Сценарий, ведение в кадре, запись экрана, генерации, монтаж в DaVinci Resolve, графика и звук. Здесь - короткая версия, полный урок - в Telegram.",
    tools: "Nano Banana 2 · DaVinci Resolve"
  }
];

// Ролики, которые открываются в плеере, но не стоят в сетке
window.EXTRA = {
  "showreel-h": { id: "showreel-h", o: "h", tag: "Шоурил", title: "Шоурил 2026", line: "Лучшее из работ за 34 секунды." },
  "review-khokhlov": { id: "review-khokhlov", o: "square", tag: "Видеоотзыв", title: "Слава Хохлов", line: "Руководитель видеопродакшна, автор YouTube-канала «Хохлов Сабатовский»." },
  "review-zgibnev": { id: "review-zgibnev", o: "square", tag: "Видеоотзыв", title: "Дмитрий Згибнев", line: "Монтажёр, автор YouTube-канала про DaVinci Resolve @zgibnev_blog." }
};
