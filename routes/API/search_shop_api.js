const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")

router.post("/all-shop",
    (req, res, next) => {
        let page = req.query.page
        if (!page) {
            page = 1
        }
        //　除外する件数を表示
        //
        const offset = (page -1) * 10
        const sql = "select * from shop where soft_delete = 0 and shop_status = 'fin' limit = 10 offset = ?;" +
            "select count(*) from shop where soft_delete = 0 and shop_status = 'fin' limit = 10 offset = ?"
        connection.query(sql, [offset], (err, result) => {
            if (err) {
                console.log(err)
                res.json({error: true})
                return
            }
            res.json({error: false, result: result[0],count:result[1].count})
        })
    })


module.exports = router