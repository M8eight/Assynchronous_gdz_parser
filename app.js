/*!
 *Asynchronous_gdz_parser
 *By: m8eight
 *MIT Licensed
 */

const chalk = require("chalk");
const process = require("process");

const express = require("express"); //framework
const app = express();

const jsonParser = express.json();
app.use(express.static("public"));

let parserHandler = require("./lib/handlers/mainParser.js");
let checkUrlHandler = require("./lib/handlers/checkUrl.js");

const commandArgs = process.argv[2];

app.get("/", function (req, res) {
    //DEBUG
    if (commandArgs == "url") console.log(chalk.blue("Route: '/'"));

    res.sendFile(__dirname + "/public/index.html");
});

app.post("/post", jsonParser, function (request, response) {
    //DEBUG
    if (commandArgs == "url") console.log(chalk.blue("Route: '/post'"));

    if (!request.body) return response.json({ error: "No request" });
    let number = request.body.number;
        if (commandArgs == "url") console.log("🚀 ~ file: app.js ~ line 32 ~ number", number);
    let book = request.body.book;
        if (commandArgs == "url") console.log("🚀 ~ file: app.js ~ line 33 ~ book", book);
    
    parserHandler.requestHandler(number, book, response, commandArgs);
});

app.post("/checkUrl", jsonParser, function (request, response) {
    //DEBUG
    if (commandArgs == "url") console.log(chalk.blue("Route: '/checkUrl'"));

    if (!request.body) return response.json({ error: "No request" });
    let number = request.body.number;
    let book = request.body.book;

    checkUrlHandler.checkUrl(number, book, response);
});

app.listen(3000, "127.0.0.1", function () {
    console.info(chalk.magenta("Server has started to 127.0.0.1:3000"));
});
