const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")
const aws = require("aws-sdk")


const set_list = require("../../util/set_list")
router.use((req, res, next) => {
    if (!req.session.user_id) {
        res.render("error/client-error")
        return
    }
    next()
})

// 作成フォーム
router.get("/",
    (req, res, next) => {
        res.render("create-page/form")
    })

// DBに仮登録
router.post("/confirm-and-db-insert",
    (req, res, next) => {
        console.log(req.body)
        //店名
        const shop_name = req.body.shop_name
        // ジャンル
        const shop_genre = req.body.category
        // 作成者
        const owner_id = req.session.user_id
        // 郵便番号
        const postal_code = req.body.postal_code
        // 都道府県
        const address_1 = req.body.address_1
        // 市区町村
        const address_2 = req.body.address_2
        // 番地
        const address_3 = req.body.address_3
        // 最寄り
        const station = req.body.station
        // 開店時間
        const open_time = req.body.open_time
        // 閉店時間
        const close_time = req.body.close_time
        // メールアドレス
        const mail_address = req.body.mail_address
        // 電話番号
        const phone_number = req.body.phone_number
        //　テンプレートの型
        const template_type = 1

        const statement = [
            shop_name,
            shop_genre,
            owner_id,
            postal_code,
            address_1,
            address_2,
            address_3,
            station,
            open_time,
            close_time,
            mail_address,
            phone_number,
            template_type
        ]

        const sql = "insert into shop(shop_name,shop_genre,owner_id,postal_code,prefectures,municipality,address,station,open_time,close_time,mail_address,phone_number,template_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?)"
        connection.query(sql, statement, err => {
            if (err) {
                console.log("err1")
                console.log(err)
                res.render("error/server-error")
                return
            }
            next()
        })
    }, (req, res, next) => {
        const owner_id = req.session.user_id;
        const day_off_list = req.body.regular_day_off;

        if (!day_off_list) {
            console.log("定休日なし")
            next()
        }
        const sql = "insert into shop_day_off(day_off,shop_id) values(?,(select max(id) from shop where owner_id = ?))"
        // 定休日ひとつだけ
        if (typeof day_off_list === "string") {
            console.log("a")
            connection.query(sql, [day_off_list, owner_id], err => {
                if (err) {
                    console.log("err2-1")
                    console.log(err)
                    res.render("error/server-error")
                    return
                }
                next()
                return;
            })
        } else {
            day_off_list.forEach(day_off => {
                connection.query(sql, [day_off, owner_id], err => {
                    if (err) {
                        console.log("err2")
                        console.log(err)
                        res.render("error/server-error")
                        return
                    }
                })
            })
            next()
        }
    },
    // メニュー登録
    (req, res, next) => {
        console.log(req.files)
        const s3 = new aws.S3
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
        const check_img_data = req.body.check_img_data
        const img_count = parseInt(req.body.img_count)
        const menu_name_list = set_list(req.body.menu_name)
        const menu_price_list = set_list(req.body.menu_price)
        const menu_description_list = set_list(req.body.menu_description)

        //******************************************************************************************************************


        //******************************************************************************************************************
        // 変数宣言
        // 画像ファイル関係
        let file_name　//ファイル名
        let file_ext  //　拡張子
        let file_split_data // 拡張子取得用にファイル名を分割した値
        let loop_index = 0 //　ループ回数記録
        let img_index = 0　// 画像処理回数記録
        let for_each_end_flag = false
        let statement
        //******************************************************************************************************************
        // 画像登録処理ループ
        check_img_data.split(",").forEach(i => {
            // forEach内でDBエラーが発生した場合にループを抜ける
            if (for_each_end_flag) {
                return
            }

            // check_img_dataのsplit後のデータは ["true"||"false"]の文字列型配列で文字列型"false"をifにかけるとtrueになるので
            // toLowerCaseで比較して無理矢理真偽値として出す
            if (i.toLowerCase() === "true") {
                // 画像が一枚だけの場合配列にならないのでエラー出る
                if (img_count === 1) {
                    file_name = img.md5
                    file_split_data = img.name.split(".")
                    file_ext = file_split_data[file_split_data.length - 1]
                    params.Key = `${file_name}.${file_ext}`
                    params.Body = img.data
                    params.ContentType = img.mimetype
                } else {
                    file_name = img[img_index].md5
                    file_split_data = img[img_index].name.split(".")
                    file_ext = file_split_data[file_split_data.length - 1]
                    params.Key = `${file_name}.${file_ext}`
                    params.Body = img[img_index].data
                    params.ContentType = img[img_index].mimetype
                }
                console.log(params)
                s3.putObject(params, (err, data) => {
                    if (err) {
                        console.log("失敗")
                        return
                    }
                    console.log("upload完了")
                })

                // SQL
                const sql = "insert into shop_menu(shop_id,menu_img,menu_name,price,description) value((select max(id) from shop where owner_id = ?),?,?,?,?)"
                connection.query(sql, [user_id, params.Key, req.body.menu_name[loop_index], req.body.menu_price[loop_index], req.body.menu_description[loop_index]], (err) => {
                    if (err) {
                        console.log(err)
                        for_each_end_flag = true
                        return
                    }
                    img_index += 1
                })
            } else {
                // 画像ない場合
                const sql = "insert into shop_menu(shop_id,menu_img,menu_name,price,description) value((select max(id) from shop where owner_id = ?),?,?,?,?)"
                connection.query(sql, [user_id, null, req.body.menu_name[loop_index], req.body.menu_price[loop_index], req.body.menu_description[loop_index]], (err) => {
                    if (err) {
                        console.log(err)
                        for_each_end_flag = true
                    }
                })
                if (for_each_end_flag) {
                    return
                }
            }
            loop_index += 1
        })

        if (for_each_end_flag) {
            res.render("error/server-error")
            return
        }

        next()
    }, (req, res, next) => {
        const sns_data = set_list(req.body.sns)
        const sns_url = set_list(req.body.sns_url)
        const sql = "insert into shop_sns(shop_id,sns_type,url) value(?,?,(select max(id) from shop where owner_id = ?))"

        let db_insert_err_flag = false
        for (let loop_count = 0; loop_count < sns_data.length; loop_count++) {
            connection.query(sql,
                [sns_data[loop_count], sns_url[loop_count], req.session.user_id],
                err => {
                    if (err) {
                        console.log(err)
                        db_insert_err_flag = true
                    }
                })
            if (db_insert_err_flag) {
                res.render("error/server-error")
                return
            }
        }
        next()
    }, (req, res, next) => {
        // 現在編集中
        // ロゴとかの画像を保存する
        let params = {
            Bucket: "bucket-name",
            Key: null,
            Body: null,
            ContentType: null
        }

        const logo_img = req.files.logo_img
        const shop_img = req.files.shop_img
        if (logo_img) {
            const logo_img_name = logo_img.md5
            const logo_img_split_data = log_img.name.split(".")
            const logo_img_ext = file_split_data[file_split_data.length - 1]
            params.Key = `${logo_img_name}.${logo_img_ext}`
            params.Body = logo_img.data
            params.ContentType = logo_img.mimetype

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("失敗")
                    return
                }
                console.log("upload完了")
            })
        }
        next()
    },
    (req, res) => {
        const sql = "select id from shop where update_at = (select max(update_at) from shop where owner_id = ? and soft_delete = 0) "
        connection.query(sql, [req.session.user_id], (err, result) => {
            if (err) {
                console.log(err)
                res.render("error/server-error")
                return
            }
            let id = result[0].id
            res.render("preview-and-confirm2", {id: id})
        })
    })

router.post("/result", (req, res) => {
    const id = req.body.id
    const sql = "update shop set status = 'fin' where id = ?"
    connection.query(sql, [id], err => {
        if (err) {
            console.log(err)
            res.render("error/server-error")
            return
        }
        res.render("result")
    })
})

module.exports = router