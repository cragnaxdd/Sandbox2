import { Hono } from "hono";
import { login, register } from "../controllers/userController.js";

const userRouter = new Hono()

userRouter.post('/register', register)
userRouter.post('/login', login)

export default userRouter