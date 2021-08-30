const express = require("express")
const router = express.Router()
const connection = require("../../config/mysql")
const aws = require("aws-sdk")

const aws_config = require("../../config/aws")


aws.config.update(aws_config)

const set_data = require("../../util/set_data")
const set_list = require("../../util/set_list")
router.use((req, res, next) => {
    if (!req.session.user_id) {
        res.render("error/login-error")
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
        const open_time = req.body.opening_hours
        // 閉店時間
        const close_time = req.body.closing_hours
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

        const sql = "insert into shop(shop_name,shop_genre,owner_id,postal_code,prefectures,municipality,address,station,open_time,close_time,mail_address,phone_number,template_type,shop_status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,'fin')"
        connection.query(sql, statement, err => {
            if (err) {
                console.log("err1")
                console.log(err)
                res.render("error/server-error")
                return
            }
            next()
        })
    },
    // メニュー登録
    (req, res, next) => {
        console.log(req.files)
        console.log(req.body)
        const s3 = new aws.S3()
        // S3設定
        let params = {
            Bucket: "crea-test-bucket",
            Key: null,
            Body: null,
            ContentType: null
        }
        //******************************************************************************************************************
        // 送信データ取得
        const user_id = req.session.user_id

        const menu_name_list = set_list(req.body.menu_name)
        const menu_price_list = set_list(req.body.price)
        const menu_description_list = set_list(req.body.menu_description)
        const menu_img_list = set_data(req.files.menu_img)

        console.log(menu_img_list)
        // 変数宣言
        // 画像ファイル関係
        let file_name　//ファイル名
        let file_ext  //　拡張子
        let file_split_data // 拡張子取得用にファイル名を分割した値


        //******************************************************************************************************************
        // 画像登録処理ループ
        let error_flag = false
        let loop_count = 0
        while (loop_count < menu_img_list.length && ! error_flag) {
            console.log("1")
            file_name = menu_img_list[loop_count]
            file_name = menu_img_list[loop_count].md5
            file_split_data = menu_img_list[loop_count].name.split(".")
            file_ext = file_split_data[file_split_data.length - 1]
            params.Key = `u22/${file_name}.${file_ext}`
            params.Body = menu_img_list[loop_count].data
            params.ContentType = menu_img_list[loop_count].mimetype
            console.log("2")
            // S3にファイルをアップロードする。
            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("失敗")
                    console.log("3-1s")
                    error_flag = true
                    return
                }
                console.log("3-2")
                console.log("upload完了")
            })
            console.log("4")
            if(error_flag){
                break
            }
            console.log("5")
            const sql = "insert into shop_menu(shop_id,menu_img,menu_name,price,description) value((select max(id) from shop where owner_id = ?),?,?,?,?)"
            connection.query(sql, [user_id, params.Key, menu_name_list[loop_count], menu_price_list[loop_count], menu_description_list[loop_count]], (err) => {
                if (err) {
                    console.log(err)
                    error_flag = true
                    return
                }
                console.log("6")
            })
            console.log("7")
            loop_count++
        }
        if(error_flag){
            res.render("error/server-error")
            return
        }
        next()
    }
    , (req, res, next) => {
        const s3 = new aws.S3()

        // 現在編集中
        // ロゴとかの画像を保存する
        let params = {
            Bucket: "crea-test-bucket",
            Key: null,
            Body: null,
            ContentType: null
        }

        const logo_img = req.files.logo_img
        const shop_img = req.files.shop_img
        if (logo_img) {
            const logo_img_name = logo_img.md5
            const logo_img_split_data = logo_img.name.split(".")
            const logo_img_ext = logo_img_split_data[logo_img_split_data.length - 1]
            params.Key = `u22/${logo_img_name}.${logo_img_ext}`
            params.Body = logo_img.data
            params.ContentType = logo_img.mimetype

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("285辺り")
                    console.log("失敗")
                    res.render("error/server-error")
                    return
                }
                console.log("upload完了")
            })

        }

        if (shop_img) {
            const shop_img_name = shop_img.md5
            const shop_img_split_data = shop_img.name.split(".")
            const shop_img_ext = shop_img_split_data[shop_img_split_data.length - 1]
            params.Key = `u22/${shop_img_name}.${shop_img_ext}`
            params.Body = shop_img.data
            params.ContentType = shop_img.mimetype

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("失敗")
                    console.log(err)
                    res.render("error/server-error")
                    return
                }
                console.log("upload完了")
            })
        }

        next()
    },
    (req, res) => {

        res.redirect("/create/result")

    }
)

router.get("/result", (req, res) => {

    const sql = "select id from shop where updated_at = (select max(updated_at) from shop where owner_id = ? and soft_delete = 0) "
    connection.query(sql, [req.session.user_id], (err, result) => {
        if (err) {
            console.log(err)
            res.render("error/server-error")
            return
        }
        res.render("create-page/result")
    })
})

