module.exports.requestHandler = requestHandler;

const { parse } = require('node-html-parser'); //parse html
const axios = require('axios'); //assync 'crawler' server 

async function requestHandler(number, book, res) {
    let urlJson = {};
    var part = 1;

    if (book == 'geom9') {
        if (number > 1 && number < 86) {
            part = 1;
        } else if (number >= 87 && number <= 185) {
            part = 2;
        } else if (number >= 186 && number <= 222) {
            part = 3;
        } else if (number >= 223 && number <= 362) {
            part = 4;
        } else if (number >= 363 && number <= 444) {
            part = 5; 
        } else if (number >= 445 && number <= 532) {
            part = 6; 
        } else if (number >= 533 && number <= 630) {
            part = 7; 
        } else if (number >= 631 && number <= 737) {
            part = 8; 
        } else if (number >= 738 && number <= 910) {
            part = 9; 
        } else if (number >= 911 && number <= 1010) {
            part = 10; 
        } else if (number >= 1011 && number <= 1077) {
            part = 11; 
        } else if (number >= 1078 && number <= 1147) {
            part = 12; 
        } else if (number >= 1148 && number <= 1183) {
            part = 13; 
        } else if (number >= 1184 && number <= 1310) {
            part = 14; 
        }
    }

    console.log(`https://gdz.ru/class-7/geometria/atanasyan-7-9/${part}-chapter-${number}/`);
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

        case 'geom9':
            url = `https://gdz.ru/class-7/geometria/atanasyan-7-9/${part}-chapter-${number}/`;
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