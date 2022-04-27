import * as cheerio from "cheerio";

export default function (page, selector, url) {
	const $ = cheerio.load(page);

	let urlsArray = [];
	$(selector).each(function (index, elem) {
		var domain = '';
		if ($(elem).attr('src').substring(0, 1) == '/') {
			domain = url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm);
		}
		urlsArray.push(domain + $(elem).attr('src').replace(' ', '_'));
	});
	
	return urlsArray;
}
