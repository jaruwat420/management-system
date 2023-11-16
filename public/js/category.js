// Reload Datatable Categories
get_dataTable();

$('.btn-add-category').click(function () { 
    $('#modal_category').modal('show');    
});

$('.btn-save-category').click(function () {

    const formData = new FormData();
    formData.append('category_name', $('#category_name').val());
    formData.append('category_image', $('#category_image')[0].files[0]);
    formData.append('category_description', $('#category_description').val());

    $.ajax({
    type: "PUT",
    url: "/categories/create",
    data: formData,
    contentType: false,
    processData: false,
    context: this,
    success: function (res) {
        if (res.status == 201) {
            
        }
    },
    error: function (error) {
        console.log(error);
    }
    });
});

function get_dataTable() {
    fetch('/categories/dataTable')
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
                {data: 'category_name'},
                {data: 'category_image',
                render: function (data, type,  row){
                    return `<img src=/uploads/${data} alt="Category Image" style="max-width: 100px; max-height: 100%;" />`;
                }
            },
                {data: 'category_detail'},
                    {data: null,render: function (data, type, row) {
                        return `<button class="btn btn-warning btn-edit" id = "btn-edit" data-id="${data.id}">Edit</button>`;
                    }
                    },
                    {data: null,render: function (data, type, row) {
                        return `<button class="btn btn-danger btn-delete" id = "btn-delete" data-id="${data.id}">Delete</button>`;
                    }
                    }
                ],
            });
        })
        .catch(error => console.error('Error:', error));
}

$('.btn-close-category').click(function (e) { 
    $('#modal_category').modal('hide');
    
});


//------------------------Delete Categories-----------------------------//
$('#dataTable').on('click', '.btn-delete', function() {
    var categoriesId = $(this).data('id');
    Swal.fire({
        title: 'คุณต้องการลบข้อมูล?',
        text: 'คุณจะไม่สามารถย้อนกลับได้!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบข้อมูล!',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: 'put',
                url: '/categories/delete/' + categoriesId,
                data: { categoriesId: categoriesId },
                dataType: 'json',
                success: function (res) {
                    if (res.status == 201) {
                        Swal.fire('ลบข้อมูลสำเร็จ!', 'ลบข้อมูลที่เลือกแล้ว.', 'success')                            
                    }
                    // Reload DataTable
                    get_dataTable();
                },
                error: function (error) {
                    Swal.fire('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดขณะลบ', 'error');
                }
            });
        }
    });
});
