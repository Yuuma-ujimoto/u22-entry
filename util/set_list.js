module.exports = (data)=>{
    if(typeof data === "string"){
        return [data]
    }
    return data
}



