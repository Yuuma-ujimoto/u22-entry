$(async () => {
    // Json受け取るタイプ
    const ajax_result = await $.ajax({
        url: "/api/search/all-shop",
        type: "post",
        dataType: "json",
        data: {
            page: $("#page").val()
        }
    })
    if (ajax_result.error) {
        console.log("error")
        return
    }
    if(!ajax_result.count){
        console.log("0")
    }
    // resultにSQLの実行データとか入ってる場合
    ajax_result.result.forEach(items => {
        console.log(items)
    })
})