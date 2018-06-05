// // server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('images'));
// app.use(bodyParser.json());

var fs = require("fs");
var os = require("os")
var path = require("path")

var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
}

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.send( data );
    });
})

app.get('/user/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.send( JSON.stringify(user));
    });
})

app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.send( JSON.stringify(data));
    });
})

var id = 2;

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.send( JSON.stringify(data));
   });
})



// Events Example
// Import events module
var events = require('events');


// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
   console.log('connection succesful.');
  
   // Fire the data_received event 
   eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);
 
// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function(){
   console.log('data received succesfully.');
});

// Fire the connection event 
eventEmitter.emit('connection');

app.get('/index.htm', function (req, res) {

    var data = fs.readFile("index.htm", "utf8", function(error, data) {
        console.log("ASYNC index.htm", data);
      });

    var data = fs.readFileSync("index.htm", "utf8");
    console.log("SYNC index.htm", data);

    res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/files/:folder', function (req, res) {
    console.warn("Listing folder:", folder)
    var folder = '.';
    var files = fs.readdirSync(folder);
    for (var index in files) {
        var currentFile = folder + '/' + files[index];
        var stats = fs.statSync(currentFile);
        console.log(files[index], stats.isFile());
    };

    res.send(files);
});

app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
    var file = __dirname + "/" + req.files.file.name;
    
    fs.readFile( req.files.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ){
             console.log( err );
             }else{
                response = {
                   message:'File uploaded successfully',
                   filename:req.files.file.name
                };
             }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
    });
})
 
app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

// File Watch
var fileName = "index.htm";
fs.watchFile(fileName, {
  persistent: true
}, function(event, filename) {
  console.log(event + " event occurred on " + filename);
});

// ls Folder
console.warn("Current folder:")
var folder = '.';
var files = fs.readdirSync(folder);
for (var index in files) {
    var currentFile = folder + '/' + files[index];
    var stats = fs.statSync(currentFile);
    console.log(files[index], stats.isFile());
}

// Traverse FS
// console.warn("Traverse parent:")
var traverseFileSystem = function (currentPath) {
    // console.log(currentPath);
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
        var currentFile = currentPath + '/' + files[i];
        var stats = fs.statSync(currentFile);
        if (stats.isFile()) {
            // console.log(currentFile);
        }
        else if (stats.isDirectory()) {
            // console.log("Folder: ", currentFile);
            
            if (currentFile != './node_modules'  
                &&
                currentFile != './.git') {
                traverseFileSystem(currentFile);
            };
        };
    };
};
traverseFileSystem('.');


// Other fs methods
// fs.stat('data.txt', function (err, stats) {
//     if (err)
//        throw err;
//     if (stats.isFile()) {
//         console.log('It\'s a file!');
//     }
//     if (stats.isDirectory()) {
//       console.log('It\'s a directory!');
//     }
//     for (var i in stats) {
//        if ('function' !== typeof stats[i])
//        console.log(i + '\t= ' + stats[i]);
//      }
//     });
//    fs.rename('data2.txt', 'data2_new.txt', function (err) {
//     if (err)
//       throw err;
//     console.log('Renamed!');
//    });
//    fs.chmod('data3.txt', '0777', function (err) {
//      if (err)
//         throw err;
//      console.log('File permissions changed!');
//    });

// Listen
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    var p    = "users.json"
    
    console.log("Example app listening at http://%s:%s")
    console.log("  Host", host)
    console.log("  Port", port)
    console.log("  Folder", __dirname)
    console.log("  File", __filename)
    console.log("  os.hostname()", os.hostname())
    console.log("  os.tmpdir()", os.tmpdir())
    console.log("  os.release()", os.release())
    console.log("  os.totalmem()", os.totalmem())
    console.log("  os.freemem()", os.freemem())
    console.log("  path.dirname(p)", path.dirname(p))
    console.log(" ")
    console.log("Running.  Messages:")
    console.log(" ")
 })



// // Web Server Sample
// // var http = require('http');
// // var fs = require('fs');
// // var url = require('url');

// // // Create a server
// // http.createServer( function (request, response) {  
// //    // Parse the request containing file name
// //    var pathname = url.parse(request.url).pathname;
   
// //    // Print the name of the file for which request is made.
// //    console.log("Request for " + pathname + " received.");
   
// //    // Read the requested file content from file system
// //    fs.readFile(pathname.substr(1), function (err, data) {
// //       if (err) {
// //          console.log(err);
// //          // HTTP Status: 404 : NOT FOUND
// //          // Content Type: text/plain
// //          response.writeHead(404, {'Content-Type': 'text/html'});
// //       }else {	
// //          //Page found	  
// //          // HTTP Status: 200 : OK
// //          // Content Type: text/plain
// //          response.writeHead(200, {'Content-Type': 'text/html'});	
         
// //          // Write the content of the file to response body
// //          response.write(data.toString());		
// //       }
// //       // Send the response body 
// //       response.end();
// //    });   
// // }).listen(8081);

// // // Console will print the message
// // console.log('Server running at http://127.0.0.1:8081/');
