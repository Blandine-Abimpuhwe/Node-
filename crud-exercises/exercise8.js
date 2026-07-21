// Question: 
// Create a simple HTTP server using the http module in Node.js that listens on port 3000. The server should respond with:
// A "Hello World" message when a GET request is made to the root route (/).
// A "404 Not Found" message for any other routes.

import http from 'http'

const server= http.createServer((req,res)=>{
    if(req.method === 'GET' && req.url === '/'){
        res.statusCode= 200
       return res.end('Hello world')
    }
    res.statusCode= 404
    res.end('not found')
}).listen(3008,()=>console.log('server running on port 3008'))