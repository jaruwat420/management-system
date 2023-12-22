$(document).ready(function () {
    $('.nav-login').on('click', function (e) {
        $('#loginModal').modal('show');
    });

    $('.message-error').css('display', 'none')
    $('.message-error2').css('display', 'none')

    // Register form
    $('.btn-singUp').click(function (e) {
        const usernameValue = document.getElementById('r_username').value;
        const lnameValue = document.getElementById('r_lname').value;
        const emailValue = document.getElementById('r_email').value;
        const passwordValue = document.getElementById('r_password').value;
        const passwordValueConfirm = document.getElementById('r_confirmPassword').value;

        if (usernameValue.length <= 0) {
            alert(`Please input username`);
            e.preventdefault()
        } else if (lnameValue.length <= 0) {
            alert(`Please input lastname`);
            e.preventdefault()
        } else if (emailValue.length <= 0) {
            alert(`Please input email`);
            e.preventdefault()
        } else if (passwordValue.length <= 0) {
            alert(`Please input password`);
            e.preventdefault()
        } else if (passwordValueConfirm.length <= 0) {
            alert(`Please input confirmPassword`);
            e.preventdefault()
        } else if (passwordValue != passwordValueConfirm) {
            alert(`Password no Match!`)
            e.preventdefault()
        }
        const userData = {
            username: usernameValue,
            lastname: lnameValue,
            email: emailValue,
            password: passwordValue,
            passwordConfirm: passwordValueConfirm,
        }
        $.ajax({
            type: "post", // หรือ "put" ตามที่คุณกำหนด
            url: "auth/login", // แก้ไข URL ตามที่เรียก API ของคุณ
            data: {
                username: userData.username,
                password: userData.password
            },
            dataType: "JSON",
            success: function (res) {
                if (res.status === 201) {
                    Swal.fire({
                        title: 'เข้าสู่ระบบสำเร็จ!',
                        text: 'กรุณากดยืนยันเพื่อทำการเข้าสู่ระบบ',
                        icon: 'success',
                    }).then(() => {
                        window.location.href = "/";
                    });
                } else {
                    Swal.fire('เกิดข้อผิดพลาด!', res.message, 'error');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let errorMessage = textStatus || 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
                Swal.fire('เกิดข้อผิดพลาด!', errorMessage, 'error');
            }
        });
    });

    // Login form
    $('.btn-singIn').click(function (e) {
        const usernameValue = document.getElementById('l_username').value;
        const passwordValue = document.getElementById('l_password').value;

        const newUser = {
            username: document.getElementById('l_username').value,
            password: document.getElementById('l_password').value,
        }
        $.ajax({
            type: "put",
            url: "auth/login",
            data: {
                username: newUser.username,
                password: newUser.password,
            },
            dataType: "json",
            success: function (res) {
                if (res.status === 201) {
                    Swal.fire({
                        title: 'เข้าสู่ระบบสำเร็จ!',
                        text: 'กรุณากดยืนยันเพื่อทำการเข้าสู่ระบบ',
                        icon: 'success',
                    }).then(() => {
                        window.location.href = "/";
                    });
                } else {
                    Swal.fire('เกิดข้อผิดพลาด!', res.message, 'error');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let errorMessage = textStatus || 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
                console.log(errorMessage);
                Swal.fire('เกิดข้อผิดพลาด!', errorMessage, 'error');
            }
        });
    });
});