const express = require("express")
const connection = require("../config/mysql")


module.exports = (req,res,next)=>{
    const shop_name = req.body.shop_name
    const owner_id = req.session.user_id;
    const shop_genre = req.body.genre
    const postal_code = req.body.postal_code
    const address_1 = req.body.address_1
    const address_2 = req.body.address_2
    const address_3 = req.body.address_3
    const station = req.body.station
    const mail_address = req.body.mail_address
    const phone_number =  req.body.phone_number
    const category = req.body.category
    const template_type = 1
    const statement = [
        shop_name,
        shop_genre,
        owner_id,
        postal_code,
        address_1,
        address_2,
        address_3,
        station,
        mail_address,
        phone_number,
        category,
        template_type
    ]

    const sql = "insert into shop(shop_name,owner_id,shop_genre,prefectures,municipality,station,open_time,close_time,mail_address,phone_number,template_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?)"
    connection.query(sql,statement,err => {
        if(err){
            console.log(err)
            res.render("error/server-error")
            return
        }
        next()
    })
}