const STORAGE_KEY = "arabisch-schreiben.progress-v2";
const main = document.querySelector("#appMain");
const PREVIEW_ALL = new URLSearchParams(window.location.search).get("preview") === "all";

function loadProgress() {
  const fallback = { completed: [], knownLetters: [], quizCorrect: 0, quizTotal: 0, streak: 1, lastVisit: "", reviewStats: {}, dailyReview: { date:"", completed:0, correct:0 } };
  try { const loaded={ ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };loaded.reviewStats||={};loaded.dailyReview||={date:"",completed:0,correct:0};return loaded; }
  catch { return fallback; }
}

const state = {
  view: "home", lessonId: null, lessonStep: 0, lessonQuizIndex: 0, lessonQuizScore: 0,
  lessonQuestions: [], lastLessonQuestionById: {}, lessonWritingLetterId: null, lessonWritingForm: 0, writingGuide: true,
  alphabetFilter: "all", alphabetQuery: "", alphabetWritingId: null, alphabetWritingForm: 0, practiceMode:"review", practiceQuestion: null, practiceLocked: false,
  reviewSession: [], reviewIndex: 0, reviewScore: 0, reviewLocked: false, lastReviewKey: "",
  strokes: [], activeStroke: null, penInUse: false, progress: loadProgress()
};

if (localStorage.getItem("arabisch-schreiben.lesson-1") === "complete" && !state.progress.completed.includes("rtl-alif")) {
  state.progress.completed.push("rtl-alif"); state.progress.knownLetters.push("alif");
}

function localDateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
function updateVisit() {
  const today = localDateKey();
  if (state.progress.lastVisit && state.progress.lastVisit !== today) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    state.progress.streak = state.progress.lastVisit === localDateKey(yesterday) ? state.progress.streak + 1 : 1;
  }
  state.progress.lastVisit = today; saveProgress();
}
function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); }
updateVisit();

const viewLabels = {
  home:["Start","Dein persönlicher Lernweg"], path:["Lernweg","Vom Alphabet bis zur Koranlektüre"],
  alphabet:["Alphabet","28 Buchstaben im Überblick"], practice:["Üben","Erkennen und festigen"], lesson:["Lektion","Schritt für Schritt lernen"]
};

function setView(view) {
  state.view = view;
  document.querySelectorAll("[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  const label = viewLabels[view] || viewLabels.home;
  document.querySelector("#topbarTitle").textContent = label[0];
  document.querySelector("#topbarSubtitle").textContent = label[1];
  if (view === "home") renderHome();
  if (view === "path") renderPath();
  if (view === "alphabet") renderAlphabet();
  if (view === "practice") renderPractice();
  main.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "smooth" });
}

function completedCount() { return state.progress.completed.length; }
function totalLessons() { return COURSE_MODULES.reduce((sum,module) => sum + module.lessons.length,0); }
function coursePercent() { return Math.round(completedCount() / totalLessons() * 100); }
function isComplete(id) { return state.progress.completed.includes(id); }
function allCourseLessons() { return COURSE_MODULES.flatMap(module=>module.lessons.map(lesson=>({...lesson,moduleTitle:module.title,moduleId:module.id}))); }
function canOpenLesson(id) {
  if (PREVIEW_ALL) return true;
  const lessons=allCourseLessons(); const index=lessons.findIndex(item=>item.id===id);
  return index === 0 || index > 0 && isComplete(lessons[index-1].id) || isComplete(id);
}
function nextLesson() { const lessons=allCourseLessons(); return lessons.find(item=>!isComplete(item.id)) || lessons[lessons.length-1]; }
function getLetter(id) { return ALPHABET.find(letter => letter.id === id); }
function lessonGlyph(lesson){return {script:lesson.id==="rtl-alif"?"ا":lesson.id==="dots"?"بت":lesson.id==="bowls"?"جح":"أب",connections:"ـبـ",vowels:"بَ",reading:"ٱ",tajwid:"قْ",quran:"۝"}[lesson.moduleId]||"ا";}

function renderHome() {
  const next = nextLesson(); const percent = coursePercent();
  main.innerHTML = `<div class="view">
    <section class="hero-grid">
      <div class="hero-panel">
        <p class="eyebrow">Dein Ziel · Koran lesen</p>
        <h1>Schritt für Schritt.<br><span>Mit Verständnis.</span></h1>
        <p>Du lernst die arabische Schrift systematisch – erst sehen, dann unterscheiden, verbinden und schließlich sicher lesen.</p>
        <div class="hero-actions"><button class="primary-button" data-open-lesson="${next.id}">${isComplete(next.id)?"Lektion wiederholen":"Weiterlernen"} &nbsp;←</button><button class="secondary-button" data-go="path">Lernweg ansehen</button></div>
      </div>
      <aside class="today-panel">
        <p class="eyebrow">Heute</p><h2>10 Minuten reichen</h2><p class="muted">Regelmäßigkeit ist wichtiger als lange Einheiten.</p>
        <div class="daily-ring" style="--progress:${Math.max(4,percent)}%"><strong>${percent}%</strong><small>Gesamtkurs</small></div>
        <div class="mini-stats"><div class="mini-stat"><strong>${completedCount()}</strong><span>Lektionen</span></div><div class="mini-stat"><strong>${state.progress.knownLetters.length}</strong><span>Buchstaben</span></div></div>
      </aside>
    </section>
    <section class="section-block"><div class="section-heading"><div><p class="eyebrow">Als Nächstes</p><h2>${next.title}</h2></div><span class="status-chip">${isComplete(next.id)?"Wiederholung":"Bereit"}</span></div>
      <div class="next-card"><div class="lesson-glyph">${lessonGlyph(next)}</div><div><h3>${next.title}</h3><p>${next.meta} · ${next.moduleTitle}</p></div><button class="primary-button" data-open-lesson="${next.id}">Lektion öffnen</button></div>
    </section>
    <section class="section-block"><div class="section-heading"><div><p class="eyebrow">Der Weg zum Ziel</p><h2>Sechs klare Etappen</h2><p>Neue Regeln bauen immer auf bereits Gelerntem auf.</p></div><button class="text-button" data-go="path">Alle anzeigen →</button></div>
      <div class="roadmap-preview">${COURSE_MODULES.slice(0,6).map((module,index)=>`<div class="stage-card ${index===0?"active":""}"><small>${module.number}</small><strong>${module.title}</strong><p>${module.description}</p></div>`).join("")}</div>
    </section>
    <div class="audio-notice"><span>♪</span><div><strong>Authentisches Audio wird vorbereitet</strong><p>Buchstabenaufnahmen und Rezitationen werden erst nach fachlicher und rechtlicher Prüfung freigeschaltet – keine ungeprüfte KI-Rezitation.</p></div></div>
  </div>`;
  bindCommon();
}

