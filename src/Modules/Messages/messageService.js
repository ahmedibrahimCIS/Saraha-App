import { User } from "../../DB/models/userModel.js";
import {Message} from "../../DB/models/messageModel.js";
import { flags } from "./messageValidation.js";

export const sendMessage = async (req, res,next) => {
    const {content, receiver} = req.body;
    
    const user = await User.findById(receiver);

    if(!user){
        return next(new Error("Receiver not found" ,{cause: 404}));
    }

    const message = await Message.create({
        content,
        receiver,
        sender: req.user._id
        
    })

    return res.status(201).json({message: "Message sent successfully",results: message});
};


export const getMessage = async (req, res, next) => {
    const { messageId } = req.params;
    const { user } = req;

        
        const message = await Message.findById(messageId).populate([
            { path: 'sender', select: ['userName', 'email', '-_id'] },
        ]).lean(); 

        // Check if the message exists
        if (!message) {
            return next(new Error("Message not found"), { cause: 404 });
        }

        // Check if the user is authorized to access the message
        if (
            message.receiver?.email === user.email ||
            message.sender?.email === user.email
        ) {
            return res.status(200).json({ message: "Message found", data: message });
        }

        // If unauthorized, return an error
        return next(new Error("Unauthorized"), { cause: 401 });

    } 

export const getAllMessages = async (req, res) => {
    const{flag} = req.query;
    return res.status(200).json({success:true , 
        results: flag == flags.inbox ?
          await Message.find({receiver: req.user._id}) 
        : await Message.find({sender: req.user._id})});
};



