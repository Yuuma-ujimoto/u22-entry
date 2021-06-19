const express = require("express")
const router = express.Router()
const connection = require("../config/mysql")
router.use((req,res,next)=>{
    if(!req.session.user_id){
        res.render("error/client-error")
        return
    }
    next()
})



router.get("/",
    (req, res,next) => {
        res.render("/create")
})

router.post("/",(req, res, next) => {
    const shop_name = req.body.shop_name
    const postal_code = req.body.postal_code
    const address_1 = req.body.address_1
    const address_2 = req.body.address_2
    const address_3 = req.body.address_3
    const station = req.body.station
    const phone_number =  req.body.phone_number
    const post_data = {
        shop_name:shop_name,
        postal_code:postal_code,
        address_1:address_1,
        address_2:address_2,
        address_3:address_3,
        station:station,
        phone_number:phone_number
    }
    const template_type = null
})

router.post("/preview-a",(req, res, next) => {
    //DBにデータなし
    const shop_name = req.body.shop_name
    const postal_code = req.body.postal_code
    const address_1 = req.body.address_1
    const address_2 = req.body.address_2
    const address_3 = req.body.address_3
    const station = req.body.station
    const phone_number =  req.body.phone_number
    const statement = [
        shop_name,
        postal_code,
        address_1,
        address_2,
        address_3,
        station,
        phone_number
    ]

    const template_type = null
    const sql = "insert into shop(shop_name,owner_id,)"

})

router.post("/preview-b",(req, res, next) => {
    // DBにデータあり
    const shop_id = req.body.shop_id;
    const sql = "select count(*) as count from shop where id = ? and type = 'draft'"
    connection.connect()
    connection.query(sql,[shop_id],(err, result) => {
        if(err){
            console.log(err)
            res.render("error/server-error")
            return
        }
        if(!result[0].count){
            res.render("error/client-error")
            return
        }
        next()
    })


},(req, res, next) => {
   const shop_id = req.body.shop_id
   const sql = "select * from shop where id = ?;select * from menu where shop_id = ?"
    connection.query(sql,[shop_id,shop_id],(err, result) => {
        if(err){
            console.log(err)
            res.render("error/server-error")
            return
        }
        const shop_data = result[0][0]
        const menu_data = result[1]
        res.send([shop_data,menu_data])
    })
})





router.post("/result",
    (req, res, next) => {
        // 登録処理
        // HP作成者id
        const owner_id = req.session.user_id
        // 店の名前
        const shop_name = req.body.shop_name
        const postal_code = req.body.postal_code
        // 都道府県
        const address_1 = req.body.address_1
        // 市区町村
        const address_2 = req.body.address_2
        // 番地
        const address_3 = req.body.address_3
        // 最寄り駅
        const station = req.body.station
        // 電話番号
        const phone_number =  req.body.phone_number
        const statement = [
            shop_name,
            postal_code,
            address_1,
            address_2,
            address_3,
            station,
            phone_number
        ]
        const sql = ""
    })




module.exports = router