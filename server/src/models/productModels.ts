import { ObjectId } from "mongodb";
import type { ProductsTypes } from "../types/productsTypes.js";
import { getDB } from "../config/mongo.js";

const productCollection = "Product" as string;

export const getAllProduct = async function () {
  const db = await getDB();
  return db.collection(productCollection).find().toArray();
};

export const getOneProduct = async function (_id:ObjectId) {
  const db = await getDB()
  return db.collection(productCollection).findOne(_id)
}

export const getProductName = async function (name:string) {
  const db = await getDB()
  return db.collection(productCollection).findOne({name})
}

export const newProduct = async function (product: ProductsTypes) {
  const db = await getDB();
  const newProduct = {
    ...product,
    _id: new ObjectId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return db.collection(productCollection).insertOne(newProduct);
};

export const update = async function (productId:ObjectId, updatedProduct:Partial<ProductsTypes>) {
    const db = await getDB()
    return db.collection(productCollection).findOneAndUpdate(
      {_id: productId}, 
      {
        $set: {
          ...updatedProduct,
          updatedAt: new Date()
        }
      }
    )
}

export const deleteProduct = async function (productId:ObjectId) {
  const db = await getDB()
  return db.collection(productCollection).findOneAndDelete(
    {_id:productId},
  )
}