function renderPath() {
  main.innerHTML = `<div class="view">${PREVIEW_ALL?'<div class="preview-banner"><span>Vorschau</span><strong>Alle 31 Lektionen sind zur Ansicht freigeschaltet.</strong><small>Unfertige Lektionen zeigen ihren geplanten Aufbau.</small></div>':""}<header class="page-header"><div><p class="eyebrow">Curriculum</p><h1>Dein Lernweg</h1><p>Von null Vorkenntnissen bis zur begleiteten Koranlektüre.</p></div><div class="overall-progress"><strong>${coursePercent()}%</strong><span>${completedCount()} von ${totalLessons()} Lektionen</span></div></header>
    <div class="module-list">${COURSE_MODULES.map((module,index)=>{const moduleStarted=module.lessons.some(lesson=>isComplete(lesson.id));const moduleUnlocked=canOpenLesson(module.lessons[0].id);return `<section class="module-card ${index===0||PREVIEW_ALL||moduleStarted?"open":""}" data-tone="${module.tone}"><button class="module-summary" data-module="${module.id}"><span class="module-number">${module.number}</span><span><h2>${module.title}</h2><p>${module.description}</p></span><span class="module-meta"><strong>${module.lessons.length} Lektionen</strong><span>${PREVIEW_ALL?"Offen":moduleStarted?"Begonnen":moduleUnlocked?"Bereit":"Noch gesperrt"}</span></span></button><div class="module-lessons">${module.lessons.map((lesson,lessonIndex)=>{
      const normalOpen = lesson.available && canOpenLesson(lesson.id); const openable = PREVIEW_ALL || normalOpen; const done = isComplete(lesson.id); const hasLesson = LESSONS[lesson.id];
      const action = openable ? (hasLesson ? `data-open-lesson="${lesson.id}"` : `data-preview-lesson="${module.id}:${lessonIndex}"`) : "disabled";
      return `<button class="path-lesson ${openable?"available":"locked"} ${done?"done":""}" ${action}><span class="path-state">${done?"✓":String(lessonIndex+1).padStart(2,"0")}</span><span><strong>${lesson.title}</strong><small>${lesson.meta}</small></span><span>${openable?"→":"⌁"}</span></button>`;}).join("")}</div></section>`;}).join("")}</div>
  </div>`;
  bindCommon();
  document.querySelectorAll("[data-module]").forEach(button => button.addEventListener("click",()=>button.closest(".module-card").classList.toggle("open")));
  document.querySelectorAll("[data-preview-lesson]").forEach(button=>button.addEventListener("click",()=>openPreviewLesson(button.dataset.previewLesson)));
}

function openPreviewLesson(key) {
  const [moduleId,indexText]=key.split(":"); const module=COURSE_MODULES.find(item=>item.id===moduleId); const lesson=module?.lessons[Number(indexText)];
  if(!module||!lesson)return;
  document.querySelector("#topbarTitle").textContent="Lektionsvorschau"; document.querySelector("#topbarSubtitle").textContent=lesson.title;
  main.innerHTML=`<div class="view"><div class="lesson-top"><button class="back-link" data-go="path">→ &nbsp; Offener Lernweg</button><span class="status-chip">Vorschau</span></div><div class="lesson-heading"><div><p class="eyebrow">Etappe ${module.number} · ${module.title}</p><h1>${lesson.title}</h1><p>${lesson.meta}</p></div><div class="audio-pending">♪ Audio vorgesehen</div></div><div class="learning-card preview-lesson-card"><p class="eyebrow">Geplanter Lektionsaufbau</p><h2>${module.description}</h2><p>Diese offene Ansicht zeigt, wie die Lektion aufgebaut wird. Der fachliche Inhalt ist noch nicht freigegeben.</p><div class="preview-grid"><div><span>01</span><strong>Verstehen</strong><p>Kurze Erklärung mit klarer visueller Einführung.</p></div><div><span>02</span><strong>Erkennen</strong><p>Formen, Zeichen oder Regeln gezielt unterscheiden.</p></div><div><span>03</span><strong>Anwenden</strong><p>Lesen, Schreiben oder eine Wissensprüfung absolvieren.</p></div></div><div class="audio-notice"><span>✓</span><div><strong>Professioneller Qualitätsstatus</strong><p>Text, Beispiele, Audio und Tajwīd-Hinweise werden vor der regulären Freischaltung geprüft.</p></div></div></div></div>`;
  bindCommon(); window.scrollTo({top:0,behavior:"smooth"});
}

function filteredAlphabet() {
  const query = state.alphabetQuery.trim().toLocaleLowerCase("de");
  return ALPHABET.filter(letter => {
    const filterMatch = state.alphabetFilter === "all" || (state.alphabetFilter === "known" && state.progress.knownLetters.includes(letter.id)) || (state.alphabetFilter === "nonjoin" && !letter.joinsLeft);
    return filterMatch && (!query || `${letter.letter} ${letter.name} ${letter.sound}`.toLocaleLowerCase("de").includes(query));
  });
}

function renderAlphabet() {
  const letters = filteredAlphabet();
  main.innerHTML = `<div class="view"><header class="page-header"><div><p class="eyebrow">Nachschlagen</p><h1>Das Alphabet</h1><p>Tippe einen Buchstaben an, um Formen und Hinweise zu sehen.</p></div><div class="overall-progress"><strong>${state.progress.knownLetters.length}/28</strong><span>als gelernt markiert</span></div></header>
    <div class="alphabet-tools"><label class="search-box"><input id="letterSearch" type="search" placeholder="Name oder Laut suchen …" value="${state.alphabetQuery.replaceAll('"','&quot;')}" aria-label="Buchstaben suchen"></label><div class="filter-pills"><button class="filter-pill ${state.alphabetFilter==="all"?"active":""}" data-filter="all">Alle</button><button class="filter-pill ${state.alphabetFilter==="known"?"active":""}" data-filter="known">Gelernt</button><button class="filter-pill ${state.alphabetFilter==="nonjoin"?"active":""}" data-filter="nonjoin">Nicht-Verbinder</button></div></div>
    <div class="alphabet-grid">${letters.map(letter=>`<button class="letter-tile ${state.progress.knownLetters.includes(letter.id)?"known":""}" data-letter="${letter.id}">${state.progress.knownLetters.includes(letter.id)?'<span class="letter-known">✓</span>':""}<span class="arabic" lang="ar">${letter.letter}</span><strong>${letter.name}</strong><small>${letter.sound}</small></button>`).join("")}</div>
    ${letters.length?"":'<p class="lesson-lock-note">Keine Buchstaben für diesen Filter gefunden.</p>'}
  </div>`;
  document.querySelector("#letterSearch").addEventListener("input",event=>{state.alphabetQuery=event.target.value;renderAlphabet();const field=document.querySelector("#letterSearch");field.focus();field.setSelectionRange(field.value.length,field.value.length)});
  document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{state.alphabetFilter=button.dataset.filter;renderAlphabet()}));
  document.querySelectorAll("[data-letter]").forEach(button=>button.addEventListener("click",()=>openLetter(button.dataset.letter)));
}

