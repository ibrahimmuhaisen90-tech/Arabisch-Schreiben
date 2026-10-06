# Arabisch Schreiben

Eine installierbare Lern-App für Erwachsene, die ohne Vorkenntnisse mit der arabischen Schrift beginnen und langfristig den Koran lesen möchten.

## Aktueller Funktionsumfang

- professioneller Lernpfad mit sechs aufeinander aufbauenden Etappen
- 28 arabische Buchstaben mit Namen, Lautangabe und vier Kontextformen
- drei ausgearbeitete Grundlagenlektionen
- interaktive Tests für ähnlich aussehende Buchstaben
- Schreibfläche für Apple Pencil, Stift oder Finger
- lokale Alif-Formprüfung
- freie Buchstaben-Wiederholung mit Lernstatistik
- lokale Fortschritts- und Serienanzeige
- Offline-Unterstützung als Progressive Web App
- responsive Oberfläche für iPad, Smartphone und Desktop

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

## GitHub Pages

1. Dateien in ein GitHub-Repository hochladen.
2. **Settings → Pages** öffnen.
3. **Deploy from a branch** auswählen.
4. Hauptbranch und `/ (root)` festlegen.
5. Die veröffentlichte URL in Safari öffnen.
6. **Teilen → Zum Home-Bildschirm** wählen.

## Projektstruktur

- `content.js`: Alphabet, Curriculum und Lerninhalte
- `app.js`: Navigation, Übungen, Fortschritt und Schreibprüfung
- `styles.css`: responsive Gestaltung
- `service-worker.js`: Offline-Cache
- `manifest.webmanifest`: Installationsdaten der PWA
- `ROADMAP.md`: fachliche und technische Ausbauplanung
