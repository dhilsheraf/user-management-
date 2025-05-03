import express  from "express";
import { login, register, uploadProfileImage } from "../controllers/userController";
import  upload  from "../middleware/multer";


const router = express.Router()

router.post('/signup',register)
router.post('/login',login)
router.put('/:id/profile-image', upload.single('profileImage'), uploadProfileImage);

export default router