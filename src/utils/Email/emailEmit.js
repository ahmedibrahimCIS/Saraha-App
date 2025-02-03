import { EventEmitter } from "events";
import {sendEmail,subject} from "./sendEmail.js";
import {signup} from "./generateHTML.js";
import jwt from "jsonwebtoken";

export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (userName,email) => {
    const token = jwt.sign({email},process.env.SECRET_TOKEN_EMAIL,{expiresIn: "1h"});
        const link = `http://localhost:3000/auth/activate_account/${token}`;
    
        const isSent = await sendEmail({to: email, subject: subject.register, html: signup(link, userName)});
})
