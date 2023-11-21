
$(document).ready(function () {
    // DataTable
    $("#myTable").DataTable();

    
    //Modals
    $('#addBtn').click(function (e) { 
        $('#addFileModal').modal('show');
        
    });

    // close Modal
    $('#close_modal').click(function (e) { 
        $('#addFileModal').modal('hide');
        
    });
    // Choose file
    $('.choose_file_excel').click(function(){
        $('#fileExcel').trigger('click');
    });

    $('#fileExcel').change(function(){
        let file_name = $('#fileExcel').val();
        $('#fileExcel_text').val(file_name);
        f_customer_data_general_preview();
    })

    function f_customer_data_general_preview (){
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



});
