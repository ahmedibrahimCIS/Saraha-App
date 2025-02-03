import {User} from "../../DB/models/userModel.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import { roleTypes } from "../../middlewares/authMiddleware.js";
import {asyncHandler} from "../../utils/error handling/asyncHandler.js";
import { emailEmitter } from "../../utils/Email/emailEmit.js";
import {hash , compare} from '../../utils/hashing/hash.js';
dotenv.config(); 

export const register = asyncHandler(async (req, res) => {

    const {  email } = req.body;


    const checkUser = await User.findOne({email});
    if(checkUser){
        return next(new Error("User already exists"), {cause: 400});
    }

    const hashedPassword = hash({plainText: req.body.password});
    const encryptedPhone = CryptoJS.AES.encrypt(req.body.phone, "secretKey").toString();

    const user = await User.create({
            ...req.body,
            password: hashedPassword,
            phone: encryptedPhone,
        });

    emailEmitter.emit("sendEmail", user.userName,user.email);

    return res.status(201).json({message: "User created successfully", user});

} )

export const login = asyncHandler(async (req, res,next) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return next(new Error("User not found"), {cause: 404});
    }
    if(!user.confirmEmail){
        return next(new Error("Email not confirmed"), {cause: 400});
    }
    const matchPass = compare({plainText: password,hashText: user.password});
    if(!matchPass){
        return next(new Error("Password does not match"), {cause: 400});
    }

    const token = jwt.sign({id: user._id, isloggedIn: true}, 
        user.role == roleTypes.User 
        ? process.env.SECRET_TOKEN_USER 
        : process.env.SECRET_TOKEN_ADMIN,
        {expiresIn: "1d"});

        if (user.isDeleted == true) {
            user.isDeleted = false; 
            await user.save();
        }

    return res.status(200).json({message: "User logged in successfully", token});
});
export const activateAccount = asyncHandler(async (req, res,next) => {
  
    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_EMAIL);
    const user = await User.findOne({email: decoded.email});
    if(!user){
        return next(new Error("User not found"), {cause: 404});
    }
    user.confirmEmail = true;
    await user.save();
    return res.status(200).json({message: "Account Activated Successfully"});
} 
)

