import { Router } from "express";
import * as authServices from "./authService.js";
import {validation} from '../../middlewares/validtion.js';
import * as authValidation from './authValidation.js'; 

const router = Router();

router.post("/signup", validation(authValidation.registerSchema), authServices.register);
router.post("/login", validation(authValidation.loginSchema), authServices.login);
router.get("/activate_account/:token", authServices.activateAccount);

export default router;