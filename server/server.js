require(`./config/config`);
const express = require('express');
var bodyParser = require('body-parser');
const app = express()
    // middleware
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.send('')
})
app.post('/usuario', function(req, res) {
    let body = req.body;
    res.json(body);
})
app.put('/usuario/:id', function(req, res) { // URL con parametros
    let idrec = req.params.id; // Recuperamos el parametro
    res.json({
        id: idrec
    });
})
app.delete('/usuario', function(req, res) {
    res.send('')
})
app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto `, process.env.PORT);
})