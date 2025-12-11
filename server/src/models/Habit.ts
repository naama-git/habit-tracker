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
        default: ['other'],
        lowercase: true
    },
    frequency: {
        enum: ['daily', 'weekly', 'monthly'],
        type: mongoose.Schema.Types.String,
        required: true,
        default: 'daily',
        lowercase: true

    },
    daysInMonth: {
        type: [Number],
        min: 1,
        max: 30,
        required: function (): boolean { return this.frequency === 'monthly' ? true : false },
        default: function () {
            if (this.frequency === 'monthly') {
                return []
            }
            return undefined;
        }
    },

    daysInWeek: {
        type: [Number],
        min:1,
        max:7,
        required: function (): boolean { return this.frequency === 'weekly' ? true : false },
        default: function () {
            if (this.frequency === 'weekly') {
                return [];
            }
            return undefined;
        }

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

// Pre-save hook to ensure daysInweek and daysInmonth are set correctly based on frequency
habitSchema.pre('save', function (next) {

    const doc = this as any;

    if (doc.frequency === 'weekly') {
        doc.daysInMonth = undefined;
    }
    else if (doc.frequency === 'monthly') {
        doc.daysInWeek = undefined;
    }
    else {
        doc.daysInWeek = undefined;
        doc.daysInMonth = undefined;
    }

    next();
});


export default mongoose.model('Habit', habitSchema)