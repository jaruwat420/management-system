$(document).ready(function () {
    $('#loginBtn').click(function (e) { 
        const username = $('#email').val();
        const password = $('#password').val();
        const formData = {
            username:username,
            password:password
        }
        $.ajax({
            type: "put",
            url: "/auth/login",
            data: formData,
            dataType: "Json",
            success: function (res) {
                if (res.status === 201) {
                    window.location.href = "/dashboard/"
                }
            },
            error: function (res, jqXHR, textStatus, errorThrown) {
                let errorMessage = textStatus ;
                Swal.fire('เกิดข้อผิดพลาด!', 'กรุณาตรวจสอบรหัสผ่าน!', 'error');
            }
        });
        
    });
});