const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (error, usuarioDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: '(usuario) o contraseña incorrectos'
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                error: 'usuario o (contraseña) incorrectos'
            });
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        })
    });
});
// Configuraciones de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    /* console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture); */
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
}

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token)
        .catch(error => {
            return res.status(403).json({
                ok: false,
                error
            });
        });
    Usuario.findOne({ email: googleUser.email }, (error, usuarioDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        };
        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    error: 'Debe realizar una autenticación normal'
                });
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });
            }
        } else {
            // si el usuario no existe en nuestra bd
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';
            usuario.save((error, usuarioDB) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });
            });
        }
    })
});
module.exports = app;