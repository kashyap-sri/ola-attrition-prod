const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const http = require('http');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();
const apis = require('./apis');
const dev = app.get('env') !== 'production';

if(!dev) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));
    app.use(express.static(path.join(__dirname, 'client/build')));
}

    app.get('/getSummary', apis.getSummary);
    app.get('/getConScores', apis.getConScores);
    app.get('/getProScores', apis.getProScores);
    app.get('/getProFrequencies', apis.getProFrequencies);
    app.get('/getConFrequencies', apis.getConFrequencies);

if(dev) {
    app.use(morgan('dev'));
}


const server = http.createServer(app);

server.listen(PORT, err => {
    if(err) throw err;
    console.log('Server Started!')
})