function openLetter(id) {
  const letter = getLetter(id); if (!letter) return;
  const labels=["Allein","Am Ende","In der Mitte","Am Anfang"];
  document.querySelector("#letterDialogContent").innerHTML=`<div class="letter-head"><p class="eyebrow">${letter.family}</p><span class="arabic" lang="ar">${letter.letter}</span><h2>${letter.name}</h2><p>${letter.sound}</p></div><div class="forms-table">${letter.forms.map((form,index)=>`<div class="form-cell"><span lang="ar">${form}</span><small>${labels[index]}</small></div>`).join("")}</div><p class="letter-note">${letter.note}</p><div class="letter-dialog-actions"><button class="primary-button" data-write-letter="${letter.id}">✎ &nbsp; Schreiben üben</button><button class="audio-disabled" data-audio-info>♪ &nbsp; Audio nach Quellenprüfung</button></div>`;
  document.querySelector("#letterDialog").showModal();
  document.querySelector("[data-write-letter]").addEventListener("click",()=>{document.querySelector("#letterDialog").close();openLetterWriting(id)});
  document.querySelector("[data-audio-info]").addEventListener("click",()=>{document.querySelector("#letterDialog").close();document.querySelector("#sourceDialog").showModal()});
}

function openLetterWriting(id) {
  const letter=getLetter(id);if(!letter)return;
  state.alphabetWritingId=id;state.alphabetWritingForm=0;state.view="alphabet-writing";
  document.querySelector("#topbarTitle").textContent="Schreiben";document.querySelector("#topbarSubtitle").textContent=`${letter.name} üben`;
  renderLetterWriting();window.scrollTo({top:0,behavior:"smooth"});
}

function renderLetterWriting() {
  const letter=getLetter(state.alphabetWritingId);if(!letter){setView("alphabet");return}
  const labels=["Allein","Am Ende","In der Mitte","Am Anfang"];
  const availableForms=letter.forms.map((form,index)=>({form,index,label:labels[index]})).filter(item=>item.form!=="—");
  if(!availableForms.some(item=>item.index===state.alphabetWritingForm))state.alphabetWritingForm=availableForms[0].index;
  const activeForm=letter.forms[state.alphabetWritingForm];
  main.innerHTML=`<div class="view"><div class="lesson-top"><button class="back-link" data-go="alphabet">→ &nbsp; Alphabet</button><span class="lesson-count">Schreibübung für ${letter.name}</span></div><div class="lesson-heading"><div><p class="eyebrow">Buchstabe ${ALPHABET.indexOf(letter)+1} von 28</p><h1>${letter.name} schreiben</h1><p>${letter.sound} · ${letter.family}</p></div><span class="writing-letter-badge" lang="ar">${letter.letter}</span></div><div class="writing-layout alphabet-writing-layout"><div class="writing-instructions"><p class="eyebrow">Form auswählen</p><h2>Erst nachfahren, dann frei schreiben</h2><p>Wähle eine verfügbare Form. Übe sie zunächst über der Vorlage und wiederhole sie danach auf der freien Fläche.</p><div class="writing-form-picker">${availableForms.map(item=>`<button class="writing-form ${item.index===state.alphabetWritingForm?"active":""}" data-writing-form="${item.index}"><span lang="ar">${item.form}</span><small>${item.label}</small></button>`).join("")}</div><div class="tip"><span>✦</span><p>Die Auswertung prüft Strichführung und Größe. Vergleiche die genaue Form zusätzlich selbst mit der Vorlage.</p></div></div><div class="writing-card"><div class="canvas-toolbar"><span>${letter.name} · ${labels[state.alphabetWritingForm]}</span><div class="canvas-tools"><button class="canvas-mode ${state.writingGuide?"active":""}" data-alphabet-guide="true">Mit Vorlage</button><button class="canvas-mode ${state.writingGuide?"":"active"}" data-alphabet-guide="false">Ohne Vorlage</button><button class="text-button" id="clearAlphabetCanvas">Neu beginnen</button></div></div><div class="canvas-wrap letter-canvas-wrap ${state.writingGuide?"":"free"}"><div class="letter-trace-guide ${state.writingGuide?"":"hidden"}" lang="ar">${activeForm}</div><canvas id="alphabetWritingCanvas" aria-label="Schreibfläche für ${letter.name}"></canvas><div class="canvas-hint" id="alphabetCanvasHint">${state.writingGuide?"Form nachfahren":"Form frei schreiben"}</div></div><button class="primary-button" id="checkAlphabetWriting">Schrift prüfen</button><div class="writing-result" id="alphabetWritingResult" role="status" aria-live="polite"></div></div></div></div>`;
  bindCommon();
  document.querySelectorAll("[data-writing-form]").forEach(button=>button.addEventListener("click",()=>{state.alphabetWritingForm=Number(button.dataset.writingForm);renderLetterWriting()}));
  setupAlphabetWritingCanvas();
}

