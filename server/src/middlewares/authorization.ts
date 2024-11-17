import { type Context } from "hono";
import { ObjectId } from "mongodb";


export const authorization = async function (c:Context, next:() => Promise<void>) {
    try {
        const role = c.req.user?.isAdmin
        if (role !== 'admin') {
            c.json({messege: 'UNATHORIZED ROLE'})
        }
        await next()
    } catch (error) {
        return c.json({messege: 'internal server error'})
    }
}