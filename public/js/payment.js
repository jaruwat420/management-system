// Get dataTable
get_dataTable();
function get_dataTable() {
    fetch('/dashboard/datatable_payment')
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
            {data: 'bank_image',
            render: function (data, type,  row){
                return `<img style = "width:150px; height:100%;" src=/uploads/payment/${data} alt="Category Image" style="max-width: 100%; max-height: 100%;" />`;
            }
            },
            {data: 'bank_name'},
            {data: 'bank_account'},
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

// Button Show Modals
const paymentBtn = document.getElementById('btn-add-payment');
paymentBtn.addEventListener('click', () => {
    $('#paymentModal').modal('show');
});

// btn close Modals
const modalCloseBtn = document.getElementById('btn-close-payment');
modalCloseBtn.addEventListener('click', () => {
    $('#paymentModal').modal('hide');
});

// btn save Modals
const modalSaveBtn = document.getElementById('btn-save-payment');
modalSaveBtn.addEventListener('click', () => {
    const formData = new FormData();

    formData.append('bank_image', $('#bank_image')[0].files[0]);
    formData.append('bank_name', $('#bank_name').val());
    formData.append('bank_account', $('#bank_account').val());

    $.ajax({
        type: "PUT",
        url: "/dashboard/payment_create",
        data: formData,
        dataType: "JSON",
        contentType: false,
        processData: false,
        context: this,
        success: function (res) {
            
        }
    });
});

// Delete 
$('#dataTable').on('click', '.btn-delete', function() {
    const paymentId = $(this).data('id');
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
                type: 'PUT',
                url: '/dashboard/deletePayment/' +paymentId,
                data: { paymentId: paymentId },
                dataType: 'json',
                success: function (res) {
                    if (res.status == 201) {
                        Swal.fire('ลบข้อมูลสำเร็จ!', 'ลบข้อมูลที่เลือกแล้ว.', 'success')                            
                    }
                    $('#paymentModal').modal('hide');

                },
                error: function (error) {
                    Swal.fire('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดขณะลบ', 'error');
                }
            });
        }
    });
});
