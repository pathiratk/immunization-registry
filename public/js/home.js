(function (window, document) {

    $(document).ready( function () {
        $('#table_id').DataTable({
            ajax: {
                url: 'http://localhost:3000/api/patients',
                dataSrc: function (json) {
                    for (var i = 0; i < json.length; i++) {
                        var date = new Date(json[i].dateOfBirth);
                        json[i].dateOfBirth = date.yyyymmdd();
                        if (json[i].appointment) {
                            date = new Date(json[i].appointment)
                            json[i].appointment = date.yyyymmdd();
                        } else {
                            json[i].appointment = "";
                        }
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

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};
