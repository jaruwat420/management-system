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
                
            }
        });
        
    });
});