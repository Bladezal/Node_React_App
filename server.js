const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/hola', (req, res) => {
    res.send({ express: 'Express Server Toolbox' });
});

app.post('/texto', function(req, res) {
    var data = req.body.data;
    res.send(data);
});

var server = app.listen(3030, function() {
    console.log('Server corriendo en el puerto 3030...');
});

module.exports = app;