// 今までの登録処理
router.post("/confirm-and-db-insert/backup",
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

        const sql = "insert into shop(shop_name,shop_genre,owner_id,postal_code,prefectures,municipality,address,station,open_time,close_time,mail_address,phone_number,template_type,shop_status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,'fin')"
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
            return
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
            return
        }
    },
    // メニュー登録
    (req, res, next) => {
        console.log(req.files)
        console.log(req.body)
        const s3 = new aws.S3()
        // S3設定
        let params = {
            Bucket: "crea-test-bucket",
            Key: null,
            Body: null,
            ContentType: null
        }
        //******************************************************************************************************************
        // 送信データ取得
        const user_id = req.session.user_id
        let img = null
        if (req.files) {
            img = req.files.menu_img
        }
        const check_img_data = req.body.check_img_data
        const img_count = parseInt(req.body.img_count)
        // const menu_name_list = set_list(req.body.menu_name)
        // const menu_price_list = set_list(req.body.price)
        // const menu_description_list = set_list(req.body.menu_description)

        //******************************************************************************************************************


        //******************************************************************************************************************
        // 変数宣言
        // 画像ファイル関係
        let file_name　//ファイル名
        let file_ext  //　拡張子
        let file_split_data // 拡張子取得用にファイル名を分割した値
        let loop_index = 0 //　ループ回数記録
        let img_index = 0　// 画像処理回数記録
        // ForEachを終了させるフラグ
        let for_each_end_flag = false
        // エラー発生したかを確認するフラグ
        let for_each_error_flag = false
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
                    params.Key = `u22/${file_name}.${file_ext}`
                    params.Body = img.data
                    params.ContentType = img.mimetype
                } else {
                    file_name = img[img_index].md5
                    file_split_data = img[img_index].name.split(".")
                    file_ext = file_split_data[file_split_data.length - 1]
                    params.Key = `u22/${file_name}.${file_ext}`
                    params.Body = img[img_index].data
                    params.ContentType = img[img_index].mimetype
                }
                console.log(params)
                s3.putObject(params, (err, data) => {
                    if (err) {
                        console.log("失敗")
                        console.log(err)
                        return
                    }
                    console.log("upload完了")
                })

                // SQL
                if (img_count === 1) {
                    const sql = "insert into shop_menu(shop_id,menu_img,menu_name,price,description) value((select max(id) from shop where owner_id = ?),?,?,?,?)"
                    connection.query(sql, [user_id, params.Key, req.body.menu_name, req.body.price, req.body.menu_description], (err) => {
                        if (err) {
                            console.log(err)
                            for_each_error_flag = true
                            for_each_end_flag = true
                            return
                        }
                    })
                    for_each_end_flag = true
                } else {
                    console.log(loop_index)
                    console.log(req.body.menu_name, req.body.menu_price, req.body.menu_description)
                    const sql = "insert into shop_menu(shop_id,menu_img,menu_name,price,description) value((select max(id) from shop where owner_id = ?),?,?,?,?)"
                    connection.query(sql, [user_id, params.Key, req.body.menu_name[loop_index], req.body.price[loop_index], req.body.menu_description[loop_index]], (err) => {
                        if (err) {
                            console.log(err)
                            for_each_error_flag = true

                            for_each_end_flag = true
                            return
                        }
                        img_index += 1
                    })
                }
            } else {
                // 画像ない場合
                const sql = "insert into shop_menu(shop_id,menu_img,menu_name,price,description) value((select max(id) from shop where owner_id = ?),?,?,?,?)"
                connection.query(sql, [user_id, null, req.body.menu_name[loop_index], req.body.price[loop_index], req.body.menu_description[loop_index]], (err) => {
                    if (err) {
                        console.log(err)
                        for_each_end_flag = true
                        for_each_error_flag = true
                    }
                })
                if (for_each_end_flag) {
                    return
                }
            }
            loop_index += 1
        })

        if (for_each_error_flag) {
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
                //console.log("256行目辺り")
                res.render("error/server-error")
                return
            }
        }
        next()
    }, (req, res, next) => {
        const s3 = new aws.S3()

        // 現在編集中
        // ロゴとかの画像を保存する
        let params = {
            Bucket: "crea-test-bucket",
            Key: null,
            Body: null,
            ContentType: null
        }

        const logo_img = req.files.logo_img
        const shop_img = req.files.shop_img
        if (logo_img) {
            const logo_img_name = logo_img.md5
            const logo_img_split_data = logo_img.name.split(".")
            const logo_img_ext = logo_img_split_data[logo_img_split_data.length - 1]
            params.Key = `u22/${logo_img_name}.${logo_img_ext}`
            params.Body = logo_img.data
            params.ContentType = logo_img.mimetype

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("285辺り")
                    console.log("失敗")
                    res.render("error/server-error")
                    return
                }
                console.log("upload完了")
            })

        }

        if (shop_img) {
            const shop_img_name = shop_img.md5
            const shop_img_split_data = shop_img.name.split(".")
            const shop_img_ext = shop_img_split_data[shop_img_split_data.length - 1]
            params.Key = `u22/${shop_img_name}.${shop_img_ext}`
            params.Body = shop_img.data
            params.ContentType = shop_img.mimetype

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log("失敗")
                    console.log(err)
                    res.render("error/server-error")
                    return
                }
                console.log("upload完了")
            })
        }

        next()
    },
    (req, res) => {

        res.redirect("/create/result")

    })

module.exports = router