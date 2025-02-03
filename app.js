import express from 'express'
import { connectDB } from './src/DB/connection.js';
import authRouter from './src/Modules/Auth/authController.js';
import userRouter from './src/Modules/User/userController.js';
import messageRouter from './src/Modules/Messages/messageController.js';
import dotenv from 'dotenv';
import { globalErrorHandler } from './src/utils/error handling/errorHandler.js';
import { notFoundHandler } from './src/utils/error handling/routeHandler.js';
dotenv.config(); 

const app = express()
const port = process.env.PORT || 3000

await connectDB();

app.use(express.json())
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/messages", messageRouter)

app.all('/', notFoundHandler)
   

//Error Handler
app.use(globalErrorHandler);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))