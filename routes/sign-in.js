const express = require("express")
const router = express.Router()
const mysql_config = require("../config/mysql")
const connection = mysql_config



router.get("/", (req, res) => {
    res.render("sign-in", {error: false})
})

router.post("/", async (req, res, next) => {
    const mail_address = req.body.mail_address
    const password = req.body.password
    const post_data_check = !mail_address || !password
    if (post_data_check) {
        res.render("sign-in", {error: true,})
        return
    }
    next()
},(req, res, next) => {
    const mail_address = req.body.mail_address
    const password = req.body.password
    const sql = "select count(*) as count from user where mail_address = ? and password = ?"
    connection.query(sql,[mail_address,password],(err, result) => {
        if(err){
            console.log(err)
            res.render("sign-in",{error:true})
            return
        }
        if(!result[0].count){
            res.render("sign-in",{error:true})
            return;
        }
        next()
    })
},(req, res) => {
    const mail_address = req.body.mail_address
    const sql = "select id from user where mail_address = ?"
    connection.query(sql,[mail_address],(err, result) => {
        if(err){
            console.log(err)
            res.render("sign-in",{error:true})
            return
        }
        req.session.user_id = result[0].id
        res.redirect("/")
    })
})

module.exports = router