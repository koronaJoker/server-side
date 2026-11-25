
import morgan from "morgan";
import fs from "fs";
import path from "path";

// Создаём папку logs, если её ещё нет
const logsDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Поток записи в файл
const accessLogStream = fs.createWriteStream(
    path.join(logsDir, "requests.log"),
    { flags: "a" }
);

// Собственный формат записи
morgan.token("date", () => {
    return new Date().toLocaleString("ru-RU", {
        timeZone: "Europe/Chisinau"
    });
});

const format = ':method :url | :status | :response-time ms | :date';

const fileLogger = morgan(format, {
    stream: accessLogStream
});

//const consoleLogger = morgan("dev");
const consoleLogger = morgan(':date | :method :url | :status | :response-time ms');

export default function requestLogger(req, res, next) {
    consoleLogger(req, res, () => {});
    fileLogger(req, res, next);
}
