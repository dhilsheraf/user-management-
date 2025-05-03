import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";  
import User from "../models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in .env');


export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." }); 
  }
});


export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isAdmin) {
      res.status(403).json({ message: 'Access denied: Not an admin' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email, isAdmin: true },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Create user
export const createUser =asyncHandler(
   async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(409).json({ message: 'User with this email already exists.' });
       return
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Edit user
export const editUser = asyncHandler( 
  async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updated)
      { 
         res.status(404).json({ message: 'User not found' });
    return
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export const deleteUser = asyncHandler( 
  async (req: Request, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
        {
      res.status(404).json({ message: 'User not found' });
      return
   }
    res.json({ message: 'User deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
})

//

export const verifyToken = asyncHandler( 
  (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Unauthorized: No token provided' });
     return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); 
    req.user = decoded;
    next();
  } catch (err) {
     res.status(401).json({ message: 'Invalid token' });
     return
  }
});