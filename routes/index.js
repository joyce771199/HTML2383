const express = require('express');

const router = express.Router();
const db = require('../db');
const categoryList = require('../model/category-list');


// 首頁路由
router.get('/', async function (req, res, next) {
  // Cloud Firestore 規格
  // doc.id => 取得文件的id(字串)
  // doc.data() => 取得文件的原始資料(物件)
  const productList = [];
  // 取得產品列表 ES7
  // 使用await原因是因為db伺服器一定會在線，所以就不需要寫.then與.catch 去捕捉成功和失敗，簡易寫成await即可
  // 如要使用await就須使用async function
  const productCollection = await db.collection("productList").get();
  // console.log("產品集合", productCollection);

  // 將集合文件取出
  productCollection.forEach(doc => {

    const product = doc.data();
    // 將db給予的id加進去物件當中
    product.id = doc.id;
    // 從 陣列當中找符合id的對象 array.find(a=>條件);
    // categoryList.find(a => a.id == product.category);
    const category = categoryList.find(a => a.id == product.category);
    // product裡面的category更改為找尋出來的title分類
    product.category = category.title;
    console.log("product", product);
    // 將product新增至productList內
    productList.push(product);
  })


  // 將產品列表傳遞到模板
  res.locals.productList = productList;

  // 渲染模板 將views/index.ejs模板產生的HTML回應給瀏覽器
  res.render('index');
});
router.get('/about', (req, res, next) => {
  res.render("about-page");
});

module.exports = router;
