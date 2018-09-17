const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true })
        .skip(desde) // skip es un metodo que permite especificar desde que numero de registro mostrar
        .limit(limite) // Limit es un metodo que permite limitar la cantidad de registros que devuelve la consulta
        .exec((error, usuarios) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
            Usuario.count({ estado: true }, (error, conteo) => { // Count cuenta al igual find devuelve todos los registros a menos que se aplique un filtro
                //En ECMAScrypt 6 esto usuarios: usuarios es redundante
                res.json({
                    ok: true,
                    total: conteo,
                    usuarios
                });
            })
        })
})
app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
app.put('/usuario/:id', function(req, res) { // URL con parametros
    let idrec = req.params.id; // Recuperamos el parametro
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); // Selecciona los campos que son actualizables
    // findByIdAndUpdate: actualiza los datos sin tomar en cuenta las validaciones del modelo y si agregamos la propiedad 
    // runValidators: true ya las toma en cuenta
    Usuario.findByIdAndUpdate(idrec, body, { new: true, runValidators: true }, (error, UsuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            usuario: UsuarioDB
        });
    });
})
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, UsuarioDB) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
            res.json({
                ok: true,
                usuario: UsuarioDB
            });
        })
        /*  Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
             if (error) {
                 return res.status(400).json({
                     ok: false,
                     error
                 });
             }
             if (!usuarioBorrado) {
                 return res.status(400).json({
                     ok: false,
                     error: {
                         message: 'No existe el usuario en la base de datos'
                     }
                 });
             }
             res.json({
                 ok: true,
                 usuario: usuarioBorrado
             })
         }) */
})
module.exports = app;