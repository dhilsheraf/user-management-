import express  from "express";
import { login, register } from "../controllers/userController";


const router = express.Router()

router.post('/signup',register)
router.post('/login',login)

export default router