
$(document).ready(function () {
    get_dataTable();

    //Modals
    $('#addBtn').click(function (e) {
        $('#addFileModal').modal('show');

    });

    // close Modal
    $('#close_modal').click(function (e) {
        $('#addFileModal').modal('hide');

    });
    // Choose file
    $('.choose_file_excel').click(function () {
        $('#fileExcel').trigger('click');
    });

    $('#fileExcel').change(function () {
        let file_name = $('#fileExcel').val();
        $('#fileExcel_text').val(file_name);
        f_customer_data_general_preview();
    })

    // Uploads files
    function f_customer_data_general_preview() {
        let formElem = $('#form_import_data_excel');
        let formData = new FormData(formElem[0]);
        console.log(formData);
        $.ajax({
            url: "/dashboard/api-file-upload",
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (res) {

            }
        });

    }

    // Clear form
    document.addEventListener('DOMContentLoaded', function () {
        const clearForm = document.getElementById('clearFormUpload');
        clearForm.addEventListener('click', () => {
            $('#fileExcel').val("").trigger("change");
            $('#fileExcel_text').val('');
        });
    });

    // Get_dataTable
    function get_dataTable() {
        DataTable = $('#myTable').DataTable({
            serverSide: false,
            ajax: {
                url: '/dashboard/get_management',
                dataSrc: 'data'
            },
            searching: true,
            destroy: true,
            ordering: false,
            columns: [
                {
                    data: null, render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { data: 'license' },
                { data: 'province' },
                { data: 'tank_code' },
                { data: 'brand' },
                { data: 'model' },
                { data: 'auction_name' },
                { data: 'html' },    
                { data: 'history' },           
                {
                    data: null, render: function (data, type, row) {
                        return `<button class="btn btn-warning btn-edit" data-id="${data.id}"><i class="fas fa-edit"></i></button>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        return `<button class="btn btn-primary btn-view" data-id="${data.id}"><i class="fa fa-eye" aria-hidden="true"></i></button>`;
                    }
                }
            ]
        });
    }    

    // close Modal
    $('.modal-close').click(function (e) {
        $('#editModal').modal('hide')

    });
    let rowData;
    let carId;

    $('#myTable tbody').on('click', 'tr', function () {
        rowData = DataTable.row(this).data();
        console.log(rowData);
    });

    // Edit
    $('#myTable').on('click', '.btn-edit', function () {
        $('#editModal').modal('show');
        carId = $(this).data('id');

        $('#auction_name').val(rowData.auction_name);
        $('#address-sending').val(rowData.address);
        $('#address-new-text').val(rowData.new_address);
        $('#message-text').val(rowData.description);
        $('#date-receive').val(rowData.date_of_receiving);
        $('#date-receive-transport').val(rowData.date_receiving_trans);
        $('#date-sending-transport').val(rowData.date_of_sending);

    });

    // view
    $('#myTable').on('click', '.btn-view', function () {
        $('#viewModal').modal('show');
        carId = $(this).data('id');


    });

    // Checkbox add Address
    $('#defaultCheck1').on('change', () => {
        $('#newAddressSection').toggle(this.checked);
    })

    document.getElementById('defaultCheck1').addEventListener('change', function () {
        document.getElementById('newAddressSection').style.display = this.checked ? 'block' : 'none';
    });


    $('.btn-save').click(function (e) {
        const name = $('#auction_name').val();
        const address = $('#address-sending').val();
        const newAddress = $('#address-new-text').val();
        const description = $('#message-text').val();
        const dateReceive = $('#date-receive').val();
        const dateSending = $('#date-sending-transport').val();
        const dateReceiveTrans = $('#date-receive-transport').val();

        const data = {
            carId: carId,
            name: name,
            address: address,
            newAddress: newAddress,
            description: description,
            dateReceive: dateReceive,
            dateSending: dateSending,
            dateReceiveTrans: dateReceiveTrans
        }
        $.ajax({
            type: "PUT",
            url: "/dashboard/edit",
            data: data,
            dataType: "Json",
            success: function (res) {
                if (res) {
                    console.log(res);
                }
            }
        });

    });



});
