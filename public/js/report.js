(function (window, document) {
    var completed = 0;
    var inProgress = 0;
    var overdue = 0;

    $(document).ready( function () {
        $('#table_id').DataTable({
            ajax: {
                url: 'http://localhost:3000/api/users',
                dataSrc: function (json) {
                    var output = [];
                    for (var i = 0; i < json.length; i++) {
                        var date = new Date(json[i].dateOfBirth);
                        json[i].dateOfBirth = date.yyyymmdd();
                        if (json[i].appointment) {
                            var app = new Date(json[i].appointment);
                            json[i].appointment = app.yyyymmdd();
                            var now = new Date();
                            if (app < now) {
                                json[i].appointment = app.yyyymmdd();//'<b style="color: red;">' + app.yyyymmdd() + "</b>";
                                overdue++;
                                output.push(json[i]);
                            } else {
                                inProgress++;
                            }
                        } else {
                            completed++;
                        }
                    }
                    printReport();
                    return output;
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
                {data: "appointment"},
                {data: "contactInfo"}
            ]
            
            // data: data
        });
    } );
    function printReport() {
        $("#completed").html(completed);
        $("#in-progress").html(inProgress);
        $("#overdue").html(overdue);

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
