const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")

router.post("/",
    (req, res, next) => {
        const page = req.query.page
        const sql = "select * from shop where soft_delete = 0 and shop_status = 'fin' limit = 10 offset = ? "
        connection.query(sql,[page],(err, result) => {
            if(err){
                console.log(err)
                res.json({error:true})
                return
            }
            res.json({error:false,result})
        })
    })

module.exports = router