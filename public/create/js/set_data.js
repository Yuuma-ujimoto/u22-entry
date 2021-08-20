$(() => {
    console.log("load")
    $("#form").on("submit", () => {
        console.log("s")
        let check_img_data = ""
        let image_count = 0
        try {
            $("input[name=menu_img]").each(function (index, element) {
                console.log(element.value)
                if (element.value) {
                    check_img_data += ",true"
                    image_count++
                } else {
                    check_img_data += ",false"
                }
            })
            const sliced_check_img_data = check_img_data.slice(1)
            console.log(sliced_check_img_data)
            $("#test").val(sliced_check_img_data)
            $("#count").val(image_count)
            console.log(sliced_check_img_data)
            console.log(image_count)
        } catch (e) {
            console.log(e)
        }
        console.log("end")
    })
})
