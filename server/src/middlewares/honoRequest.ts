import { ObjectId } from "mongodb";

declare module 'hono' {
    interface HonoRequest {
        user?: {
            userId: ObjectId
            isAdmin: 'user' | 'admin'
        }
    }
}