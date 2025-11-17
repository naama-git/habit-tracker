"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const dbconn_1 = require("./config/dbconn");
const mongoose_1 = __importDefault(require("mongoose"));
require("module-alias/register");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1100;
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
(0, dbconn_1.connectDB)();
app.get('/', (req, res) => {
    res.send("Home Page");
});
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use('/user', userRoute_1.default);
const habitRoute_1 = __importDefault(require("./routes/habitRoute"));
app.use('/myHabits', habitRoute_1.default);
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose_1.default.connection.on('error', err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map