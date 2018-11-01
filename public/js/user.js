(function (window, document) {
    var field = {
        firstName: "First Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        gender: "Gender",
        motherFirstName: "Mother's First Name",
        motherLastName: "Mother's Last Name",
        contactInfo: "Contact Info",
        appointment: "Appointment"
    }
    var userID;

    $(document).ready( function () {
        userID = window.location.pathname.substring(1);
        var url = "api/users/" + userID;
        $.getJSON(url, function(data) {
            var items =[];
            var vaccines = [];
            $.each(data, function(key, val) {
                // console.log(key, val);
                if (field[key]) {
                    if (key == "appointment" || key == "dateOfBirth") {
                        val = val.substring(0, 10);
                    }
                    items.push("<tr><th>" + field[key] + "</th><td>" + val + "</td></tr>");
                } else if (key == "pastImmunization") {
                    // console.log(val);
                    for (var i = 0; i < val.length; i++) {
                        val[i].date = val[i].date.substring(0, 10);
                    }
                    $('#immunizations').DataTable({
                        data: val,
                        columns: [
                            {data: "date"},
                            {data: "vaccine"}
                        ],
                        paging: false,
                        info: false
                    })
                }
            });
            $("<tbody>", {
                html: items.join("")
            }).appendTo("#general");
        });
        
        $("#immunization").submit(function(event) {
            // var allInputs = $(":input");
            event.preventDefault();
            var appointment = $(this).find("#appointment").val();
            var input = {
                vaccine: $(this).find("#vaccine").val(),
                administeredBy: $(this).find("#administered-by").val()
            }
            // console.log(administeredBy);
            // alert(allInputs);
            var url = "api/users/" + userID;
            var result = $.post(url, input);
            result.done(function(data) {
                location.reload();
            });
        });
    } );

    



}(this, this.document));
