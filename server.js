"use strict"

var express = require('express'),
  hbs = require('hbs'),
  neo4j = require('node-neo4j'),
  neo4j_db;

var app = express();
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.logger());

app.get('/', function(req, res){
  res.render('index_template', {});
});

// route for /fetch/WatchEvent/username/reponame
app.get('/fetch/WatchEvent/:user/:reponame', function(req, res){
    // hit neo4j with query
    // build JSON
    // res.send(JSON)
    neo4j_db.cypherQuery("MATCH (n:user)-[:starred]->(r:repo)<-[:starred]-(c:user)-[:starred]->(t:repo) WHERE n.name = 'walterra' AND r.name = '" + req.params.reponame + "' AND c.name <> '" + req.params.user + "' RETURN t LIMIT 5;", function(err, result){
        res.render(result)
    })
})

// route for /fetch/FollowEvent/username
app.get('fetch/FollowEvent/:username', function(req, res){
    // hit neo4j with query
    // build JSON
    // res.send(JSON)

})
var port = process.env.PORT || 5000;

neo4j_db = new neo4j('http://23.239.1.42:7474');

app.listen(port, function() {
  console.log("listening on " + port);
})
