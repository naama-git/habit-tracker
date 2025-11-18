import express, { Request, Response } from 'express';
import { habitValidation, partialHabitVaildation, validateRequest } from '../middlewares/validations/habitValidations'

const router = express.Router()

import habitController from '../controllers/habitController'
import verifyJWT from '../middlewares/verifyJWT';


router.get('/',verifyJWT, habitController.getHabits)
router.get('/:id', habitController.getHabitById)
router.post('/',verifyJWT, habitValidation, validateRequest, habitController.createHabit)
router.post('/:id',habitController.habitDone)
// router.put('/:id',habitValidation,validateRequest, habitController.updateHabit)
router.delete('/:id', habitController.deleteHabit)
router.patch('/:_id',partialHabitVaildation,validateRequest, habitController.updatePartialHabit)


export default router