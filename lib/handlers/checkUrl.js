module.exports.checkUrl = checkUrl;

const axios = require("axios"); //async 'crawler' server

const checkup = require("../middleware/serverMainCheckup.js");

async function checkUrl(number, book, res) {
    await checkup.checkForm(number, book, res)
        .then(function (url) {
            axios.get(url)
                .then(async (response) => {
                    if (response) {
                        res.json({
                            status: true,
                        });
                    }
                })
                .catch(function (error) {
                    return;
                });
        })
        .catch(async function (err) {
            return;
        });
}
