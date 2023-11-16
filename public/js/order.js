// Reload DataTable
get_dataTable();

function get_dataTable() {
    fetch('/order/order_list')
        .then(res => res.json())
        .then(data => {
            dataTable = $('#dataTable').DataTable({
                serverSide: false,
                data: data,
                searching: true,
                destroy: true,
                "ordering": false,
                columns: [
                    {
                        data: null, render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    { data: 'date'},
                    { data: 'firstName'},
                    { data: 'lastName'},
                    { data: 'address'},
                    { data: 'address1'},
                    { data: 'phone'},
                    { data: 'state'},
                    { data: 'district'},
                    { data: 'county'},
                    { data: 'province'},
                    { data: 'postalCode'},
                    { data: 'shippingCost'},
                    { data: 'shippingProvince'},
                    {
                        data: null, render: function (data, type, row) {
                            return `<button class="btn btn-warning btn-edit" id = "btn-edit" data-id="${data.id}">Edit</button>`;
                        }
                    },
                    {
                        data: null, render: function (data, type, row) {
                            return `<button class="btn btn-danger btn-delete" id = "btn-delete" data-id="${data.id}">Delete</button>`;
                        }
                    }
                ],
            });
        })
        .catch(error => console.error('Error:', error));
}