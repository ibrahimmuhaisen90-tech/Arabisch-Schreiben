const fs = require("node:fs");
const vm = require("node:vm");

const context = {};
vm.createContext(context);
const source = ["content.js", "curriculum.js"]
  .map(file => fs.readFileSync(file, "utf8"))
  .join("\n") + "\n;globalThis.__COURSE__={ALPHABET,WORD_PRACTICE,LESSONS};";
vm.runInContext(source, context);

const { ALPHABET, WORD_PRACTICE, LESSONS } = context.__COURSE__;
const errors = [];
const bannedPrompts = [
  "Stimmt diese Zuordnung",
  "Wie führst du den Strich",
  "Welche Aussage gehört zu dieser Lektion"
];

if (ALPHABET.length !== 28) errors.push(`Alphabet: ${ALPHABET.length} statt 28 Buchstaben.`);
if (Object.keys(LESSONS).length !== 31) errors.push(`Kurs: ${Object.keys(LESSONS).length} statt 31 Lektionen.`);

const indexHtml = fs.readFileSync("index.html", "utf8");
const serviceWorker = fs.readFileSync("service-worker.js", "utf8");
for (const asset of ["styles.css", "content.js", "curriculum.js", "app.js"]) {
  const versionedAsset = indexHtml.match(new RegExp(`${asset.replace(".", "\\.")}\\?v=\\d+`))?.[0];
  if (!versionedAsset || !serviceWorker.includes(versionedAsset)) {
    errors.push(`Offline-Cache: ${asset} stimmt nicht mit index.html überein.`);
  }
}

for (const [lessonId, lesson] of Object.entries(LESSONS)) {
  if (lesson.questions.length !== 10) {
    errors.push(`${lessonId}: ${lesson.questions.length} statt 10 Aufgaben.`);
  }

  const seen = new Set();
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
    if (question.glyph === "✓") errors.push(`${location}: abstraktes Häkchen statt Lerninhalt.`);
  });

  if ((lesson.letters || []).length && !lesson.slides.some(slide => slide.type === "writing")) {
    errors.push(`${lessonId}: Schreibübung fehlt.`);
  }
}

const letterIds = new Set(ALPHABET.map(letter => letter.id));
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
