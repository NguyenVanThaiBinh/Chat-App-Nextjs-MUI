import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collections, connectToDatabase } from "../../../middleware/database";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res, next) => {
  console.log("AAA");
  try {
    await connectToDatabase();
    const userList = await collections
      .user!.find({
        $or: [
          { email: { $regex: /n/ } },
          {
            nickname: { $regex: /n/ },
          },
        ],
      })
      .toArray();
    res.send(userList);
  } catch (error: any) {
    res.send(error.message);
  }
});
export default handler;
