import { MongoClient } from "mongodb"
import { config } from 'dotenv';
config();

const mongoUrl = process.env.MONGO_URL as string
const dbName = process.env.DB_NAME as string

// console.log(mongoUrl, dbName);


let client : MongoClient

export async function mongoDB() {
    if (!client) {
        client = new MongoClient(mongoUrl!)
        await client.connect()
    }
    
    return client
}

export async function getDB() {
    const client = await mongoDB()
    const db = client.db(dbName)
    return db
}