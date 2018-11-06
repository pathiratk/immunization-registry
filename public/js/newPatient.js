(function (window, document) {
    $(document).ready( function () {
        $("#profile").submit(function(event) {
            event.preventDefault();

            var input = {
                firstName: $(this).find("#first-name").val(),
                lastName: $(this).find("#last-name").val(),
                dateOfBirth: $(this).find("#date-of-birth").val(),
                gender: $(this).find("#gender").val(),
                motherFirstName: $(this).find("#mother-first-name").val(),
                motherLastName: $(this).find("#mother-last-name").val(),
                contactInfo: $(this).find("#contact-info").val(),
                appointment: $(this).find("#appointment").val()
            }

            // send POST REQUEST
            var url = "api/patients/";
            var result = $.post(url, input);
            result.done(function(data) {
                $(location).attr('href', '/home');
            });
        });
    } );

}(this, this.document));
