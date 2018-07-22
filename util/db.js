const mongodbClient= require('mongodb').MongoClient;
const url = process.env.DB;
var db;

exports.connect = async function(){
    db = await mongodbClient.connect(url);
}

exports.metaDataHelper = {
    update:async (userid, object) =>{return await db.collection('meta').updateOne({_id:userid},object)},
    getObject:async (userid) => {return await db.collection('meta').findOne({_id:userid});},
    getValue:async (userid, key) => {var user = await db.collection('meta').findOne({_id:userid});return user[key];}
}