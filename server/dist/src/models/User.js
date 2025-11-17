"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        lowercase: true,
    },
    password: {
        type: mongoose_1.default.Schema.Types.String,
        required: true
    }
    // }, {
    //     timestamps: true
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map