const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    },
    open: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
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

module.exports = mongoose.model('Local', LocalSchema);