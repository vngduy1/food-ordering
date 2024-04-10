import { User } from "../../../models/User";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const createdUser = await User.create(body);
    console.log("success");
    return Response.json(createdUser);
  } catch (error) {
    console.log("fail!!", error);
  }
}
