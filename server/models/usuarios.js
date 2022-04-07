const mongoose = require('mongoose')

const usuariosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    rut:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    sueldo:{
        type: [Number],
        required: false,
        default: [0,0,0,0,0,0,0,0,0,0,0,0]
    },
    imps:{
        type: [Number],
        required: false,
        default: [0,0,0,0,0,0,0,0,0,0,0,0]
    },
    honorarios:{
        type: [Number],
        required: false,
        default: [0,0,0,0,0,0,0,0,0,0,0,0]
    },
    imph:{
        type: [Number],
        required: false,
        default: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
})

const Usuarios = mongoose.model('Usuarios', usuariosSchema)
module.exports = Usuarios;