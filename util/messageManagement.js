exports.deleteMessage = (message,timeout)=>{
    if(typeof timeout === 'string' || timeout instanceof String){
        timeout = parseInt(timeout);
    }
    else if(timeout!=null || !isNaN(timeout)){
        message.delete({timeout});
    } else {
        console.log("Failed to delete message: " + message);
    }
}