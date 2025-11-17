import mongoose from 'mongoose';
const habitSchema = new mongoose.Schema({

    habitName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    tag: {
        type: [mongoose.Schema.Types.String],
        // enum: ['Studies', 'Health', 'Hobby', 'Spirituality', 'Sport', 'Home', 'Business', 'Music','Homework', 'Other'],
        default: ['other'],
        lowercase: true
    },
    frequency: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 1,
        max: 30

    },
    startDate: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: new Date()
    },
    endDate: {
        type: mongoose.Schema.Types.Date,
    },
    time: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/ // HH:MM
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})
export default mongoose.model('Habit', habitSchema)