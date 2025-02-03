import joi from "joi";

export const updateUserSchema = joi.object({
    userName:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    phone:joi.string().required()
}).required()

export const updatePasswordSchema = joi.object({
    oldPassword:joi.string().min(6).max(20).required(),
    password:joi.string().min(6).max(20).not(joi.ref('oldPassword')).required(),
    confirmPassword:joi.string().min(6).max(20).required()
}).required()