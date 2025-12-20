import express from 'express';
import { trackHabitValidation, validateRequest, trackHabitValidationForUpdating } from '../middlewares/validations/trackHabitValidations'
import { trackHabit, getHabitTrackers, updateHabitStatus } from '../controllers/trackHabitController'
import verifyJWT from '../middlewares/verifyJWT';
import loadHabit from '../middlewares/validations/loadCurrentHabit';


const router = express.Router()

router.post('/:_id', verifyJWT, loadHabit, trackHabitValidation, validateRequest, trackHabit)
router.get("/:_id", verifyJWT, getHabitTrackers)
router.put("/:_id", verifyJWT, trackHabitValidationForUpdating, validateRequest, updateHabitStatus)

export default router