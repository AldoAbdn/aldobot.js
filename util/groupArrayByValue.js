exports.groupArrayByValue = function(array, property){
    let newObject = [];
    for (var item of array){
        if (!newObject[item[property]]) newObject[item[property]] = [];
        newObject[item[property]].push(item);
    }
    return newObject
}