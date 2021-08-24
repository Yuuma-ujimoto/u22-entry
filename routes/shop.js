const express = require("express")
const router = express.Router()
const mysql_config = require("../config/mysql")
const connection = mysql_config


router.get("/:id",(req, res) => {
    res.render("shop/sample1",{shop_id:req.params.id})
})

module.exports = router