const nano=require('nano')
var couch = nano(process.env.COUCHDB_URL || 'http://127.0.0.1:5984');
couch.db.create(process.env.DB_name, function(err) {  
  if (err && err.statusCode != 412) {
    console.error('Error Creating Database. '+err);
  }
  else {
    console.log('database '+process.env.DB_name+' exists!');
  }
});

