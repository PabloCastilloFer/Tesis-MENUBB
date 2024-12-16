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
        required: false,
    },
    proteinas: {
        type: String,
        required: false,
    },
    lipidos: {
        type: String,
        required: false,
    },
    carbohidratos: {
        type: String,
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
