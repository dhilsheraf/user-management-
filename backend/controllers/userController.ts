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
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user });
});
