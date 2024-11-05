const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Local',
    },
    favorite: [{
        ref: 'Local',
        type: Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model('Usuario', UsuarioSchema);