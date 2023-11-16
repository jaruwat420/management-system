
// Reload DataTable 
get_dataTable();

function get_dataTable() {
    fetch('/user/dataTable')
        .then(res => res.json())
        .then(data => {
                dataTable = $('#dataTable').DataTable({
                serverSide: false,
                data: data,
                searching: true,
                destroy: true,
                "ordering": false,
                columns: [
                {data: null, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }},
                {data: 'user_firstname'},
                {data: 'user_lastname'},
                {data: 'user_email'},
                {data: 'user_password'},
                    {data: null,render: function (data, type, row) {
                        return `<button class="btn btn-warning btn-edit" id = "btn-edit" data-id="${data.car_id}">Edit</button>`;
                    }
                    },
                    {data: null,render: function (data, type, row) {
                        return `<button class="btn btn-danger btn-delete" id = "btn-delete" data-id="${data.car_id}">Delete</button>`;
                    }
                    }
                ],
            });
        })
    .catch(error => console.error('Error:', error));
}

