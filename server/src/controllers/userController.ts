import type { Context } from "hono";
import { createNewUser, getUserEmail } from "../models/userModel.js";
import { loginSchema, userSchema } from "../types/userTypes.js";
import { comparePassword } from "../helper/bcrypt.js";
import { sign } from "../helper/jwt.js";

export const register = async function (c: Context) {
  try {
    const user = userSchema.parse(await c.req.json());
    let role : 'user' | 'admin' = 'user'
    if (user.email.includes('@company.com')) {
      user.role = 'admin'
    }


    const newUser = {
      ...user,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await createNewUser(newUser);
    return c.json({ messege: "User Created" }, 201);
  } catch (error) {
    console.error("Error Creating User:", error);
    return c.json({ error: "Email Already Used or Invalid Data" }, 400);
  }
};

export const login = async function (c: Context) {
  try {
    const user = loginSchema.parse(await c.req.json());
    
    const trueUser = await getUserEmail(user.email);
    if (
      !trueUser ||
      !(await comparePassword(user.password, trueUser.password))
    ) {
      return c.json({ messege: "User not registered or wrong password" });
    }

    const adminRole = trueUser.role === 'admin'
    

    const token = sign({
      userId: trueUser._id.toHexString(),
      isAdmin: adminRole
    });
    return c.json({ messege: "Login Succesfull", token });

  } catch (error) {
    console.error(error);
    return c.json({ messege: "internal Server Error" }, 500);
  }
};
