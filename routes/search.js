const express = require("express")
const router = express.Router()
const connection = require("../config/mysql")

router.get("/",(req, res) => {
    res.render("search/search")
})


router.post("/option",
    (req, res,next) => {
        console.log(req.body)
        const {area, category, shop_name} = req.body;
        res.render("search/search_query",{area:area,category:category,shop_name:shop_name})
    })

router.post("/",
    (req, res, next) => {

    })

module.exports = router