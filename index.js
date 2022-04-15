/*!
 *Asynchronous_gdz_parser
 *By: m8eight
 *MIT Licensed
 */

import chalk from "chalk";
import express from "express";
const app = express();

import { __dirname, commandArgs } from "./src/handlers/env.js";
import { requestHandler } from "./src/handlers/mainParser.js";
import { urlCondDebug, printCondDebug } from "./src/handlers/debug.js";
// import checkUrlHandler from "./src/handlers/checkUrl.js";

const jsonParser = express.json();
app.use(express.static("public"));

app.get("/", function (req, res) {
	urlCondDebug("Route /");
	if (commandArgs == "url") {
		console.log(chalk.blue("Route: '/'"));
		return res.sendFile(__dirname + "/public/index.html");
	}
	return res.sendFile(__dirname + "/public/index.html");
});

app.post("/post", jsonParser, function (request, response) {
	urlCondDebug("Route: '/post'");
	if (!request.body) return response.json({ error: "No request" });

	let data = {};
	data.number = request.body.number;
	printCondDebug("number", data.number);

	data.book = request.body.book;
	printCondDebug("book", request.body);

	requestHandler(data)
		.then((data) => res.json(data))
		.catch((err) => console.log(err));
});

app.post("/checkUrl", jsonParser, function (request, response) {
	urlCondDebug("Route: '/checkUrl'");

	// if (!request.body) return response.json({ error: "No request" });
	// let number = request.body.number;
	// let book = request.body.book;

	// checkUrlHandler.checkUrl(number, book, response);
});

app.listen(3000, "127.0.0.1", function () {
	console.info(chalk.magenta("Server has started to 127.0.0.1:3000"));
	urlCondDebug("Debug mode is activated");
});
