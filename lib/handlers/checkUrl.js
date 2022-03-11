module.exports.checkUrl = checkUrl;

const axios = require("axios");
const chalk = require("chalk");
const process = require("process");

const checkup = require("../middleware/serverMainCheckup.js");

const commandArgs = process.argv[2];

async function checkUrl(number, book, res) {
    if (commandArgs == "url") console.log(chalk.blue("Go to checkUrl.js"));
    if (commandArgs == "url") console.log("🚀 ~ file: checkUrl.js ~ line 7 ~ checkUrl ~ book", book);
    if (commandArgs == "url") console.log("🚀 ~ file: checkUrl.js ~ line 7 ~ checkUrl ~ number", number);

    let url = checkup.checkForm(number, book);
    if (commandArgs == "url") console.log("🚀 ~ file: checkUrl.js ~ line 13 ~ checkUrl ~ url", url);

    axios
        .get(url)
        .then(async (response) => {
            if (response) {
                if (commandArgs == "url") console.log(chalk.green("check url accept, send status true"));
                res.json({
                    status: true,
                });
            }
        })
        .catch(function (error) {
            if (commandArgs == "url") console.log(chalk.red("check url reject, do not can"));
            return;
        });
}
