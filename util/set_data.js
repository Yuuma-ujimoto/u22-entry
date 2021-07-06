module.exports = (req,type)=>{
    const shop_name = req.body.shop_name
    const owner_id = req.session.user_id;
    const shop_genre = req.body.genre
    const postal_code = req.body.postal_code
    const address_1 = req.body.address_1
    const address_2 = req.body.address_2
    const address_3 = req.body.address_3
    const station = req.body.station
    const mail_address = req.body.mail_address
    const phone_number = req.body.phone_number
    const category = req.body.category
    const template_type = 1
    if(type==="list") {
        return  [
            shop_name,
            shop_genre,
            owner_id,
            postal_code,
            address_1,
            address_2,
            address_3,
            station,
            mail_address,
            phone_number,
            category,
            template_type
        ]
    }
    else if(type==="object"){
        return {
            shop_name:shop_name,
            shop_genre:shop_genre,
            owner_id:owner_id,
            postal_code:postal_code,
            address_1:address_1,
            address_2:address_2,
            address_3:address_3,
            station:station,
            mail_address:mail_address,
            phone_number:phone_number,
            category:category,
            template_type:template_type
        }
    }
}