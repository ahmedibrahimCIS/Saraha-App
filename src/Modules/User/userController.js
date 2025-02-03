import { Router } from "express";
import * as userServices from "./userService.js";
import {allowTo, authentication} from "../../middlewares/authMiddleware.js";
import * as userValidation from './userValidtion.js';
import {validation} from '../../middlewares/validtion.js';
const router = Router();

router.get("/profile",authentication, allowTo(["Admin","User"]), userServices.getUser);
router.patch("/",authentication, allowTo(["Admin","User"]),validation(userValidation.updateUserSchema), userServices.updateUser);
router.patch("/password",authentication, allowTo(["Admin","User"]),validation(userValidation.updatePasswordSchema), userServices.changePassword);
router.delete ("/deactivate",authentication, allowTo(["Admin","User"]), userServices.deactivateAccount);

export default router;