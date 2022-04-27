export default function (book) {
    let selector;
    switch (book) {
        //add category by example
        //------------------------
        case 'alg9':
            selector = '.fancybox > img';
            break;

        case 'geom9':
            selector = '.fancybox > img';
            break;

        case 'his9':
            selector = '.with-overtask > img'
            break;

        case 'inf9':
            selector = '.ulightbox > img'
            break;
    
        default:
            break;
        //------------------------
    }

    return selector;
}