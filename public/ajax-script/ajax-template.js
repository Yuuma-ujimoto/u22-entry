$(async ()=>{
    // 送信するだけのタイプ
    await $.ajax({
        url:"",
        type:"post",
        dataType:"json",
        data:{

        }
    })
    // -----------------
    // Json受け取るタイプ
    const ajax_result = await $.ajax({
        url:"",
        type: "post",
        dataType: "json",
        data:{

        }
    })
    if(ajax_result.error){
        console.log("error")
        return
    }
    // resultにSQLの実行データとか入ってる場合
    ajax_result.result.forEach(items=>{
        console.log(items)
    })
})