/*!
 *Asynchronous_gdz_parser
 *By: m8eight
 *MIT Licensed
 */

const chalk = require("chalk");

const express = require("express"); //framework
const app = express();

const jsonParser = express.json();
app.use(express.static("public"));

let parserHandler = require("./lib/handlers/mainParser.js");
let checkUrlHandler = require("./lib/handlers/checkUrl.js");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/post", jsonParser, function (request, response) {
    if (!request.body) return response.json({ error: "No request" });

    let number = request.body.number;
    let book = request.body.book;

    parserHandler.requestHandler(number, book, response);
});

app.post("/checkUrl", jsonParser, function (request, response) {
    if (!request.body) return response.json({ error: "No request" });

    let number = request.body.number;
    let book = request.body.book;

    checkUrlHandler.checkUrl(number, book, response);
});

app.listen(3000, "127.0.0.1", function () {
    console.info(chalk.yellow("Server has started to 127.0.0.1:3000"));
});
