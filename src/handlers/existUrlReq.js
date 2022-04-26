import axios from "axios";

/**
 * 
 * @param {String} url 
 * @param {Callback} callbackData 
 * @returns true | false
 */
export default function (url, callbackData) {
	try {
		axios.get(url)
			.then((response) => {
				let data = response;
				let redirectCont = data.request._redirectable._redirectCount;

				if (redirectCont == 0 && data.status == 200) {
					return callbackData(true);
				} else {
					return callbackData(false);
				}
			})
			.catch((err) => {
				
				if (err.response) {
					callbackData(false);
				} else {
					throw err;
				}
			});
	} catch (err) {
		return console.log(err);
	}
}