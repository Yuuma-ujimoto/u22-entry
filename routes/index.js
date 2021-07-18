const express = require("express")
const router = express.Router()

router.get("/",
    (req, res) => {
    const user_id = req.session.user_id
    if(!!user_id){
        res.render("index/index")
    }
    else{
        res.render("index/nologin")
    }
})

router.get("/search",(req, res) => {
    res.render("search/search")
})

router.get("/bd",(req, res) => {
    req.session.user_id = 1
    res.redirect("/create")
})

module.exports = router