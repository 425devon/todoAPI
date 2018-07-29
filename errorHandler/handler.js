module.exports = (res, msg) =>{
    if(msg.includes("Cast to ObjectId failed") || msg.includes("validation failed")){
        return res.status(400);
    }else if(msg.includes("not found")){
        return res.status(404);
    }else if(msg.includes("duplicate key error")){
        return res.status(409);
    }
    else{
        return res.status(500);
    }
}