let alphabetCanvas,alphabetCtx;
function setupAlphabetWritingCanvas(){
  alphabetCanvas=document.querySelector("#alphabetWritingCanvas");alphabetCtx=alphabetCanvas.getContext("2d");state.strokes=[];state.activeStroke=null;state.penInUse=false;
  const resize=()=>{const rect=alphabetCanvas.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);alphabetCanvas.width=Math.round(rect.width*ratio);alphabetCanvas.height=Math.round(rect.height*ratio);alphabetCtx.setTransform(ratio,0,0,ratio,0,0);redrawAlphabetCanvas()};requestAnimationFrame(resize);
  const point=event=>{const rect=alphabetCanvas.getBoundingClientRect();return{x:event.clientX-rect.left,y:event.clientY-rect.top,pressure:event.pressure||.5}};
  alphabetCanvas.addEventListener("pointerdown",event=>{if(event.pointerType==="pen")state.penInUse=true;if(state.penInUse&&event.pointerType==="touch")return;alphabetCanvas.setPointerCapture(event.pointerId);state.activeStroke=[point(event)];document.querySelector("#alphabetCanvasHint").style.display="none"});
  alphabetCanvas.addEventListener("pointermove",event=>{if(!state.activeStroke||state.penInUse&&event.pointerType==="touch")return;(event.getCoalescedEvents?event.getCoalescedEvents():[event]).forEach(item=>state.activeStroke.push(point(item)));redrawAlphabetCanvas()});
  const finish=event=>{if(!state.activeStroke||state.penInUse&&event.pointerType==="touch")return;state.activeStroke.push(point(event));state.strokes.push(state.activeStroke);state.activeStroke=null;redrawAlphabetCanvas()};alphabetCanvas.addEventListener("pointerup",finish);alphabetCanvas.addEventListener("pointercancel",finish);
  document.querySelector("#clearAlphabetCanvas").addEventListener("click",()=>{state.strokes=[];state.penInUse=false;document.querySelector("#alphabetCanvasHint").style.display="block";document.querySelector("#alphabetWritingResult").className="writing-result";redrawAlphabetCanvas()});
  document.querySelectorAll("[data-alphabet-guide]").forEach(button=>button.addEventListener("click",()=>{state.writingGuide=button.dataset.alphabetGuide==="true";document.querySelectorAll("[data-alphabet-guide]").forEach(item=>item.classList.toggle("active",item===button));document.querySelector(".letter-canvas-wrap").classList.toggle("free",!state.writingGuide);document.querySelector(".letter-trace-guide").classList.toggle("hidden",!state.writingGuide);const hint=document.querySelector("#alphabetCanvasHint");hint.textContent=state.writingGuide?"Form nachfahren":"Form frei schreiben";hint.style.display=state.strokes.length?"none":"block"}));
  document.querySelector("#checkAlphabetWriting").addEventListener("click",checkAlphabetWriting);
}
function redrawAlphabetCanvas(){if(!alphabetCanvas||!alphabetCtx)return;const rect=alphabetCanvas.getBoundingClientRect();alphabetCtx.clearRect(0,0,rect.width,rect.height);[...state.strokes,...(state.activeStroke?[state.activeStroke]:[])].forEach(stroke=>{if(!stroke.length)return;alphabetCtx.save();alphabetCtx.strokeStyle="#17211f";alphabetCtx.lineWidth=9;alphabetCtx.lineCap="round";alphabetCtx.lineJoin="round";alphabetCtx.beginPath();alphabetCtx.moveTo(stroke[0].x,stroke[0].y);for(let index=1;index<stroke.length;index++){const a=stroke[index-1],b=stroke[index];alphabetCtx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2)}alphabetCtx.stroke();alphabetCtx.restore()})}
function checkAlphabetWriting(){const points=state.strokes.flat(),result=document.querySelector("#alphabetWritingResult");if(points.length<8){result.className="writing-result visible try";result.textContent="Zeichne die Buchstabenform zuerst vollständig.";return}const xs=points.map(point=>point.x),ys=points.map(point=>point.y),width=Math.max(...xs)-Math.min(...xs),height=Math.max(...ys)-Math.min(...ys),rect=alphabetCanvas.getBoundingClientRect(),largeEnough=width>rect.width*.08||height>rect.height*.22;result.className=`writing-result visible ${largeEnough?"good":"try"}`;result.innerHTML=largeEnough?`<strong>Gut geübt.</strong><br>Wechsle jetzt zu „Ohne Vorlage“ und schreibe ${getLetter(state.alphabetWritingId).name} noch einmal frei.`:`<strong>Noch etwas größer.</strong><br>Nutze mehr von der Schreibfläche und vergleiche deine Linien mit der Form.`}

