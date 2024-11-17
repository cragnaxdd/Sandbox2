import { ObjectId } from "mongodb";
import type { UserTypes } from "../types/userTypes.js";
import { hashPassword } from "../helper/bcrypt.js";
import { getDB } from "../config/mongo.js";

const userCollection = "Users" as string

export const getOneUSer = async function (username:string) {
    const db = await getDB()
    return db.collection(userCollection).findOne({username})
}

export const getUserId = async function (_id:ObjectId) {
    const db = await getDB()
    return db.collection(userCollection).findOne({_id})
}

export const getUserEmail = async function (email:string) {
    const db = await getDB()
    return db.collection(userCollection).findOne({email})
}

export const createNewUser = async function (user:UserTypes) {
    const db = await getDB()
    return db.collection(userCollection).insertOne({...user, password: hashPassword(user.password)})
}

