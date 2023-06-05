const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer(function(req, res) {
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, '/public', 'index.html'), function(err, content) {
    //         if(err) throw err;

    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     });
    // }

    // if(req.url === '/about') {
    //     fs.readFile(path.join(__dirname, '/public', 'about.html'), function(err, content) {
    //         if(err) throw err;

    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     });
    // }

    // // Now let's change the game, instead of serving html, we'll serve json (api)
    // if(req.url === '/api/users') {
    //     // Normally we have to fetch the data from the database and serve it
    //     const users = [
    //         { name: 'Bob Smith', age: 40},
    //         { name: 'John Doe', age: 30 }
    //     ];

    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(users));
    // }


    // The above way not recommended, cause we are gonna have to handle every page, and its css...
    // Build file path
    let filePath = path.join(__dirname, '/public', req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type (default)
    let contentType = 'text/html';

    // Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read File
    fs.readFile(filePath, function(err, content) {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, '/public', '404.html'), function(err, content) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error ${err.code}`);
            }

        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});


// First it's gonna look for the envirement variable
const PORT = process.env.PORT || 5000;

server.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});
