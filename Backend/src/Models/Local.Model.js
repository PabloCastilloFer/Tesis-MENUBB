import mongoose from 'mongoose';

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
    },
    close: {
        type: String,
    }
});

const AccessibilitySchema = new mongoose.Schema({
    isAccessible: {
        type: Boolean,
        default: false
    },
    details: {
        type: String,
        trim: true,
        default: ''
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
    accessibility: AccessibilitySchema,
    image: {
        type: String,
        required: true,
        default: 'default.jpg'
    },
    schedule: [ScheduleSchema],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Local = mongoose.models.Local || mongoose.model('Local', LocalSchema);

export default Local;