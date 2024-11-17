import { ObjectId } from "mongodb";
import { z } from "zod";

export interface ProductsTypes {
    _id? : ObjectId
    name : string
    image? : string
    price : number 
    discount? : string
    description : string
    category : 'food' | 'beverage' | 'snack'
    rating? : number 
    createdAt : Date
    updatedAt : Date
}

export const productSchema = z.object({
    _id : z.instanceof(ObjectId).optional(),
    name : z.string(),
    image : z.string().url().optional(),
    price : z.number(),
    discount : z.string().optional(),
    description : z.string(),
    category : z.enum(['food', 'beverage', 'snack']),
    rating : z.number().optional()
})