"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const habitSchema = new mongoose_1.default.Schema({
    habitName: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose_1.default.Schema.Types.String
    },
    tag: {
        type: [mongoose_1.default.Schema.Types.String],
        enum: ['Studies', 'Health', 'Hobby', 'spirituality', 'Other'],
        default: 'Other',
        lowercase: true
    },
    frequency: {
        type: mongoose_1.default.Schema.Types.Number,
        required: true,
        min: 1,
    },
    startDate: {
        type: mongoose_1.default.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: mongoose_1.default.Schema.Types.Date,
    },
    time: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/ // HH:MM
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Habit', habitSchema);
//# sourceMappingURL=Habit.js.map