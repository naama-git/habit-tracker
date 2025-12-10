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
        // type: mongoose.Schema.Types.Number,
        // required: true,
        // min: 1,
        // max: 30
        enum: ['Daily', 'Weekly', 'Monthly'],
        type: mongoose.Schema.Types.String,
        required: true,
        default: 'Daily',

    },
    daysInmonth: {
        type: [Number],
        min: 1,
        max: 30,
        required: function (): boolean { return this.frequency === 'Monthly' ? true : false },
        default: function () {
            if (this.frequency === 'Monthly') {
                return [];
            }
            return undefined;
        }
    },

    daysInweek: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: function (): boolean { return this.frequency === 'Weekly' ? true : false },
        default: function () {
            if (this.frequency === 'Weekly') {
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

    if (doc.frequency === 'Weekly') {
        doc.daysInmonth = undefined; 

    } 
    else if (doc.frequency === 'Monthly') {
        doc.daysInweek = undefined;
    } 
    else {
        doc.daysInweek = undefined;
        doc.daysInmonth = undefined;
    }

    next();
});


export default mongoose.model('Habit', habitSchema)