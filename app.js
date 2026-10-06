const STORAGE_KEY = "arabisch-schreiben.progress-v2";
const main = document.querySelector("#appMain");

function loadProgress() {
  const fallback = { completed: [], knownLetters: [], quizCorrect: 0, quizTotal: 0, streak: 1, lastVisit: "" };
  try { return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return fallback; }
}

const state = {
  view: "home", lessonId: null, lessonStep: 0, lessonQuizIndex: 0, lessonQuizScore: 0,
  alphabetFilter: "all", alphabetQuery: "", practiceQuestion: null, practiceLocked: false,
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
function availableLessons() { return COURSE_MODULES[0].lessons.filter(item => item.available); }
function canOpenLesson(id) {
  const index = availableLessons().findIndex(item => item.id === id);
  return index === 0 || isComplete(availableLessons()[index - 1].id) || isComplete(id);
}
function nextLesson() { return availableLessons().find(item => !isComplete(item.id)) || availableLessons()[availableLessons().length - 1]; }
function getLetter(id) { return ALPHABET.find(letter => letter.id === id); }

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
      <div class="next-card"><div class="lesson-glyph">${next.id==="rtl-alif"?"ا":next.id==="dots"?"بت":"جح"}</div><div><h3>${next.title}</h3><p>${next.meta} · Schriftbasis</p></div><button class="primary-button" data-open-lesson="${next.id}">Lektion öffnen</button></div>
    </section>
    <section class="section-block"><div class="section-heading"><div><p class="eyebrow">Der Weg zum Ziel</p><h2>Sechs klare Etappen</h2><p>Neue Regeln bauen immer auf bereits Gelerntem auf.</p></div><button class="text-button" data-go="path">Alle anzeigen →</button></div>
      <div class="roadmap-preview">${COURSE_MODULES.slice(0,6).map((module,index)=>`<div class="stage-card ${index===0?"active":""}"><small>${module.number}</small><strong>${module.title}</strong><p>${module.description}</p></div>`).join("")}</div>
    </section>
    <div class="audio-notice"><span>♪</span><div><strong>Authentisches Audio wird vorbereitet</strong><p>Buchstabenaufnahmen und Rezitationen werden erst nach fachlicher und rechtlicher Prüfung freigeschaltet – keine ungeprüfte KI-Rezitation.</p></div></div>
  </div>`;
  bindCommon();
}

function renderPath() {
  main.innerHTML = `<div class="view"><header class="page-header"><div><p class="eyebrow">Curriculum</p><h1>Dein Lernweg</h1><p>Von null Vorkenntnissen bis zur begleiteten Koranlektüre.</p></div><div class="overall-progress"><strong>${coursePercent()}%</strong><span>${completedCount()} von ${totalLessons()} Lektionen</span></div></header>
    <div class="module-list">${COURSE_MODULES.map((module,index)=>`<section class="module-card ${index===0?"open":""}" data-tone="${module.tone}"><button class="module-summary" data-module="${module.id}"><span class="module-number">${module.number}</span><span><h2>${module.title}</h2><p>${module.description}</p></span><span class="module-meta"><strong>${module.lessons.length} Lektionen</strong><span>${index===0?"Begonnen":"Noch gesperrt"}</span></span></button><div class="module-lessons">${module.lessons.map((lesson,lessonIndex)=>{
      const openable = index===0 && lesson.available && canOpenLesson(lesson.id); const done = lesson.id && isComplete(lesson.id);
      return `<button class="path-lesson ${openable?"available":"locked"} ${done?"done":""}" ${openable?`data-open-lesson="${lesson.id}"`:"disabled"}><span class="path-state">${done?"✓":String(lessonIndex+1).padStart(2,"0")}</span><span><strong>${lesson.title}</strong><small>${lesson.meta}</small></span><span>${openable?"→":"⌁"}</span></button>`;}).join("")}</div></section>`).join("")}</div>
  </div>`;
  bindCommon();
  document.querySelectorAll("[data-module]").forEach(button => button.addEventListener("click",()=>button.closest(".module-card").classList.toggle("open")));
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
  document.querySelector("#letterDialogContent").innerHTML=`<div class="letter-head"><p class="eyebrow">${letter.family}</p><span class="arabic" lang="ar">${letter.letter}</span><h2>${letter.name}</h2><p>${letter.sound}</p></div><div class="forms-table">${letter.forms.map((form,index)=>`<div class="form-cell"><span lang="ar">${form}</span><small>${labels[index]}</small></div>`).join("")}</div><p class="letter-note">${letter.note}</p><button class="audio-disabled" data-audio-info>♪ &nbsp; Audio nach Quellenprüfung</button>`;
  document.querySelector("#letterDialog").showModal();
  document.querySelector("[data-audio-info]").addEventListener("click",()=>{document.querySelector("#letterDialog").close();document.querySelector("#sourceDialog").showModal()});
}

function practicePool() {
  if (isComplete("bowls")) return ALPHABET.slice(0,7);
  if (isComplete("dots") || isComplete("rtl-alif")) return ALPHABET.slice(0,4);
  return ALPHABET.slice(0,4);
}
function randomItem(items) { return items[Math.floor(Math.random()*items.length)]; }
function createPracticeQuestion(previousId) {
  const pool=practicePool(); let answer=randomItem(pool);
  if (pool.length>1) while(answer.id===previousId) answer=randomItem(pool);
  const distractors=ALPHABET.filter(item=>item.id!==answer.id).sort(()=>Math.random()-.5).slice(0,3);
  return {answer,options:[answer,...distractors].sort(()=>Math.random()-.5)};
}
function renderPractice() {
  if (!state.practiceQuestion) state.practiceQuestion=createPracticeQuestion();
  const q=state.practiceQuestion; const accuracy=state.progress.quizTotal?Math.round(state.progress.quizCorrect/state.progress.quizTotal*100):0;
  main.innerHTML=`<div class="view"><header class="page-header"><div><p class="eyebrow">Wiederholen</p><h1>Buchstaben erkennen</h1><p>Kurze Abrufübungen festigen das Gelernte.</p></div></header><div class="practice-grid"><section class="practice-card"><p class="eyebrow">Schnelltest</p><div class="quiz-stage"><div class="quiz-glyph" lang="ar">${q.answer.letter}</div><p class="quiz-prompt">Wie heißt dieser Buchstabe?</p><div class="answer-grid">${q.options.map(option=>`<button class="answer-button" data-practice-answer="${option.id}">${option.name}</button>`).join("")}</div><div class="quiz-feedback" id="practiceFeedback" aria-live="polite"></div></div></section><aside class="stats-card"><p class="eyebrow">Deine Übung</p><h3>Lernstatistik</h3><div class="stat-row"><span>Beantwortet</span><strong>${state.progress.quizTotal}</strong></div><div class="stat-row"><span>Richtig</span><strong>${state.progress.quizCorrect}</strong></div><div class="stat-row"><span>Trefferquote</span><strong>${accuracy}%</strong></div><div class="practice-tip">Sprich den Namen laut aus, bevor du eine Antwort auswählst. Das verbindet Form, Laut und Erinnerung.</div></aside></div></div>`;
  document.querySelectorAll("[data-practice-answer]").forEach(button=>button.addEventListener("click",()=>answerPractice(button)));
}
function answerPractice(button) {
  if (state.practiceLocked) return; state.practiceLocked=true;
  const correct=button.dataset.practiceAnswer===state.practiceQuestion.answer.id;
  state.progress.quizTotal++; if(correct) state.progress.quizCorrect++;
  button.classList.add(correct?"correct":"wrong");
  if(!correct) document.querySelector(`[data-practice-answer="${state.practiceQuestion.answer.id}"]`).classList.add("correct");
  const feedback=document.querySelector("#practiceFeedback"); feedback.className=`quiz-feedback ${correct?"good":"bad"}`; feedback.innerHTML=correct?"Richtig – gut erkannt.":`Das ist <strong>${state.practiceQuestion.answer.name}</strong>. Achte auf Form und Punkte.`;
  saveProgress(); setTimeout(()=>{const old=state.practiceQuestion.answer.id;state.practiceQuestion=createPracticeQuestion(old);state.practiceLocked=false;renderPractice()},900);
}

function openLesson(id) {
  if (!LESSONS[id] || !canOpenLesson(id)) return;
  state.lessonId=id;state.lessonStep=0;state.lessonQuizIndex=0;state.lessonQuizScore=0;state.view="lesson";renderLesson();window.scrollTo({top:0,behavior:"smooth"});
}
function renderLesson() {
  const lesson=LESSONS[state.lessonId]; const slide=lesson.slides[state.lessonStep];
  document.querySelector("#topbarTitle").textContent="Lektion";document.querySelector("#topbarSubtitle").textContent=lesson.title;
  main.innerHTML=`<div class="view"><div class="lesson-top"><button class="back-link" data-go="path">→ &nbsp; Lernweg</button><span class="lesson-count">Schritt ${state.lessonStep+1} von ${lesson.slides.length}</span></div><div class="lesson-heading"><div><p class="eyebrow">${lesson.eyebrow}</p><h1>${lesson.title}</h1><p>Verstehen · Erkennen · Anwenden</p></div><button class="audio-pending" data-source-info>♪ Audio in fachlicher Prüfung</button></div><div class="lesson-stepper" role="tablist">${lesson.slides.map((item,index)=>`<button class="lesson-tab ${index===state.lessonStep?"active":""}" role="tab" aria-selected="${index===state.lessonStep}" data-lesson-step="${index}">${index+1}. ${item.type==="writing"||item.type==="quiz"?"Anwenden":index===0?"Verstehen":"Erkennen"}</button>`).join("")}</div><div class="lesson-content">${renderLessonSlide(lesson,slide)}</div></div>`;
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
  if(slide.type==="writing") return `<div class="writing-layout"><div class="writing-instructions"><p class="eyebrow">Schreibübung</p><h2>${slide.title}</h2><p>${slide.body}</p><ol><li>Setze oben am Punkt an.</li><li>Ziehe ruhig nach unten.</li><li>Tippe anschließend auf „Prüfen“.</li></ol><div class="tip"><span>✦</span><p>Kleine Abweichungen sind normal. Entscheidend ist eine klare, aufrechte Form.</p></div></div><div class="writing-card"><div class="canvas-toolbar"><span>Schreibfläche</span><button class="text-button" id="clearCanvas">Neu beginnen</button></div><div class="canvas-wrap"><canvas id="writingCanvas" aria-label="Schreibfläche für Alif"></canvas><div class="canvas-hint" id="canvasHint">Hier schreiben</div></div><button class="primary-button" id="checkWriting">Schrift prüfen</button><div class="writing-result" id="writingResult" role="status" aria-live="polite"></div></div></div>${actions(1,3)}`;
  if(slide.type==="quiz") return renderLessonQuiz(lesson);
  return "";
}

function renderLessonQuiz(lesson) {
  if(state.lessonQuizIndex>=lesson.questions.length){const passed=state.lessonQuizScore>=Math.ceil(lesson.questions.length*.75);return `<div class="learning-card quiz-complete"><div class="complete-mark">${passed?"✓":"↻"}</div><p class="eyebrow">${passed?"Lektion geschafft":"Noch eine Runde"}</p><h2>${state.lessonQuizScore} von ${lesson.questions.length} richtig</h2><p>${passed?"Du kannst die Formen sicher unterscheiden. Die nächste Lektion ist freigeschaltet.":"Wiederhole die Formen kurz und versuche es erneut."}</p><button class="primary-button" data-quiz-finish="${passed?"complete":"retry"}">${passed?"Zum Lernweg":"Erneut versuchen"}</button></div>`;}
  const q=lesson.questions[state.lessonQuizIndex];return `<div class="learning-card lesson-quiz"><div class="quiz-progress"><span style="width:${state.lessonQuizIndex/lesson.questions.length*100}%"></span></div><p class="eyebrow">Frage ${state.lessonQuizIndex+1} von ${lesson.questions.length}</p><div class="lesson-question"><div class="quiz-glyph" lang="ar">${q.glyph}</div><h2>${q.prompt}</h2><div class="answer-grid">${q.options.map(option=>`<button class="answer-button" data-lesson-answer="${option}">${option}</button>`).join("")}</div><div class="quiz-feedback" id="lessonFeedback" aria-live="polite"></div></div></div><div class="lesson-actions"><button class="secondary-button" data-next-step="1">Zurück</button><span></span></div>`;
}
function bindLessonQuiz(){
  document.querySelectorAll("[data-lesson-answer]").forEach(button=>button.addEventListener("click",()=>{
    if(document.querySelector("[data-quiz-next]"))return;const lesson=LESSONS[state.lessonId],q=lesson.questions[state.lessonQuizIndex],correct=button.dataset.lessonAnswer===q.answer;
    if(correct)state.lessonQuizScore++;button.classList.add(correct?"correct":"wrong");if(!correct)document.querySelectorAll("[data-lesson-answer]").forEach(item=>{if(item.dataset.lessonAnswer===q.answer)item.classList.add("correct")});
    document.querySelectorAll("[data-lesson-answer]").forEach(item=>item.disabled=true);const feedback=document.querySelector("#lessonFeedback");feedback.className=`quiz-feedback ${correct?"good":"bad"}`;feedback.innerHTML=`${correct?"Richtig.":`Richtig ist <strong>${q.answer}</strong>.`} <button class="text-button" data-quiz-next>Weiter →</button>`;document.querySelector("[data-quiz-next]").addEventListener("click",()=>{state.lessonQuizIndex++;renderLesson()});
  }));
  const finish=document.querySelector("[data-quiz-finish]");if(finish)finish.addEventListener("click",()=>{if(finish.dataset.quizFinish==="complete"){completeLesson(state.lessonId);setView("path")}else{state.lessonQuizIndex=0;state.lessonQuizScore=0;renderLesson()}});
}
function completeLesson(id){if(!state.progress.completed.includes(id))state.progress.completed.push(id);LESSONS[id].letters.forEach(letter=>{if(!state.progress.knownLetters.includes(letter))state.progress.knownLetters.push(letter)});saveProgress()}

let canvas,ctx;
function setupWritingCanvas(){
  canvas=document.querySelector("#writingCanvas");ctx=canvas.getContext("2d");state.strokes=[];state.activeStroke=null;state.penInUse=false;
  const resize=()=>{const rect=canvas.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);redrawCanvas()};
  requestAnimationFrame(resize);window.addEventListener("resize",resize,{once:true});
  const point=event=>{const rect=canvas.getBoundingClientRect();return{x:event.clientX-rect.left,y:event.clientY-rect.top,pressure:event.pressure||.5}};
  canvas.addEventListener("pointerdown",event=>{if(event.pointerType==="pen")state.penInUse=true;if(state.penInUse&&event.pointerType==="touch")return;canvas.setPointerCapture(event.pointerId);state.activeStroke=[point(event)];document.querySelector("#canvasHint").style.display="none";redrawCanvas()});
  canvas.addEventListener("pointermove",event=>{if(!state.activeStroke||state.penInUse&&event.pointerType==="touch")return;const events=event.getCoalescedEvents?event.getCoalescedEvents():[event];events.forEach(item=>state.activeStroke.push(point(item)));redrawCanvas()});
  const finish=event=>{if(!state.activeStroke||state.penInUse&&event.pointerType==="touch")return;state.activeStroke.push(point(event));state.strokes.push(state.activeStroke);state.activeStroke=null;redrawCanvas()};canvas.addEventListener("pointerup",finish);canvas.addEventListener("pointercancel",finish);
  document.querySelector("#clearCanvas").addEventListener("click",()=>{state.strokes=[];state.penInUse=false;document.querySelector("#canvasHint").style.display="block";document.querySelector("#writingResult").className="writing-result";redrawCanvas()});
  document.querySelector("#checkWriting").addEventListener("click",checkWriting);
}
function redrawCanvas(){if(!canvas||!ctx)return;const rect=canvas.getBoundingClientRect();ctx.clearRect(0,0,rect.width,rect.height);const x=rect.width/2;ctx.save();ctx.strokeStyle="rgba(43,130,121,.25)";ctx.lineWidth=18;ctx.lineCap="round";ctx.setLineDash([4,12]);ctx.beginPath();ctx.moveTo(x,rect.height*.18);ctx.lineTo(x,rect.height*.8);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="#2b8279";ctx.beginPath();ctx.arc(x,rect.height*.18,6,0,Math.PI*2);ctx.fill();ctx.restore();[...state.strokes,...(state.activeStroke?[state.activeStroke]:[])].forEach(drawStroke)}
function drawStroke(stroke){if(!stroke.length)return;ctx.save();ctx.strokeStyle="#17211f";ctx.lineWidth=9;ctx.lineCap="round";ctx.lineJoin="round";ctx.beginPath();ctx.moveTo(stroke[0].x,stroke[0].y);for(let i=1;i<stroke.length;i++){const a=stroke[i-1],b=stroke[i];ctx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2)}ctx.stroke();ctx.restore()}
function checkWriting(){const points=state.strokes.flat(),result=document.querySelector("#writingResult");if(points.length<8){result.className="writing-result visible try";result.textContent="Schreibe zuerst einen vollständigen Strich.";return}const rect=canvas.getBoundingClientRect(),xs=points.map(p=>p.x),ys=points.map(p=>p.y),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys),h=maxY-minY,w=maxX-minX,center=(minX+maxX)/2;const score=Math.round((Math.min(1,h/(rect.height*.55))*.35+Math.max(0,1-w/(rect.width*.28))*.3+Math.max(0,1-Math.abs(center-rect.width/2)/(rect.width*.35))*.25+(state.strokes.length===1?1:.5)*.1)*100),passed=score>=68;result.className=`writing-result visible ${passed?"good":"try"}`;result.innerHTML=`<strong>${passed?"Sehr gut":"Fast geschafft"} · ${score}%</strong><br>${passed?"Dein Alif ist klar, lang und aufrecht.":h<rect.height*.35?"Der Strich darf noch länger werden.":"Führe den Strich gerader an der Vorlage entlang."}`;if(passed){completeLesson("rtl-alif");setTimeout(()=>{const next=document.createElement("button");next.className="primary-button";next.style.marginTop="10px";next.textContent="Lektion 2 öffnen";next.addEventListener("click",()=>openLesson("dots"));result.appendChild(next)},300)}}

function bindCommon(){document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",()=>setView(button.dataset.go)));document.querySelectorAll("[data-open-lesson]").forEach(button=>button.addEventListener("click",()=>openLesson(button.dataset.openLesson)))}
document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>setView(button.dataset.view)));
document.querySelector("#installButton").addEventListener("click",()=>document.querySelector("#installDialog").showModal());
document.querySelector("#sourceButton").addEventListener("click",()=>document.querySelector("#sourceDialog").showModal());
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>document.querySelector(`#${button.dataset.close}`).close()));
document.querySelectorAll("dialog").forEach(dialog=>dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()}));
document.querySelector("#streakValue").textContent=state.progress.streak;
renderHome();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js"));
