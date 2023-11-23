
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
                if (res.status === 201) {
                    Swal.fire('สำเร็จ!', `${res.message}`, 'success');    
                }
                //close modal file
                $('#addFileModal').modal('hide');
                //Reload
                get_dataTable();
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

    // Get_DataTable
    function get_dataTable() {
        DataTable = $('#myTable').DataTable({
            serverSide: false,
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
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
                { data: 'delivery_type' },
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
    // close modal view
    $('#closeBtn').click(function (e) { 
        $('#viewModal').modal('hide')
        
    });

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

    // edit
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
        $('#date-customer-receive').val(rowData.date_customer_receives);
        $('#documentNumber').val(rowData.receipt_number);
        $('#date-post').val(rowData.date_customer_receives);        
        $('#delivery-method').val(rowData.delivery_type);
        $('#delivery-method option[value="' + rowData.delivery_type + '"]').prop('selected', true);    
        $('#postal-code').val(rowData.ems_code);
        $('#date-receiving').val(rowData.date_sending_ems);

    });

    // view
    $('#myTable').on('click', '.btn-view', function () {
        $('#viewModal').modal('show');
        carId = $(this).data('id');

        $('#finance_name').val(rowData.finance);
        $('#tax_invoice').val(rowData.tax_invoice);
        $('#car_code').val(rowData.code);
        $('#contact_number').val(rowData.contact_number);
        $('#car_brand').val(rowData.brand);
        $('#car_model').val(rowData.model);
        $('#car_tank_number').val(rowData.tank_code);
        $('#car_engine_number').val(rowData.engine_code);
        $('#car_color').val(rowData.color);
        $('#car_year').val(rowData.year);
        $('#car_mile').val(rowData.mile);
        $('#car_license').val(rowData.license);
        $('#car_province').val(rowData.province);
        $('#car_grade').val(rowData.grade);
        $('#car_gear').val(rowData.no_auc);
        $('#car_auction_sign').val(rowData.no_cut);
        $('#car_engine_good').val(rowData.good_machine);
        $('#car_date').val(rowData.date);
        $('#car_estimate').val(rowData.estimate);
        $('#approved_price').val(rowData.approved_price);
        $('#price_end').val(rowData.price_end);
        $('#price_run').val(rowData.price_run);
        $('#price_finish').val(rowData.price_finish);
        $('#price_diff').val(rowData.diff_price_finish);
        $('#tax_number').val(rowData.tax_number);
        $('#auction_names').val(rowData.auction_name);
        $('#address').val(rowData.address);
        $('#member_ship_type').val(rowData.status);
        $('#entry_times').val(rowData.entry_times);
        $('#car_place').val(rowData.place);
        $('#re_mark').val(rowData.re_mark);
        $('#tax_player_number').val(rowData.taxpayer_number);
        $('#car_transfer').val(rowData.transfer);
        $('#description').val(rowData.description);
        $('#date_receive').val(rowData.date_of_receiving);
        $('#date_sending').val(rowData.date_of_sending);
        $('#date_receive_trans').val(rowData.date_receiving_trans);
        $('#delivery_type').val(rowData.delivery_type);
        $('#document_numbers').val(rowData.receipt_number);
        $('#date').val(rowData.date_customer_receives);
        $('#ems_code').val(rowData.ems_code);
        $('#date_sending_book').val(rowData.date_sending_ems);
        $('#address_sending_book').val(rowData.new_address);




    });
    
    // Checkbox add Address
    $('#defaultCheck1').on('change', () => {
        $('#newAddressSection').toggle(this.checked);
    })

    document.getElementById('defaultCheck1').addEventListener('change', function () {
        document.getElementById('newAddressSection').style.display = this.checked ? 'block' : 'none';
    });


    // update
    $('.btn-save').click(function (e) {
        const name = $('#auction_name').val();
        const address = $('#address-sending').val();
        const newAddress = $('#address-new-text').val();
        const description = $('#message-text').val();
        const dateReceive = $('#date-receive').val();
        const dateSending = $('#date-sending-transport').val();
        const dateReceiveTrans = $('#date-receive-transport').val();
        const dateCustomerReceive = $('#date-customer-receive').val();
        const documentNumber = $('#documentNumber').val();
        const datePost = $('#date-post').val();
        const postalCode = $('#postal-code').val();
        const dateOfReceiving = $('#date-receiving').val();

        let deliveryType = '';
        if (documentNumber) {
            deliveryType = "รับเอง";
        }
        if (postalCode) {
            deliveryType = "ไปรษณีย์";
        }
        
        // status
        let flag = '';
        if (dateReceive) {
            flag = 'R';
        }
        if (dateSending) {
            flag = 'S';
        }
        if (dateReceiveTrans) {
            flag = 'T';
        }
        if (dateCustomerReceive) {
            flag = 'C';
        }

        const data = {
            carId: carId,
            name: name,
            address: address,
            newAddress: newAddress,
            description: description,
            dateReceive: dateReceive,
            dateSending: dateSending,
            dateReceiveTrans: dateReceiveTrans,
            dateCustomerReceive: dateCustomerReceive,
            flag: flag,
            documentNumber: documentNumber,
            datePost: datePost,
            postalCode: postalCode,
            dateOfReceiving: dateOfReceiving,
            deliveryType: deliveryType
        }
        $.ajax({
            type: "PUT",
            url: "/dashboard/edit",
            data: data,
            dataType: "Json",
            success: function (res) {
                if (res.status === 201) {
                    Swal.fire('สำเร็จ!', `${res.message}`, 'success');
                }
                $('#editModal').modal('hide');

                // Reload dataTable
                get_dataTable();
            }
        });
    });
    //Date
    const dateInput = document.getElementById('date-receive'); 
    dateInput.addEventListener('change', (e)=>{
        const selectedDate = e.target.value;
        document.getElementById('display').innerHTML = `Selected date : ${selectedDate}`;
    })
    

});
