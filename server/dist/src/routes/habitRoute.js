"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const habitValidations_1 = require("../middlewares/validations/habitValidations");
const router = express_1.default.Router();
const habitController_1 = __importDefault(require("../controllers/habitController"));
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
router.get('/', verifyJWT_1.default, habitController_1.default.getHabits);
router.get('/:id', habitController_1.default.getHabitById);
router.post('/', verifyJWT_1.default, habitValidations_1.habitValidation, habitValidations_1.validateRequest, habitController_1.default.createHabit);
router.post('/:id', habitController_1.default.habitDone);
router.put('/:id', habitValidations_1.habitValidation, habitValidations_1.validateRequest, habitController_1.default.updateHabit);
router.delete('/:id', habitController_1.default.deleteHabit);
exports.default = router;
//# sourceMappingURL=habitRoute.js.map