const mongodbClient= require('mongodb').MongoClient;
const url = process.env.DB;
var db;
var connect = async function(){
    if (db == undefined){
        db = await mongodbClient.connect(url);
        db = db.db('aldobot');
    }    
}

exports.metaDataHelper = {
    update:async (userid, object) =>{await connect();return await db.collection('meta').updateOne({_id:userid},object)},
    getObject:async (userid) => {await connect();return await db.collection('meta').findOne({_id:userid});},
    getValue:async (userid, key) => {await connect();var user = await db.collection('meta').findOne({_id:userid});return user[key];}
}