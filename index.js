const http = require('http');
const fs = require('fs');


// const server = http.createServer((req, res) => {
const server = http.createServer((browserReq, serverResp) => {
    console.log('Oh wow I got a request')
    console.log(browserReq.url);
    console.log(browserReq.method);
    let url = browserReq.url;
    if (url === '/') {
        url = '/index.html';
    }

    // Read the HTML file's contents so we can send it in the Response
    fs.readFile(`${__dirname}/public${url}`, (error, buf) => {
        if (error) {
            console.log(error);
            serverResp.writeHead(404, {
                'Content-Type': 'text/html'
            });
            serverResp.end(`<h1>File not found</h1>`);
        } else if (url.endsWith('.html')) {
            serverResp.writeHead(200, {
                'Content-Type': 'text/html'
                // if json: Content-Type': 'application/json'
            });
            const contents = buf.toString();
            serverResp.end(contents);

        } else if (url.endsWith('.css')) {
            serverResp.writeHead(200, {
                'Content-Type': 'text/css'
            });
            const contents = buf.toString();
            serverResp.end(contents);

        } else if (url.endsWith('.jpg')) {
            serverResp.writeHead(200, {
                'Content-Type': 'image/jpg'
        });
            serverResp.end(buf);
    //serverResp.end(`<h1>OMG IT WORKS!!!</h1>`);
        }
});
});
server.listen(3000, () => {
    console.log('Server is listening!')
});

// myButton.addEventListener('click', (event) => {
//     console.log('they clicked')
// });

// Determine whether the request is asking for HTML or CSS
// Based on the file type requested, you'll use different 
// values when you call .writeHead()

// Use the .endsWith() method to determine whether the request is 
// for a .html file or a .css file
// (Search MDN for "endsWith")
// If it ends with ".html" use "Content-Type": "text/html"
// If it ends with ".css" use "Content-Type": "text/css"