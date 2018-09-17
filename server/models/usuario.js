const mongoose = require(`mongoose`);
const uniqueVlidator = require(`mongoose-unique-validator`);
let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
};
let UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        enum: rolesValidos,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
UsuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}
UsuarioSchema.plugin(uniqueVlidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('Usuario', UsuarioSchema);