function practicePool() {
  if (isComplete("bowls")) return ALPHABET.slice(0,7);
  if (isComplete("dots") || isComplete("rtl-alif")) return ALPHABET.slice(0,4);
  return ALPHABET.slice(0,4);
}
function randomItem(items) { return items[Math.floor(Math.random()*items.length)]; }
function shuffle(items) {
  const shuffled=[...items];
  for(let index=shuffled.length-1;index>0;index--){
    const swapIndex=Math.floor(Math.random()*(index+1));
    [shuffled[index],shuffled[swapIndex]]=[shuffled[swapIndex],shuffled[index]];
  }
  return shuffled;
}
function lessonQuestionKey(question) { return `${question.glyph}|${question.prompt}|${question.answer}`; }
function prepareLessonQuestions(lesson, avoidFirstKey="") {
  const questions=shuffle(lesson.questions || []).map(question=>({...question,options:shuffle(question.options)}));
  if(questions.length>1&&lessonQuestionKey(questions[0])===avoidFirstKey){
    const replacement=questions.findIndex((question,index)=>index>0&&lessonQuestionKey(question)!==avoidFirstKey);
    if(replacement>0)[questions[0],questions[replacement]]=[questions[replacement],questions[0]];
  }
  return questions;
}
function createPracticeQuestion(previousId) {
  const pool=practicePool(); let answer=randomItem(pool);
  if (pool.length>1) while(answer.id===previousId) answer=randomItem(pool);
  const distractors=shuffle(ALPHABET.filter(item=>item.id!==answer.id)).slice(0,3);
  return {answer,options:shuffle([answer,...distractors])};
}
function reviewKey(lessonId,question){return `${lessonId}::${lessonQuestionKey(question)}`}
function addDaysKey(days){const date=new Date();date.setDate(date.getDate()+days);return localDateKey(date)}
function recordReviewResult(lessonId,question,correct){
  const key=reviewKey(lessonId,question),previous=state.progress.reviewStats[key]||{attempts:0,correct:0,streak:0,lapses:0};
  const streak=correct?previous.streak+1:0,intervals=[1,3,7,14,30,60],intervalDays=correct?intervals[Math.min(streak-1,intervals.length-1)]:0;
  state.progress.reviewStats[key]={...previous,lessonId,glyph:question.glyph,prompt:question.prompt,answer:question.answer,attempts:previous.attempts+1,correct:previous.correct+(correct?1:0),streak,lapses:previous.lapses+(correct?0:1),lastSeen:localDateKey(),nextDue:addDaysKey(intervalDays),intervalDays};
  saveProgress();return state.progress.reviewStats[key];
}
function availableReviewItems(){
  return allCourseLessons().filter(item=>canOpenLesson(item.id)).flatMap(item=>(LESSONS[item.id]?.questions||[]).map(question=>({lessonId:item.id,lessonTitle:LESSONS[item.id].title,question,key:reviewKey(item.id,question)})));
}
function reviewPriority(item){const stats=state.progress.reviewStats[item.key],today=localDateKey();if(!stats)return 700+Math.random()*30;const accuracy=stats.attempts?stats.correct/stats.attempts:0,due=stats.nextDue<=today?500:0;return due+stats.lapses*120+(1-accuracy)*160-Math.min(stats.streak,5)*18+Math.random()*30}
function buildReviewSession(){
  const today=localDateKey();if(state.progress.dailyReview.date!==today)state.progress.dailyReview={date:today,completed:0,correct:0};
  const ranked=availableReviewItems().sort((a,b)=>reviewPriority(b)-reviewPriority(a));
  const chosen=ranked.slice(0,10);if(chosen.length>1&&chosen[0].key===state.lastReviewKey){const replacement=chosen.findIndex((item,index)=>index>0&&item.key!==state.lastReviewKey);if(replacement>0)[chosen[0],chosen[replacement]]=[chosen[replacement],chosen[0]]}
  state.reviewSession=chosen.map(item=>({...item,question:{...item.question,options:shuffle(item.question.options)}}));state.reviewIndex=0;state.reviewScore=0;state.reviewLocked=false;saveProgress();
}
function difficultReviewItems(){return Object.values(state.progress.reviewStats).filter(item=>item.lapses>0&&(item.streak<2||item.correct/item.attempts<.7)).sort((a,b)=>b.lapses-a.lapses||a.correct/a.attempts-b.correct/b.attempts).slice(0,5)}
function practiceModeBar(){const locked=state.reviewLocked||state.practiceLocked;return `<div class="practice-modes"><button class="filter-pill ${state.practiceMode==="review"?"active":""}" data-practice-mode="review" ${locked&&state.practiceMode!=="review"?"disabled":""}>Tagesrunde</button><button class="filter-pill ${state.practiceMode==="letters"?"active":""}" data-practice-mode="letters" ${locked&&state.practiceMode!=="letters"?"disabled":""}>Buchstaben-Schnelltest</button></div>`}
function bindPracticeModes(){document.querySelectorAll("[data-practice-mode]").forEach(button=>button.addEventListener("click",()=>{state.practiceMode=button.dataset.practiceMode;if(state.practiceMode==="review"&&!state.reviewSession.length)buildReviewSession();renderPractice()}))}
function renderPractice() {
  if(state.practiceMode==="letters"){renderLetterPractice();return}
  if(!state.reviewSession.length)buildReviewSession();
  const weak=difficultReviewItems(),total=state.reviewSession.length,item=state.reviewSession[state.reviewIndex];
  if(!item){main.innerHTML=`<div class="view"><header class="page-header"><div><p class="eyebrow">Intelligente Wiederholung</p><h1>Tagesrunde geschafft</h1><p>Deine nächsten Wiederholungen wurden automatisch eingeplant.</p></div></header>${practiceModeBar()}<div class="practice-grid"><section class="practice-card review-complete"><div class="complete-mark">✓</div><h2>${state.reviewScore} von ${total} richtig</h2><p>Schwierige Aufgaben kommen früher zurück. Sicher beherrschte Inhalte siehst du erst nach einem größeren Abstand wieder.</p><button class="primary-button" data-new-review>Neue adaptive Runde</button></section>${reviewSidebar(weak)}</div></div>`;bindPracticeModes();document.querySelector("[data-new-review]").addEventListener("click",()=>{state.reviewSession=[];buildReviewSession();renderPractice()});return}
  const q=item.question,stats=state.progress.reviewStats[item.key];state.lastReviewKey=item.key;
  main.innerHTML=`<div class="view"><header class="page-header"><div><p class="eyebrow">Intelligente Wiederholung</p><h1>Deine Tagesrunde</h1><p>Zehn Aufgaben · etwa 5–10 Minuten · angepasst an deinen Lernstand.</p></div><div class="overall-progress"><strong>${state.reviewIndex+1}/${total}</strong><span>heutige Aufgabe</span></div></header>${practiceModeBar()}<div class="practice-grid"><section class="practice-card"><div class="review-context"><span>${item.lessonTitle}</span><small>${stats?stats.lapses?"Wird verstärkt wiederholt":`Serie: ${stats.streak} richtig`:"Neue Aufgabe"}</small></div><div class="quiz-stage"><div class="quiz-glyph" lang="ar">${q.glyph}</div><p class="quiz-prompt">${q.prompt}</p><div class="answer-grid">${q.options.map(option=>`<button class="answer-button" data-review-answer="${option}">${option}</button>`).join("")}</div><div class="quiz-feedback" id="reviewFeedback" aria-live="polite"></div></div></section>${reviewSidebar(weak)}</div></div>`;
  bindPracticeModes();document.querySelectorAll("[data-review-answer]").forEach(button=>button.addEventListener("click",()=>answerReview(button)));
}
function reviewSidebar(weak){const reviewed=Object.keys(state.progress.reviewStats).length,due=Object.values(state.progress.reviewStats).filter(item=>item.nextDue<=localDateKey()).length;return `<aside class="stats-card"><p class="eyebrow">Dein Lernplan</p><h3>Automatisch eingeplant</h3><div class="stat-row"><span>Erfasste Aufgaben</span><strong>${reviewed}</strong></div><div class="stat-row"><span>Heute fällig</span><strong>${due}</strong></div><div class="stat-row"><span>Heute bearbeitet</span><strong>${state.progress.dailyReview.completed||0}</strong></div><div class="weak-list"><h4>Das fällt mir schwer</h4>${weak.length?weak.map(item=>`<div><span lang="ar">${item.glyph}</span><p>${item.prompt}<small>${item.lapses}× falsch · ${item.lessonId}</small></p></div>`).join(""):'<p class="muted">Noch keine schwierigen Aufgaben erkannt.</p>'}</div><div class="practice-tip">Richtig beantwortete Aufgaben erscheinen nach 1, 3, 7, 14, 30 und später 60 Tagen. Fehler werden früher wiederholt.</div></aside>`}
function answerReview(button){if(state.reviewLocked)return;state.reviewLocked=true;const modeSwitch=document.querySelector('[data-practice-mode="letters"]');if(modeSwitch)modeSwitch.disabled=true;const item=state.reviewSession[state.reviewIndex],q=item.question,correct=button.dataset.reviewAnswer===q.answer,stats=recordReviewResult(item.lessonId,q,correct);if(correct)state.reviewScore++;state.progress.dailyReview.completed++;if(correct)state.progress.dailyReview.correct++;saveProgress();button.classList.add(correct?"correct":"wrong");if(!correct)document.querySelectorAll("[data-review-answer]").forEach(candidate=>{if(candidate.dataset.reviewAnswer===q.answer)candidate.classList.add("correct")});document.querySelectorAll("[data-review-answer]").forEach(candidate=>candidate.disabled=true);const feedback=document.querySelector("#reviewFeedback");feedback.className=`quiz-feedback ${correct?"good":"bad"}`;feedback.innerHTML=`${correct?`Richtig. Nächste Wiederholung in ${stats.intervalDays} Tag${stats.intervalDays===1?"":"en"}.`:`Richtig ist <strong>${q.answer}</strong>. Diese Aufgabe wird früher wiederholt.`} <button class="text-button" data-review-next>Weiter →</button>`;document.querySelector("[data-review-next]").addEventListener("click",()=>{state.reviewIndex++;state.reviewLocked=false;renderPractice()})}
function renderLetterPractice(){
  if (!state.practiceQuestion) state.practiceQuestion=createPracticeQuestion();const q=state.practiceQuestion,accuracy=state.progress.quizTotal?Math.round(state.progress.quizCorrect/state.progress.quizTotal*100):0;
  main.innerHTML=`<div class="view"><header class="page-header"><div><p class="eyebrow">Wiederholen</p><h1>Buchstaben erkennen</h1><p>Kurze Abrufübungen festigen das Gelernte.</p></div></header>${practiceModeBar()}<div class="practice-grid"><section class="practice-card"><p class="eyebrow">Schnelltest</p><div class="quiz-stage"><div class="quiz-glyph" lang="ar">${q.answer.letter}</div><p class="quiz-prompt">Wie heißt dieser Buchstabe?</p><div class="answer-grid">${q.options.map(option=>`<button class="answer-button" data-practice-answer="${option.id}">${option.name}</button>`).join("")}</div><div class="quiz-feedback" id="practiceFeedback" aria-live="polite"></div></div></section><aside class="stats-card"><p class="eyebrow">Deine Übung</p><h3>Lernstatistik</h3><div class="stat-row"><span>Beantwortet</span><strong>${state.progress.quizTotal}</strong></div><div class="stat-row"><span>Richtig</span><strong>${state.progress.quizCorrect}</strong></div><div class="stat-row"><span>Trefferquote</span><strong>${accuracy}%</strong></div><div class="practice-tip">Sprich den Namen laut aus, bevor du eine Antwort auswählst.</div></aside></div></div>`;bindPracticeModes();document.querySelectorAll("[data-practice-answer]").forEach(button=>button.addEventListener("click",()=>answerPractice(button)));
}
function answerPractice(button) {
  if (state.practiceLocked) return; state.practiceLocked=true;
  const modeSwitch=document.querySelector('[data-practice-mode="review"]');if(modeSwitch)modeSwitch.disabled=true;
  const correct=button.dataset.practiceAnswer===state.practiceQuestion.answer.id;
  state.progress.quizTotal++; if(correct) state.progress.quizCorrect++;
  button.classList.add(correct?"correct":"wrong");
  if(!correct) document.querySelector(`[data-practice-answer="${state.practiceQuestion.answer.id}"]`).classList.add("correct");
  const feedback=document.querySelector("#practiceFeedback"); feedback.className=`quiz-feedback ${correct?"good":"bad"}`; feedback.innerHTML=correct?"Richtig – gut erkannt.":`Das ist <strong>${state.practiceQuestion.answer.name}</strong>. Achte auf Form und Punkte.`;
  saveProgress(); setTimeout(()=>{const old=state.practiceQuestion.answer.id;state.practiceQuestion=createPracticeQuestion(old);state.practiceLocked=false;renderPractice()},900);
}

