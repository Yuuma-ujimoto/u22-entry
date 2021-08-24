const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")

router.post("/get-data", (req, res, next) => {
    const shop_id = parseInt(req.body.shop_id)
    const sql = "select count(*) as count from shop where id = ? and shop_status = 'fin' and soft_delete = 0"
    let end_flag = false
    connection.query(sql, shop_id, (err, result) => {
        if (err) {
            console.log(err)
            res.json({error: true})
            end_flag = true
            return
        }
        console.log(result)
        if (!result[0].count) {
            res.json({error: true})
            end_flag = true
        }
    })
    console.log(end_flag)
    if (end_flag) {
        return
    }
    next()
}, (req, res) => {
    const shop_id = parseInt(req.body.shop_id)

    const sql = "select * from shop where id = ? and shop_status = 'fin' and soft_delete = 0; " +
        "select * from shop_menu where shop_id = ? ;" +
        "select * from  shop_day_off where shop_id = ?"

    connection.query(sql, [shop_id, shop_id, shop_id], (err, result) => {
        if (err) {
            console.log(err)
            res.json({error:true})
            return
        }
        console.log(result)
        res.json({error:false,shop_data: result[0], menu_data: result[1], day_off_data: result[2]})
        console.log("x")
    })
    console.log("xx")
})


module.exports = router