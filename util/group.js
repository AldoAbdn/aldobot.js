exports.groupCommandsByCategory = function(array){
    let newObject = {};
    for (var item of array){
        if (!newObject[item['conf']['category']]) newObject[item['conf']['category']] = [];
        newObject[item['conf']['category']].push(item);
    }
    return newObject;
}

exports.groupArrayByValue = function(array, property){
    let newObject = [];
    for (var item of array){
        if (!newObject[item[property]]) newObject[item[property]] = [];
        newObject[item[property]].push(item);
    }
    return newObject
}