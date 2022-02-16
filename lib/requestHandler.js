module.exports.requestHandler = requestHandler;

const checkup = require("./checkup.js");

const {
	parse
} = require("node-html-parser"); //parse html
const axios = require("axios"); //assync 'crawler' server 

async function requestHandler(number, book, res) {
	let urlJson = {};

	await checkup.checkForm(number, book)
		.then(
			function (url) {
				console.log(url);

				//axios server perform request from url
				axios.get(url)
					//if the request was sent successfully
					.then(async (response) => {

						//pick up data from response axios
						const root = parse(response.data);

						//Create document search via query selector, returns array with matching values 
						let matchingElements = root.querySelectorAll(".with-overtask > img");

						/*
							each array in every element pick up html property src and
							to the beginning add https prefix and add all this to the new
							url array 
						*/
						await Promise.all(matchingElements.map(async (matchingElement, indexPos) => {
							urlJson[indexPos] = "https:" + matchingElement.getAttribute("src");
						}));

						//send url array
						await res.json(urlJson);
					})
					.catch(function (error) {
						return res.json({
							"error": "Form filled out incorrectly"
						});
					});
			}
		)
		.catch(
			async function (err) {
				await res.json(result.error);
			}
		);
}
