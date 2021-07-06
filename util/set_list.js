module.exports = (data)=>{
    if(typeof data == "object"){
        return data
    }
    return [data]
}



