// URL of Service
baseUrl = 'http://localhost:59193';

// Document Ready Event
$(document).ready(function () {
    getDataFromServer();

});

// Add loading panel on table when Ajax call starts
$(document).ajaxStart(function () {
    $("#playercontents").html('<div class="text-center"><div class="spinner-border"></div></div>');
});


// This functions add or edit player depending on Context
function addEditPlayer() {
	
    var name = $('#name').val();
    var score = $('#score').val();
	
    if (name == '' || score < 1) {
        alert("Invalid Data, Name Can't be empty, Number can't be less than 1");
        return;
    }

	// Edit Logic
    if ($('#addplayerbtn').text() == "Update") {
        var id = $('#editId').val();
        var data = {
            name: name,
            score: parseInt(score),
            id: parseInt(id)
        };
        $.ajax({
            type: "POST",
            url: baseUrl + "/api/v1/UpdatePlayer",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
        })
        .done(function (data) {
            displayData(data);
        }).fail(function () {
            alert('Unable to Edit Player');
            getDataFromServer();
        });
        $('#addplayerbtn').text('Add');
        clearInputs();
        return;
    }
	
	// Add Logic
    var data = {
        name: name,
        score: parseInt(score)
    };
    $.ajax({
        type: "POST",
        url: baseUrl + "/api/v1/createplayer",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",

    })
    .done(function (data) {
        displayData(data);
    }).fail(function () {
        alert('Unable to Add Player');
        getDataFromServer();
    });
    clearInputs();
}

// This function is used to clear input
function clearInputs() {
    $('#name').val('');
    $('#score').val('1');
}

// This function is used to load player data from server
function getDataFromServer() {
    $.ajax({
        method: "GET",
        url: baseUrl + "/api/v1/getallplayers"

    })
    .done(function (data) {
        displayData(data);
    }).fail(function () {
        alert('Unable to Fetch Information, Configure Base Url in file');
    });
}

// This functions load edit data in form
function loadEditPlayer(obj) {
    var id = $(obj).closest('tr').children('td:eq(0)').text();
    var name = $(obj).closest('tr').children('td:eq(1)').text();
    var score = $(obj).closest('tr').children('td:eq(2)').text();

    $('#name').val(name);
    $('#score').val(score);
    $('#editId').val(id);
    $('#addplayerbtn').text("Update");
}

// This function is used to delete player data
function deletePlayer(id) {
    $.ajax({
        method: "GET",
        url: baseUrl + "/api/v1/deleteplayer/" + id
    })
    .done(function (data) {
        displayData(data);
    }).fail(function () {
        alert('Unable to Delete Player');
        getDataFromServer();
    }); ;
}

// This function is used to format content of data
function displayData(data) {
    var content = '<table id="example" class="table table-striped table-bordered" style="width:100%"><thead><tr><th class="no-sort">Id</th><th class="no-sort">Name</th><th>Score</th><th class="no-sort">Delete</th><th class="no-sort">Edit</th></tr></thead><tbody>';
    for (var i = 0; i < data.length; i++) {
        content += '<tr><td>' + data[i].id + '</td><td>' + data[i].name + '</td><td>' + data[i].score + '</td><td><button type="button" onclick="deletePlayer(' + data[i].id + ')" class="btn btn-danger">Delete</button></td><td><button type="button" onclick="loadEditPlayer(this)" class="btn btn-success">Edit</button></td></tr>'
    }
    content += '</tbody></table>';
    $('#playercontents').html(content);
    $('#example').DataTable({
        "ordering": true,

        "aaSorting": [],
        "bPaginate": false,
        "info": false,
        "searching": false,
        columnDefs: [{
                orderable: false,
                targets: "no-sort"
            }
        ]
    });
}
