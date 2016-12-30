var http = require('http');
var fs = require('fs');
var path = require('path');
var robot = require("robotjs");

http.createServer(function (request, response) {
    console.log(request.url);
    
    if(request.url.match(/\/(key|mouseClick)\/(.*)/i)) {
        var isMouseClick = false;
        if(request.url.match(/mouseClick/)) {
            isMouseClick = true;
        }
        var keyName = '';
        if(isMouseClick === false) {
            keyName = request.url.replace('/key/', '');
            if(keyName.match(/(control|alt|win)/)) {
                var keys = keyName.split('_');
                keys.forEach(function(item, i, array){
                    robot.keyToggle(item, 'down');
                });
                keys.forEach(function(item, i, array){
                    robot.keyToggle(item, 'up');
                });
            }else {
                robot.keyTap(keyName);
            }
        }
        else {
            keyName = request.url.replace('/mouseClick/', '');
            robot.mouseClick(keyName);
        }
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
