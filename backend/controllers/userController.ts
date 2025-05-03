import { Request, Response } from "express";  
import User from "../models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in .env');


export const register = asyncHandler( async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
     res.status(400).json({ message: 'User already exists' });
     return
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ token, user});
});


export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: 'Invalid password' });
    return;
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '12h' });
  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
});



export const uploadProfileImage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  if (!userId) {
     res.status(400).json({ message: "User ID is required" });
     return
  }

  const file = req.file as Express.Multer.File;
  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const profileImageUrl = file.path

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: profileImageUrl },
      { new: true }
    );

    if (!updatedUser) {
       res.status(404).json({ message: "User not found" });
       return
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating profile image:", err);
    res.status(500).json({ message: "Error uploading image", error: err });
  }
});
