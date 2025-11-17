"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidation_1 = require("../middlewares/validations/userValidation");
const router = express_1.default.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
router.post("/signup", userValidation_1.userValidation, userValidation_1.validateRequest, userController_1.default.signin);
router.post("/login", userController_1.default.login);
exports.default = router;
//# sourceMappingURL=userRoute.js.map