import express = require('express');
import * as dl from 'datalib';



// SQlite
var sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err
// OPEN_READONLY, OPEN_CREATE
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

let app = express();

// For POST-Support
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api',  (request, response) => {
    var name = request.body.name;
    console.log('/api/sayhello start', request.url, request.method, request.body,request.params)
    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        request.on('data', function(data) {
            data = data.toString();

            console.log('Hello ' + data);
        })
    }

    response.send('POST request to homepage');
});

// http://example.com/page?parameter=value&also=another
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

        console.log('start SQlite: use start, end or a person-name', name);        
        
        // SQlite
        let values: any[] = [];
        db.serialize(function () {

            if (name == ':start') {

                var widgetTEMP =     
                {
                    "widgetType": "Graph",
                    "widgetSubType": "",
            
                    "isTrashed": false,
                    "dashboardID": 1,
                    "dashboardTabID": 1,
                    "id": 1,
                    "name": "barchart for start",
                    "description": "bla-bla-bla",
                    "visualGrammar": "Vega-Lite",
                    "version": 1,
                    "isSelected": false,
                    "isLiked": false,
                    "nrDataQualityIssues": 0,
                    "nrComments": 4,
                    "nrButtonsToShow": 3,
                    "hyperlinkDashboardID": 1,
                    "hyperlinkDashboardTabID": 1,
            
                    "datasourceID": 1,
                    "slicerSelection": null,
                    "datasetID": 4,
                    "dataParameters":
                    [
                        {
                            "field": "",
                            "value": ""
                        }
                    ],
                    "reportID": 1,
                    "reportName": "",
                    "rowLimit": 1,
                    "addRestRow": false,
                    "size": "",
                    "containerBackgroundcolor": "transparent",
                    "containerBorder": "2px solid black",
                    "containerBoxshadow": "2px 2px gray",
                    "containerColor": "transparent",
                    "containerFontsize": 12,
                    "containerHeight": 320,
                    "containerLeft": 50,
                    "containerWidgetTitle": "Title 1",
                    "containerTop": 80,
                    "containerWidth": 410,
                    "containerZindex": 50,
                    "titleText": "",
                    "titleBackgroundColor": "#192b35",
                    "titleBorder": "",
                    "titleColor": "",
                    "titleFontsize": 1,
                    "titleFontWeight": "",
                    "titleHeight": 1,
                    "titleLeft": 1,
                    "titleMargin": "",
                    "titlePadding": "",
                    "titlePosition": "",
                    "titleTextAlign": "",
                    "titleTop": 1,
                    "titleWidth": 1,
                    "graphType": "",
                    "graphHeight": 240,
                    "graphLeft": 1,
                    "graphTop": 1,
                    "graphWidth": 240,
                    "graphGraphPadding": 1,
                    "graphHasSignals": false,
                    "graphFillColor": "",
                    "graphHoverColor": "",
                    "graphSpecification": "",
                    "graphDescription": "",
                    "graphXaggregate": "",
                    "graphXtimeUnit": "",
                    "graphXfield": "Horsepower",
                    "graphXtype": "quantitative",
                    "graphXaxisTitle": "x tit",
                    "graphYaggregate": "",
                    "graphYtimeUnit": "",
                    "graphYfield": "Miles_per_Gallon",
                    "graphYtype": "quantitative",
                    "graphYaxisTitle": "One one",
                    "graphTitle": "graphTitle",
                    "graphMark": "tick",
                    "graphMarkColor": "#4682b4",
                    "graphUrl": "../assets/vega-datasets/cars.json",
                    "graphColorField": "",
                    "graphColorType": "",
                    "graphData": "",
                    "tableColor": "",
                    "tableCols": 1,
                    "tableHeight": 1,
                    "tableHideHeader": false,
                    "tableLeft": 1,
                    "tableRows": 1,
                    "tableTop": 1,
                    "tableWidth": 1,
                    "shapeCx": "",
                    "shapeCy": "",
                    "shapeR": "",
                    "shapeStroke": "",
                    "shapeStrokeWidth": "",
                    "shapeFill": "",
                    "refreshMode": "",
                    "refreshFrequency": 1,
                    "widgetRefreshedOn": "",
                    "widgetRefreshedBy": "",
                    "widgetCreatedOn": "",
                    "widgetCreatedBy": "",
                    "widgetUpdatedOn": "",
                    "widgetUpdatedBy": ""
                };
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
                console.log('created new SQlite Table')

                db.run("CREATE TABLE Widgets (dashboardID INTEGER NOT NULL, dashboardTabID INTEGER NOT NULL, datasourceID INTEGER NOT NULL, datasetID INTEGER NOT NULL, spec TEXT)");
                let sql: any = 'INSERT INTO Widgets VALUES (?, ?, ?, ?, ?) ';
                let vals: any = [1,2,1,2,JSON.stringify(widgetTEMP)]
                console.log('vals', JSON.stringify(vals))

                db.run(sql, vals);
                db.run(sql, vals);

                response.json('created new SQlite Table')
            } else {

                // Close SQlite DB
                if (name == ':end') {
                    db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Closed the database connection.');
                    });
                } else {
                    // each, get (1st)
                    db.get("SELECT * FROM Widgets", function (err, data) {
                        if (err) {console.log('use name start first, and end ...')}
                        console.log('after get SQlite',err, data);
                        response.send([data.spec]);
                    });
                    // db.all("SELECT * FROM Widgets", function (err, data) {
                    //     if (err) {console.log('use name start first, and end ...')}
                    //     console.log('after get SQlite',err, data[0].spec);
                    //     response.send(data.map(x => JSON.parse(x.spec)));
                    // });
                }
            }
        // response.json({
        //     'message': name
        // });          
        
        });
    }
});

