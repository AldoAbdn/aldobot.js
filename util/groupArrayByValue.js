exports.groupArrayByValue = function(array, property){
    let newArray = [];
    for (var item of array){
        if (!newArray[item[property]]) newArray[item[property]] = [];
        newArray[item[property]].push(item);
    }
}