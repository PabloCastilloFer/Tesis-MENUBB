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
        type: Number,
        required: false,
    },
    proteinas: {
        type: Number,
        required: false,
    },
    lipidos: {
        type: Number,
        required: false,
    },
    carbohidratos: {
        type: Number,
        required: false,
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
});

export default model('comida', comidaSchema);
