const express = require('express');
const app = express();
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
module.exports = app;