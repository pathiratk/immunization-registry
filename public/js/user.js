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
            var complete = [];
            var incomplete = [];

            $.each(data, function(key, val) {
                if (field[key]) {
                    if (key == "appointment" || key == "dateOfBirth") {
                        val = val.substring(0, 10);
                    }
                    items.push("<tr><th>" + field[key] + "</th><td>" + val + "</td></tr>");
                } else if (key == "immunization") {
                    for (var i = 0; i < val.length; i++) {
                        val[i].date = val[i].date.substring(0, 10);
                        console.log(val[i] + " " + val[i].completed)
                        if (val[i].administered == true) {
                            complete.push(val[i]);
                        } else {
                            incomplete.push(val[i]);
                        }
                    }
                } 
            });
            insertTable('#p-immunization', complete);

            var dateCol = 0;
            console.log(incomplete);
            insertTable('#s-immunization', incomplete);

            $("<tbody>", {
                html: items.join("")
            }).appendTo("#general");
        });

        $("#immunization").submit(function(event) {
            event.preventDefault();
            var input = {
                appointment: $(this).find("#appointment").val(),
                vaccine: $(this).find("#vaccine").val(),
                administeredBy: $(this).find("#administered-by").val()
            }
            var url = "api/users/" + userID;
            var result = $.post(url, input);
            result.done(function(data) {
                location.reload();
            });
        });
    } );

    function insertTable(id, data) {
        var dateCol = 0;
        $(id).DataTable({
            data: data,
            columns: [
                {data: "date"},
                {data: "vaccine"}
            ],
            columnDefs: [{
                "visible": false,
                "targets": dateCol
            }],
            paging: false,
            info: false,
            drawCallback: function(settings) {
                var api = this.api();
                var rows = api.rows( {page: 'current'}).nodes();
                var last = null;

                api.column(dateCol, {page: 'currrent'}).data().each(function (group, i) {
                    // console.log(group + " " + i);
                    if (last !== group) {
                        $(rows).eq( i ).before(
                            '<tr class="group"><td colspan="1">'+ group +
                            '<button value =' + group + 'class="pure-button complete">complete</button>\
                            </td></tr>'
                        );
                    };
                    last = group;
                })
            }
        })

    }

    



}(this, this.document));
