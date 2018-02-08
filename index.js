"use strict";
exports.__esModule = true;
var express = require("express");
var dl = require("datalib");
// SQlite
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
var app = express();
// For POST-Support
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/api/sayhello', upload.array(), function (request, response) {
    var name = request.body.name;
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    }
    else {
        console.log('Hello ' + name);
    }
    response.send('POST request to homepage');
});
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
        console.log('start SQlite');
        // SQlite
        var values_1 = [];
        db.serialize(function () {
            db.run("CREATE TABLE Test (col1, col2, col3)");
            db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a1', 'b1', 'c1']);
            db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a2', 'b2', 'c2']);
            db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a3', 'b3', 'c3']);
            db.all("SELECT * FROM Test", function (err, row) {
                values_1.push(row);
                console.log('after get SQlite', row, values_1);
                response.json({ row: row });
            });
            console.log('after loop SQlite', values_1);
        });
        db.close();
        console.log('after SQlite');
        // response.json({
        //     'message': name
        // });
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
//# sourceMappingURL=index.js.map