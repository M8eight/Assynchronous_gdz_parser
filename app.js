const express = require('express');
const app = express();
const axios = require('axios');
const {
    parse
} = require('node-html-parser');

const jsonParser = express.json();

app.post('/post', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(303);

    parser();

    async function parser() {
        var url = '';
        var number = req.body.number;

        switch (req.body.book) {
            case 'alg9':
                url = `https://gdz.ru/class-9/algebra/dorofeev/${number}-nom/`
                break;

            default:
                res.sendStatus(404);
                break;
        }

        await axios.get(url)
            .then(async (response) => {
                const root = parse(response.data);
                var rows = {};
                var rowsRend = [];
                rows = (root.querySelectorAll('.with-overtask > img'));

                await Promise.all(rows.map(async row => {

                    let href = 'https:' + row.getAttribute('src');
                    rowsRend.push(href);

                }));

                res.json(rowsRend);
            })
            .catch(function (error) {
                res.json(['error']);
            });

        //console.log(rowsRend);

    }

});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);