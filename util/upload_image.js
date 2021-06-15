const connection = require("../config/mysql")

module.exports = (req,res,next)=>{
    const user_id = req.session.user_id
    const now = new Date()
    const img = req.file.menu_img
    let file_name
    let file_name_list = []

    for(let i=0;i<img.length;i++){
        file_name = img[i].md5
        /*
         fs.writeFile(target_path_i, req.files.icon.data,(err) => {
        if(err){
            throw err
        }else{
            var data = {'icon':new_iconname};

            var connection =mysql.createConnection(mysql_setting);
            connection.connect();

            connection.query('insert into テーブル名 set ?',data,
                            function(error,results,fields){
                                res.redirect('/mypage')
                            })
            connection.end();
        }
        });
        */
        
    }
}