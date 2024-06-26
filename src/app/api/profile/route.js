import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if ("name" in data) {
    //update user name
    await User.updateOne({ email }, { name: data.name });
  }

  return Response.json(true);
}
