exports.groupCommandsByCategory = function(array){
    let newArray = [];
    for (var item of array){
        if (!newArray[item['conf']['category']]) newArray[item['conf']['category']] = [];
        newArray[item['conf']['category']].push(item);
    }
}