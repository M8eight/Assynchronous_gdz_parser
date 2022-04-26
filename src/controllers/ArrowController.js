import existUrlReq from "../handlers/existUrlReq.js";
import createUrl from "./../handlers/createUrl.js";

/**
 * @param {String} book
 * @param {Number} number
 * @param {Callback} sendStatusCallback
 * @returns true | false
 */
 export default function (book, number, sendStatusCallback) {
	try {
		const url = createUrl(book, number);

		if (!url) {
			return sendStatusCallback(false);
		}

		existUrlReq(url, function (status) {
			return sendStatusCallback(status)
		});

	} catch (err) {
		return console.log(err);
	}
}