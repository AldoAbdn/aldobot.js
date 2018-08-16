exports.deleteMessage = (message,timeout)=>{
    if(typeof timeout === 'string' || timeout instanceof String){
        timeout = parseInt(timeout);
    }
    if(timeout!=null || !isNaN(timeout)){
        message.delete(timeout);
    }
}