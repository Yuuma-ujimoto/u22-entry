const app = new Vue({
    el:"#app",
    data:{
        test:null,
        result_data:null
    },
    created:async function(){


        const params = new URLSearchParams()
        params.append("area",document.getElementById("area_q").value)
        params.append("category",document.getElementById("category_q").value)
        params.append("shop_name",document.getElementById("shop_name_q").value)

        const result = await axios.post("/api/search/query")
        console.log(result.data)
        this.result_data = result.data.result
    }
})