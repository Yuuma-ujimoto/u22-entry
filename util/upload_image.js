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
    let file_name
    let file_ext
    let file_split_data

    //let statement_list = []

    for (let i = 0; i < img.length; i++) {
        file_name = img[i].md5

        file_split_data = img[i].name.split(".")
        file_ext = file_split_data[file_split_data.length - 1]

        params.Key = `${file_name}.${file_ext}`
        params.Body = img[i].data
        params.ContentType = img[i].mimetype

     //   statement_list.push([params.Key])

        s3.putObject(params, (err, data) => {
            if (err) {
                console.log("失敗")
                return
            }
            console.log("upload完了")
        })
        const sql = "insert into menu(menu_img,description,shop_id) value(?,?,(select max(id) from shop where owner_id = ?))"
        connection.query(sql, [params.Key, req.body.menu_description[i], user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.render("error/server-error")
                return
            }
        })

    }
    next()
}