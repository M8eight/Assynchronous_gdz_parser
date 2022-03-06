module.exports.requestHandler = requestHandler;

const { parse } = require("node-html-parser"); //parse html
const axios = require("axios"); //async 'crawler' server
const chalk = require("chalk");

const checkup = require("../middleware/serverMainCheckup.js");

async function requestHandler(number, book, res) {
    let urlJson = {};
    await checkup.checkForm(number, book, res)
        .then(function (url) {
            console.log(chalk.magenta("- " + url));
            axios.get(url)
                .then(async (response) => {
                    
                    const root = parse(response.data);
                    let matchingElements = root.querySelectorAll(
                        ".with-overtask > img"
                    );
                    /*
                            each array in every element pick up html property src and
                            to the beginning add https prefix and add all this to the new
                            url array 
                    */
                    await Promise.all(
                        matchingElements.map(
                            function (matchingElement, indexPos) { 
                                urlJson[indexPos] = ["https:" + matchingElement.getAttribute("src")];
                            }
                        )
                    );
                    await res.json(urlJson);
                })
                .catch(function (error) {
                    return;
                });
        })
        .catch(async function (err) {
            await res.json({
                error: "Server error",
            });
        });
}
