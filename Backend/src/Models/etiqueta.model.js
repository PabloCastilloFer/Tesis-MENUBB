import { Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const etiquetaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        enum: ['vegano', 'vegetariano', 'celiaco', 'diabetico', 'hipertenso', 'hipotiroideo',
             'hipoglucemico', 'hipercolesterolemico', 'hipertrigliceridemico', 'otro'],
    },
    estado: {
        type: Boolean,
        required: false,
    }
});

export default model('etiqueta', etiquetaSchema);