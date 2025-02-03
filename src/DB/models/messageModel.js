import mongoose , {Schema} from "mongoose";

const messageSchema = new Schema({
    content:{
        type: String,
        required:[true,'Message is required']
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,'Sender is required']
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,'Receiver is required']
    },
   
},{timestamps:true})

export const Message = mongoose.model('Message',messageSchema)