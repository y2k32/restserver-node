const express = require('express');
const app = express();
const { verificaToken } = require(`../middlewares/autenticacion`);
app.use('/usuario/*', verificaToken);
app.use(require(`./usuario`));
app.use(require(`./login`));
module.exports = app;