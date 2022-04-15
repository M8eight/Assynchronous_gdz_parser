import { parse } from "node-html-parser";

import checkup from "../middleware/serverMainCheckup.js";
import { printCondDebug } from "./debug.js";
import { getPageContent } from "./puppeteer.js";

export async function requestHandler(data) {
	let urlJson = {};

	const number = data.number;
	const book = data.book;
	let url = checkup(number, book);

	printCondDebug("number", number);
	printCondDebug("book", book);
	printCondDebug("url", url);

	try {
		let content = await getPageContent(url);
		let root = parse(content);
		let matchingElements = root.querySelectorAll(".with-overtask > img");
		await Promise.all(
			matchingElements.map(function (matchingElement, indexPos) {
				urlJson[indexPos] = [
					"https:" + matchingElement.getAttribute("src"),
				];
			})
		);

		return urlJson;
		// return res.json(urlJson);
	} catch (err) {
		// if (commandArgs == "url") console.log(chalk.red("axios request reject, send error json"));
		// res.json({
		//     error: "Server error",
		// });
		throw err;
	}

	// await axios
	// 	.get(url)
	// 	.then(async (response) => {
	// 		const root = parse(response.data);
	// 		let matchingElements = root.querySelectorAll(
	// 			".with-overtask > img"
	// 		);
	// 		await Promise.all(
	// 			matchingElements.map(function (matchingElement, indexPos) {
	// 				urlJson[indexPos] = [
	// 					"https:" + matchingElement.getAttribute("src"),
	// 				];
	// 			})
	// 		);

	// 		if (commandArgs == "url")
	// 			console.log(chalk.blue("axios accept request, send json urls"));
	// 		await res.json(urlJson);
	// 		console.log(urlJson);
	// 	})
	// 	.catch(function (error) {
	// 		if (commandArgs == "url")
	// 			console.log(chalk.red("axios request reject, send error json"));
	// 		res.json({
	// 			error: "Server error",
	// 		});
	// 	});
}
