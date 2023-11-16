const increaseButtons = document.querySelectorAll('.increase.items-count');
const reducedButtons = document.querySelectorAll('.reduced.items-count');

const inputElements = $('.toggle-add');
const qtyElement = document.getElementById('qtyValue');
const qtyValue = qtyElement.getAttribute('data-qty');

//Button Up
increaseButtons.forEach((increaseButton, i) => {
    increaseButton.addEventListener('click', () => {
        const currentValue = parseInt(inputElements.eq(i).val(), 10);
        inputElements.eq(i).val(currentValue + 1);
        if (currentValue + 1 > parseInt(qtyValue, 10)) {
            alert("จำนวนสินค้าในคลังมีจำนวนไม่พอ");
            inputElements.eq(i).val(currentValue);
        }
    });
});

//Button Down
reducedButtons.forEach((reducedButton, i) => {
    reducedButton.addEventListener('click', () => {
        const currentValue = parseInt(inputElements.eq(i).val(), 10);
        inputElements.eq(i).val(currentValue - 1);
    });
});

// Sending data
const addProductBtn = document.getElementById('btn-add-product');
addProductBtn.addEventListener('click', () => {
    const qtyInputs = document.querySelectorAll('.toggle-add');
    const proIdInputs = document.querySelectorAll('#proId');
    const dataToSubmit = [];
    qtyInputs.forEach((qtyInput, i) => {
        const qtyValue = qtyInput.value;
        const proIdInput = proIdInputs[i];
        const proIdValue = proIdInput.value;

        dataToSubmit.push({
            proId: proIdValue,
            proValue: qtyValue
        });
        $.ajax({
            type: "PUT",
            url: "/cart/add-to-cart-single",
            data: JSON.stringify(dataToSubmit),
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                if (res.status === 200) {
                    window.location.reload();       
                    // window.location.href = "/cart/checkout"         
                }
            }
        });
    });
});