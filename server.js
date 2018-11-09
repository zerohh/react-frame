var express = require('express');
var httpProxyMiddleware = require('http-proxy-middleware');
const path = require('path');
var app = express();
var proxyOption = {
    target: '',
    changeOrigin: true,
    pathRewrite: {'^/api' : ''}
};

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/*', httpProxyMiddleware(proxyOption));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(8080, ()=> {
    console.log('Node server has been started on ' + 8080 + '.....');
}) ;