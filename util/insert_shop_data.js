const express = require("express")
const connection = require("../config/mysql")


module.exports = (req,res,next)=>{
    const shop_name = req.body.shop_name
    const shop_genre = req.body.genre
    const postal_code = req.body.postal_code
    const address_1 = req.body.address_1
    const address_2 = req.body.address_2
    const address_3 = req.body.address_3
    const station = req.body.station
    const mail_address = req.body.mail_address
    const phone_number =  req.body.phone_number
    const category = req.body.category
    const statement = [
        shop_name,
        postal_code,
        address_1,
        address_2,
        address_3,
        station,
        mail_address,
        phone_number,
        category,
    ]
    const template_type = 1
}