const jwt = require('jsonwebtoken');
// ====================================
// Verificar Token
// ====================================
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (error, decode) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                error
            })
        }
        req.usuario = decode.usuario;
        next();
    });
    /* res.json({
        token: token
    }) */
};
// ====================================
// Verificar Role
// ====================================
let verificaRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role !== "ADMIN_ROLE") {
        return res.status(401).json({
            ok: false,
            error: 'No eres un usuario administrador'
        });
    }
    next();
}
module.exports = {
    verificaToken,
    verificaRole
}