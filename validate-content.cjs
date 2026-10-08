const fs = require("node:fs");
const vm = require("node:vm");

const context = {};
vm.createContext(context);
const source = ["content.js", "curriculum.js"]
  .map(file => fs.readFileSync(file, "utf8"))
  .join("\n") + "\n;globalThis.__COURSE__={ALPHABET,WORD_PRACTICE,LESSONS,COURSE_MODULES};";
vm.runInContext(source, context);

const { ALPHABET, WORD_PRACTICE, LESSONS, COURSE_MODULES } = context.__COURSE__;
const errors = [];
const bannedPrompts = [
  "Stimmt diese Zuordnung",
  "Wie führst du den Strich",
  "Welche Aussage gehört zu dieser Lektion",
  "Welche Grundform beschreibt",
  "Welche Beschreibung passt",
  "Zu welcher Lektion gehört",
  "Welches Schriftbild gehört zu dieser Bezeichnung",
  "mit dem folgenden Buchstaben links"
];

if (ALPHABET.length !== 28) errors.push(`Alphabet: ${ALPHABET.length} statt 28 Buchstaben.`);
if (Object.keys(LESSONS).length !== 31) errors.push(`Kurs: ${Object.keys(LESSONS).length} statt 31 Lektionen.`);

const indexHtml = fs.readFileSync("index.html", "utf8");
const serviceWorker = fs.readFileSync("service-worker.js", "utf8");
const appSource = fs.readFileSync("app.js", "utf8");
const stylesSource = fs.readFileSync("styles.css", "utf8");
for (const asset of ["styles.css", "content.js", "curriculum.js", "app.js"]) {
  const versionedAsset = indexHtml.match(new RegExp(`${asset.replace(".", "\\.")}\\?v=\\d+`))?.[0];
  if (!versionedAsset || !serviceWorker.includes(versionedAsset)) {
    errors.push(`Offline-Cache: ${asset} stimmt nicht mit index.html überein.`);
  }
}
if (!serviceWorker.includes('event.request.mode === "navigate"') || !serviceWorker.includes('cache:"no-store"')) {
  errors.push("App-Update: Navigation verwendet nicht die aktuelle Online-Version.");
}
if (!serviceWorker.includes("client.navigate(client.url)") || !appSource.includes('updateViaCache:"none"')) {
  errors.push("App-Update: automatische Aktivierung ist unvollständig.");
}
if (appSource.includes("window.open(url.toString()") || !appSource.includes("window.location.assign(url.toString())")) {
  errors.push("Feedback: GitHub-Weiterleitung kann im App-Modus blockiert werden.");
}
if (!appSource.includes("spreadLessonQuestions") || !appSource.includes("question.exercise||\"Erkennen\"")) {
  errors.push("Aufgabenfolge: Kompetenzarten werden nicht abwechslungsreich verteilt.");
}
for (const requiredMobileRule of ["@media(max-width:480px)","env(safe-area-inset-bottom)","100dvh","orientation:landscape","font-size:16px"]) {
  if (!stylesSource.includes(requiredMobileRule)) errors.push(`iPhone-Layout: Regel ${requiredMobileRule} fehlt.`);
}

