import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import { asyncHandler } from "../../utils/error handling/asyncHandler.js";
import { User } from "../../DB/models/userModel.js";
import {hash , compare} from '../../utils/hashing/hash.js';
dotenv.config();     


export const getUser = asyncHandler(async (req, res,next) => {
   
    const {user} = req;
    user.phone = CryptoJS.AES.decrypt(user.phone, process.env.ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);

    return res.status(200).json({message:"Done",results: user});

})

export const updateUser = asyncHandler(async (req, res,next) => {
    if(req.body.phone){
        req.body.phone = CryptoJS.AES.encrypt(req.body.phone, process.env.ENCRYPTION_SECRET).toString();
    }

   const user = await User.findOneAndUpdate( req.user._id,{...req.body},{new: true , runValidators: true});
   return res.status(200).json({message:"Done",results: user});


})


export const changePassword = asyncHandler(async (req, res,next) => {
   const {oldPassword, password} = req.body;
  
   if (!req.user || !req.user.password) {
    return res.status(400).json({ message: "User data is missing or incomplete." });
  } 

   const comparePassword = compare({plainText: oldPassword, hashText: req.user.password});
   
   if(!comparePassword){
    return next(new Error("Old password does not match"), {cause: 400});
   }


   
   const hashedPassword = hash({plainText: password});

   const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { password: hashedPassword, changedAt: Date.now() },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.status(200).json({ message: "Password changed successfully.", results: user });
});

export const deactivateAccount = asyncHandler(async (req, res,next) => {
    const user = await User.findOneAndUpdate( req.user._id,{isDeleted: true,changedat: Date.now()},{new: true , runValidators: true});
    return res.status(200).json({message:"Done",results: user});
})

