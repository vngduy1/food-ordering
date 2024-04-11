import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDDINARY_API_KEY,
  api_secret: process.env.CLOUDDINARY_API_SECRET,
});

export async function POST(req) {
  console.log("machi");
  const data = await req.formData();
  console.log(data);
  console.log(data.get("file"));
  if (data.get("file")) {
    //   upload the file
    let file = data.get("file");
    return console.log(file);

    // const uploadResponse = await cloudinary.uploader.upload(file);

    // file = uploadResponse.secure_url;

    // const ext = file.name.split(".").slice(-1)[0];
    // console.log({ ext });
  }

  return Response.json(true);
}
