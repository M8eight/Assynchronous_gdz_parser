$("#submit").click(function (button) {
    //reset sent property button
    button.preventDefault();
    //if there is any data in the container, then we clear it
    if (document.getElementsByClassName('imgStyle').length != 0) {
        $('#imgContainer').empty();
    }
    let bookParam = $('select[name=book]').val();
    let numberParam = $('input[name=number]').val();
    let jsonReqData = JSON.stringify({
        'book': bookParam,
        'number': numberParam
    });
    //replace send button to 'loading' button
    {
        $('#submit').text(' Loading');
        $('#submit').addClass('disabled');
        $('#submit').append(' <span class="spinner-grow spinner-grow-sm text-success" role="status " aria-hidden="true"></span>');    
    }


    $.ajax({
        type: "POST",
        url: "/post",
        data: jsonReqData,
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (response) {

        //return send button
        $('#submit').empty();
        $('#submit').text('Send');
        $('#submit').removeClass('disabled');

        if ($('#imgContainer').has('div')) {
            $('#imgContainer').empty();
        }

        if (response.hasOwnProperty('error')) {
            // $('#imgContainer').append($('#imgContainer').innerHTML = '<h3 class="text-danger">Error, see cause ↓</h3>');
            $('#imgContainer').append($('#imgContainer').innerHTML = `<div class="alert alert-warning" role="alert"><h3 class="text-danger">Error</h3>
            Cause: ${response['error']}</div>`);
        } else {
            for (let row in response) {
                $('#imgContainer').append(`<img width=700px class="imgStyle img-fluid" src="${response[row]}"/>`);
            }
        }

    });

});