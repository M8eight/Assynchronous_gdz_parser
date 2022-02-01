/*!
 *Assynchronous_gdz_parser
 *By: m8eight
 *MIT Licensed
*/

//init crawler module
let parser = require('./lib/parser.js');
const { response } = require('node-html-parser');
const express = require('express'); //framework
const app = express(); 


//import method for processing json from express
const jsonParser = express.json();

app.use(express.static('public'));

app.post('/post', jsonParser, function (request, response) {
    //if in request is empty then send status 400 (Bad request)
    if (!request.body) return response.json({'error': 'No request'});

    //pick up in request all property, property in form
    let number = request.body.number;
    let book = request.body.book;

    //call crawler module
    parser.requestHandler(number, book, response);
});

//index page, send view
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//start express server
app.listen(3000, '127.0.0.1', function () {
    console.info('server has started to 127.0.0.1:3000');
});