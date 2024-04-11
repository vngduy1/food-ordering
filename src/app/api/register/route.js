import { User } from "../../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);

    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
      new Error("Password must be at least 5 characters");
    }

    const notHash = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHash, salt);

    const createdUser = await User.create(body);
    console.log("success");
    return Response.json(createdUser);
  } catch (error) {
    console.log("fail!!", error);
  }
}
