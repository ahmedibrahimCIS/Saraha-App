import { Router } from "express";
import * as messagesServices from "./messageService.js";
import { asyncHandler } from "../../utils/error handling/asyncHandler.js";
import { allowTo, authentication } from "../../middlewares/authMiddleware.js";
import {validation} from '../../middlewares/validtion.js';
import * as messageValidation from './messageValidation.js';

const router = Router();

router.get("/:messageId",authentication,allowTo(["Admin","User"]),validation(messageValidation.getMessageSchema), asyncHandler(messagesServices.getMessage));
router.post("/send",authentication, allowTo(["Admin","User"]),validation(messageValidation.sendMessageSchema), asyncHandler(messagesServices.sendMessage));
router.get("/",authentication,allowTo(["Admin", "User"]),validation(messageValidation.getAllMessagesSchema), asyncHandler (messagesServices.getAllMessages));

export default router;