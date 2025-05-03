import express  from "express";
import { createUser, deleteUser, editUser, getAllUsers, login, verifyToken } from "../controllers/adminController";

const router = express.Router()

router.get('/all-user',getAllUsers)
router.post('/admin-login',login)
router.post('/create-user',verifyToken, createUser);
router.put('/edit-user/:id',verifyToken, editUser);
router.delete('/delete-user/:id', verifyToken,deleteUser);

export default router