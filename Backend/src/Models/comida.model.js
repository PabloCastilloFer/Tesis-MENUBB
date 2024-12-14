import { Schema, model } from 'mongoose';

const comidaSchema = new Schema({
    nombreComida: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    calorias: {
        type: String,
        required: true,
    },
    proteinas: {
        type: String,
        required: true,
    },
    lipidos: {
        type: String,
        required: true,
    },
    carbohidratos: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    Estado: {
        type: Boolean,
        default: false,
    },
    etiquetas: [
        {
            type: String,
            required: false
        }
    ],
    local: {
        type: Schema.Types.ObjectId,
        ref: 'local',
        required: true,
    },
});

export default model('comida', comidaSchema);
