$(document).ready(function () {
    $('#registerBtn').click(function (e) { 
        const firstName = $('#first_name').val();
        const lastName = $('#last_name').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirm_password').val();

        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };        
        $.ajax({
            type: "put",
            url: "/auth/register",
            data: formData,
            dataType: "json",
            success: function (res) {
                if (res.status === 201) {
                    Swal.fire('สำเร็จ!', `${res.message}`, 'success');
                    setTimeout(() => {
                        window.location.href = "/auth/login";
                    }, 1500);

                } else if(res.status === 400){
                    Swal.fire('เกิดข้อผิดพลาด!', `${res.message}`, 'error');
                } else {
                    Swal.fire('เกิดข้อผิดพลาด!', `${res.message}`, 'error');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let errorMessage = textStatus || 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
                Swal.fire('เกิดข้อผิดพลาด!', errorMessage, 'error');
            }
        });        
    });
});