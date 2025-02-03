import mongoose, {Schema} from "mongoose";
import { roleTypes } from "../../middlewares/authMiddleware.js";

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true,"userName is required"],
        minLength:[3,'userName must be at least 3 characters'],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        requierd:[true,'Email is required'],
        lowercase:true,
        unique:true,
        trim:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type: String,
        required:[true,'Password is required'],
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:Object.values(roleTypes),
        default:roleTypes.User
    },
    gender:{
        type:String,
        enum:["male","female"],
    },
    DOB:String,
    Address:String,
    phone:String,
    image:String,
    changedAt:Date,
    isDeleted: {
        type: Boolean,
        default: false
    }
    
},{
    timestamps:true
})

export const User = mongoose.model('User',userSchema);