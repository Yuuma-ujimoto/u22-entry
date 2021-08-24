const app = new Vue({
    el: "#app",
    data: {
        id: null,
        shop_address:null,
        shop_name:null,
        phone_number : null,
        station:null
    },
    created: async function () {

        const params = new URLSearchParams()
        params.append("shop_id",document.getElementById("shop_id").value)
        const result = await axios.post("/api/shop/get-data",params)
        console.log(result)
        console.log(result.data.shop_data)
        this.set_shop_data(result.data.shop_data[0])

    },
    methods:{
        set_shop_data(shop_data){
            this.shop_name = shop_data.shop_name
            this.phone_number = shop_data.phone_number
            this.shop_address = shop_data.prefectures + shop_data.municipality + shop_data.address
            this.station = shop_data.station
        }
    }
})