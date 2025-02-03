import {User} from '../DB/models/userModel.js';
import jwt from 'jsonwebtoken';

export const roleTypes = {
    User:"User",
    Admin:"Admin" 
}
export const authentication = async (req,res,next)=>{
    try {
        const {authorization} = req.headers;

        if(!authorization){
            return next(new Error("Unauthorized"), {cause: 401});
        }

        const [Bearer,token] = authorization.split(" ");
        let TOKEN_SIGNATURE;
        switch(Bearer){
            case "Bearer":
                TOKEN_SIGNATURE = process.env.SECRET_TOKEN_USER;
                break;
            case "Admin":
                TOKEN_SIGNATURE = process.env.SECRET_TOKEN_ADMIN;
                break;
            default:
                break;

        }

        if(!token || !TOKEN_SIGNATURE){
            return next(new Error("Unauthorized"), {cause: 401});
        }
        
                const decoded = jwt.verify(token, TOKEN_SIGNATURE);
                console.log("Decoded ID:", decoded.id);

        
                const user = await User.findById(decoded.id);
                console.log("User Found:", user);

                if(!user){
                return next(new Error("User not found"), {cause: 404});
        
                };
                
                if(user.changedAt?.getTime() > decoded.iat*1000){
                    return next(new Error("Login again"), {cause: 401});
                }

                if(user.isDeleted == true){
                    return next(new Error("Login again"), {cause: 401});
                }

                req.user = user;
                return next();
    } catch (error) {
        return next(error);
    }
}

export const allowTo = (roles = []) =>{
    return async (req, res, next) => {
        try {
            const {role} = req.user;
            if(!roles.includes(role)){
                return next(new Error("Forbidden"), {cause: 403});
            }
            return next();
        } catch (error) {
            return next(error);
        }
    }
}