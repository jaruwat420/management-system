const categoriesList = document.querySelectorAll('.categories_list').length;
for (let i = 0; i < categoriesList; i++) {
    document.querySelectorAll('.categories_list')[i].addEventListener('click', (e) => {
        const result = document.querySelectorAll('.categories_list')[i];
        const cat_id = result.getAttribute('aria-controls');

        $.ajax({
            type: "get",
            url: "find/" + cat_id,
            data: {
                cat_id: cat_id
            },
            dataType: "JSON",
            success: function (res) {
                var html = ``;
                for (let i = 0; i < res.length; i++) {
                    html += `                         
                        <div class="col-lg-4 col-md-6">
                            <div class="single-product">  
                            <a href="/product/single-product/${res[i].id}">
                                <img class="img-fluid" src="/uploads/${res[i].product_image}" alt="">
                            </a>
                                <div class="product-details">
                                    <h6>${res[i].product_name}</h6>
                                    <div class="price">
                                        <h6>฿${res[i].product_price}</h6>
                                        <h6 class="l-through">$210.00</h6>
                                    </div>
                                    <div class="prd-bottom">
                                        <a class="social-info" onclick="addProduct(${res[i].id});">
                                            <span class="ti-bag"></span>
                                            <p class="hover-text">เพิ่มลงตะกร้า</p>
                                        </a>
                                        <a href="" class="social-info">
                                            <span class="lnr lnr-heart"></span>
                                            <p class="hover-text">ชอบ</p>
                                        </a>
                                        <a href="" class="social-info">
                                            <span class="lnr lnr-sync"></span>
                                            <p class="hover-text">เปรียบเทียบ</p>
                                        </a>
                                        <a href="" class="social-info">
                                            <span class="lnr lnr-move"></span>
                                            <p class="hover-text">ดู</p>
                                        </a>                                
                                    </div>                             
                                </div>      
                            </div>
                        </div>
                    `
                }
            setTimeout(() => {
                $('#productList').html(html)
            }, 800);

            },
        });
    });
}

const productLength = document.querySelectorAll('.add-product').length;
for (let i = 0; i < productLength; i++) {
    document.querySelectorAll('.add-product')[i].addEventListener('click', (e) => {
        const result = document.querySelectorAll('.add-product')[i];
        const product_id = result.getAttribute('data-id');
        $.ajax({
            type: "put",
            url: "/cart/add-to-cart/" + product_id,
            data: {
                product_id: product_id
            },
            dataType: "JSON",
            success: function (res) {
                if (res.status === 200) {
                    alert(res.message);
                }else{
                    alert(res.message)
                }
            }
        });

    });

}

function addProduct(ele) {
    const product_id = ele;
}
