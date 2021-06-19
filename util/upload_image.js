const connection = require("../config/mysql")
const AWS = require("aws-sdk")

const config = {
    accessKeyId: "xxxxx",
    secretAccessKey: "xxxxx",
    region: "region"
}

AWS.config.update(config)


module.exports = (req,res,next)=> {
    let params = {
        Bucket: "bucket-name",
        Key: null,
        Body: null,
        ContentType: null
    }
    const s3 = new AWS.S3()

    const user_id = req.session.user_id
    const img = req.file.menu_img
    const check_img_data = req.body.check_ima_data
    let check_img = []
    check_img_data.split(",").forEach(i=>{
      check_img.push(i.toLowerCase()==="true")
    })

    let file_name
    let file_ext
    let file_split_data


    //let statement_list = []
    let img_index = 0
    for (let i = 0; i < check_img.length; i++) {
        if(check_img[i]) {


            file_name = img[img_index].md5

            file_split_data = img[img_index].name.split(".")
            file_ext = file_split_data[file_split_data.length - 1]

            params.Key = `${file_name}.${file_ext}`
            params.Body = img[img_index].data
            params.ContentType = img[img_index].mimetype

            //   statement_list.push([params.Key])

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("失敗")
                    return
                }
                console.log("upload完了")
            })
            const sql = "insert into menu(menu_img,description.price,shop_id) value(?,?,(select max(id) from shop where owner_id = ?))"
            connection.query(sql, [params.Key, req.body.menu_description[i],req.body.menu_price[i], user_id], (err) => {
                if (err) {
                    console.log(err)
                    res.render("error/server-error")
                    res.end()
                    return
                }
            })
            img_index += 1
        }
        else {
            const sql = "insert into menu(menu_img,description,shop_id) value(?,?,(select max(id) from shop where owner_id = ?))"
            connection.query(sql, [null, req.body.menu_description[i], user_id], (err) => {
                if (err) {
                    console.log(err)
                    res.render("error/server-error")
                    return
                }
            })        }

    }
    next()
}