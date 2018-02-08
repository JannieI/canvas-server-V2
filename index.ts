import express = require('express');
import * as dl from 'datalib';

// SQlite
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

let app = express();

// For POST-Support
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/sayhello', upload.array(), (request, response) => {
    var name = request.body.name;

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        console.log('Hello ' + name);
    }

    response.send('POST request to homepage');
});

app.get('/', function (request, response) {
    response.send('Hello World ... +');
});

// http://localhost:3000/api/sayhello/John
app.get('/api/sayhello/:name', (request, response) => {
    var name = request.params.name;

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {

        console.log('start SQlite');        
        
        // SQlite
        let values: any[] = [];
        db.serialize(function () {
            db.run("CREATE TABLE Test (col1, col2, col3)");
          
            db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a1', 'b1', 'c1']);
            db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a2', 'b2', 'c2']);
            db.run("INSERT INTO Test VALUES (?, ?, ?)", ['a3', 'b3', 'c3']);
          
            db.all("SELECT * FROM Test", function (err, row) {
                values.push(row)
                console.log('after get SQlite',row, values);
                response.json({row});
            });
            console.log('after loop SQlite', values);        
        });
        db.close();
        console.log('after SQlite');        

        // response.json({
        //     'message': name
        // });
    }
});

// http:localhost:3000/api/sayhello?name=NodeJS
app.get('/api/sayhello/', (request, response) => {
    var name = request.query.name;

    var result = {
        message: name
    };

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        response.json(result);
    }
});

app.get('/dashboards', function (request, response) {
    let filePath: string = '/home/jannie/Projects/canvas-workstation/src/assets/data.widgets.json';
    let data = dl.json(filePath);
    response.json(data);
});

app.listen(3000);