var arrow = {};

$("#submit").click(function (button) {
    button.preventDefault();
    loadingBlock();
    var book = $("select[name=book]").val();
    var number = parseInt($("input[name=number]").val());
    arrow.number = number;
    main(book, number);
});

async function main(book, number) {
    let arrowNumber = number.toString();

    arrow = {
        book: book,
        number: arrowNumber,
    };

    sendRequest(book, number);

    await fetch("/checkUrl", {
        method: "POST",
        body: JSON.stringify({
            book: arrow.book,
            number: arrow.number,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (data) {
            data.json().then((jsonResponse) => {
                if (jsonResponse.status == true) {
                    if ($("#leftArrowButton").val() == undefined) {
                        $("#leftArrow").append(`
                            <button id="leftArrowButton" type="button" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </button>
                        `);
                        $("#leftArrow").click(function () {
                            $("#leftArrowButton").attr("disabled", "");
                            $("#leftArrowButton").off();
                            let formNumber = parseInt($("input[name=number]").val());
                            $("input[name=number]").val(--arrow.number);
                            main(arrow.book, arrow.number).finally(() => {
                                $("#leftArrowButton").removeAttr("disabled");
                            });
                        });
                    }
                }
            });
        })
        .catch((err) => {
            $("#leftArrow").html(`
                            <button disabled id="leftArrowButton" type="button" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </button>
                        `);
        });

    await fetch("/checkUrl", {
        method: "POST",
        body: JSON.stringify({
            book: arrow.book,
            number: arrow.number,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (data) {
            data.json().then((jsonResponse) => {
                if (jsonResponse.status == true) {
                    if ($("#rightArrowButton").val() == undefined) {
                        $("#rightArrow").append(`
                        <button id="rightArrowButton" type="button" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                            </svg>
                        </button>
                         `);
                        $("#rightArrow").click(function () {
                            $("#rightArrowButton").attr("disabled", "");
                            $("#rightArrowButton").off();
                            $("input[name=number]").val(++arrow.number);
                            main(arrow.book, arrow.number).finally(() => {
                                $("#rightArrowButton").removeAttr("disabled");
                            });
                        });
                    }
                }
            });
        })
        .catch((err) => {
            $("#rightArrow").append(`
            <button disabled id="rightArrowButton" type="button" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                </svg>
            </button>
             `);
        });
}

function sendAlert(errText) {
    $("#imgContainer").append(
        ($("#imgContainer").innerHTML = `
            <div class="alert alert-warning" role="alert"><h3 class="text-danger">Error</h3>
            Cause: ${errText}</div>
        `)
    );
}

function loadingBlock() {
    if ($(".imgStyle").length != 0) {
        $("#imgContainer").empty();
    }

    let submitButton = $("#submit");
    submitButton.text(" ..Loading");
    submitButton.addClass("disabled");
    submitButton.append(`
          <span class="spinner-grow spinner-grow-sm text-success role="status " aria-hidden="true"></span>
    `);
}

function sendRequest(book, number) {
    let jsonRequest = JSON.stringify({ book: book, number: number });

    $.ajax({
        type: "POST",
        url: "/post",
        data: jsonRequest,
        dataType: "json",
        headers: {
            "Content-Type": "application/json",
        },
    }).done(function (response) {
        if ($("#imgContainer").has("div")) {
            $("#imgContainer").empty();
        }

        let submitButton = $("#submit");
        submitButton.text("Send");
        submitButton.removeClass("disabled");

        if (response.hasOwnProperty("error")) {
            sendAlert(response["error"]);
        } else {
            for (let row in response) {
                $("#imgContainer").append(
                    `<img width=700px class="imgStyle img-fluid" src="${response[row]}"/>`
                );
            }
        }
    });
}