app.get('/api/sayhello/:name', (request, response) => {
    var name = request.params.name;

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {

        console.log('start SQlite: use start, end or a person-name', name);        
        
        // SQlite
        let values: any[] = [];
        db.serialize(function () {

            if (name == ':start') {

                var widgetTEMP =     
                {
                    "widgetType": "Graph",
                    "widgetSubType": "",
            
                    "isTrashed": false,
                    "dashboardID": 1,
                    "dashboardTabID": 1,
                    "id": 1,
                    "name": "barchart for start",
                    "description": "bla-bla-bla",
                    "visualGrammar": "Vega-Lite",
                    "version": 1,
                    "isSelected": false,
                    "isLiked": false,
                    "nrDataQualityIssues": 0,
                    "nrComments": 4,
                    "nrButtonsToShow": 3,
                    "hyperlinkDashboardID": 1,
                    "hyperlinkDashboardTabID": 1,
            
                    "datasourceID": 1,
                    "slicerSelection": null,
                    "datasetID": 4,
                    "dataParameters":
                    [
                        {
                            "field": "",
                            "value": ""
                        }
                    ],
                    "reportID": 1,
                    "reportName": "",
                    "rowLimit": 1,
                    "addRestRow": false,
                    "size": "",
                    "containerBackgroundcolor": "transparent",
                    "containerBorder": "2px solid black",
                    "containerBoxshadow": "2px 2px gray",
                    "containerColor": "transparent",
                    "containerFontsize": 12,
                    "containerHeight": 320,
                    "containerLeft": 50,
                    "containerWidgetTitle": "Title 1",
                    "containerTop": 80,
                    "containerWidth": 410,
                    "containerZindex": 50,
                    "titleText": "",
                    "titleBackgroundColor": "#192b35",
                    "titleBorder": "",
                    "titleColor": "",
                    "titleFontsize": 1,
                    "titleFontWeight": "",
                    "titleHeight": 1,
                    "titleLeft": 1,
                    "titleMargin": "",
                    "titlePadding": "",
                    "titlePosition": "",
                    "titleTextAlign": "",
                    "titleTop": 1,
                    "titleWidth": 1,
                    "graphType": "",
                    "graphHeight": 240,
                    "graphLeft": 1,
                    "graphTop": 1,
                    "graphWidth": 240,
                    "graphGraphPadding": 1,
                    "graphHasSignals": false,
                    "graphFillColor": "",
                    "graphHoverColor": "",
                    "graphSpecification": "",
                    "graphDescription": "",
                    "graphXaggregate": "",
                    "graphXtimeUnit": "",
                    "graphXfield": "Horsepower",
                    "graphXtype": "quantitative",
                    "graphXaxisTitle": "x tit",
                    "graphYaggregate": "",
                    "graphYtimeUnit": "",
                    "graphYfield": "Miles_per_Gallon",
                    "graphYtype": "quantitative",
                    "graphYaxisTitle": "One one",
                    "graphTitle": "graphTitle",
                    "graphMark": "tick",
                    "graphMarkColor": "#4682b4",
                    "graphUrl": "../assets/vega-datasets/cars.json",
                    "graphColorField": "",
                    "graphColorType": "",
                    "graphData": "",
                    "tableColor": "",
                    "tableCols": 1,
                    "tableHeight": 1,
                    "tableHideHeader": false,
                    "tableLeft": 1,
                    "tableRows": 1,
                    "tableTop": 1,
                    "tableWidth": 1,
                    "shapeCx": "",
                    "shapeCy": "",
                    "shapeR": "",
                    "shapeStroke": "",
                    "shapeStrokeWidth": "",
                    "shapeFill": "",
                    "refreshMode": "",
                    "refreshFrequency": 1,
                    "widgetRefreshedOn": "",
                    "widgetRefreshedBy": "",
                    "widgetCreatedOn": "",
                    "widgetCreatedBy": "",
                    "widgetUpdatedOn": "",
                    "widgetUpdatedBy": ""
                };
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
                console.log('created new SQlite Table')

                db.run("CREATE TABLE Widgets (dashboardID INTEGER NOT NULL, dashboardTabID INTEGER NOT NULL, datasourceID INTEGER NOT NULL, datasetID INTEGER NOT NULL, spec TEXT)");
                let sql: any = 'INSERT INTO Widgets VALUES (?, ?, ?, ?, ?) ';
                let vals: any = [1,2,1,2,JSON.stringify(widgetTEMP)]
                console.log('vals', JSON.stringify(vals))

                // db.run(sql, vals);
                db.run(sql, vals);

                response.json('created new SQlite Table')
            } else {

                // Close SQlite DB
                if (name == ':end') {
                    db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Closed the database connection.');
                    });
                } else {
                    // each, get (1st)
                    db.get("SELECT * FROM Widgets", function (err, data) {
                        if (err) {console.log('use name start first, and end ...')}
                        console.log('after get SQlite',err, data);
                        response.json([data]);
                    });
                    // db.all("SELECT * FROM Widgets", function (err, data) {
                    //     if (err) {console.log('use name start first, and end ...')}
                    //     console.log('after get SQlite',err, data[0].spec);
                    //     response.send(data.map(x => JSON.parse(x.spec)));
                    // });
                }
            }
        // response.json({
        //     'message': name
        // });          
        
        });
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

// curl -i -X GET http://rest-api.io/items
// curl -i -X GET http://rest-api.io/items/5069b47aa892630aae059584
// curl -i -X DELETE http://rest-api.io/items/5069b47aa892630aae059584
// curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New item", "year": "2009"}' http://rest-api.io/items
// curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "Updated item", "year": "2010"}' http://rest-api.io/items/5069b47aa892630aae059584

// 
