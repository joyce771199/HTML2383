const express = require('express');
const moment = require('moment');
const axios = require('axios');
const router = express.Router();
const admin = require('../firebase');
const db = require('../db');
const categoryList = require('../model/category-list');







// 登入
router.post('/login', function (req, res, next) {
    console.log('[準備登入]');
    console.log('[前端送來的資料]', req.body);
    // Create session cookie
    // https://firebase.google.com/docs/auth/admin/manage-cookies#create_session_cookie
    // 取得前端傳來的使用者 idToken
    const idToken = req.body.idToken;
    console.log('[前端傳來的idToken]', idToken);
    // 有效期間
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(sessionCookie => {
            // 成功產生sessionCookie
            console.log('sessionCookie', sessionCookie);
            const cookieName = "ntu-cookie";
            // 設定cookie
            const options = {
                maxAge: expiresIn,
                httpOnly: true
            };
            // 把cookie設定給瀏覽器
            res.cookie(cookieName, sessionCookie, options);
            // 回傳成功
            res.status(200).json({ 'msg': 'login!' });
        })
        .catch(err => {
            console.log(err);
            // 回傳前端錯誤訊息
            res.status(500).json(err);
        });
});

// 登出
router.post('/logout', function (req, res, next) {
    // Sign Out
    // https://firebase.google.com/docs/auth/admin/manage-cookies#sign_out
    const cookieName = "ntu-cookie";
    // 從cookies中取得指定cookieName的值
    const sessionCookie = req.cookies[cookieName] || "";
    // 清除cookie
    res.clearCookie(cookieName);
    admin.auth().verifySessionCookie(sessionCookie)
        .then(user => {
            // 與Firebase Auth通知此人的登入狀態與sessionCookie已失效
            admin.auth().revokeRefreshTokens(user.sub);
            // 回應前端成功
            res.status(200).json({ msg: 'Logout' })
        })
        .catch(err => {
            // 回應前端成功
            res.status(200).json({ msg: 'Logout' })
        });
});

// 取得商品分類清單
router.get('/category-list', function (req, res, next) {

    // 回傳資料給前端
    res.status(200).json({
        // categoryList: categoryList
        // 物件名稱依樣可以止寫一個
        categoryList
    })
});

// 新增商品 前端傳至後端
router.post('/product/create', function (req, res, next) {
    console.log('[準備新增商品]');
    console.log('[前端送來的資料]', req.body);
    // Add a document
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    const product = req.body;

    // 後端處理回復前端才會結案，msg可以放一些要打過去的alert
    // res.status(200).json({ msg: "OK!!" });

    // 連接db
    db
        .collection("productList")
        .add(product)
        .then(function (response) {
            // 回應前端成功
            res.status(200).json({
                msg: `${product.name}產品創建成功`,
                data: product,
                response
            });
        })
        .catch(function (error) {
            // 回應前端失敗
            res.status(500).json(error);
        });
});

// 更新商品
router.put('/product/:pid', function (req, res, next) {
    console.log('[準備更新商品]');
    // 取得物件req.body
    console.log('[前端送來的資料]', req.body);
    // 取得pid動態參數req.params.動態參數名
    console.log('[pid]', req.params.pid);
    const pid = req.params.pid;
    const product = req.body;
    db
        .doc(`productList/${pid}`)
        .update(product)
        .then(response => {
            res.status(200).json({
                msg: "產品更新成功",
                data: product,
                response
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// 刪除商品
router.delete('/product/:pid', function (req, res, next) {
    console.log('[準備刪除商品]');
    console.log('[pid]', req.params.pid);
    const pid = req.params.pid;
    db
        .doc(`productList/${pid}`)
        .delete()
        .then(response => {
            res.status(200).json({
                msg: "產品移除成功",
                data: pid,
                response
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
