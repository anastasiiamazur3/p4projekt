const fs = require("fs");

// Pfad zur Textdatei
const filePath = "serial-output.txt";

// Zuletzt gelesene Dateigröße
let lastSize = 0;

// Überwache die Textdatei
fs.watchFile(filePath, { interval: 1000 }, (curr, prev) => {
  if (curr.size > lastSize) {
    // Neue Daten lesen
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Fehler beim Lesen der Datei:", err);
        return;
      }

      // Nur die neuen Daten verarbeiten
      const newData = data.substring(lastSize);
      lastSize = curr.size;

      // Zeilenweise verarbeiten
      const lines = newData.split("\n");
      for (const line of lines) {
        if (line.startsWith("START")) {
          // Text ausgeben
          console.log(
            "Es war ein schöner Sommertag, als eine Gruppe von Kollegen ihre jährliche Teambuilding-Exkursion startete. Doch dann geriet ihr Boot in einen heftigen Sturm und sie fanden sich gestrandet auf einer einsamen Insel wieder."
          );
        }
      }
    });
  }
});
