module.exports = (post_data)=>{
    const menu_name = post_data.menu_name
    const menu_price = post_data.menu_price
    //const menu_img = post_data.menu_img
    const menu_description = post_data.menu_description
    const menu_list = []
    let obj
    for(let i=0;i<menu_name.length;i++){
        obj = {
            menu_name:menu_name[i],
            menu_price:menu_name[i],
            menu_img:menu_name[i],
            menu_description:menu_name[i]
        }
        menu_list.push(obj)
    }
    return menu_list
}