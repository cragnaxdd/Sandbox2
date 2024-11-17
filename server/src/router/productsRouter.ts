import { Hono } from "hono";
import { deleteMenu, getAllMenu, getMenuByName, getOneMenu, newMenu, updateMenu } from "../controllers/productController.js";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";
// authentication,authorization

const productRouter = new Hono();

productRouter.get("/allMenu", getAllMenu);
productRouter.get("/oneMenu/:_id", getOneMenu)
productRouter.get("/menuName/:name", getMenuByName)

productRouter.post("/newMenu", newMenu);

productRouter.patch("/updateMenu/:_id", authentication, updateMenu)

productRouter.delete('/deleteMenu/:_id', deleteMenu)

export default productRouter;