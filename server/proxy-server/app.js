const http = require('http');
const httpProxy = require('http-proxy');


const proxy = httpProxy.createProxyServer();

const server1 = 'http://localhost:8000'; 
const server2 = 'http://localhost:9000';

const server = http.createServer((req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  
  if (req.url.startsWith('/api')) {
    console.log('Routing to Server 1');
    proxy.web(req, res, { target: server1 }, (err) => {
      console.error('Error routing to Server 1:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('An error occurred while routing to Server 1.');
    });
  } else {
    console.log('Routing to Server 2');
    proxy.web(req, res, { target: server2 }, (err) => {
      console.error('Error routing to Server 2:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });


res.end('An error occurred while routing to Server 2.');
    });
  }
});


const PORT = 7000;
server.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