function openLesson(id) {
  if (!LESSONS[id] || !canOpenLesson(id)) return;
  state.lessonId=id;state.lessonStep=0;state.lessonQuizIndex=0;state.lessonQuizScore=0;state.lessonWritingLetterId=LESSONS[id].letters?.[0]||null;state.lessonWritingForm=0;state.lessonQuestions=prepareLessonQuestions(LESSONS[id],state.lastLessonQuestionById[id]);state.view="lesson";renderLesson();window.scrollTo({top:0,behavior:"smooth"});
}
function renderLesson() {
  const lesson=LESSONS[state.lessonId]; const slide=lesson.slides[state.lessonStep];
  document.querySelector("#topbarTitle").textContent="Lektion";document.querySelector("#topbarSubtitle").textContent=lesson.title;
  main.innerHTML=`<div class="view"><div class="lesson-top"><button class="back-link" data-go="path">→ &nbsp; Lernweg</button><span class="lesson-count">Schritt ${state.lessonStep+1} von ${lesson.slides.length}</span></div><div class="lesson-heading"><div><p class="eyebrow">${lesson.eyebrow}</p><h1>${lesson.title}</h1><p>Verstehen · Erkennen · Anwenden</p></div><button class="audio-pending" data-source-info>♪ Audio in fachlicher Prüfung</button></div><div class="lesson-stepper" role="tablist" style="grid-template-columns:repeat(${lesson.slides.length},1fr)">${lesson.slides.map((item,index)=>`<button class="lesson-tab ${index===state.lessonStep?"active":""}" role="tab" aria-selected="${index===state.lessonStep}" data-lesson-step="${index}">${index+1}. ${item.type==="writing"?"Schreiben":item.type==="quiz"?"Prüfen":index===0?"Verstehen":"Erkennen"}</button>`).join("")}</div><div class="lesson-content">${renderLessonSlide(lesson,slide)}</div></div>`;
  bindCommon();
  document.querySelector("[data-source-info]").addEventListener("click",()=>document.querySelector("#sourceDialog").showModal());
  document.querySelectorAll("[data-lesson-step]").forEach(button=>button.addEventListener("click",()=>{state.lessonStep=Number(button.dataset.lessonStep);renderLesson()}));
  document.querySelectorAll("[data-next-step]").forEach(button=>button.addEventListener("click",()=>{state.lessonStep=Number(button.dataset.nextStep);renderLesson();window.scrollTo({top:0,behavior:"smooth"})}));
  if(slide.type==="writing") setupWritingCanvas();
  if(slide.type==="quiz") bindLessonQuiz();
}

