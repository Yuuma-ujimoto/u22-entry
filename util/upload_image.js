const connection = require("../config/mysql")
const AWS = require("aws-sdk")
const s3 = new AWS.S3()

const config = {
    accessKeyId: "xxxxx",
    secretAccessKey: "xxxxx",
    region: "region"
}

AWS.config.update(config)


module.exports = (req, res, next) => {
    // S3設定
    let params = {
        Bucket: "bucket-name",
        Key: null,
        Body: null,
        ContentType: null
    }
    //******************************************************************************************************************
    // 送信データ取得
    const user_id = req.session.user_id
    const img = req.files.menu_img
    const check_img_data = req.body.check_ima_data
    const menu_name_list = req.body.menu_name
    const menu_price_list = req.body.menu_price
    const menu_description_list = req.body.menu_description
    //******************************************************************************************************************


    //******************************************************************************************************************
    // 変数宣言
    // 画像ファイル関係
    let file_name　//ファイル名
    let file_ext  //　拡張子
    let file_split_data // 拡張子取得用にファイル名を分割した値
    let loop_index = 0 //　ループ回数記録
    let img_index = 0　// 画像処理回数記録
    let statement = []
    //******************************************************************************************************************

    // 画像登録処理ループ
    check_img_data.split(",").forEach(i => {
        // check_img_dataのsplit後のデータは ["true"||"false"]の文字列型配列で文字列型"false"をifにかけるとtrueになるので
        // toLowerCaseで比較して無理矢理真偽値として出す
        if (i.toLowerCase() === "true") {
            file_name = img[img_index].md5

            file_split_data = img[img_index].name.split(".")
            file_ext = file_split_data[file_split_data.length - 1]

            params.Key = `${file_name}.${file_ext}`
            params.Body = img[img_index].data
            params.ContentType = img[img_index].mimetype

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("失敗")
                    return
                }
                console.log("upload完了")
            })

            // SQLに渡す変数
            statement = [params.Key, menu_name_list[loop_index], menu_description_list[loop_index], menu_price_list[loop_index], user_id]

            const sql = "insert into menu(menu_img,menu_name,description.price,shop_id) value(?,?,?,(select max(id) from shop where owner_id = ?))"
            connection.query(sql, statement, (err) => {
                if (err) {
                    console.log(err)
                    res.render("error/server-error")
                    res.end()
                    return
                }
                img_index += 1
            })
        } else {
            const sql = "insert into menu(menu_img,description,price,shop_id) value(?,?,?,(select max(id) from shop where owner_id = ?))"
            connection.query(sql, [null, req.body.menu_description[loop_index], req.body.menu_price[loop_index], user_id], (err) => {
                if (err) {
                    console.log(err)
                    res.render("error/server-error")
                    return
                }
            })
        }
        loop_index += 1
    })
    next()
}