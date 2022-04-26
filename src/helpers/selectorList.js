export default function (book) {
    let selector;
    switch (book) {
        case 'alg9':
            selector = '.fancybox > img';
            break;

        case 'geom9':
            selector = '.fancybox > img';
            break;

        case 'his9':
            selector = '.with-overtask > img'
            break;
    
        default:
            break;
    }

    return selector;
}