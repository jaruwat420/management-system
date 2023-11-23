$(document).ready(function () {

    // Reload DataTable
    get_dataTable();

    //show Modal
    $('#addBtn').click(function (e) {
        $('#depositModal').modal('show');

    });

    // close Modal
    $('#closeModalBtn').click(function (e) {
        $('#depositModal').modal('hide');
    });

    // Save
    $('#saveModalBtn').click(function (e) {
        const selectedType = $('#type-method').val();
        const fullDate = $('#date_mont_year').val();
        const fullName = $('#fullname').val();
        const depositBook = $('#deposit_book').val();
        const engineNumber = $('#engine_number').val();
        const car_color = $('#car_color').val();
        const carLicense = $('#car_license').val();
        const province = $('#province').val();
        const transferIn = $('#transfer_in').val();
        const transferPrice = $('#transfer_price').val();
        const receiveBook = $('#receive_book').val();
        const sendAgent = $('#send_agent').val();
        const returnAgent = $('#return_agent').val();
        const receive_book_cu = $('#receive_book_cu').val();
        const date_customer_receive_book = $('#date_customer_receive_book').val();
        const address_ems = $('#address_ems').val();
        const date_send_ems = $('#date_send_ems').val();
        const address = $('#address').val();
        const re_mark = $('#re_mark').val();
        //console.log(selectedType);
        const Data = {
            selectedType: selectedType,
            fullDate: fullDate,
            fullName: fullName,
            depositBook: depositBook,
            engineNumber: engineNumber,
            car_color: car_color,
            carLicense: carLicense,
            province: province,
            transferIn: transferIn,
            transferPrice: transferPrice,
            receiveBook: receiveBook,
            sendAgent: sendAgent,
            returnAgent: returnAgent,
            receive_book_cu: receive_book_cu,
            date_customer_receive_book: date_customer_receive_book,
            address_ems: address_ems,
            date_send_ems: date_send_ems,
            address: address,
            re_mark: re_mark,
        }
        $.ajax({
            type: "PUT",
            url: "/dashboard/create_deposit",
            data: Data,
            dataType: "Json",
            success: function (res) {
                if(res.status === 201){
                    Swal.fire('เพิ่มข้อมูลสำเร็จ',`${res.message}`,'success');
                }
                $('#depositModal').modal('hide');
                // Reload dataTable
                get_dataTable();

            }
        });
    });

    // DataTable
    function get_dataTable() {
        DataTable = $('#depositTable').DataTable({
            serverSide: false,
            ajax: {
                url: '/dashboard/get_datatable',
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
                { data: 'type' },
                { data: 'date' },
                { data: 'fullname' },
                { data: 'transfer_name' },
                { data: 'engine_number' },
                { data: 'color' },
                { data: 'license' },
                { data: 'province' },
                { data: 'transfer_in' },
                { data: 'transfer_price' },
                { data: 'receive_book_sik' },
                { data: 'send_agent' },
                { data: 'return_agent' },
                { data: 'receive_book_cu' },
                { data: 'date_customer_receive' },
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

    //Get Data
    $('#depositTable tbody').on('click', 'tr', function () {
        rowData = DataTable.row(this).data();
        console.log(rowData);
    });
    let rowData;
    let Id;

    //Edit
    $('#depositTable').on('click', '.btn-edit', function(){
        $('#depositEditModal').modal('show');
        Id = $(this).data('id');

        $('#type-method').val(rowData.type);
        $('#type-method option[value="' + rowData.type + '"]').prop('selected', true);
        $('#e_date_mont_year').val(rowData.date);
        $('#e_fullname').val(rowData.fullname);
        $('#e_deposit_book').val(rowData.transfer_name);
        $('#e_engine_number').val(rowData.engine_number);
        $('#e_color').val(rowData.color);
        $('#e_car_license').val(rowData.license);
        $('#e_province').val(rowData.province);
        $('#e_transfer_in').val(rowData.transfer_in);
        $('#e_transfer_price').val(rowData.transfer_price);
        $('#e_receive_book').val(rowData.receive_book_sik);
        $('#e_send_agent').val(rowData.send_agent);
        $('#e_return_agent').val(rowData.return_agent);
        $('#e_receive_book_cu').val(rowData.receive_book_cu);
        $('#e_date_customer_receive_book').val(rowData.date_customer_receive);
        $('#e_address_ems').val(rowData.address_ems);
        $('#e_date_send_ems').val(rowData.date_send_ems);
        $('#e_address').val(rowData.address);
        $('#e_re_mark').val(rowData.re_mark);
        
    })

    // Update 
    $('#saveEditModalBtn').click(function (e) { 

        const data = {
        Id: Id,
        type: $('#type-method').val(),
        type: $('#type-method').val(),
        date: $('#e_date_mont_year').val(),
        fullname: $('#e_fullname').val(),
        transfer_name: $('#e_deposit_book').val(),
        engine_number: $('#e_engine_number').val(),
        color: $('#e_color').val(),
        license: $('#e_car_license').val(),
        province: $('#e_province').val(),
        transfer_in: $('#e_transfer_in').val(),
        transfer_price: $('#e_transfer_price').val(),
        receive_book_sik: $('#e_receive_book').val(),
        send_agent: $('#e_send_agent').val(),
        return_agent: $('#e_return_agent').val(),
        receive_book_cu: $('#e_receive_book_cu').val(),
        date_customer_receive: $('#e_date_customer_receive_book').val(),
        address_ems: $('#e_address_ems').val(),
        date_send_ems: $('#e_date_send_ems').val(),
        address: $('#e_address').val(),
        re_mark: $('#e_re_mark').val() 
        }
        $.ajax({
            type: "PUT",
            url: "/dashboard/update_deposit",
            data: data,
            dataType: "Json",
            success: function (res) {
                if (res.status === 201) {
                    Swal.fire('อัพเดทข้อมูลสำเร็จ!', `${res.message}`, 'success');    
                }
                $('#depositEditModal').modal('hide');
                get_dataTable();
            }
        });
        
    });

    // close Modal Edit
    $('#closeEditModalBtn').click(function (e) { 
        $('#depositEditModal').modal('hide');
        
    });


});