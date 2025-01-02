import mongoose from 'mongoose';

const ComidaSchema = new mongoose.Schema({
    nombreComida: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    calorias: {
        type: Number,
        default: null,
    },
    proteinas: {
        type: Number,
        default: null,
    },
    lipidos: {
        type: Number,
        default: null,
    },
    carbohidratos: {
        type: Number,
        default: null,
    },
    imagen: {
        type: String,
        default: null,
    },
    estado: {
        type: Boolean,
        default: false,
    },
    local: {
        type: mongoose.Schema.Types.ObjectId,  // Cambiado para guardar el ID del local
        ref: 'Local',  // Referencia al modelo Local
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

const Comida = mongoose.models.Comida || mongoose.model('Comida', ComidaSchema);

export default Comida;
