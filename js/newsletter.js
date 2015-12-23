"use strict";
function showNewsletterForm()
{
    document.getElementById("newsletter_button").style.display="none";
    document.getElementById("mailchimp").style.display="inline";
    $("#mc-success").html("");
}

function hideNewsletterForm(e)
{
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("newsletter_button").style.display="inline";
    document.getElementById("mailchimp").style.display="none";

    var $form = $("#mc-embedded-subscribe-form");
    var displayError = function() {
        // Fail message
        $('#mc-success').html("<div class='alert alert-danger'>");
        $('#mc-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#mc-success > .alert-danger').append("<strong>Sorry, something went wrong. Please contact us at <a href='mailto:info@jdis.ca'>info@jdis.ca</a>.</strong>");
        $('#mc-success > .alert-danger').append('</div>');
        //clear all fields
        $form.trigger("reset");
    };

    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: displayError,
        success: (data) => {
            if (data.result != "success") {
                displayError();
            } else {
                $('#mc-success').html("<div class='alert alert-success'>");
                $('#mc-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#mc-success > .alert-success')
                    .append("<strong>" + data.msg + "</strong>");
                $('#mc-success > .alert-success')
                    .append('</div>');
                //clear all fields
                $form.trigger("reset");
            }
        }
    });
}
