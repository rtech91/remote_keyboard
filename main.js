var http = require('http');
var fs = require('fs');
var path = require('path');
var robot = require("robotjs");

http.createServer(function (request, response) {
    console.log(request.url);
    if(request.url === '/next') {
      robot.keyTap('right');
    }
    if(request.url === '/prev') {
      robot.keyTap('left');
    }
    if(request.url.match(/\/key\/(.*)/i) && !request.url.match('/ping')) {
        let keyName = request.url.replace('/key/', '');
        robot.keyTap(keyName);
    }
    if(request.url === '/ping') {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('ok', 'utf-8');
    }

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8021);
console.log('Server running at http://127.0.0.1:8021/');
