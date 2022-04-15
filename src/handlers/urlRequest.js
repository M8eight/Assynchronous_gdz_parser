import puppeteer from "./puppeteer.js";

import checkForm from "../middleware/serverMainCheckup.js";
import { urlCondDebug, printCondDebug } from "./debug.js";

export async function requestHandler(data) {
	const number = data.number;
	const book = data.book;
	let url = checkup(number, book);

	printCondDebug("url number", number);
	printCondDebug("url book", book);
	printCondDebug("url url", url);

	try {
		let content = await getPageContent(url);
		if (content) {
			urlCondDebug("check url accept, send status true");
			return { status: true };
			// return res.json({
			//     status: true,
			// });
		}

		return { status: false };
		// return res.json(urlJson);
	} catch (err) {
		// if (commandArgs == "url") console.log(chalk.red("axios request reject, send error json"));
		// res.json({
		//     error: "Server error",
		// });
		throw err;
	}
}
