import mongoose from 'mongoose';

delete mongoose.models.Local;

const ScheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    open: {
        type: String,
        validate: {
            validator: function (v) {
                // Solo es requerido si isOpen es true
                return this.isOpen ? v != null : true;
            },
            message: 'El campo `open` es obligatorio cuando `isOpen` es true.'
        }
    },
    close: {
        type: String,
        validate: {
            validator: function (v) {
                // Solo es requerido si isOpen es true
                return this.isOpen ? v != null : true;
            },
            message: 'El campo `close` es obligatorio cuando `isOpen` es true.'
        }
    }
});

const LocalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true,
        default: 'default.jpg'
    },
    schedule: [ScheduleSchema]
});

const Local = mongoose.model('Local', LocalSchema);
export default Local;