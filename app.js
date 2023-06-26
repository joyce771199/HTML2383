// 從node_modules引用http-errors的模組
const createError = require('http-errors');
// 從node_modules引用express的模組
// 下方這些都是express模組必備
// require('名稱')會使用node_modules引用相對應模組
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// 取得路由資源
// require('相對路徑')會使用引用路徑上的資料
// 引用./routes/index.js作為indexRouter
const indexRouter = require('./routes/index');
// 引用./routes/product.js作為productRouter
const productRouter = require('./routes/product');
// 引用./routes/api.js作為apiRouter
const apiRouter = require('./routes/api');
// ***建立一個新頁面***
// 路由=>模板=>畫面
// 在routes下的index建立路由指定至模板頁面
// 在shared頁面建立相對應名稱模板

// 設定應用程式
const app = express();

// 定義視圖引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 設定前端資源路由 / => 可指向public資料夾內的資源
app.use(express.static(path.join(__dirname, 'public')));
// 設定前端資源路由 /assets/ => 可指向assets資料夾內的資源
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// 設定前端資源路由 /node_modules/ => node_modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// ***指派網域對應的任務
// 指派indexRouter負責處理 / 路由的邏輯
app.use('/', indexRouter);
// 指派productRouter負責處理 /product 路由的邏輯
app.use('/product', productRouter);
// ******指派apiRouter負責處理 /api 路由的邏輯********
// ##需在這裡有寫，才有辦法指定路由##
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
