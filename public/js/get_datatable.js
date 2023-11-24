
$(document).ready(function () {
    get_dataTable();

    function toggleFields() {
        var deliveryMethod = document.getElementById("delivery-method");
        var postalCodeSection = document.getElementById("postal-code-section");
        var datePostSection = document.getElementById("date-post-section");

        var documentNumber = document.getElementById("document_number");
        var dateOfReceiving = document.getElementById("date-of-receiving");

        if (deliveryMethod.value == "รับเอง") {
            documentNumber.style.display = "block";
            datePostSection.style.display = "block";
            postalCodeSection.style.display = "none";
            dateOfReceiving.style.display = "none";
        } else if(deliveryMethod.value == "ไปรษณีย์"){
            postalCodeSection.style.display = "block";
            dateOfReceiving.style.display = "block";
            documentNumber.style.display = "none";
            datePostSection.style.display = "none";
        }else {
            documentNumber.style.display = "none";
            datePostSection.style.display = "none";
            postalCodeSection.style.display = "none";
            dateOfReceiving.style.display = "none";
        }
    }

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
                'csv', {
                    extend: 'excel',
                    text: 'Export to Excel',
                    title: 'Your Excel Export File Name',
                    filename: 'exported_data',
                    sheetName: 'Sheet 1'
                }, {
                    extend: 'pdf',
                    text: 'Export to PDF',
                    title: 'Your PDF Export File Name',
                    filename: 'exported_data',
                    customize: function (doc) {
                        // กำหนดฟอนต์ที่รองรับภาษาไทย
                        doc.defaultStyle.font = 'THSarabun, Arial, sans-serif';
                        
                        // กำหนดรูปแบบข้อความ (ตัวอักษร)
                        doc.styles.tableBodyEven.font = 'THSarabun';
                        doc.styles.tableBodyOdd.font = 'THSarabun';
                        
                        // กำหนดรูปแบบข้อความ (หัวเรื่อง)
                        doc.styles.tableHeader.font = 'THSarabun';
                    }
                }, 'print'
            ],
            "order": [[ 0, "desc" ]],
            "ordering": true,
            "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
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
                { data: 'tank_code' },
                { data: 'brand' },
                { data: 'model' },
                { data: 'province' },
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
    $('#BtnCloseModal').click(function (e) {
        $('#editModalNew').modal('hide')

    });
    let rowData;
    let carId;

    $('#myTable tbody').on('click', 'tr', function () {
        rowData = DataTable.row(this).data();
        console.log(rowData);
    });

    // edit
    $('#myTable').on('click', '.btn-edit', function () {
        $('#editModalNew').modal('show');
        carId = $(this).data('id');
        $('#auction_name').val(rowData.auction_name);
        $('#address-sending').val(rowData.address);
        $('#address-new-text').val(rowData.new_address);
        $('#message-text').val(rowData.description);
        $('#date-receive').val(rowData.date_of_receiving);
        $('#date-receive-transport').val(rowData.date_receiving_trans);
        $('#date-sending-transport').val(rowData.date_of_sending);
        // $('#date-customer-receive').val(rowData.date_customer_receives);
        $('#documentNumber').val(rowData.receipt_number);
        $('#date-post').val(rowData.date_customer_receives);   
        
        if (rowData.delivery_type == "") {
            const defaultDeliveryType = "เลือก";
            $('#delivery-method').val(defaultDeliveryType);
        }else{
            $('#delivery-method').val(rowData.delivery_type);
        }   
        // Reload Select Option function
        toggleFields();
        $('#delivery-method option[value="' + rowData.delivery_type + '"]').prop('selected', true);    
        $('#postal-code').val(rowData.ems_code);
        $('#date-receiving').val(rowData.date_sending_ems);

    });

    // Button View
    $('#myTable').on('click', '.btn-view', function () {
        $('#viewModal').modal('show');
        carId = $(this).data('id');

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
        $('#ViewCustomer_Entry_Time').text(rowData.entry_times);
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

    });
    
    // Checkbox add Address
    $('#defaultCheck1').on('change', () => {
        $('#newAddressSection').toggle(this.checked);
    })

    document.getElementById('defaultCheck1').addEventListener('change', function () {
        document.getElementById('newAddressSection').style.display = this.checked ? 'block' : 'none';
    });


    // update
    $('#BtnSaveModal').click(function (e) {
        const name = $('#auction_name').val();
        const address = $('#address-sending').val();
        const newAddress = $('#address-new-text').val();
        const description = $('#message-text').val();
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
        if (datePost) {
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
                $('#editModalNew').modal('hide');

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
