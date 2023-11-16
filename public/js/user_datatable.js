
// Reload DataTable 
get_dataTable();

function get_dataTable() {
    fetch('/user/dataTable')
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
                {data: 'user_firstname'},
                {data: 'user_lastname'},
                {data: 'user_email'},
                {data: null,render: function (data, type, row) {
                    return `<button class="btn btn-warning btn-edit" id = "btn-edit" data-id="${data.user_id}">Edit</button>`;
                }
                },
                {data: null,render: function (data, type, row) {
                    return `<button class="btn btn-danger btn-delete" id = "btn-delete" data-id="${data.user_id}">Delete</button>`;
                }
                }
                ],
            });
        })
    .catch(error => console.error('Error:', error));
}

$('#dataTable').on('click', '.btn-delete', function() {
    var userId = $(this).data('id');
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
                url: '/user/delete/' + userId,
                data: { userId: userId },
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

// Modals
$('.btn-add-user').click(function (e) { 
    $('#userModal').modal('show');
    
});

$('.btn-save-user').click(function (e) { 
    const fistname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const passwordConfirm = $('#passwordConfirm').val();
    const userSelect =('user_select', $('[name=user_option] option:selected').val());
    console.log(fistname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log(passwordConfirm);
    console.log(userSelect);
    
});