$(document).ready(function () {
    const inputElements = $('.toggle-add');
    const increaseButtons = document.querySelectorAll('.increase.items-count');
    const reducedButtons = document.querySelectorAll('.reduced.items-count');
    const totalResults = document.querySelectorAll('.total_result');
    const totalSum = $('.totalSum'); // ใช้ .totalSum เป็น jQuery object
    const priceElements = document.querySelectorAll('h5.product_price');
    const proId = document.querySelectorAll('#proId');


    // วนรอบเพื่อกำหนดค่าเริ่มต้นสำหรับ totalResult
    priceElements.forEach((priceElement, i) => {
        const dataPrice = parseFloat(priceElement.getAttribute('data-price'));
        const inputValue = parseInt(inputElements.eq(i).val(), 10);
        const result = dataPrice * inputValue;
        totalResults[i].innerText = result;
    });

    // รอบสำหรับปุ่มเพิ่มสินค้า
    increaseButtons.forEach((increaseButton, i) => {
        increaseButton.addEventListener('click', () => {
            const currentValue = parseInt(inputElements.eq(i).val(), 10);
            inputElements.eq(i).val(currentValue + 1);
            const dataPrice = parseFloat(priceElements[i].getAttribute('data-price'));
            const priceResult = dataPrice * (currentValue + 1);
            totalResults[i].innerText = priceResult;
            updateTotalSum();
        });
    });

    // รอบสำหรับปุ่มลดสินค้า
    reducedButtons.forEach((reducedButton, i) => {
        reducedButton.addEventListener('click', () => {
            const currentValue = parseInt(inputElements.eq(i).val(), 10);
            if (currentValue > 1) {
                const inputElement = inputElements.eq(i);
                const dataPrice = parseFloat(priceElements[i].getAttribute('data-price'));
                inputElement.val(currentValue - 1);
                const priceResult = dataPrice * (currentValue - 1);
                totalResults[i].innerText = priceResult;
                updateTotalSum();
            } else if (currentValue - 1 === 0) {
                const id = proId[i].value;
                Swal.fire({
                    title: 'คุณต้องการลบสินค้าออกจากตะกร้า?',
                    text: "หากคุณลบจะไม่สามารถย้อนกลับได้!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#FFBA00',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'ยกเลิก',
                    confirmButtonText: 'ลบสินค้า!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: "PUT",
                            url: "/cart/destroy-session",
                            data: {
                                id: id
                            },
                            dataType: "JSON",
                            success: function (res) {
                                if (res.status === 200) {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                });
            }
        });
    });

    // ฟังก์ชันสำหรับคำนวณและอัปเดตผลรวมทั้งหมด
    function updateTotalSum() {
        let resultSum = 0;
        totalResults.forEach((e, i) => {
            const initialValue = e.innerHTML;
            const numericValue = parseFloat(initialValue);

            if (!isNaN(numericValue)) {
                resultSum += numericValue;
            }
        });
        totalSum.text(resultSum);
    }
    updateTotalSum();

    //Payment
    const paymentButton = document.querySelector('.primary-btn.btn-process');
    paymentButton.addEventListener('click', () => {
        const qtyInputs = document.querySelectorAll('.toggle-add');
        const proIdInputs = document.querySelectorAll('#proId');
        const dataToSubmit = [];
        qtyInputs.forEach((qtyInput, index) => {
            const qtyValue = qtyInput.value;
            const proIdInput = proIdInputs[index];
            const proIdValue = proIdInput.value;

            dataToSubmit.push({
                proId: proIdValue,
                proValue: qtyValue
            });
        });
        $.ajax({
            type: "PUT",
            url: "/cart/add-to-cart",
            data: JSON.stringify(dataToSubmit),
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                if (res.status === 200) {
                    window.location.reload();
                    window.location.href = "/cart/checkout"
                }
            }
        });
    });
    

});