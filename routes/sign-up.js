const express = require("express")
const router = express.Router()
const mysql = require("mysql2")
const mysql_config = require("../config/mysql")
const connection = mysql_config

router.get("/", (req, res) => {
    res.render("sign-up", {error: false})
})

router.post("/", async (req, res, next) => {
    const mail_address = req.body.mail_address
    const user_name = req.body.user_name
    const password = req.body.password
    const password_re = req.body.password_re

    // メールアドレス正規表現チェック
    const mail_pattern = /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/
    if (!mail_address.match(mail_pattern)) {
        res.render("sign-up", {error: true})
        return
    }


    const post_data_check = !mail_address || !password || !user_name  || !password_re
    if (post_data_check) {
        res.render("sign-up", {error: true, message: "必要なデータが足りません"})
        return
    }
    if(password !== password_re){
        res.render("sign-up",{error:true,message:"パスワードと確認用のパスワードが一致しません"})
        return
    }


    next()

},  (req, res, next) => {
    const mail_address = req.body.mail_address
    const sql = "select count(*) as count from user where mail_address = ? "
    connection.query(sql, [mail_address], (err, result) => {
        if (err) {
            console.log(err)
            res.render("sign-up", {error: true, message: "server Error"})
            return
        }
        if (result[0].count) {
            res.render("sign-up", {error: true, message: "重複したユーザーメールアドレス"})
            return
        }
        next()
    })
}, (req, res, next) => {
    const mail_address = req.body.mail_address
    const user_name = req.body.user_name
    const password = req.body.password

    const sql = "insert into user(mail_address,user_name,password) value(?,?,?)"
    connection.query(sql,
        [mail_address,user_name,password],
        (err, result) => {
        if(err){
            console.log(err)
            res.render("sign-up",{error:true,message:"サーバーエラー"})
            return
        }
        next()
    })
},(req, res) => {
    const mail_address = req.body.mail_address;
    const sql = "select id from user where mail_address = ?"
    connection.query(sql,[mail_address],(err, result) => {
        if(err){
            console.log(err)
            res.render("sign-up",{error:true,message:"サーバーエラー"})
            return
        }
        req.session.user_id = result[0].id
        res.redirect("/")
    })
})

module.exports = router