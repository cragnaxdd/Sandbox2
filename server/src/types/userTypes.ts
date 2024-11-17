import {z} from 'zod'

export interface UserTypes {
    email : string
    password : string
    username : string
    image? : string
    role : 'user' | 'admin' | 'superadmin'
    createdAt : Date
    updatedAt : Date
}

export const userSchema = z.object({
    email : z.string().email(),
    password : z.string().min(5),
    username : z.string(),
    image : z.string().url().optional(),
    role : z.enum(['user', 'admin']).default('user')
})

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(5)
})