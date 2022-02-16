module.exports.checkForm = checkForm;

async function checkForm(number, book) {
    console.log(number + " " + book);
    let part = 1;
    let url;

    if (book == "geom9") {
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

    //take the book property from the request and change the url variable to the desired one and add the page number
    switch (book) {
        case "alg9":
            url = `https://gdz.ru/class-9/algebra/dorofeev/${number}-nom/`;
            return url;

        case "eng9":
            url = `https://gdz.ru/class-9/english/starlight-baranova/${number}-s/`;
            return url;

        case "obs9":
            url = `https://gdz.ru/class-9/istoriya/arsentjev/${number}-item/`;
            return url;

        case "his9":
            url = `https://gdz.ru/class-9/istoriya/arsentjev/${number}-item/`;
            return url;

        case "geom9":
            url = `https://gdz.ru/class-7/geometria/atanasyan-7-9/${part}-chapter-${number}/`;
            return url;
    }

    throw "Unexcepted error";
}
