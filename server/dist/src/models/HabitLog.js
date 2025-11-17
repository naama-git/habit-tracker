"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const habitLogSchema = new mongoose_1.default.Schema({
    habitId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    done: {
        type: mongoose_1.default.Schema.Types.Boolean,
        required: true,
        default: false
    },
    logDate: {
        type: mongoose_1.default.Schema.Types.Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('HabitLog', habitLogSchema);
//# sourceMappingURL=HabitLog.js.map