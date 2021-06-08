const express = require("express")
const router = express.Router()

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
    const phone_number =  req.body.station
    const post_data = {
        shop_name:shop_name,
        postal_code:postal_code,
        address_1:address_1,
        address_2:address_2,
        address_3:address_3,
        station:station
    }

})

router.post("/preview",(req, res, next) => {

})

router.post("/confirm",(req, res, next) => {

})

router.post("/result",
    (req, res, next) => {
        const user_id = req.session.user_id
        const shop_name = req.body.shop_name
        let statement = []



    })



module.exports = router