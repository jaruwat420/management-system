$(document).ready(function () {


    // Check Format To Send 
    const btnSubmit = document.getElementById("btn-submit");
    btnSubmit.addEventListener('click', () => {
        const searchData = $("#search_registration").val().trim()
        console.log(searchData);
        if (searchData.length <= 8) {
            let validator = new RegExp('^([a-zA-Zก-ฮ0-9]{1,3})([\ |-]{1,1})([a-zA-Zก-ฮ0-9]{1,4})$', 'gi').test(val)
            console.log(validator);
        }

    });


    // Search Result 
    const resultsContainer = document.getElementById("s_results");
    const jsonData = {
        "results": [
            {
                "no": 1,
                "license_plate": "2ฒล-2128",
                "province": "กรุงเทพมหานคร",
                "chassis_number": "1234567890",
                "auction_date": "17/01/2567",
                "sequence": "4-8",
                "brand": "CHEVROLET",
                "model": "COLORADO X-CAB",
                "auction_location": "กรุงเทพมหานคร",
                "registration_status": "พร้อมรับเล่ม"
            },
            {
                "no": 3,
                "license_plate": "6ฒร-4455",
                "province": "นนทบุรี",
                "chassis_number": "1234567890",
                "auction_date": "20/01/2567",
                "sequence": "9-10",
                "brand": "ISUZU",
                "model": "D-MAX",
                "auction_location": "สำนักงานใหญ่",
                "registration_status": "-"
            },
            {
                "no": 4,
                "license_plate": "6ฒร-4455",
                "province": "สงขลา",
                "chassis_number": "1234567890",
                "auction_date": "20/01/2567",
                "sequence": "9-10",
                "brand": "ISUZU",
                "model": "D-MAX",
                "auction_location": "สำนักงานใหญ่",
                "registration_status": "-"
            },
            {
                "no": 5,
                "license_plate": "6ฒร-4455",
                "province": "พัทลุง",
                "chassis_number": "1234567890",
                "auction_date": "25/01/2567",
                "sequence": "10-20",
                "brand": "TOYOTA",
                "model": "Revo",
                "auction_location": "สำนักงานใหญ่",
                "registration_status": "-"
            },
            {
                "no": 6,
                "license_plate": "8กน-8888",
                "province": "ชลบุรี",
                "chassis_number": "1234567890",
                "auction_date": "20/01/2567",
                "sequence": "9-10",
                "brand": "ISUZU",
                "model": "D-MAX",
                "auction_location": "สำนักงานใหญ่",
                "registration_status": "-"
            },

        ]
    };

    jsonData.results.forEach(function (result) {
        const resultContainer = document.createElement("div");
        resultContainer.className = "registration-container";

        const mobileContent = document.createElement("div");
        mobileContent.className = "hide-mobile";
        mobileContent.innerHTML = 
        `
            <p class="small-col">${result.no}</p>
            <p class="small-col">${result.license_plate}</p>
            <p>${result.province}</p>
            <p>${result.chassis_number}</p>
            <p>${result.auction_date}</p>
            <p class="small-col">${result.sequence}</p>
            <p>${result.brand}</p>
            <p class="big-col">${result.model}</p>
            <p>${result.auction_location}</p>
            <p>${result.registration_status}</p>
        `;

        const desktopContent = document.createElement("div");
        desktopContent.className = "hide-desktop";
        desktopContent.innerHTML = 
        `
            <div class="title">No.</div>
            <div class="desc">${result.no}</div>
            <div class="title">ทะเบียน</div>
            <div class="desc">${result.license_plate}</div>
            <div class="title">จังหวัด</div>
            <div class="desc">${result.province}</div>
            <div class="title">เลขตัวถัง</div>
            <div class="desc">${result.chassis_number}</div>
            <div class="title">วันที่ประมูล</div>
            <div class="desc">${result.auction_date}</div>
            <div class="title">ลำดับ</div>
            <div class="desc">${result.sequence}</div>
            <div class="title">ยี่ห้อรถ</div>
            <div class="desc">${result.brand}</div>
            <div class="title">รุ่น</div>
            <div class="desc">${result.model}</div>
            <div class="title">สถานที่ประมูล</div>
            <div class="desc">${result.auction_location}</div>
            <div class="title">สถานะเล่มทะเบียน</div>
            <div class="desc">${result.registration_status}</div>
        `;

        resultContainer.appendChild(mobileContent);
        resultContainer.appendChild(desktopContent);

        resultsContainer.appendChild(resultContainer);
    });



    // Get Search Registration

});