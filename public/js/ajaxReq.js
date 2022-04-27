const leftArrowHtml = `
    <button id="leftArrow" type="button" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
        </svg>
    </button>
`;

const rightArrowHtml = `
    <button id="rightArrow" type="button" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
        </svg>
    </button>
`;

const leftArrowClass = ".leftArrow";
const rightArrowClass = ".rightArrow";

const leftArrowId = "#leftArrow";
const rightArrowId = "#rightArrow";

/**
 * @returns Void
 */
function sendAlert() {
	$("#imgContainer").append(
		($("#imgContainer").innerHTML = `
            <div class="alert alert-warning" role="alert"><h3 class="text-danger">Error</h3>
            Cause: Server error</div>
        `)
	);
}

/**
 * @returns Void
 */
function clearContainer() {
	$("#imgContainer").empty();
	$(leftArrowClass).empty();
	$(rightArrowClass).empty();
}

/**
 * @param {String[]} urlsArray
 * @returns Void
 */
function createImages(urlsArray) {
	for (let url in urlsArray) {
		$("#imgContainer").append(
			`<img width=700px class="imgStyle img-fluid" src="${urlsArray[url]}"/>`
		);
	}
}

/**
 * @param {String} book
 * @param {Number} number
 * @returns string[] | false
 */
function sendUrlsReq(book, number, urlsCallback) {
	$.ajax({
		type: "POST",
		url: "/urls",
		data: JSON.stringify({ book, number }),
		dataType: "json",
		headers: {
			"Content-Type": "application/json",
		},
	}).done((res) => {
		if (res.status == true) {
			urlsCallback(res.data);
		} else {
			urlsCallback(false);
		}
	});
}

/**
 *
 * @param {String} book
 * @param {Number} number
 * @param {Callbacks} statusCallback
 * @returns true | false
 */
function sendArrowReq(book, number, statusCallback) {
	$.ajax({
		type: "POST",
		url: "/arrows",
		data: JSON.stringify({ book, number }),
		dataType: "json",
		headers: {
			"Content-Type": "application/json",
		},
	}).done((res) => {
		if (res.status == true) {
			statusCallback(true);
		} else if (res.status == false) {
			statusCallback(false);
		}
	});
}

/**
 *
 * @param {String} selector
 * @param {String} insertedHtml
 */
function createArrow(selector, insertedHtml) {
	$(selector).append(insertedHtml);
}

/**
 *
 * @param {String} selector
 * @param {String} insertedHtml
 */
function disableArrow(selector) {
	$(selector).attr("disabled", "");
}

function arrowReq(book, leftArrowValue, rightArrowValue) {
	$(leftArrowClass).removeAttr("disabled");
	$(rightArrowClass).removeAttr("disabled");

	createArrow(leftArrowClass, leftArrowHtml);
	createArrow(rightArrowClass, rightArrowHtml);

		sendArrowReq(book, leftArrowValue, (status) => {
			if (!status) {
				disableArrow(leftArrowId);
			} else if (status) {
                $(leftArrowId).click((button) => {
                    button.preventDefault();
                    main(book, leftArrowValue);
                });
            }
		});

		sendArrowReq(book, rightArrowValue, (status) => {
			if (!status) {
				disableArrow(rightArrowId);
			} else if (status) {
                $(rightArrowId).click((button) => {
                    button.preventDefault();
                    main(book, rightArrowValue);
                });
            }
		});
}

/**
 *
 * @param {String} book
 * @param {Number} number
 */
function main(book, number) {
	$("input[name=number]").val(number);
	clearContainer();
	sendUrlsReq(book, number, (data) => {
		if (!data) {
			return sendAlert();
		} else if (data) {
			createImages(data);
			let leftArrowValue = number - 1;
			let rightArrowValue = number + 1;
			arrowReq(book, leftArrowValue, rightArrowValue);
		}
	});
}

$("#submit").click((button) => {
	button.preventDefault();
	let book = $("select[name=book]").val();
	let number = parseInt($("input[name=number]").val());

	main(book, number);
});