for (const [lessonId, lesson] of Object.entries(LESSONS)) {
  if (lesson.questions.length !== 10) {
    errors.push(`${lessonId}: ${lesson.questions.length} statt 10 Aufgaben.`);
  }

  const seen = new Set();
  const exerciseTypes = new Set();
  const answerCounts = new Map();
  lesson.questions.forEach((question, index) => {
    const location = `${lessonId}, Aufgabe ${index + 1}`;
    const key = `${question.glyph}|${question.prompt}|${question.answer}`;
    if (seen.has(key)) errors.push(`${location}: doppelte Aufgabe.`);
    seen.add(key);

    const uniqueOptions = new Set(question.options);
    if (uniqueOptions.size !== question.options.length) errors.push(`${location}: doppelte Antwortoption.`);
    if (question.options.length !== 3) errors.push(`${location}: benötigt genau drei Optionen.`);
    if (!uniqueOptions.has(question.answer)) errors.push(`${location}: richtige Antwort fehlt.`);
    if (question.options.filter(option => option === question.answer).length !== 1) {
      errors.push(`${location}: richtige Antwort ist nicht eindeutig.`);
    }
    if (bannedPrompts.some(text => question.prompt.includes(text))) {
      errors.push(`${location}: unerwünschter Fragetyp „${question.prompt}“.`);
    }
    if (!question.exercise) errors.push(`${location}: praktische Kompetenzangabe fehlt.`);
    else exerciseTypes.add(question.exercise);
    answerCounts.set(question.answer,(answerCounts.get(question.answer)||0)+1);
    if (question.prompt.length > 90) errors.push(`${location}: Frage ist zu lang und sollte vereinfacht werden.`);
    if (question.glyph === "✓") errors.push(`${location}: abstraktes Häkchen statt Lerninhalt.`);
  });

  if (exerciseTypes.size < 2) errors.push(`${lessonId}: Aufgaben prüfen zu wenig unterschiedliche Kompetenzen.`);
  const dominantAnswer=[...answerCounts.entries()].sort((a,b)=>b[1]-a[1])[0];
  if (dominantAnswer?.[1] > 4) errors.push(`${lessonId}: Antwort „${dominantAnswer[0]}“ ist mit ${dominantAnswer[1]} von 10 Aufgaben zu dominant.`);

  if ((lesson.letters || []).length && !lesson.slides.some(slide => slide.type === "writing")) {
    errors.push(`${lessonId}: Schreibübung fehlt.`);
  }
}

const firstLessonText=JSON.stringify(LESSONS["rtl-alif"].questions);
for (const letter of ALPHABET.slice(1)) {
  if (firstLessonText.includes(letter.name)) errors.push(`rtl-alif: setzt den noch unbekannten Namen ${letter.name} voraus.`);
}
for (const laterConcept of ["Fatḥa","Kasra","Ḍamma","Hamza","Sukūn","Shadda","Tanwīn","Madd"]) {
  if (firstLessonText.includes(laterConcept)) errors.push(`rtl-alif: setzt ${laterConcept} zu früh voraus.`);
}

const scriptLessons=COURSE_MODULES.find(module=>module.id==="script").lessons;
const introducedNames=new Set();
for (const item of scriptLessons) {
  const lesson=LESSONS[item.id];
  (lesson.letters||[]).forEach(id=>introducedNames.add(ALPHABET.find(letter=>letter.id===id)?.name));
  const lessonText=JSON.stringify(lesson.questions);
  for (const letter of ALPHABET) {
    if (!introducedNames.has(letter.name)&&lessonText.includes(letter.name)) {
      errors.push(`${item.id}: setzt den späteren Buchstabennamen ${letter.name} voraus.`);
    }
  }
}

const letterIds = new Set(ALPHABET.map(letter => letter.id));
const taughtLetterIds = new Set(Object.values(LESSONS).flatMap(lesson => lesson.letters || []));
for (const letter of ALPHABET) {
  if (!taughtLetterIds.has(letter.id)) errors.push(`${letter.name}: fehlt im Schriftkurs.`);
  const teachingLesson = Object.values(LESSONS).find(lesson => (lesson.letters || []).includes(letter.id));
  if (teachingLesson && !teachingLesson.questions.some(question => question.answer === letter.name || (letter.id==="alif"&&question.answer===letter.letter))) {
    errors.push(`${letter.name}: keine Erkennungsaufgabe in seiner Schriftlektion.`);
  }
}
for (const word of WORD_PRACTICE) {
  for (const letterId of word.letters) {
    if (!letterIds.has(letterId)) errors.push(`${word.word}: unbekannter Buchstabe ${letterId}.`);
  }
  if (!word.choices.includes(word.reading)) errors.push(`${word.word}: richtige Lesung fehlt in der Auswahl.`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Inhaltsprüfung bestanden: ${Object.keys(LESSONS).length} Lektionen, 10 eindeutige Aufgaben je Lektion, ${ALPHABET.length} Buchstaben.`);
}
