"use strict";
exports.__esModule = true;
var express = require("express");
var dl = require("datalib");
// SQlite
var sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err
// OPEN_READONLY, OPEN_CREATE
var db = new sqlite3.Database(':memory:', function (err) {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
var app = express();
// For POST-Support
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/api', upload.array(), function (request, response) {
    var name = request.body.name;
    console.log('/api/sayhello start', request.url, request.method, request.body, upload);
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    }
    else {
        request.on('data', function (data) {
            data = data.toString();
            console.log('Hello ' + data);
        });
    }
    response.send('POST request to homepage');
});
// http://example.com/page?parameter=value&also=another
app.get('/', function (request, response) {
    response.send('Hello World ... +');
});
// http://localhost:3000/api/sayhello/John
app.get('/api/sayhello/:name', function (request, response) {
    var name = request.params.name;
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    }
    else {
        console.log('start SQlite: use start, end or a person-name', name);
        // SQlite
        var values_1 = [];
        db.serialize(function () {
            if (name == ':start') {
                db.run("CREATE TABLE Test (col1, col2, col3)");
                // let data = ['Ansi C', 'C'];
                // let sql = `UPDATE langs
                // SET name = ?
                // WHERE name = ?`;
                // db.run(sql, data, function(err) {
                // db.run(`DELETE FROM langs WHERE rowid=?`, id, function(err) {
                db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a1', 'b1', 'c1']);
                db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a2', 'b2', 'c2']);
                db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a3', 'b3', 'c3']);
                console.log('created new SQlite Table');
                response.json('created new SQlite Table');
            }
            else {
                // Close SQlite DB
                if (name == ':end') {
                    db.close(function (err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log('Closed the database connection.');
                    });
                }
                else {
                    // each, get (1st)
                    db.all("SELECT * FROM Test", function (err, data) {
                        if (err) {
                            console.log('use name start first, and end ...');
                        }
                        values_1.push(data);
                        console.log('after get SQlite', data, values_1);
                        response.json({ data: data });
                    });
                }
            }
            // response.json({
            //     'message': name
            // });          
        });
    }
});
// http:localhost:3000/api/sayhello?name=NodeJS
app.get('/api/sayhello/', function (request, response) {
    var name = request.query.name;
    var result = {
        message: name
    };
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    }
    else {
        response.json(result);
    }
});
app.get('/dashboards', function (request, response) {
    var filePath = '/home/jannie/Projects/canvas-workstation/src/assets/data.widgets.json';
    var data = dl.json(filePath);
    response.json(data);
});
app.listen(3000);
// curl -i -X GET http://rest-api.io/items
// curl -i -X GET http://rest-api.io/items/5069b47aa892630aae059584
// curl -i -X DELETE http://rest-api.io/items/5069b47aa892630aae059584
// curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New item", "year": "2009"}' http://rest-api.io/items
// curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "Updated item", "year": "2010"}' http://rest-api.io/items/5069b47aa892630aae059584
// 
//# sourceMappingURL=index.js.map