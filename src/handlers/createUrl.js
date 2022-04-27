export default function (book, number) {
	let url;

	//add category by example
    //-------------------------------
	if (book == "eng9") {
		url = `https://gdz.ru/class-9/english/starlight-baranova/${number}-s/`;
	} else if (book == "obs9") {
		url = `https://gdz.ru/class-9/istoriya/arsentjev/${number}-item/`;
	} else if (book == "his9") {
		url = `https://megaresheba.ru/gdz/istorija/9-klass/arsentjev/${number}-paragraph`;
	} else if (book == "geom9") {
		url = `https://www.euroki.org/gdz/ru/geometriya/9_klass/reshebnik-po-geometrii-9-klass-atanasyan-${number}`;
	} else if (book == "alg9") {
		url = `https://www.euroki.org/gdz/ru/algebra/9_klass/reshebnik-po-algebre-9-klass-dorofeev-suvorova/zadanie-${number}`;
	} else if (book == "inf9") {
		url = `https://5urokov.ru/gdz/bosova_9/${number}`
	}
    //-------------------------------
	
	if (url !== undefined) {
		return url;
	} else {
		return false;
	}
}
