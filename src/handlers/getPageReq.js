import axios from "axios";

export default function (url, callbackData) {
	try {
		axios
			.get(url)
			.then((response) => {
				callbackData(response.data);
			})
			.catch((err) => {
				if (err.response) {
					callbackData(false)
				} else {
					throw err;
				}
			});
	} catch (err) {
		return console.log(err);
	}
}
