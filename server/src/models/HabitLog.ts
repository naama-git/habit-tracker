import mongoose from 'mongoose';
const habitLogSchema = new mongoose.Schema({
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    done:{
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false
    },
    logDate:{
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now()
    }

}, {
    timestamps: true
})
export default mongoose.model('HabitLog', habitLogSchema)