import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router()

router.get('/get', UserController.getUsers)
router.post('/register', UserController.createUser)

export default router