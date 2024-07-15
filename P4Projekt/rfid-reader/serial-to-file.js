require("dotenv").config();
const { SerialPort } = require("@serialport/stream");
const { ReadlineParser } = require("@serialport/parser-readline");
const Binding = require("@serialport/bindings-cpp");
const fs = require("fs");

// Pfad zur Textdatei
const filePath = "serial-output.txt";

// Seriellen Port aus Umgebungsvariablen lesen
const portName = process.env.SERIAL_PORT;

// Seriellen Port öffnen
const port = new SerialPort({
  path: "/dev/tty-usbserial1",
  baudRate: 9600,
  binding: Binding,
});

// Parser für die serielle Ausgabe
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Bei Daten vom seriellen Port
parser.on("data", (data) => {
  console.log(`Daten empfangen: ${data}`);

  // In die Textdatei schreiben
  fs.appendFile(filePath, data + "\n", (err) => {
    if (err) {
      console.error("Fehler beim Schreiben in die Datei:", err);
    }
  });
});

// Bei Fehlern
parser.on("error", (err) => {
  console.error("Fehler bei der seriellen Kommunikation:", err);
});

/*const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const say = require("say");

// Ersetzen Sie 'COM3' durch Ihren tatsächlichen COM-Port
const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

port.on("open", () => {
  console.log("Serielle Kommunikation gestartet");
});

parser.on("data", (data) => {
  console.log("Daten vom Arduino empfangen:", data);

  // Prüfen, ob die empfangenen Daten die erwarteten START-Daten enthalten
  if (data.startsWith("START")) {
    const uid = data.split(" ")[1]; // UID aus den empfangenen Daten extrahieren

    // Hier können Sie den Text anpassen, der gesprochen werden soll
    const text = `Es war ein schöner Sommertag, als eine Gruppe von Kollegen ihre jährliche Teambuilding-Exkursion startete. Doch dann geriet ihr Boot in einen heftigen Sturm und sie fanden sich gestrandet auf einer einsamen Insel wieder. Die Karte mit der UID ${uid} wurde gelesen.`;

    // Sprachausgabe
    say.speak(text, "de-DE", 1.0, (err) => {
      if (err) {
        console.error("Fehler bei der Sprachausgabe:", err);
      } else {
        console.log("Text wurde gesprochen:", text);
      }
    });
  }
});

port.on("error", (err) => {
  console.error("Fehler bei der seriellen Kommunikation:", err);
});

/*const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const say = require("say");

// Erstellen Sie eine neue Instanz von SerialPort
const port = new SerialPort("COM3", { baudRate: 9600 }); // Ersetzen Sie '/dev/tty-usbserial1' durch den richtigen Port

// Erstellen Sie einen Parser, der die eingehenden Daten liest
const parser = port.pipe(new Readline({ delimiter: "\n" }));

parser.on("data", (line) => {
  console.log(`Empfangen: ${line}`);

  if (line.startsWith("START ")) {
    const textToSpeak = line.slice(6); // Entfernen von "START " aus dem Text
    console.log(`Vorlesen: ${textToSpeak}`);

    // Sprachausgabe auf dem Laptop
    say.speak(textToSpeak, null, 1.0, (err) => {
      if (err) {
        console.error("Fehler bei der Sprachausgabe:", err);
      }
    });
  }
});

parser.on("error", (err) => {
  console.error("Fehler bei der seriellen Kommunikation:", err);
});*/
