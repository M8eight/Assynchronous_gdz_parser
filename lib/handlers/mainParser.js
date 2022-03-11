module.exports.requestHandler = requestHandler;

const { parse } = require("node-html-parser");
const axios = require("axios");
const chalk = require("chalk");
const process = require("process");

const checkup = require("../middleware/serverMainCheckup.js");

const commandArgs = process.argv[2];

async function requestHandler(number, book, res, commandArgs) {
    let urlJson = {};
    let url = checkup.checkForm(number, book);

    await axios.get(url)
        .then(async (response) => {
            const root = parse(response.data);
            let matchingElements = root.querySelectorAll(
                ".with-overtask > img"
            );
            await Promise.all(
                matchingElements.map(function (matchingElement, indexPos) {
                    urlJson[indexPos] = [
                        "https:" + matchingElement.getAttribute("src"),
                    ];
                })
            );

            if (commandArgs == "url") console.log(chalk.blue("axios accept request, send json urls"));
            await res.json(urlJson);
        })
        .catch(function (error) {
            if (commandArgs == "url") console.log(chalk.red("axios request reject, send error json"));
            res.json({
                error: "Server error",
            });
        });
}
