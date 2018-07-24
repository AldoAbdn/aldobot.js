const mongodb = require('mongodb');
const mongodbClient= mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = process.env.DB;
const dbname = process.env.DBNAME;

class DBHelper {
    constructor(url,dbname){
        this.url = url;
        this.dbname = dbname;
        //Add custom collection managers here 
        this.metaCollectionManager = new CollectionManager(this.db,'meta');
        this.db = null;
    }

    async connect(){
        var db = await mongodbClient.connect(this.url);
        this.db = db.db(this.dbname);
        this.metaCollectionManager = new CollectionManager(this.db,'meta');
    }
}

class CollectionManager {
    constructor(db,collectionname){
        this.db = db;
        this.collectionname = collectionname;
    }

    async updateObject(userid, object){
        return await this.db.collection(this.collectionname).updateOne({id:ObjectID(userid)},{$set:object});
    }
    async getObject(userid){
        return await this.db.collection(this.collectionname).findOne({_id:ObjectID(userid)});
    }
}

let dbhelper = new DBHelper(url,dbname);

exports.DBHelper = dbhelper;