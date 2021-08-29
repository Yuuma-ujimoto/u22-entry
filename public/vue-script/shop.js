const app = new Vue({
    el: "#app",
    data: {
        id: null,
        shop_address:null,
        shop_name:null,
        phone_number : null,
        station:null,
        shop_genre:null,
        mail_address:null,
        open_time:null,
        close_time:null,
        menu_list:[]
    },
    created: async function () {

        const params = new URLSearchParams()
        params.append("shop_id",document.getElementById("shop_id").value)
        const result = await axios.post("/api/shop/get-data",params)
        console.log(result)
        console.log(result.data.shop_data)
        this.set_shop_data(result.data.shop_data[0])
        this.set_menu_data(result.data.menu_data)
    },
    methods:{
        set_shop_data(shop_data){
            console.log(shop_data)
            this.shop_name = shop_data.shop_name
            this.phone_number = shop_data.phone_number
            this.shop_address = shop_data.prefectures + shop_data.municipality + shop_data.address
            this.station = shop_data.station
            this.shop_genre = shop_data.shop_genre
            this.mail_address = shop_data.mail_address
            this.open_time = shop_data.open_time
            this.close_time = shop_data.close_time
        },
        set_menu_data(menu_data){
            this.menu_list = menu_data
        }
    }
})