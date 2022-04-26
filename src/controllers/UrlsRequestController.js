import createUrl from "./../handlers/createUrl.js";
import getPageReq from "../handlers/getPageReq.js";
import parsePage from "../handlers/parsePage.js";
import selectorList from "../helpers/selectorList.js";

/**
 * @param {String} book
 * @param {Number} number
 * @param {Callback} sendJson
 * @returns string[ ] | false
 */
export default function (book, number, sendJsonCallback) {
	try {
		const url = createUrl(book, number);

		if (!url) {
			return false;
		}

		getPageReq(url, function (page) {
			if (!page) {
				return sendJsonCallback(false);
			}
			
			const selector = selectorList(book);
			const urlsArray = parsePage(page, selector, url);

			return sendJsonCallback(urlsArray);
		});
	} catch (err) {
		return console.log(err);
	}
}
