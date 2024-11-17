import { Hono } from "hono";
import userRouter from "./userRouter.js";
import productRouter from "./productsRouter.js";

const router = new Hono()

router.route('/user', userRouter)
router.route('/products', productRouter)

export default router