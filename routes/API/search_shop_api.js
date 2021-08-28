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
        console.log(offset)
        const sql = "select * from shop where soft_delete = 0 and shop_status = 'fin' limit  10 offset  ? ; " +
                    "select count(*) from shop where soft_delete = 0 and shop_status = 'fin' limit  10 offset  ?"
        connection.query(sql, [offset,offset], (err, result) => {
            if (err) {
                console.log(err)
                res.json({error: true})
                return
            }
            res.json({error: false, result: result[0],count:result[1].count})
        })
    })


router.post("/query",(req, res, next) => {
    const area = req.body.area
    const category = req.body.category
    const shop_name = req.body.shop_name

    if(!area&&!category&&!shop_name){
        res.redirect("/search/")
    }


    let query_sql = ""
    let query_statement = []
    if(!!area){
        query_sql += "prefectures = ? and"
        query_statement.push(area)
    }
    if(!!category){
        query_sql += "shop_genre = ? and"
        query_statement.push(category)
    }
    if(!!shop_name){
        query_sql += "shop_name = ? and"
        query_statement.push(shop_name)
    }
    const sql = `select * from shop where ${query_sql} soft_delete = 0 and shop_status = 'fin' `
    connection.query(sql,query_statement,(err, result) => {
        if(err){
            console.log(err)
            res.json({error:true})
            return
        }
        res.json({error:false,result:result})
    })

})

module.exports = router