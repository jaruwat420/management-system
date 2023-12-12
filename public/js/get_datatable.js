$(document).ready(function () {
    get_datatable();

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
    })
    $("#btn-save").click(function (e) { 
        f_customer_data_general_preview();        
    });

    // Clear form uploads
    $("#btn_clear").click(() => {
        $('#fileExcel').val('');
        $('#fileExcel_text').val('');
    });

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
            beforeSend:function(){
                $('#btn-save').empty();
                $('#btn-save').append('<i class="fas fa-circle-notch fa-spin"></i> กำลังโหลด');
                $('#btn-save').prop('disabled', true);
            },
            success: function (res) {
                if (res.status === 201) {
                    Swal.fire('สำเร็จ!', `${res.message}`, 'success');
                }
                // Clear from uploads
                    $('#fileExcel').val('');
                    $('#fileExcel_text').val('');

                //close modal file
                $('#addFileModal').modal('hide');
                //Reload
                get_datatable();
            },
            error: function (){

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

    // close modal view
    $('#closeBtn').click(function (e) {
        $('#viewModal').modal('hide')

    });

    // close Modal
    $('#BtnCloseModal').click(function (e) {
        $('#editModalNew').modal('hide')

    });
    let rowData;
    let carId;
    let DataId;
    let historyData;

    $('#tbl_management tbody').on('click', 'tr', function () {
        rowData = DataTableResult.row(this).data();
        console.log(rowData);
    });

    $('#history_data tbody').on('click', 'tr', function () {
        searchData = SearchDataTable.row(this).data();
    });

    // button edit
    $('#tbl_management').on('click', '#btn-edit', function () {
        $('#editModalNew').modal('show');
        carId = $(this).data('id');

        // check date receiving
        if (rowData.date_of_receiving) {
            const Date_Split_Receiving = rowData.date_of_receiving.split('T')[0];
            $('#date-receive').val(Date_Split_Receiving);
        } else {
            $('#date-receive').val('');
        }

        if (rowData.date_of_sending) {
            const Date_Split_Sending_Time = rowData.date_of_sending.split('T')[0];
            $('#date-sending-transport').val(Date_Split_Sending_Time);
        } else {
            $('#date-sending-transport').val('');
        }

        if (rowData.date_receiving_trans) {
            const Date_Split_Receiving_Time = rowData.date_receiving_trans.split('T')[0];
            $('#date-receive-transport').val(Date_Split_Receiving_Time);
        } else {
            $('#date-receive-transport').val('');
        }
        if (rowData.date_customer_receives) {
            const DatePost = rowData.date_customer_receives.split('T')[0];
            $('#date-post').val(DatePost);
        } else {
            $('#date-post').val('');
        }
        if (rowData.date_sending_ems) {
            const Date_Send_Ems = rowData.date_sending_ems.split('T')[0];
            $('#date-post').val(Date_Send_Ems);
        } else {
            $('#date-post').val('');
        }

        $('#auction_name').val(rowData.auction_name);
        $('#address-sending').val(rowData.address);
        $('#address-new-text').val(rowData.new_address);
        $('#message-text').val(rowData.description);
        $('#documentNumber').val(rowData.receipt_number);


        if (rowData.delivery_type == "") {
            const defaultDeliveryType = "เลือก";
            $('#delivery-method').val(defaultDeliveryType);
        } else {
            $('#delivery-method').val(rowData.delivery_type);
        }
        // Reload Select Option function
        toggleFields();
        $('#delivery-method option[value="' + rowData.delivery_type + '"]').prop('selected', true);
        $('#postal-code').val(rowData.ems_code);

    });

    // button view
    $('#tbl_management').on('click', '#btn-view', function () {
        $('#viewModal').modal('show');
        DataId = $(this).data('id');
        $('#ViewCustomer_Finance_Name').text(rowData.finance);
        $('#ViewCustomer_Tax_Invoice').text(rowData.tax_invoice);
        $('#ViewCustomer_Car_Code').text(rowData.code);
        $('#ViewCustomer_Contact_Number').text(rowData.contact_number);
        $('#ViewCustomer_Car_Brand').text(rowData.brand);
        $('#ViewCustomer_Car_Model').text(rowData.model);
        $('#ViewCustomer_Car_Tank_Number').text(rowData.tank_code);
        $('#ViewCustomer_Car_Engine_Number').text(rowData.engine_code);
        $('#ViewCustomer_Car_Color').text(rowData.color);
        $('#ViewCustomer_Car_Year').text(rowData.year);
        $('#ViewCustomer_Car_Mile').text(rowData.mile);
        $('#ViewCustomer_Car_License').text(rowData.license);
        $('#ViewCustomer_Car_Province').text(rowData.province);
        $('#ViewCustomer_Car_Grade').text(rowData.grade);
        $('#ViewCustomer_Car_Gear').text(rowData.no_auc);
        $('#ViewCustomer_Car_Auction_Sign').text(rowData.no_cut);
        $('#ViewCustomer_Engine_Good').text(rowData.good_machine);
        $('#ViewCustomer_Car_Date').text(rowData.date);
        $('#ViewCustomer_Car_Estimate').text(rowData.estimate);
        $('#ViewCustomer_Approve_Price').text(rowData.approved_price);
        $('#ViewCustomer_Price_End').text(rowData.price_end);
        $('#ViewCustomer_Price_Run').text(rowData.price_run);
        $('#ViewCustomer_Price_Finish').text(rowData.price_finish);
        $('#ViewCustomer_Price_Diff').text(rowData.diff_price_finish);
        $('#ViewCustomer_Tax_Number').text(rowData.tax_number);
        $('#ViewCustomer_Auction_Name').text(rowData.auction_name);
        $('#ViewCustomer_Address').text(rowData.address);
        $('#ViewCustomer_Member_Type').text(rowData.status);
        $('#ViewCustomer_Telephone').text(rowData.telephone);
        $('#ViewCustomer_Entry_Time').text(rowData.entry_times);
        $('#ViewCustomer_Auction_location').text(rowData.auction_location);
        $('#ViewCustomer_Car_Place').text(rowData.place);
        $('#ViewCustomer_Remark').text(rowData.re_mark);
        $('#ViewCustomer_Member_Tax_Player_Number').text(rowData.taxpayer_number);
        $('#ViewCustomer_Car_Transfer').text(rowData.transfer);
        $('#ViewCustomer_Description').text(rowData.description);
        $('#ViewCustomer_Date_Receive').text(rowData.date_of_receiving);
        $('#ViewCustomer_Date_Sending').text(rowData.date_of_sending);
        $('#ViewCustomer_Date_Receive_Transfer').text(rowData.date_receiving_trans);
        $('#ViewCustomer_Delivery_Type').text(rowData.delivery_type);
        $('#ViewCustomer_Document_Number').text(rowData.receipt_number);
        $('#ViewCustomer_Date').text(rowData.date_customer_receives);
        $('#ViewCustomer_Ems_Code').text(rowData.ems_code);
        $('#ViewCustomer_Date_Sending_Book').text(rowData.date_sending_ems);
        $('#ViewCustomer_Address_Sending_Book').text(rowData.new_address);
        $.ajax({
            type: "post",
            url: "/dashboard/history",
            data: { DataId },
            dataType: "json",
            success: function (res) {
                if ($.fn.DataTable.isDataTable('#history_data')) {
                    $('#history_data').DataTable().destroy();
                }
                SearchDataTable = $('#history_data').DataTable({
                    data: res.data,
                    searching: false,
                    columns: [
                        {
                            data: null,
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: 'action_type' },
                        { data: 'item_type' },
                        { data: 'item_id' },
                        {
                            data: null,
                            render: function (data, type, row) {
                                return `<a href = "#" id="btn-view-detail" data-id="${data.id}">รายละเอียดเพิ่มเติม</a>`
                            }
                        },
                        { data: 'createdAt' },
                        { data: 'user_new_name' },
                    ]
                });
            }
        });
    });

    // Button view Detail New
    $('#history_data').on('click', '#btn-view-detail', function () {
        $("#modal-view-detail").modal('show');
        DataId = $(this).data('id');
        $.ajax({
            type: "POST",
            url: "/dashboard/get_log_history",
            data: { DataId },
            dataType: "JSON",
            success: function (res) {
                const changeDataArray = res.Data.map(item => item.change_data);
                const jsonString = changeDataArray.join('');
                const DataObject = JSON.parse(jsonString)
                console.log(DataObject);
                const Date_Of_Receive_Old = DataObject["วันที่รับเล่มทะเบียนเก่า"];
                const Date_Of_Receive_New = DataObject["วันที่รับเล่มทะเบียนใหม่"];
                const Date_Send_Transfer_Old = DataObject["วันที่ส่งโอนเก่า"];
                const Date_Send_Transfer_New = DataObject["วันที่ส่งโอนใหม่"];
                const Date_Receive_Transfer_Old = DataObject["วันที่รับโอนจากขนส่งเก่า"];
                const Date_Receive_Transfer_New = DataObject["วันที่รับโอนจากขนส่งใหม่"];
                const Delivery_Send_Old = DataObject["ประเภทการส่งเก่า"];
                const Delivery_Send_New = DataObject["ประเภทการส่งใหม่"];
                const Document_Number_Old = DataObject["เลขที่เอกสารเก่า"];
                const Document_Number_New = DataObject["เลขที่เอกสารใหม่"];
                const Postal_Code_Old = DataObject["หมายเลขพัสดุเก่า"];
                const Postal_Code_New = DataObject["หมายเลขพัสดุใหม่"];
                const Date_Send_Book_Old = DataObject["วันที่ส่งเล่มเอกสารเก่า"];
                const Date_Send_Book_New = DataObject["วันที่ส่งเล่มเอกสารใหม่"];
                const Address_Old = DataObject["ที่อยู่เก่า"];
                const Address_New = DataObject["ที่อยู่ใหม่"];
                const Re_Mark_Old = DataObject["หมายเหตุเก่า"];
                const Re_Mark_New = DataObject["หมายเหตุใหม่"];
                const Status_Old = DataObject["สถานะเก่า"];
                const Status_New = DataObject["สถานะใหม่"];
                const Edit_By = DataObject["แก้ไขโดย"];
                const Date_Create = DataObject["วันที่สร้าง"];
                $("#Date_Receive_Old").text(Date_Of_Receive_Old);
                $("#Date_Receive_New").text(Date_Of_Receive_New);
                $("#Date_Send_Old").text(Date_Send_Transfer_Old);
                $("#Date_Send_New").text(Date_Send_Transfer_New);
                $("#Date_Receive_Transfer_Old").text(Date_Receive_Transfer_Old);
                $("#Date_Receive_Transfer_New").text(Date_Receive_Transfer_New);
                $("#Delivery_Type_Old").text(Delivery_Send_Old);
                $("#Delivery_Type_New").text(Delivery_Send_New);
                $("#Postal_Code_Old").text(Postal_Code_Old);
                $("#Postal_Code_New").text(Postal_Code_New);
                $("#Document_Number_Old").text(Document_Number_Old);
                $("#Document_Number_New").text(Document_Number_New);
                $("#Date_Send_Book_Old").text(Date_Send_Book_Old);
                $("#Date_Send_Book_New").text(Date_Send_Book_New);
                $("#Address_Old").text(Address_Old);
                $("#Address_New").text(Address_New);
                $("#Remark_Old").text(Re_Mark_Old);
                $("#Remark_New").text(Re_Mark_New);
                $("#Date_Create").text(Date_Create);
                $("#Date_Last_Update").text(Date_Create);
                $("#Edit_By").text(Edit_By);

            }
        });

    });

    // close btn view detail
    $('#close-btn-view-detail').click(function (e) {
        $("#modal-view-detail").modal('hide');
    });
    // Checkbox add Address
    $('#defaultCheck1').on('change', () => {
        $('#newAddressSection').toggle(this.checked);
    })

    document.getElementById('defaultCheck1').addEventListener('change', function () {
        document.getElementById('newAddressSection').style.display = this.checked ? 'block' : 'none';
    });

    //Modal Button Update 
    $('#BtnSaveModal').click(function (e) {
        const status = "update";
        const name = $('#auction_name').val();
        const address = $('#address-sending').val();
        const newAddress = $('#address-new-text').val();
        const descriptions = $('#message-text').val();
        //Date formatted
        const dateReceive = $('#date-receive').val();
        const dateSending = $('#date-sending-transport').val();
        const dateReceiveTrans = $('#date-receive-transport').val();
        // const dateCustomerReceive = $('#date-customer-receive').val();
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

        // status flag
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
        if (datePost) {
            flag = 'C';
        }

        const data = {
            carId: carId,
            name: name,
            address: address,
            newAddress: newAddress,
            descriptions: descriptions,
            dateReceive: dateReceive,
            dateSending: dateSending,
            dateReceiveTrans: dateReceiveTrans,
            flag_status: flag,
            documentNumber: documentNumber,
            datePost: datePost,
            postalCode: postalCode,
            dateOfReceiving: dateOfReceiving,
            deliveryType: deliveryType,
            status: status,
        }
        $.ajax({
            type: "PUT",
            url: "/dashboard/update",
            data: data,
            dataType: "Json",
            success: function (res) {
                if (res.status === 201) {
                    Swal.fire('สำเร็จ!', `${res.message}`, 'success');
                }
                $('#editModalNew').modal('hide');
                get_datatable();
            }
        });
    });


    // Button Clear
    $('#btn-clear').click(function (e) {
        $('#Date_Receive_Search').val('').trigger('change');
        $('#Date_Send_Trans_Search').val('').trigger('change');
        $('#Date_Receive_Trans_Search').val('').trigger('change');
        $('#Car_License').val('').trigger('change');
        $('#Auction_Name').val('').trigger('change');
        $('#Auction_Round').val('').trigger('change');
        $('#Code_Finance').val('').trigger('change');
        $('#Auction_Location').val('').trigger('change');
        $('input[name=check_input_filter]:checked').val(0);
        get_datatable();

    });

    $(function () {
        var startDateReceive, endDateReceive;
        var startDateSendTrans, endDateSendTrans;
        var startDateReceiveTrans, endDateReceiveTrans;

        // Date_Receive
        $('input[name="Date_Receive_Search"]').daterangepicker({
            autoUpdateInput: false,
            autoApply: true,
            opens: 'left',
            autoApply: true,
        }, function (start, end, label) {
            startDateReceive = start.format('YYYY-MM-DD');
            endDateReceive = end.format('YYYY-MM-DD');
        });

        $('input[name="Date_Receive_Search"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        // Date_Send_Trans
        $('input[name="Date_Send_Trans_Search"]').daterangepicker({
            autoUpdateInput: false,
            opens: 'left',
            startDate: moment(),
        }, function (start, end, label) {
            startDateSendTrans = start.format('YYYY-MM-DD');
            endDateSendTrans = end.format('YYYY-MM-DD');
        });

        $('input[name="Date_Send_Trans_Search"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        // Date_Receive_Trans_Start
        $('input[name="Date_Receive_Trans_Search"]').daterangepicker({
            autoUpdateInput: false,
            opens: 'left',
            startDate: moment(),
        }, function (start, end, label) {
            startDateReceiveTrans = start.format('YYYY-MM-DD');
            endDateReceiveTrans = end.format('YYYY-MM-DD');
        });

        $('input[name="Date_Receive_Trans_Search"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });
    });

    $("#btn-search").click(function (e) {
        get_datatable();
    });

    // date receive
    $('#date-receive').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        defaultDate: moment().startOf('day')
    });
    $('#date-receive').on('dp.change', function (e) {
        var currentTime = moment().format('HH:mm:ss');
        var selectedDate = e.date.format('YYYY-MM-DD');
        var selectedDateTime = selectedDate + ' ' + currentTime;
        $('#date-receive').val(selectedDateTime);
    });
    ///date sending book transfer
    $('#date-sending-transport').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        defaultDate: moment().startOf('day')
    });
    $('#date-sending-transport').on('dp.change', function (e) {
        var currentTime = moment().format('HH:mm:ss');
        var selectedDate = e.date.format('YYYY-MM-DD');
        var selectedDateTime = selectedDate + ' ' + currentTime;
        $('#date-sending-transport').val(selectedDateTime);
    });
    ///date receive book transfer
    $('#date-receive-transport').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        defaultDate: moment().startOf('day')
    });
    $('#date-receive-transport').on('dp.change', function (e) {
        var currentTime = moment().format('HH:mm:ss');
        var selectedDate = e.date.format('YYYY-MM-DD');
        var selectedDateTime = selectedDate + ' ' + currentTime;
        $('#date-receive-transport').val(selectedDateTime);
    });




    // dataTable
    function get_datatable() {
        var searchData = {
            Date_Receive: $("#Date_Receive_Search").val(),
            Date_Send_Trans: $("#Date_Send_Trans_Search").val(),
            Date_Receive_Trans_Start: $("#Date_Receive_Trans_Search").val(),
            Car_License: $("#Car_License").val(),
            Auction_Name: $("#Auction_Name").val(),
            Auction_Round: $("#Auction_Round").val(),
            Code_Finance: $("#Code_Finance").val(),
            Auction_Location: $("#Auction_Location").val(),
            Filter_Mode: $('input[name="check_input_filter"]:checked').val(),
        }
        $.ajax({
            type: "POST",
            url: "/dashboard/ajax_search_management",
            data: searchData,
            dataType: "Json",
            success: function (res) {
                console.log(res.res.searchResults);
                DataTableResult = $("#tbl_management").DataTable({
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
                        { data: 'license' },
                        { data: 'tank_code' },
                        { data: 'brand' },
                        { data: 'model' },
                        { data: 'province' },
                        { data: 'auction_name' },
                        { data: 'auction_location' },
                        {
                            data: null,
                            render: function (data, type, row) {
                                if (data.flag === "R") {
                                    return '<span class="btn-sm" style="color: blue;">พร้อมส่งเล่มทะเบียน</span>';
                                } else if (data.flag === "S") {
                                    return '<span class="btn-sm" style="color: red;">รอโอนเล่มจากขนส่ง</span>';
                                } else if (data.flag === "T") {
                                    return '<span class="btn-sm" style="color: blue;">พร้อมส่งเล่มทะเบียน</span>';
                                } else if (data.flag === "C") {
                                    return '<span class="btn-sm" style="color: green;">ส่งเล่มทะเบียนเรียบร้อยแล้ว</span>';
                                } else {
                                    return '<span class="btn-sm" style="color: #FF6C22;">รอรับเล่มทะเบียน</span>';
                                }
                            }
                        },
                        { data: 'delivery_type' },
                        { data: 'history' },
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
                })
            }
        });
    }


})
