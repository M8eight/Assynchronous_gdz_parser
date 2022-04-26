import UrlsRequestController from "./controllers/UrlsRequestController.js";
import ArrowController from "./controllers/ArrowController.js";

import express from "express";

const app = express();
const jsonParser = express.json();
app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/", function (req, res) {
	res.render("index.pug");
});

app.post("/urls", jsonParser, function (req, res) {
	const book = req.body.book;
	const number = req.body.number;

	UrlsRequestController(book, number, (data) => {
		if (!data) {
			res.json({ status: false });
		} else if (data) {
			res.json({ status: true, data: data });
		} else {
			res.sendStatus(404);
		}
	});
});

app.post("/arrows", jsonParser, function (req, res) {
	const book = req.body.book;
	const number = req.body.number;

	ArrowController(book, number, (data) => {
		if (data) {
			res.json({ status: true });
		} else if (!data) {
			res.json({ status: false });
		}
	});
});

app.listen(3000, "127.0.0.1", function () {
	console.log("Server has started");
});
