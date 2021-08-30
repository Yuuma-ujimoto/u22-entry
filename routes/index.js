const express = require("express")
const router = express.Router()

router.get("/",
    (req, res) => {
    res.render("index/index")
})


// デバッグ用にログイン処理をすっ飛ばすバックドア
// router.get("/debug",(req, res) => {
//     req.session.user_id = 1
//     res.redirect("/create")
// })

module.exports = router