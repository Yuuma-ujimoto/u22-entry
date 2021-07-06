const connection = require("../../config/mysql")

module.exports = (req,res,next)=>{
    const owner_id = req.session.user_id;
    const day_off_list = req.body.day_off;
    const sql = "insert into day_off(day,shop_id) values(?,(select max(id) from shop where owner_id = ?))"
    day_off_list.forEach(day_off=>{
        connection.query(sql,[day_off,owner_id],err => {
            if(err){
                console.log(err)
                res.render("error/server-error")
                return
            }
        })
    })
    next()
}