let MongoClient = require('mongodb').MongoClient
let mongoURL = 'mongodb://localhost:27017/geocity'

let _db

module.exports = {
  connectToServer: function(callback){
    MongoClient.connect(mongoURL, function (err, db) {
      _db = db
      return callback(err)
    })
  },
  getDb: function(){
    //console.log('Get db by reference.');
    return _db
  }
}
