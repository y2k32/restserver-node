require(`./config/config`);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
// middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
//Configuracion global de rutas
app.use(require(`./routes/index`));
// parse application/json
app.use(bodyParser.json())
mongoose.connect(process.env.urlDBy.toString(), { useNewUrlParser: true }, (error, res) => {
    if (error) {
        throw error;
    }
    console.log(`Base de datos ONLINE`);
});
app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto `, process.env.PORT);
})