function renderLessonSlide(lesson,slide) {
  const actions=(back,next)=>`<div class="lesson-actions">${back>=0?`<button class="secondary-button" data-next-step="${back}">Zurück</button>`:"<span></span>"}${next<lesson.slides.length?`<button class="primary-button" data-next-step="${next}">Weiter &nbsp;←</button>`:""}</div>`;
  if(slide.type==="direction") return `<div class="learning-card direction-layout"><div class="direction-visual" dir="rtl"><span class="arrow">←</span><span class="arabic-line" lang="ar">العربية</span></div><div><p class="eyebrow">Das Grundprinzip</p><h2>${slide.title}</h2><p>${slide.body}</p><div class="tip"><span>i</span><p><strong>Merksatz:</strong> Beginne dort, wo eine deutsche Zeile endet.</p></div></div></div>${actions(-1,1)}`;
  if(slide.type==="letters") { const letters=lesson.letters.map(getLetter);return `<div class="learning-card letter-layout"><div class="letter-showcase ${letters.length===1?"single":""}">${letters.map(letter=>`<div class="showcase-item"><span class="arabic" lang="ar">${letter.letter}</span><strong>${letter.name}</strong><small>${letter.sound}</small></div>`).join("")}</div><div><p class="eyebrow">Neue Buchstaben</p><h2>${slide.title}</h2><p>${slide.body}</p><div class="tip"><span>i</span><p>Sieh zuerst die Gesamtform, dann Position und Anzahl der Punkte.</p></div></div></div>${actions(state.lessonStep-1,state.lessonStep+1)}`;}
  if(slide.type==="contrast") { const letters=lesson.letters.map(getLetter);return `<div class="learning-card"><p class="eyebrow">Genau hinsehen</p><h2>${slide.title}</h2><p>${slide.body}</p><div class="contrast-grid">${letters.map(letter=>`<div class="contrast-item"><span class="arabic" lang="ar">${letter.letter}</span><strong>${letter.name}</strong><small>${letter.note}</small></div>`).join("")}</div></div>${actions(state.lessonStep-1,state.lessonStep+1)}`;}
  if(slide.type==="concept") return `<div class="learning-card concept-card"><p class="eyebrow">Lernziel</p><h2>${slide.title}</h2><p>${slide.body}</p><ul class="concept-points">${(slide.points||[]).map(point=>`<li>${point}</li>`).join("")}</ul>${lesson.review?'<div class="review-note"><strong>Fachhinweis</strong><span>Diese Aussprache- oder Tajwīd-Lektion wird vor der Veröffentlichung zusätzlich durch eine qualifizierte Lehrperson geprüft.</span></div>':""}</div>${actions(-1,1)}`;
  if(slide.type==="examples") return `<div class="learning-card"><p class="eyebrow">Beispiele</p><h2>${slide.title}</h2><p>${slide.body}</p><div class="lesson-examples">${(slide.examples||[]).map(example=>`<div class="lesson-example"><span class="arabic" lang="ar" dir="rtl">${example.arabic}</span><strong>${example.label}</strong>${example.note?`<small>${example.note}</small>`:""}</div>`).join("")}</div>${slide.source?`<p class="source-credit">Quelle des unveränderten Korantexts: ${slide.source}</p>`:""}</div>${actions(0,2)}`;
  if(slide.type==="writing") {const letters=(lesson.letters||[]).map(getLetter).filter(Boolean),selected=letters.find(letter=>letter.id===state.lessonWritingLetterId)||letters[0],labels=["Allein","Am Ende","In der Mitte","Am Anfang"],forms=selected.forms.map((form,index)=>({form,index,label:labels[index]})).filter(item=>item.form!=="—");if(!forms.some(item=>item.index===state.lessonWritingForm))state.lessonWritingForm=forms[0].index;const activeForm=selected.forms[state.lessonWritingForm];return `<div class="writing-layout"><div class="writing-instructions"><p class="eyebrow">Schreibübung · alle neuen Buchstaben</p><h2>${slide.title}</h2><p>${slide.body}</p><div class="lesson-letter-picker">${letters.map(letter=>`<button class="lesson-letter-choice ${letter.id===selected.id?"active":""}" data-lesson-writing-letter="${letter.id}"><span lang="ar">${letter.letter}</span><small>${letter.name}</small></button>`).join("")}</div><div class="writing-form-picker compact">${forms.map(item=>`<button class="writing-form ${item.index===state.lessonWritingForm?"active":""}" data-lesson-writing-form="${item.index}"><span lang="ar">${item.form}</span><small>${item.label}</small></button>`).join("")}</div><div class="tip"><span>✦</span><p>Übe jeden neuen Buchstaben erst mit Vorlage und danach frei. Wechsle oben zwischen den Buchstaben.</p></div></div><div class="writing-card"><div class="canvas-toolbar"><span>${selected.name} · ${labels[state.lessonWritingForm]}</span><div class="canvas-tools"><button class="canvas-mode ${state.writingGuide?"active":""}" data-writing-guide="true">Mit Vorlage</button><button class="canvas-mode ${state.writingGuide?"":"active"}" data-writing-guide="false">Ohne Vorlage</button><button class="text-button" id="clearCanvas">Neu beginnen</button></div></div><div class="canvas-wrap letter-canvas-wrap ${state.writingGuide?"":"free"}"><div class="letter-trace-guide ${state.writingGuide?"":"hidden"}" lang="ar">${activeForm}</div><canvas id="writingCanvas" aria-label="Schreibfläche für ${selected.name}"></canvas><div class="canvas-hint" id="canvasHint">${state.writingGuide?"Form nachfahren":`${selected.name} frei schreiben`}</div></div><button class="primary-button" id="checkWriting">Schrift prüfen</button><div class="writing-result" id="writingResult" role="status" aria-live="polite"></div></div></div>${actions(state.lessonStep-1,state.lessonStep+1)}`;}
  if(slide.type==="quiz") return renderLessonQuiz(lesson);
  return "";
}

function renderLessonQuiz(lesson) {
  const questions=state.lessonQuestions.length?state.lessonQuestions:(state.lessonQuestions=prepareLessonQuestions(lesson));
  if(state.lessonQuizIndex>=questions.length){const passed=state.lessonQuizScore>=Math.ceil(questions.length*.75);return `<div class="learning-card quiz-complete"><div class="complete-mark">${passed?"✓":"↻"}</div><p class="eyebrow">${passed?"Lektion geschafft":"Noch eine Runde"}</p><h2>${state.lessonQuizScore} von ${questions.length} richtig</h2><p>${passed?"Du hast das Lernziel erreicht. Die nächste Lektion ist freigeschaltet.":"Sieh dir Erklärung und Beispiele noch einmal an und versuche es erneut. Beim Neustart wird die Reihenfolge neu gemischt."}</p><button class="primary-button" data-quiz-finish="${passed?"complete":"retry"}">${passed?"Zum Lernweg":"Neu gemischt versuchen"}</button></div>`;}
  const q=questions[state.lessonQuizIndex];state.lastLessonQuestionById[state.lessonId]=lessonQuestionKey(q);return `<div class="learning-card lesson-quiz"><div class="quiz-progress"><span style="width:${state.lessonQuizIndex/questions.length*100}%"></span></div><p class="eyebrow">Frage ${state.lessonQuizIndex+1} von ${questions.length} · Reihenfolge gemischt</p><div class="lesson-question"><div class="quiz-glyph" lang="ar">${q.glyph}</div><h2>${q.prompt}</h2><div class="answer-grid">${q.options.map(option=>`<button class="answer-button" data-lesson-answer="${option}">${option}</button>`).join("")}</div><div class="quiz-feedback" id="lessonFeedback" aria-live="polite"></div></div></div><div class="lesson-actions"><button class="secondary-button" data-next-step="${Math.max(0,state.lessonStep-1)}">Zurück</button><span></span></div>`;
}
function bindLessonQuiz(){
  document.querySelectorAll("[data-lesson-answer]").forEach(button=>button.addEventListener("click",()=>{
    if(document.querySelector("[data-quiz-next]"))return;const q=state.lessonQuestions[state.lessonQuizIndex],correct=button.dataset.lessonAnswer===q.answer;
    recordReviewResult(state.lessonId,q,correct);
    if(correct)state.lessonQuizScore++;button.classList.add(correct?"correct":"wrong");if(!correct)document.querySelectorAll("[data-lesson-answer]").forEach(item=>{if(item.dataset.lessonAnswer===q.answer)item.classList.add("correct")});
    document.querySelectorAll("[data-lesson-answer]").forEach(item=>item.disabled=true);const feedback=document.querySelector("#lessonFeedback");feedback.className=`quiz-feedback ${correct?"good":"bad"}`;feedback.innerHTML=`${correct?"Richtig.":`Richtig ist <strong>${q.answer}</strong>.`} <button class="text-button" data-quiz-next>Weiter →</button>`;document.querySelector("[data-quiz-next]").addEventListener("click",()=>{state.lessonQuizIndex++;renderLesson()});
  }));
  const finish=document.querySelector("[data-quiz-finish]");if(finish)finish.addEventListener("click",()=>{if(finish.dataset.quizFinish==="complete"){completeLesson(state.lessonId);setView("path")}else{state.lessonQuizIndex=0;state.lessonQuizScore=0;state.lessonQuestions=prepareLessonQuestions(LESSONS[state.lessonId],state.lastLessonQuestionById[state.lessonId]);renderLesson()}});
}
function completeLesson(id){if(!state.progress.completed.includes(id))state.progress.completed.push(id);(LESSONS[id].letters||[]).forEach(letter=>{if(!state.progress.knownLetters.includes(letter))state.progress.knownLetters.push(letter)});saveProgress()}

