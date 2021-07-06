const express = require("express")
const router = express.Router()
const connection = require("../config/mysql")
router.get("/address",
    (req, res,next) => {
        const prefectures = req.params.prefectures
        const city = req.params.city

        let sql_where_query = ""
        let statement = []
        // 条件に応じてSQL文とStatementを追加
        if(!!prefectures){
            sql_where_query +="and prefectures = ?"
            statement.push(prefectures)
        }
        if(!!city){
            sql_where_query +="and city = ?"
            statement.push(prefectures)
        }


        const sql = `select * from shop where soft_delete = 0 ${sql_where_query}`
        connection.query(sql,statement,(err, result) => {
            if(err){
                res.render("search",{error:true})
                return
            }
            res.render("search",{result:result})
        })
    })

router.post("/",
    (req, res, next) => {

    })

module.exports = router