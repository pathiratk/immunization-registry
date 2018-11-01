(function (window, document) {

    $(document).ready( function () {
        $('#table_id').DataTable({
            ajax: {
                url: 'http://localhost:3000/api/users',
                dataSrc: function (json) {
                    for (var i = 0; i < json.length; i++) {
                        json[i].dateOfBirth = json[i].dateOfBirth.substring(0,10);
                        if (json[i].appointment) {
                            json[i].appointment = json[i].appointment.substring(0,10);
                        } else {
                            json[i].appointment = "";
                        }
                        // json[i].url = "<a href=\"http://localhost:3000/user/\" + json[i]><button>\></button></a>";
                        
                    }
                    return json;
                }
            },
            columnDefs: [{
                "targets": 0,
                "render": function (data, type, row, meta) {
                    return '<a href="/'+data+'">'+data+'</a>';
                }
            }],
            columns: [
                {data: "_id"},
                {data: "firstName"}, 
                {data: "lastName"}, 
                {data: "dateOfBirth"},
                {data: "gender"},
                {data: "appointment"}
                // {data: "url"}
            ]
            
            // data: data
        });
    } );

}(this, this.document));
