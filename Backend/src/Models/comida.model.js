import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const comidaSchema = new Schema({
    nombreComida: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion:{
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
    name: {
        type: String,
        required:true,
    }
});

export default model('comida', comidaSchema);