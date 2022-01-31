module.exports.requestHandler = requestHandler;

const { parse } = require('node-html-parser'); //parse html
const axios = require('axios'); //assync 'crawler' server 

async function requestHandler(number, book, res) {
    let urlJson = {};

    //take the book property from the request and change the url variable to the desired one and add the page number
    switch (book) {
        case 'alg9':
            url = `https://gdz.ru/class-9/algebra/dorofeev/${number}-nom/`;
            break;

        case 'eng9':
            url = `https://gdz.ru/class-9/english/starlight-baranova/${number}-s/`;
            break;

        case 'obs9':
            url = `https://gdz.ru/class-9/istoriya/arsentjev/${number}-item/`;
            break;

        case 'his9':
            url = `https://gdz.ru/class-9/istoriya/arsentjev/${number}-item/`;
            break;

        default:
            return res.json({'error': 'Choose a book'});
    }

    //axios server perform request from url
    await axios.get(url)
        //if the request was sent successfully
        .then(async (response) => {
            //pick up data from response axios
            const root = parse(response.data);

            //Create document search via query selector, returns array with matching values 
            let matchingElements = root.querySelectorAll('.with-overtask > img');

            /*
                each array in every element pick up html property src and
                to the beginning add https prefix and add all this to the new
                url array 
            */
            await Promise.all(matchingElements.map(async (matchingElement, indexPos) => {
                urlJson[indexPos] = 'https:' + matchingElement.getAttribute('src');
            }));

            //send url array
            res.json(urlJson);
        })
        .catch(function (error) {
            res.json({'error': 'Form filled out incorrectly'});
        });
}