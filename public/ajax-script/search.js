const app = new Vue({
    el:"#app",
    data:{
        test:null,
        result_data:null
    },
    created:async function(){
        const result = await axios.post("/api/search/all-shop")
        console.log(result.data)
        this.result_data = result.data.result
    }
})