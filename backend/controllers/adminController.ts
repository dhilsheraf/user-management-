import asyncHandler from "express-async-handler";
import { Request, Response } from "express";  
import User from "../models/User";



export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); 
    console.log(users)
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." }); 
  }
});
