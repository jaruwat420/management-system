$(document).ready(function () {
    const homeList = $('#list-home-list');
    const profileList = $('#list-profile-list');
    const messagesList = $('#list-messages-list');
    const settingsList = $('#list-settings-list');
    
    const listHome = $('#list-home');
    const listProfile = $('#list-profile');
    const listMsg = $('#list-messages');
    const listSettings = $('#list-settings');

    // home
    homeList.click(function () {
        listHome.addClass('show active');
        listProfile.removeClass('show active');
        listMsg.removeClass('show active');
        listSettings.removeClass('show active');
    });

    // profile
profileList.click(function () {
    const clickedProfile = $(this);
    listProfile.addClass('show active'); 
    const userId = clickedProfile.data('id');
    
    $.ajax({
        type: "PUT",
        url: "/auth/profile",
        data: {userId},
        dataType: "json",
        success: function (res) {
            const userData = res.userData;
            console.log(userData);
            const nameInput = $('#name');
            const lastnameInput = $('#lastname');
            const telephoneInput = $('#telephone');
            const addressInput = $('#address');
            const districtInput = $('#district');
            const countyInput = $('#county');
            const cityInput = $('#city');
            const postalInput = $('#postal');



            nameInput.val(userData.user_firstname);
            lastnameInput.val(userData.user_lastname);
            telephoneInput.val(userData.user_phone);
            addressInput.val(userData.user_address);
            districtInput.val(userData.user_district);
            countyInput.val(userData.user_county);
            cityInput.val(userData.user_city);
            postalInput.val(userData.user_postal_code);

            listHome.removeClass('show active');
            listMsg.removeClass('show active');
            listSettings.removeClass('show active');
        },
        error: function (error){
            console.error(error);
        }
    });
});
    

    // message
    messagesList.click(function () {
        listHome.removeClass('show active');
        listProfile.removeClass('show active');
        listMsg.addClass('show active');
        listSettings.removeClass('show active');
    });

    // settings
    settingsList.click(function () {
        listHome.removeClass('show active');
        listProfile.removeClass('show active');
        listMsg.removeClass('show active');
        listSettings.addClass('show active');
    });
});
