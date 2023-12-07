$(document).ready(function () {
    // Reload
    get_datatable();

    //----------------------------search--------------------------------///
    $("#btn-search").click(function () {
        get_datatable();
    });

    filter_mode();

    //----------------------------Date Range--------------------------------///

    $(function () {
        $('input[name="Date_Of_Year"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });

        $('input[name="Date_Of_Year"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });


        $('input[name="Date_Of_Year"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

        $('input[name="Date_Send_Agent"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });

        $('input[name="Date_Send_Agent"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        $('input[name="Date_Send_Agent"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

        $('input[name="Date_Agent_Return"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });

        $('input[name="Date_Agent_Return"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        $('input[name="Date_Agent_Return"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

        $('input[name="Date_Customer_Receive"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });

        $('input[name="Date_Customer_Receive"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        $('input[name="Date_Customer_Receive"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

    });
});

//----------------------------dataTable--------------------------------///
function get_datatable() {
    var searchData = {
        Date_Of_Year: $("#Date_Of_Year").val(),
        Date_Send_Agent: $("#Date_Send_Agent").val(),
        Date_Agent_Return: $("#Date_Agent_Return").val(),
        Date_Customer_Receive: $("#Date_Customer_Receive").val(),
        Car_License: $("#Car_License").val(),
        Customer_Name: $("#Customer_Name").val(),
        Engine_Number: $("#Engine_Number").val(),
        Filter_Mode: $('input[name="check_input_filter"]:checked').val(),
    };
    $.ajax({
        type: "PUT",
        url: "/dashboard/ajax_deposit_search",
        data: searchData,
        dataType: "JSON",
        success: function (res) {
            console.log(res);
            DataTable = $('#tbl_deposit').DataTable({
                data: res.res.searchResults,
                processing: true,
                serverSide: false,
                destroy: true,
                searching: false,
                columns: [
                    {
                        data: null,
                        render: function (data, type, row, meta) {
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
                    { data: 'receive_book_cu' },
                    { data: 'edit_by' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `<button class="btn btn-warning" id="btn-edit" data-id="${data.id}"><i class="fas fa-edit"></i></button>`;
                        }
                    },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `<button class="btn btn-primary" id="btn-view" data-id="${data.id}"><i class="fa fa-eye" aria-hidden="true"></i></button>`;
                        }
                    }
                ]
            });
        }
    });
}

// Datatable detail
function search_history(){
    $("#tbl_history").DataTable({

    })
}

// btn clear
$("#btn-clear").click(function () { 
    $("#Car_License").val("").trigger('change');
    $("#Date_Of_Year").val("").trigger('change');
    $("#Date_Send_Agent").val("").trigger('change');
    $("#Date_Agent_Return").val("").trigger('change');
    $("#Date_Customer_Receive").val("").trigger('change');
    $("#Car_License").val("").trigger('change');
    $("#Customer_Name").val("").trigger('change');
    $("#Engine_Number").val("").trigger('change');
    $('input[name="check_input_filter"]:checked').val("").trigger('change');
    get_datatable();
    
});

//show Modal
$('#addBtn').click(function (e) {
    $('#depositModal').modal('show');

});

// close Modal
$('#closeModalBtn').click(function (e) {
    $('#depositModal').modal('hide');
});

//----------------------------Create Data--------------------------------///
$('#saveModalBtn').click(function (e) {
    const selectedType = $('#type-method').val();
    const fullDate = $('#date_mont_year').val();
    const fullName = $('#fullname').val();
    const depositBook = $('#deposit_book').val();
    const engineNumber = $('#engine_number').val();
    const car_colors = $('#car_colors').val();
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
    
    let flag_status = "";
    
    if (sendAgent) {
        flag_status = "F";
    }
    if (returnAgent) {
        flag_status = "T";
    }
    if (date_customer_receive_book){
        flag_status = "S"
    }

    const Data = {
        selectedType: selectedType,
        fullDate: fullDate,
        fullName: fullName,
        depositBook: depositBook,
        engineNumber: engineNumber,
        car_colors: car_colors,
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
        flag_status: flag_status
    }
    $.ajax({
        type: "PUT",
        url: "/dashboard/create_deposit",
        data: Data,
        dataType: "Json",
        success: function (res) {
            if (res.status === 201) {
                Swal.fire('เพิ่มข้อมูลสำเร็จ', `${res.message}`, 'success');
            }
            $('#depositModal').modal('hide');
                get_datatable();
        }
    });
});


$('#tbl_deposit tbody').on('click', 'tr', function () {
    rowData = DataTable.row(this).data();
    console.log(rowData);
});
let rowData;
let Id;

//----------------------------Edit--------------------------------///
$('#tbl_deposit').on('click', '#btn-edit', function () {
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

//----------------------------Button Save Modal Update--------------------------------///
$('#saveEditModalBtn').click(function (e) {

    const data = {
        Ids: Id,
        types: $('#type-method').val(),
        dates: $('#e_date_mont_year').val(),
        fullnames: $('#e_fullname').val(),
        transfer_names: $('#e_deposit_book').val(),
        engine_numbers: $('#e_engine_number').val(),
        colors: $('#e_color').val(),
        licenses: $('#e_car_license').val(),
        provinces: $('#e_province').val(),
        transfer_ins: $('#e_transfer_in').val(),
        transfer_prices: $('#e_transfer_price').val(),
        receive_book_siks: $('#e_receive_book').val(),
        send_agents: $('#e_send_agent').val(),
        return_agents: $('#e_return_agent').val(),
        receive_book_cus: $('#e_receive_book_cu').val(),
        date_customer_receives: $('#e_date_customer_receive_book').val(),
        address_emss: $('#e_address_ems').val(),
        date_send_emss: $('#e_date_send_ems').val(),
        addresss: $('#e_address').val(),
        re_marks: $('#e_re_mark').val()
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
            get_datatable();
        }
    });

});

// close Modal Edit
$('#closeEditModalBtn').click(function (e) {
    $('#depositEditModal').modal('hide');
});

//----------------------------View Modal--------------------------------///
$('#tbl_deposit').on('click', '#btn-view', function () {
    $('#depositViewModal').modal('show');
    DataId = $(this).data('id');
    $('#ViewCustomer_CarType').text(rowData.type);
    $('#ViewCustomer_Date').text(rowData.date);
    $('#ViewCustomer_Name').text(rowData.fullname);
    $('#ViewCustomer_Transfer_Name').text(rowData.transfer_name);
    $('#ViewCustomer_Engine_Number').text(rowData.engine_number);
    $('#ViewCustomer_Color').text(rowData.color);
    $('#ViewCustomer_Car_License').text(rowData.license);
    $('#ViewCustomer_Car_Province').text(rowData.province);
    $('#ViewCustomer_Transfer_In').text(rowData.transfer_in);
    $('#ViewCustomer_Transfer_Price').text(rowData.transfer_price);
    $('#ViewCustomer_Receive_Book').text(rowData.receive_book_sik);
    $('#ViewCustomer_Send_Agent').text(rowData.send_agent);
    $('#ViewCustomer_Return_Agent').text(rowData.return_agent);
    $('#ViewCustomer_Return_Book_CU').text(rowData.receive_book_cu);
    $('#ViewCustomer_Date_Receive_Book').text(rowData.date_customer_receive);
    $('#ViewCustomer_Address_Ems').text(rowData.address_ems);
    $('#ViewCustomer_Date_Send_Ems').text(rowData.date_send_ems);
    $('#ViewCustomer_Address').text(rowData.address);
    $('#ViewCustomer_Remark').text(rowData.re_mark);
    //console.log(DataId);
    $.ajax({
        type: "post",
        url: "/dashboard/ajax_deposit_history",
        data: {DataId},
        dataType: "Json",
        success: function (res) {
            if ($.fn.DataTable.isDataTable('#tbl_history')) {
                $('#tbl_history').DataTable().destroy();
            }
            HistoryDataTable = $("#tbl_history").DataTable({
                data: res.data,
                searching: false,
                columns:[
                    {
                        data:null,
                        render: function (data, type ,row, meta){
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {data: "action_type"},
                    {data: "item_type"},
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `<a href="#" id="btn-view-detail" data-id="${data.id}">รายละเอียดเพิ่มเติม</a>`
                        }
                    },
                    {data: "updatedAt"},
                    {data: "user_new_name"},
                ]
            })
        }
    });
});

// modal view detail history
$("#tbl_history").on('click', '#btn-view-detail', function(){
    $("#modalViewHistory").modal('show');
    DataId = $(this).data('id');
    //console.log(DataId);
    $.ajax({
        type: "post",
        url: "/dashboard/get_deposit_history",
        data: {DataId},
        dataType: "Json",
        success: function (res) {
            const changeDataArray = res.Data.map(item => item.change_data);
            const jsonString = changeDataArray.join('');
            const DataObject = JSON.parse(jsonString)
            console.log(DataObject);
        }
    });
})
// Close modal View
$('#Btn_Close_view_Modal').click(function (e) {
    $('#depositViewModal').modal('hide');

});


// Filter search
function filter_mode() {
    var load = $('input[name=check_input_filter]:checked').val();
    //console.log(load);
    if (load == 1) {
        $('#Date_Of_Year').prop('disabled', false);
        $('#Date_Send_Agent').prop('disabled', false);
        $('#Date_Agent_Return').prop('disabled', false);
        $('#Date_Customer_Receive').prop('disabled', false);
    } else {
        $('#Date_Of_Year').prop('disabled', true);
        $('#Date_Send_Agent').prop('disabled', true);
        $('#Date_Agent_Return').prop('disabled', true);
        $('#Date_Customer_Receive').prop('disabled', true);
    }
}