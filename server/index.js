const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('CHUPALO DINGYING');
});

/* INSERTAR USUARIO */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tics");
  var myobj = { rut: "2012314-k", pass: "asdf", sueldo: [100, 200, 200,300]};
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});


/*QUERY*/
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tics");
  var query = { rut: "20048133-k" };
  dbo.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

/*DELETE ONE */
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tics");
  var myquery = { rut: '20048133-k' };
  dbo.collection("users").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});
*/

/*MOSTRAR TODO*/

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tics");
  dbo.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});