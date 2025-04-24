import express  from "express";
import { getAllUsers } from "../controllers/adminController";

const router = express.Router()

router.get('/all-user',getAllUsers)

export default router