import { type Context } from "hono";
import { getUserId } from "../models/userModel.js";
import { ObjectId } from "mongodb";
import { verify } from "../helper/jwt.js";


export const authentication = async function (c:Context, next:()=>Promise<void>) {
    const header = c.req.header('Authorization')
    console.log(header);
    
    if (!header) {
        return c.json({messege: 'Unauthorized'})
    }

    const auth = header.split(' ')
    if (auth.length !== 2) {
        return c.json({messege: 'Invalid Auth Format'})
    }

    const token = auth[1]
    if (!token) {
        return c.json({messege: 'Invalid Token'})
    }

    const trueToken = verify(token)
    console.log(trueToken);
    
    if (!trueToken) {
        return c.json({messege: 'Missing Token'})
    }

    const user = await getUserId(new ObjectId(trueToken?.userId))

    if (!user) {
        return c.json({messege: 'User not Found or have not login yet'})
    }

    c.req.user = {
        userId :user._id,
        isAdmin: user.isAdmin
    }

     return next()
}