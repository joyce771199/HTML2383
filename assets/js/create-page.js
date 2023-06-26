
const $select = $("#productCategory");
// TODO: 取得商品分類清單
// PATH: "/api/category-list"
axios.get("/api/category-list")
    .then(res => {
        console.log("成功了!!", res);
        const categoryList = res.data.categoryList;
        categoryList.forEach(category => {
            // console.log(category);
            const opt = `<option value=${category.id}>${category.title}</option>`;
            $select.append(opt);

        });
    })
    .catch(err => {
        console.log("error");
    });

$('#createProductForm').submit(function (event) {
    event.preventDefault();
    const product = {
        name: $('#productName').val(),
        price: parseInt($('#productPrice').val()),
        image: $('#productImage').val(),
        category: $('#productCategory').val(),
        createdAt: new Date().getTime()
    };
    console.log('[新增產品]', product);
    // TODO: 創建商品API
    // PATH: "/api/product/create",
    // MATHOD: "POST",
    // DATA: product 新產品資料(物件)
    // axios.post(PATH,物件)
    axios.post("/api/product/create", product)
        .then(res => {
            console.log("成功建立產品");
            console.log(res);
            alert(res.data.msg);
            // 強制引導至首頁
            window.location = "/";
        })
        .catch(err => {
            console.log("error");
        });
});