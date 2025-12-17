import express, { Request, Response } from 'express';
import { habitValidation, partialHabitVaildation, validateRequest } from '../middlewares/validations/habitValidations'
import habitController from '../controllers/habitController'
import verifyJWT from '../middlewares/verifyJWT';
import loadHabit from '../middlewares/validations/loadCurrentHabit';
import { trackHabitValidation } from '../middlewares/validations/trackHabitValidations';

const router = express.Router()

router.get('/', verifyJWT, habitController.getHabits)
router.get('/:id', habitController.getHabitById)
router.post('/', verifyJWT, habitValidation, validateRequest, habitController.createHabit)
router.delete('/:id', verifyJWT, habitController.deleteHabit)
router.patch('/:_id', verifyJWT, loadHabit, partialHabitVaildation, validateRequest, habitController.updatePartialHabit)

router.post('/:_id', verifyJWT, loadHabit, trackHabitValidation, habitController.habitDone)


export default router