let canvas,ctx;
function setupWritingCanvas(){
  canvas=document.querySelector("#writingCanvas");ctx=canvas.getContext("2d");state.strokes=[];state.activeStroke=null;state.penInUse=false;
  const resize=()=>{const rect=canvas.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);redrawCanvas()};
  requestAnimationFrame(resize);window.addEventListener("resize",resize,{once:true});
  const point=event=>{const rect=canvas.getBoundingClientRect();return{x:event.clientX-rect.left,y:event.clientY-rect.top,pressure:event.pressure||.5}};
  canvas.addEventListener("pointerdown",event=>{if(event.pointerType==="pen")state.penInUse=true;if(state.penInUse&&event.pointerType==="touch")return;canvas.setPointerCapture(event.pointerId);state.activeStroke=[point(event)];document.querySelector("#canvasHint").style.display="none";redrawCanvas()});
  canvas.addEventListener("pointermove",event=>{if(!state.activeStroke||state.penInUse&&event.pointerType==="touch")return;const events=event.getCoalescedEvents?event.getCoalescedEvents():[event];events.forEach(item=>state.activeStroke.push(point(item)));redrawCanvas()});
  const finish=event=>{if(!state.activeStroke||state.penInUse&&event.pointerType==="touch")return;state.activeStroke.push(point(event));state.strokes.push(state.activeStroke);state.activeStroke=null;redrawCanvas()};canvas.addEventListener("pointerup",finish);canvas.addEventListener("pointercancel",finish);
  document.querySelectorAll("[data-lesson-writing-letter]").forEach(button=>button.addEventListener("click",()=>{state.lessonWritingLetterId=button.dataset.lessonWritingLetter;state.lessonWritingForm=0;renderLesson()}));
  document.querySelectorAll("[data-lesson-writing-form]").forEach(button=>button.addEventListener("click",()=>{state.lessonWritingForm=Number(button.dataset.lessonWritingForm);renderLesson()}));
  document.querySelector("#clearCanvas").addEventListener("click",()=>{state.strokes=[];state.penInUse=false;document.querySelector("#canvasHint").style.display="block";document.querySelector("#writingResult").className="writing-result";redrawCanvas()});
  document.querySelectorAll("[data-writing-guide]").forEach(button=>button.addEventListener("click",()=>{state.writingGuide=button.dataset.writingGuide==="true";document.querySelectorAll("[data-writing-guide]").forEach(item=>item.classList.toggle("active",item===button));document.querySelector(".canvas-wrap").classList.toggle("free",!state.writingGuide);document.querySelector(".letter-trace-guide").classList.toggle("hidden",!state.writingGuide);const letter=getLetter(state.lessonWritingLetterId),hint=document.querySelector("#canvasHint");hint.textContent=state.writingGuide?"Form nachfahren":`${letter.name} frei schreiben`;hint.style.display=state.strokes.length?"none":"block";redrawCanvas()}));
  document.querySelector("#checkWriting").addEventListener("click",checkWriting);
}
function redrawCanvas(){if(!canvas||!ctx)return;const rect=canvas.getBoundingClientRect();ctx.clearRect(0,0,rect.width,rect.height);[...state.strokes,...(state.activeStroke?[state.activeStroke]:[])].forEach(drawStroke)}
function drawStroke(stroke){if(!stroke.length)return;ctx.save();ctx.strokeStyle="#17211f";ctx.lineWidth=9;ctx.lineCap="round";ctx.lineJoin="round";ctx.beginPath();ctx.moveTo(stroke[0].x,stroke[0].y);for(let i=1;i<stroke.length;i++){const a=stroke[i-1],b=stroke[i];ctx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2)}ctx.stroke();ctx.restore()}
function checkWriting(){const points=state.strokes.flat(),result=document.querySelector("#writingResult"),letter=getLetter(state.lessonWritingLetterId);if(points.length<8){result.className="writing-result visible try";result.textContent="Schreibe die Buchstabenform zuerst vollständig.";return}const rect=canvas.getBoundingClientRect(),xs=points.map(p=>p.x),ys=points.map(p=>p.y),h=Math.max(...ys)-Math.min(...ys),w=Math.max(...xs)-Math.min(...xs),extent=Math.max(h/rect.height,w/rect.width),score=Math.min(100,Math.round(45+extent*70+Math.min(state.strokes.length,3)*5)),passed=extent>.18;result.className=`writing-result visible ${passed?"good":"try"}`;result.innerHTML=`<strong>${passed?"Gut geübt":"Noch etwas größer"} · ${score}%</strong><br>${passed?`Die Schreibbewegung für ${letter.name} ist gut erkennbar. Vergleiche die genaue Form noch einmal mit der Vorlage.`:"Nutze mehr von der Schreibfläche und zeichne die vollständige Form."}`;if(passed){setTimeout(()=>{const next=document.createElement("button");next.className="primary-button";next.style.marginTop="10px";next.textContent="Weiter zur Lernkontrolle";next.addEventListener("click",()=>{state.lessonStep=Math.min(state.lessonStep+1,LESSONS[state.lessonId].slides.length-1);state.lessonQuizIndex=0;state.lessonQuizScore=0;state.lessonQuestions=prepareLessonQuestions(LESSONS[state.lessonId],state.lastLessonQuestionById[state.lessonId]);renderLesson()});result.appendChild(next)},300)}}

function bindCommon(){document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",()=>setView(button.dataset.go)));document.querySelectorAll("[data-open-lesson]").forEach(button=>button.addEventListener("click",()=>openLesson(button.dataset.openLesson)))}
document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>setView(button.dataset.view)));
document.querySelector("#installButton").addEventListener("click",()=>document.querySelector("#installDialog").showModal());
document.querySelector("#sourceButton").addEventListener("click",()=>document.querySelector("#sourceDialog").showModal());
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>document.querySelector(`#${button.dataset.close}`).close()));
document.querySelectorAll("dialog").forEach(dialog=>dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()}));
document.querySelector("#streakValue").textContent=state.progress.streak;
if(PREVIEW_ALL)setView("path");else renderHome();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js"));
