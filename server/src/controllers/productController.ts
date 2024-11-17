import type { Context } from "hono";
import { productSchema } from "../types/productsTypes.js";
import {
  deleteProduct,
  getAllProduct,
  getOneProduct,
  getProductName,
  newProduct,
  update,
} from "../models/productModels.js";
import { ObjectId } from "mongodb";
// import { ZodError } from "zod";

export const getAllMenu = async function (c: Context) {
  const data = await getAllProduct();
  return c.json({ data });
};

export const getOneMenu = async function (c: Context) {
  const data = await getOneProduct(new ObjectId(c.req.param("_id")));
  return c.json({ data });
};

export const getMenuByName = async function (c: Context) {
  const param = c.req.param("name");
  const data = await getProductName(param);
  if (!data) {
    return c.json({ messege: `Product with Name ${param} Does not exist` });
  }
  return c.json({ data });
};

export const newMenu = async function (c: Context) {
  try {
    const {name} = await c.req.json();
    // console.log(name, 'name');
    
    const existingMenu = await getProductName(name);
    console.log(existingMenu,'existing');

    if (existingMenu) {
      return c.json({ messege: `Product with Name ${name} already exist` });
    }

      const product = productSchema.parse(await c.req.json());
      const newProductMenu = {
        ...product,
        _id: new ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const res = await newProduct(newProductMenu);
      return c.json({ messege: "New Product Created", res });
    
  } catch (error) {
    console.error("Error", error);
  }
};

export const updateMenu = async function (c: Context) {
  try {
    const product = productSchema.parse(await c.req.json());
    // console.log(product);

    const productId = c.req.param("_id");
    // console.log(productId);

    if (!ObjectId.isValid(productId)) {
      return c.json({ messege: "Invalid Product Id" });
    }

    const oneProduct = await getOneProduct(new ObjectId(productId));
    // console.log(oneProduct);

    if (!oneProduct) {
      return c.json({ messege: "Product Not Found" });
    }
    const updatedMenu = {
      ...product,
      updatedAt: new Date(),
    };

    const res = await update(new ObjectId(productId), updatedMenu);
    return c.json({
      messege: `Product with id ${productId} has been updated`,
      res,
    });
  } catch (error) {
    return c.json({ message: "Error occurred" }, 500);
  }
};

export const deleteMenu = async function (c: Context) {
  try {
    const param = c.req.param("_id");
    const data = await deleteProduct(new ObjectId(param));
    if (!param) {
      return c.json({ messege: `Menu with _id ${param} is not Found` });
    }
    return c.json({ messege: `Menu with _id ${param} has been deleted` });
  } catch (error) {
    return c.json({ message: "Error occurred" }, 500);
  }
};
