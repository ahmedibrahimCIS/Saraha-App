import joi from 'joi';

const registerSchema = joi.object({
    userName:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).max(20).required(),
    phone:joi.string(),
    role:joi.string().required()
})

const loginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).max(20).required(),
})


export {registerSchema,loginSchema}