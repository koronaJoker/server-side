import {getDateTime, Log} from './utils.js'
import http from "http"

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === '/') {

        Log("GET", "/")        

        res.end('Home page');

    }

    else if (req.method === "GET" && req.url === '/about') {

        Log("GET", "/about")  

        res.end('Hello! You have reached my Student Journal API application!\nGo to /help to see the available API features.');

    }

    else if (req.method === "GET" && req.url === '/api/student') {

        const student = {
            name: 'Kirov Kiril',
            group: 'IA2404',
            speciality: 'Applied Informatics',
            hobby: 'Art',
            averageRating: 10.0,
            age: 21

        };

        Log("GET", "/api/student")  

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(student));

    }

    else if (req.method === "GET" && req.url === '/student') {

        Log("GET", "/student")

        res.end("Kirov Kiril IA2404");

    }

    else if (req.method === "GET" && req.url === '/time') {
        
        Log("GET", "/time")

        res.end(getDateTime());

    }

    else if (req.method === "GET" && req.url === "/api/courses") {

        const disciplines = [
            {
                name: "Server-Side Development",
                teacher: "Vlada Vishnevskaya",
                credits: 6
            },
            {
                name: "Cloud Computing",
                teacher: "Nikita Nartea",
                credits: 5
            },
            {
                name: "Artificial Intelligence",
                teacher: "Viorel Grigorchea",
                credits: 6
            }
        ];

        Log("GET", "/api/courses")

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(disciplines));

    }

    else if (req.method === "GET" && req.url === "/help") {

        Log("GET", "/help")

        res.end(`

Available commands and routes:

GET / - Home page

GET /about - Application description page

GET /student - Student information

GET /time - Current date and time

GET /api/student - Student information in JSON format

GET /api/courses - List of courses

GET /help - Help page

        `);

    }

    else {
        res.statusCode = 404
        Log("GET", req.url)
        res.end('404 - Page Not Found');
    }

});

server.listen(3000, () => {

    console.log("Server is running at http://localhost:3000");

});