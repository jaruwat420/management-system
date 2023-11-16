//--------------Reload DataTable-------------------//
get_dataTable();

//--------------Show Modal-------------------//
$('.btn-add-product').click(function () { 
    $('#modal_product').modal('show');    
});

//--------------Close Modal Create-------------------//
$('.btn-close-modal').click(function () { 
    $('#modal_product').modal('hide');
});
//--------------Close Modal Edit-------------------//
$('.btn-close-modal-edit').click(function () { 
    $('#modal_update_product').modal('hide');
});

//-------------Send Form Create-------------------//
$('.btn-save-product').click(function () { 
    const formData = new FormData();

    formData.append('categories_select', $('[name=category_option] option:selected').val());
    formData.append('product_name', $('#product_name').val());
    formData.append('product_image', $('#product_image')[0].files[0]);
    formData.append('product_description', $('#product_description').val());
    formData.append('product_price', $('#product_price').val());
    formData.append('product_price_sale', $('#product_price_sale').val());
    formData.append('product_qty', $('#product_qty').val());
    
    // validate
    const selected = $('[name=category_option] option:selected').val();
    const productName =  $('#product_name').val();
    const productImage =  $('#product_image')[0].files[0];
    const productPrice = $('#product_price').val();
    const productPriceSale = $('#product_price_sale').val();
    const productQty = $('#product_qty').val();
    if (selected === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณาเลือกประเภทสินค้า',
        });
        return;
    }
    
    if (productName === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอกชื่อสินค้า',
        });
        return;
    }
    
    if (typeof productImage === 'undefined') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณาเพิ่มรูปภาพสินค้า',
        });
        return;
    }
    
    if (productPrice === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอกราคาสินค้า',
        });
        return;
    }
    if (productPriceSale === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอกราคาสินค้า',
        });
        return;
    }
    
    if (productQty === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณาใส่จำนวนสินค้า',
        });
        return;
    }
    
    $.ajax({
        type: "PUT",
        url: "/product/create",
        data: formData,
        dataType: "JSON",
        contentType: false,
        processData: false,
        context: this,
        success: function (res) {
            if (res.status == 201) {
                alert(res.message);
            }
            // close modal
            // Reload DataTable
            // get_dataTable();
        },
        error: function(err){
            console.log(err);
        }
    });
});

//-------------DataTable-------------------//
function get_dataTable() {
    fetch('/product/dataTable')
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
                {data: 'product_name'},
                {data: 'product_image',
                render: function (data, type,  row){
                    return `<img src=/uploads/${data} alt="Category Image" style="max-width: 100%; max-height: 100%;" />`;
                }
                },
                {data: 'product_description'},
                {data: 'product_price'},
                {data: 'product_qty'},                
                {data: 'categoryId'},
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

//-------------Update Products-------------------//.
$('#dataTable').on('click', '.btn-edit', function() {
    var productId = $(this).data('id');
    $('#modal_update_product').modal('show');
})


//-------------Delete-------------------//
$('#dataTable').on('click', '.btn-delete', function() {
    var productId = $(this).data('id');
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
                url: '/product/delete/' + productId,
                data: { productId: productId },
                dataType: 'json',
                success: function (res) {
                    if (res.status == 201) {
                        Swal.fire('ลบข้อมูลสำเร็จ!', 'ลบข้อมูลที่เลือกแล้ว.', 'success')                            
                    }
                    $('#modal_product').modal('hide');

                },
                error: function (error) {
                    Swal.fire('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดขณะลบ', 'error');
                }
            });
        }
    });
});
