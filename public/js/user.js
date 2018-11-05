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
                    console.log(val);
                    if ((key == "appointment" && val)|| key == "dateOfBirth") {
                        var date = new Date(val);
                        val = date.yyyymmdd();
                    }
                    if (val) {
                        items.push("<tr><th>" + field[key] + "</th><td>" + val + "</td></tr>");
                    }
                    
                } else if (key == "immunization") {
                    for (var i = 0; i < val.length; i++) {
                        if (val[i].administered == true) {
                            complete.push(val[i]);
                        } else {
                            incomplete.push(val[i]);
                        }
                    }
                } 
            });
            insertTable('#p-immunization', complete, false);
            insertTable('#s-immunization', incomplete, true);

            $("<tbody>", {
                html: items.join("")
            }).appendTo("#general");
        });
    } );

    function insertTable(id, data, withButton) {
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
            ordering: false,
            drawCallback: function(settings) {
                var api = this.api();
                var rows = api.rows( {page: 'current'}).nodes();
                var last = null;

                api.column(dateCol, {page: 'currrent'}).data().each(function (group, i) {
                    // console.log(group + " " + i);
                    if (last !== group) {
                        var button = "";
                        if (withButton && i == 0) {
                            button = '<button id ="' + group + '" class="pure-button complete">complete</button>'
                        }
                        var date = new Date(group);
                        console.log(group + " " + date)
                        $(rows).eq( i ).before(
                            '<tr class="group"><td colspan="1">'+ date.toDateString() + button + '</td></tr>'
                        );
                    };
                    last = group;
                })
                registerButtons();
            }
        })
    }

    function registerButtons() {
        $('button').click(function(event) {
            console.log(this.id);
            var input = {
                date: this.id
            }
            var url = "api/users/" + userID;
            var result = $.post(url, input);
            result.done(function(data) {
                location.reload();
            });
        });
    }

    
}(this, this.document));

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};

