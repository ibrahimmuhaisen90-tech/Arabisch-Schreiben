# Arabisch Schreiben

<p align="center">
  <img src="assets/app-logo-1024.png" alt="Logo der App Arabisch Schreiben" width="180" />
</p>

Eine installierbare Lern-App für Erwachsene, die ohne Vorkenntnisse mit der arabischen Schrift beginnen und langfristig den Koran lesen möchten.

## Aktueller Funktionsumfang

- professioneller Lernpfad mit sechs aufeinander aufbauenden Etappen
- 28 arabische Buchstaben mit Namen, Lautangabe und vier Kontextformen
- eigene Schreibübung für jeden der 28 Buchstaben und seine verfügbaren Formen
- Schreibschritt in jeder Schriftbasis-Lektion, inklusive Auswahl aller dort eingeführten Buchstaben
- 31 ausgearbeitete Kurslektionen mit Beispielen und Lernkontrollen
- genau zehn Aufgabenvarianten in jeder Lektion
- neu gemischte Fragen und Antwortmöglichkeiten bei jedem Übungsdurchlauf, ohne direkte Wiederholung
- interaktive Tests für ähnlich aussehende Buchstaben
- Schreibfläche für Apple Pencil, Stift oder Finger
- Schreibmodus mit Vorlage und freier Übungsmodus ohne Vorlage
- lokale Alif-Formprüfung
- freie Buchstaben-Wiederholung mit Lernstatistik
- lokale Fortschritts- und Serienanzeige
- adaptive Tagesrunde mit zehn Aufgaben und Wiederholungsabständen von 1 bis 60 Tagen
- persönliche Schwächenliste und frühere Wiederholung nach Fehlern
- dreistufiges Schreibtraining: Nachfahren, Abschreiben und Schreiben aus dem Gedächtnis
- getrennte Rückmeldung zu Form, Startpunkt, Schreibrichtung, Größe und Punkten
- Verlauf der letzten Schreibbewertungen pro Buchstabenform und Wort
- Wortstudio zum Lesen, Zusammensetzen und Schreiben freigeschalteter Wörter
- gemischte Lernkontrollen mit eindeutiger Auswahl und freier Antwort
- Offline-Unterstützung als Progressive Web App
- responsive Oberfläche für iPad, Smartphone und Desktop
- eigene iPhone-Optimierung für kleine Displays, Hoch- und Querformat, Notch, Home-Leiste, Bildschirmtastatur und große Touchflächen
- eigenes App-Logo und passende Home-Bildschirm-Symbole für iPad und PWA
- integriertes Feedback-Feld mit Kategorie, Bewertung, Freitext, Kopierfunktion und vorbereiteter GitHub-Rückmeldung
- automatische Versionsprüfung beim Start und bei Rückkehr in die App; neue Online-Versionen ersetzen den alten Offline-Cache selbstständig

## Audio- und Koraninhalte

Der Prototyp enthält bewusst noch keine Rezitationsdateien. Koranrezitationen sollen ausschließlich von qualifizierten Rezitatoren stammen. Vor der Integration müssen Quelle, Lizenz, Offline-Nutzung und korrekte Zuordnung geprüft werden. Tajwīd-Erklärungen benötigen außerdem eine fachliche Prüfung durch eine qualifizierte Lehrperson.

Vorgesehene Quellen und Integrationswege:

- Quran Foundation Content API für geprüfte Metadaten, Wort-Audio und Rezitationen; benötigt einen sicheren Backend-Zugang
- Tanzil Quran Text unter CC BY 3.0 für unveränderten, verifizierten Korantext mit vorgeschriebener Quellenangabe

## Lokal starten

Die App muss über HTTP ausgeliefert werden, damit der Service Worker funktioniert:

```powershell
python -m http.server 4173
```

Danach `http://localhost:4173` im Browser öffnen.

Für eine reine Produktvorschau mit allen freigeschalteten Feldern kann `http://localhost:4173/?preview=all` geöffnet werden. Unfertige Lektionen sind dort deutlich als Vorschau markiert und verändern den normalen Lernfortschritt nicht.

Vor jeder Veröffentlichung prüft `node validate-content.cjs` alle Lektionen auf zehn eindeutige Aufgaben, vorhandene Lösungen, doppelte Optionen, unerwünschte Fragetypen und vollständige Schreibübungen.

## GitHub Pages

1. Dateien in ein GitHub-Repository hochladen.
2. **Settings → Pages** öffnen.
3. **Deploy from a branch** auswählen.
4. Hauptbranch und `/ (root)` festlegen.
5. Die veröffentlichte URL in Safari öffnen.
6. **Teilen → Zum Home-Bildschirm** wählen.

## Projektstruktur

- `content.js`: Alphabet, Curriculum und Lerninhalte
- `curriculum.js`: vollständige Lektionen, Leseregeln, Tajwīd-Grundlagen und Koranpraxis
- `app.js`: Navigation, Übungen, Fortschritt und Schreibprüfung
- `styles.css`: responsive Gestaltung
- `service-worker.js`: Offline-Cache
- `manifest.webmanifest`: Installationsdaten der PWA
- `ROADMAP.md`: fachliche und technische Ausbauplanung
- `DIDAKTIK.md`: recherchierte Vorbilder, Lernprinzipien und Grenzen der Bewertung
