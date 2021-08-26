const express = require("express")
const router = express.Router()

router.get("/",
    (req, res) => {
    res.render("index/index")
})



router.get("/bd",(req, res) => {
    req.session.user_id = 1
    res.redirect("/create")
})

module.exports = router